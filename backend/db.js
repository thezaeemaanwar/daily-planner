const MongoClient = require('mongodb')

let db
const DBStart = async () => {
    console.log('DB server connecting...')
    const uri =
        'mongodb+srv://nodejs-mongodb:nodejs-mongodb@cluster0.ulgkf.mongodb.net/usersDB?retryWrites=true&w=majority'
    const client = await MongoClient.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    console.log('DB Connected Successfully.')
    db = client.db('daily-planner-app')
}
DBStart()

const withDB = async (operations, res) => {
    try {
        await operations(db)
    } catch (error) {
        console.log('error in with db : ', error)
    }
}

const createUser = async (uid, res) => {
    await withDB(async (db) => {
        const user = await db.collection('users').findOne({ uid: uid })
        if (!user) {
            const result = await db.collection('users').insertOne({ uid })
            res.status(200).json({ message: 'User Created successfully.' })
        } else {
            res.status(200).json({ message: 'User Record Exist' })
        }
    })
}

const getData = async (data, res) => {
    await withDB(async (db) => {
        const cursor = db
            .collection('users')
            .find({ uid: data.uid })
            .project({ plans: { $elemMatch: { date: data.date } } })

        const plan = await cursor.toArray()
        if (plan[0].plans) {
            res.status(200).json({ plans: plan[0].plans[0] })
        } else {
            res.status(200).json({ plans: null })
        }
    })
}

const updateData = async (data, res) => {
    await withDB(async (db) => {
        try {
            const cursor = db
                .collection('users')
                .find({ uid: data.uid })
                .project({ plans: { $elemMatch: { date: data.date } } })

            const result = await cursor.toArray()

            if (result[0].plans) {
                db.collection('users').updateOne(
                    { uid: data.uid, 'plans.date': data.date },
                    { $set: { 'plans.$.data': data.data } }
                )
            } else {
                db.collection('users').updateOne(
                    { uid: data.uid },
                    { $push: { plans: { date: data.date, data: data.data } } }
                )
            }
        } catch (e) {
            console.log('Update failed : ', e)
        }
    })
}

module.exports.createUser = createUser
module.exports.getData = getData
module.exports.updateData = updateData
