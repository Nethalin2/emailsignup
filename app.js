// const faker = require ("faker");
const mysql = require("mysql");
const { promisify } = require ("util");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "getEmail"
})

//promisify the connection

const promisifedQuery = promisify(connection.query).bind(connection);



const runQuery = async () => {
    try {
        let queryString = "select count(*) as count from users;"
        let data = await promisifedQuery(queryString);
        return data;
    } catch (error) {
        return (error.sqlMessage);
    }
    connection.end()
}


const addEmail = async (email) => {
    try {
        //wait for the promise to be handled before trying to log the data
        const queryStringAdd = `INSERT INTO users(email) VALUES ?('${email}')`;
        let data = await promisifedQuery(queryStringAdd)
        return data;

    } catch (error){
       return error.sqlMessage;
    }
};



// const bulkAdd = () => {
//     let people = [];
//     for (i=0; i < 500; i++) {
//         people.push([faker.internet.email(), faker.date.past()])
//     }
//     return people
// }

module.exports ={runQuery, addEmail}