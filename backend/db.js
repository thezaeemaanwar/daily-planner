const MongoClient = require("mongodb");

let db;
const DBStart = async () => {
  console.log("DB server connecting...");
  const client = await MongoClient.connect(
    "mongodb://quizdom:quizdom-mongodb@cluster0-shard-00-00.lecax.mongodb.net:27017,cluster0-shard-00-01.lecax.mongodb.net:27017,cluster0-shard-00-02.lecax.mongodb.net:27017/quizdom-project?ssl=true&replicaSet=atlas-hmlbn7-shard-0&authSource=admin&retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );
  console.log("DB Connected Successfully.");
  db = client.db("quizdom-project");
};
DBStart();

const withDB = async (operations, res) => {
  try {
    await operations(db);
    client.close();
  } catch (error) {
    res.status(500).json({ message: "Error Connecting to db ", error });
  }
};

const createUser = async (uid, res) => {
  await withDB(async (db) => {
    const user = await db.collection("users").findOne({ uid: uid });
    if (!user) {
      const result = await db.collection("users").insertOne({ uid });
      console.log("created user");
      res.status(200).json({ message: "User Created successfully." });
    } else {
      console.log("user exists");
      res.status(200).json({ message: "User Record Exist" });
    }
  });
};

module.exports.createUser = createUser;
