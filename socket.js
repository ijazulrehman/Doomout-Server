var Validation = require('./models/validation');
//globalized beacause will be used frequently and out of any scope;
global.sockets = [];
global.reserves = [];

module.exports = {
    start: function(io) {
        io.on("connection", function(socket) {
            console.log('user connected');
            // if (socket.handshake.query.mac) {
            //     let mac_addr = socket.handshake.query.mac;
            //     global.keys[socket.id] = mac_addr;
            //     global.sockets[mac_addr] = socket.id; 
            //     console.log(global.sockets[0]);
            //   }
            addSocket(socket.id, global.sockets);
            //manage reserved messages
            sendReserve(socket.id, global.reserves, "new-validation");            

          
            //status of message is changed
            socket.on('status-change', data => {
                 changeValidationStatus(data._id, data.status);
            })

            //user disconnected event handler
            socket.on("disconnect", function() {
                console.log("disconnect");
                removeSocket(socket.id, global.sockets)
                // mac_addr = keys[socket.id];
                // delete global.sockets[mac_addr];
                // delete global.keys[socket.id];
                
            });
 
            global.io = io;
        });
    }
}

global.newValidation = function(_id, number, code, country) {
     let data = {
        type: "new-validation",
        _id: _id,
        number: number,
        code: code,
        country: country
      }
    let socket = global.sockets[0];
    if(socket){
        sendToUser(socket, global.io, "new-validation", data)
    }else{
       global.reserves.push(data);
    }
}


function sendToUser(socket, io, event, data) {
    io.to(socket).emit(event, data);
}

function addSocket(socket_id, sockets){
    sockets.push(socket_id)
}

function removeSocket(socket_id, sockets){
    let index = sockets.indexOf(socket_id);
    sockets.splice(index, 1);
}

function changeValidationStatus(validation_id, status){
    Validation.updateStatus(validation_id, status, function(err, validation){
        if(err) throw err;
    })
}

function sendReserve(socket, reserves, event){
   reserves.forEach(reserve => {
      sendToUser(socket, global.io, event, reserve);
   });
   resetReserve()
}

function resetReserve(){
    global.reserves = [];
}