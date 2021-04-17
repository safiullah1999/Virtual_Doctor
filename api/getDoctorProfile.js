const express = require('express');
const router = express.Router();
const { Client } = require('pg')
var client;
createnewclient();


//api that give the information of the doctor specifed by id from query strings


router.get('/getDoctorProfile', function (req, res) {

  client.connect()
    .then(console.log("connected successfully"))
    .then(() => client.query("Select * from doctor where doctor_id = $1", [req.query.id]))
    .then((results) => res.send(results.rows))
    .then((() => client.end()))
    .then(() => console.log("client disconnected!"))
    .then(() => createnewclient())

    .catch(function (e) {
      client.end().then(
        res.send({ err: e.message }))
        .then(createnewclient());

    });


});
module.exports = router;

async function createnewclient() {
  client = await new Client({
    user: "postgres",
    password: "taha1",
    host: "127.0.0.1",
    port: 5432,
    database: "postgres"
  });
}
