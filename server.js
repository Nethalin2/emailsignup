const { runQuery, addEmail } = require("./app")
var bodyParser = require("body-parser")

const express = require('express')
const path = require('path')
const server = express()
const port = 3002

server.use(express.static(path.join(__dirname, "public")))
server.use(bodyParser.urlencoded({ extended: false}))
server.use(bodyParser.json())

server.get("/data", async (req, res) =>{
    const data = await runQuery();
    console.log(data);

    res.send ({
        data: data[0].total
    });
});

server.post("/register", (req, res) => {
    addEmail(req.body.email);

    console.log(req.body);
    res.send("POST request to the homepage");
})

server.get('/', (req, res) => {res.send('Hello World!')});

server.listen(port, () => console.log(`Example app listening on port ${port}!`))