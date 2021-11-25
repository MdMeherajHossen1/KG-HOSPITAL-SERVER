const express = require('express');
const app = express();
const { MongoClient } = require('mongodb');
const port = process.env.PORT || 5000;
const cors = require('cors');
require('dotenv').config()
const ObjectId = require('mongodb').ObjectId;

// middleware
app.use(cors());
app.use(express.json())

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.vtipi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
console.log(uri)
async function run() {

    try {
        await client.connect();
        const database = client.db('kg_hospital');
        const servicesCollection = database.collection('services');
        const doctorsCollection = database.collection('doctors');
        const appiontmentCollection = database.collection('appiontment')

        app.get('/services', async (req, res) => {
            const result = await servicesCollection.find({}).toArray();
            res.json(result)
        })

        app.get('/doctors', async (req, res) => {
            const result = await doctorsCollection.find({}).toArray();
            res.json(result)
        })


    }
    finally {

    }
}

run().catch(console.dir)


app.get('/', (req, res) => {
    res.send('KG Hospital Server is Online')
})

app.listen(port, () => {
    console.log('Port is running on ', port)
})