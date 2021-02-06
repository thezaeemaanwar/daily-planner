const MongoClient = require("mongodb");

let db;
const DBStart = async () => {
  console.log("DB server connecting...");
  const client = await MongoClient.connect(
    "mongodb+srv://nodejs-mongodb:nodejs-mongodb@cluster0.ulgkf.mongodb.net/usersDB?retryWrites=true&w=majority",

    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );
  console.log("DB Connected Successfully.");
  db = client.db("daily-planner-app");
};
DBStart();

const withDB = async (operations, res) => {
  try {
    await operations(db);
    // client.close();
  } catch (error) {
    // res.status(500).json({ message: "Error Connecting to db ", error });
    console.log("error in with db : ", error);
  }
};

const createUser = async (uid, res) => {
  await withDB(async (db) => {
    const user = await db.collection("users").findOne({ uid: uid });
    console.log(user);
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
