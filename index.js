const express = require('express');
const app = express();
var cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.USER_PASSWORD}@cluster0.mbcbq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    await client.connect();
    const inventoryCollection = client
      .db('homeReserve')
      .collection('inventories');

    //get all data
    app.get('/inventory', async (req, res) => {
      const query = req.body;
      const cursor = inventoryCollection.find(query);
      const result = await cursor.toArray();
      res.send(result);
    });

    //get a single data
    app.get('/inventory/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await inventoryCollection.findOne(query);
      res.send(result);
    });

    //post data
    app.post('/inventory', async (req, res) => {
      const data = req.body;
      const result = await inventoryCollection.insertOne(data);
      res.send(result);
    });

    //update data
    app.put('/inventory/:id', async (req, res) => {
      const id = req.params.id;
      const updatedQuantity = Number(req.body.quantity);
      const query = { _id: ObjectId(id) };
      const options = { upsert: true };
      const updateDoc = {
        $set: {
          quantity: updatedQuantity,
        },
      };
      const result = await inventoryCollection.updateOne(
        query,
        updateDoc,
        options
      );
      res.send(result);
    });

    //delete a data
    app.delete('/inventory/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await inventoryCollection.deleteOne(query);
      res.send(result);
    });

    console.log('connected to the database');
  } finally {
  }
}

run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('server is running');
});

async function run() {
  try {
    await client.connect();
    const inventoryCollection = client
      .db('homeReserve')
      .collection('inventories');

    //get all data
    app.get('/inventory', async (req, res) => {
      const query = req.body;
      const cursor = inventoryCollection.find(query);
      const result = await cursor.toArray();
      res.send(result);
    });

    //get a single data
    app.get('/inventory/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await inventoryCollection.findOne(query);
      res.send(result);
    });

    //post data
    app.post('/inventory', async (req, res) => {
      const data = req.body;
      const result = await inventoryCollection.insertOne(data);
      res.send(result);
    });

    //update data
    app.put('/inventory/:id', async (req, res) => {
      const id = req.params.id;
      const updatedQuantity = Number(req.body.quantity);
      const query = { _id: ObjectId(id) };
      const options = { upsert: true };
      const updateDoc = {
        $set: {
          quantity: updatedQuantity,
        },
      };
      const result = await inventoryCollection.updateOne(
        query,
        updateDoc,
        options
      );
      res.send(result);
    });

    //delete a data
    app.delete('/inventory/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await inventoryCollection.deleteOne(query);
      res.send(result);
    });

    console.log('connected to the database');
  } finally {
  }
}

run().catch(console.dir);

app.listen(port, (req, res) => {
  console.log('listening the port', port);
});
