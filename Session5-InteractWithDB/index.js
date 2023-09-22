const { MongoClient } = require("mongodb");
const url =
  "mongodb+srv://ibmf796:nodejs_123@learn-mongo-db.p2rnxjy.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(url);

const main = async () => {
  //connect to db
  await client.connect();
  console.log("Connected Successfully to server");

  //choose db to interact with
  const db = client.db("IBMF");

  //choose collection to interact with
  const collection = db.collection("Courses");

  //AddNewCourse
  await collection.insertOne({
    title: "PHP Course",
    price: "1500"
  });

  //GET Query ==> GetAllCourses
  const data = await collection.find().toArray();
  console.log("CollectionData:", data);
};

main();
