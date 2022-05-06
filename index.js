const express = require('express');
const app = express();
var cors = require('cors')
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

//userDb
//vsIZ5rhpD1h3oPl3


const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.USER_PASSWORD}@cluster0.mbcbq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        const inventoryCollection = client.db("homeReserve").collection("inventories");

        //get all data
        //http://localhost:5000/inventory
        app.get('/inventory', async (req, res) => {
            const query = req.body;
            const cursor = inventoryCollection.find(query);
            const result = await cursor.toArray();
            res.send(result);
        })

        //get a single data



        // post data


        console.log('connected to the database');
    }
    finally { }
}

run().catch(console.dir);
// client.connect(err => {
//     const collection = client.db("test").collection("devices");
//     console.log('connected to the database');
// perform actions on the collection object
//   client.close();
// });

app.get('/', (req, res) => {
    res.send('server is running');
})

app.listen(port, (req, res) => {
    console.log('listening the port', port);
})