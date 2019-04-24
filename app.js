var express = require('express');
const bodyParser = require('body-parser');
var db = require('./db');


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true,
}));

app.get('/', (request, response) => {
    response.send({
        message: 'Node.js and Express REST API'
    });
});

const server = app.listen(port, (error) => {
    if(error)
    {
        return console.log(`Error: ${error}`);
        console.log(`Server listening on port ${server.address().PORT}`);
    }
})

app.get('/api/v1/todos', (req, res) => {
    res.status(200).send({
        success: 'true',
        message: 'todos retrieved successfully',
        todos: db
    })
});

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});
