var app = require('express')();
var http = require('http').Server(app);

var io = require('socket.io')(http);

var usocket = []; //全局变量

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
})

io.on('connection', function(socket) {
    console.log('a user connect')

    // 监听join事件
    socket.on('join', function(name) {
        usocket[name] = socket;
        io.emit('join', name)
    })

    socket.on('message', function(msg) {
        io.emit('message', msg)
    })
})

http.listen(3000, function() {
    console.log('listening on *: 3000')
})