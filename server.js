const { runQuery, addEmail } = require("./app")

const express = require('express')
const path = require('path')
const server = express()
const port = 3002

server.use(express.static(path.join(__dirname, "public")))

server.get("/data", async (req, res) =>{
    const data = await runQuery();
    console.log(data);

    res.send ({
        data: data
    });
});

server.get('/', (req, res) => {res.send('Hello World!')});

server.listen(port, () => console.log(`Example app listening on port ${port}!`))