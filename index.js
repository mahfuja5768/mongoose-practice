const express = require("express");
const mongoose = require("mongoose");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const app = express();
app.use(express.json());
const todoHandler = require("./routeHandler/todoHandler");

//database connection with mongoose
mongoose
  .connect(
    "mongodb+srv://Puser:NI2PNDReQ4Q3T6I1@cluster0.mz3fw7v.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("connection successful"))
  .catch((err) => console.log(err));

app.use("/todo", todoHandler);

function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }
  res.status(500).json({ error: err });
}

const uri =
  "mongodb+srv://Puser:NI2PNDReQ4Q3T6I1@cluster0.mz3fw7v.mongodb.net/?retryWrites=true&w=majority";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    const userCollection = client.db("todos").collection("users");

    app.post("/", async (req, res) => {
      const order = req.body;
      const result = await userCollection.insertOne(order);
      console.log(result);
      res.send(result);
    });
  } finally {
  }
}

run().catch((error) => console.log(error));
const port = 8000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
