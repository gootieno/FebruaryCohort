// Your code here
const http = require('http')

const server = http.createServer((req, res) =>  {
    //server code here
})

const port = 5000;

server.listen(port, () => console.log('Server is listening on port', port));