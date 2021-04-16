const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const ObjectId = require('mongodb').ObjectID;

require('dotenv').config()

const app = express()
app.use(cors());
app.use(bodyParser.json());
const port = process.env.PORT || 5000

const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.0v4f5.mongodb.net/cleaningAuthority?retryWrites=true&w=majority`;
console.log(uri)
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    console.log(err)
  const collection = client.db("cleaningAuthority").collection("Order");
  // perform actions on the collection object
  //client.close();


  const Orders = client.db("creativeAgency").collection("OrderInfo");
  const Reviews = client.db("cleaningAuthority").collection("Reviews");
  const Admins = client.db("cleaningAuthority").collection("Admin");
  const Services = client.db("cleaningAuthority").collection("Services");
  
 
  app.post('/NewOrder' , (req , res) =>{
    const allOrder = req.body;
    Orders.insertOne(allOrder)
    .then(result => {
      res.send(result.insertedCount > 0)
    })
  })

    app.get('/review', (req, res) => {
      Orders.find({ email: req.query.email})
      .toArray((err , documents)=>{
          res.send(documents)
      })
  })

  
  app.get("/getCustomerOrder", (req, res) =>{
    Orders.find({})
    .toArray((err, documents) =>{
      res.send(documents);
    })
  })

  
  app.post('/addReview' , (req , res) =>{
    const allReview = req.body;
    Reviews.insertOne(allReview)
    .then(result => {
      res.send(result.insertedCount > 0)
    })
  })
  
  app.get('/reviews', (req, res) => {
      Reviews.find({})
      .toArray((err, documents) => {
          res.send(documents);
      })
    })

  
  app.post("/addEmail", (req, res)=>{
    const Email = req.body;
    Admins.insertOne(Email)
    .then(result =>{
        res.send(result.insertedCount > 0)
    })
  })

  
    app.get("/getEmail", (req, res) =>{
    Admins.find({email: req.query.email})
    .toArray((err, documents) =>{
      res.send(documents);
    })
  })

  
  app.post('/addService' , (req , res) =>{
    const allOrder = req.body;
    Services.insertOne(allOrder)
    .then(result => {
      res.send(result.insertedCount > 0)
    })
  })
  
  
  app.get("/getService", (req, res) =>{
    Services.find({})
    .toArray((err, documents) =>{
      res.send(documents);
    })
  })


});

app.get('/', (req, res) => {
    res.send('Assalamualaikum from AllOver The World!')
  })

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
    })