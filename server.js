const express = require('express');
const app = express();
const port = 4000;
const ObjectId = require("mongodb").ObjectId;
const bodyParser = require('body-parser');

function getClient() {
    const { MongoClient, ServerApiVersion } = require('mongodb');
    const uri = "mongodb+srv://keseru15:b15J1BUsC4nOyNgY@cluster0.fqzmhls.mongodb.net/?retryWrites=true&w=majority";
    return new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
};

function getId(ID) {
    try {
        return ObjectId(ID);
    }
    catch (err) {
        return "";
    }
}

//GET---
app.get('/Irodaszerek', (req, res) => {
    const client = getClient();
    client.connect(async err => {
        const collection = client.db("my_app").collection("Irodaszerek");
        const Irodaszerek = await collection.find().toArray();
        if (!Irodaszerek) {
            res.send({ error: "not found" });
            return;
        }
        res.send(Irodaszerek)
        client.close();
    });

});

//GET BY ID---
app.get('/Irodaszerek/:id', (req, res) => {
    const id = getId(req.params.id);
    if (!id) {
        res.send({ error: "invalid id" });
        return;
    }

    const client = getClient();
    client.connect(async err => {
        const collection = client.db("my_app").collection("Irodaszerek");
        const Irodaszer = await collection.findOne({ _id: id });
        if (!Irodaszer) {
            res.send({ error: "not found" });
            return;
        }
        res.send(Irodaszer)
        client.close();
    });

});


//DELETE---
app.delete('/Irodaszerek/:id', (req, res) => {
    const id = getId(req.params.id);
    if (!id) {
        res.send({ error: "invalid id" });
        return;
    }

    const client = getClient();
    client.connect(async err => {
        const collection = client.db("my_app").collection("Irodaszerek");
        const Irodaszer = await collection.deleteOne({ _id: id });
        if (!Irodaszer.deletedCount) {
            res.send({ error: "not found" });
            return;
        }
        res.send(Irodaszer)
        client.close();
    });

});


//PUT/UPDATE---
app.put('/Irodaszerek/:id', bodyParser.json(), (req, res) => {

    const updatedProduct = {
        name: req.body.name,
        price: req.body.price,
        brand: req.body.brand
    };

    const id = getId(req.params.id);
    if (!id) {
        res.send({ error: "invalid id" });
        return;
    }

    const client = getClient();
    client.connect(async err => {
        const collection = client.db("my_app").collection("Irodaszerek");
        const Irodaszer = await collection.updateOne({ _id: id }, {$set: updatedProduct});
        if (!Irodaszer.modifiedCount) {
            res.send({ error: "not found" });
            return;
        }
        res.send(updatedProduct)
        client.close();
    });

});

//POST/CREATE--- 
app.post('/Irodaszerek', bodyParser.json(), (req, res) => {

    const newProduct = {
        name: req.body.name,
        price: req.body.price,
        brand: req.body.brand
    };

    const client = getClient();
    client.connect(async err => {
        const collection = client.db("my_app").collection("Irodaszerek");
        const Irodaszer = await collection.insertOne(newProduct);
        res.send(newProduct)
        client.close();
    });

});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})