const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.z1jayhr.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
    try{
        //  const serviceCollection = client.db("Dentop").collection("Services");
        const menuCollection= client.db('coffeapp').collection("menu")
         app.get("/services", async (req, res) => {
            const query = {};
            const cursor = menuCollection.find(query);
            const services = await cursor.limit(3).toArray();
            res.send(services);
          });
         app.get("/allservices", async (req, res) => {
            const query = {};
            const cursor = menuCollection.find(query);
            const allservices = await cursor.toArray();
            res.send(allservices);
          });

          //load single service
    app.get("/menu/:title", async (req, res) => {
        const title = req.params.title;
        const query = { title: title };
        const menu = await menuCollection.findOne(query);
        res.send(menu);
      });
    }
    finally{

    }
}

run().catch((err) => console.log(err));

app.get("/", (req, res) => {
    res.send({ running: "true" });
  });
  
  app.listen(port, () => {
    console.log(`server running on port ${port}`);
  });