const io = require("socket.io")()
let connections = []
let availableUsers = []
let socketApi = {}

io.on("connection", socket => {
    console.log("a user connected")
    connections.push(socket.id)
    
    socket.on("join", (user, room) => {
        socket.join(room)
        console.log(`${user} joined room ${room}`)
        socket.emit("getChatHistory")
    })
    socket.on("login", (username) => {
        availableUsers.push(username)
    })
    socket.on("getAvailableUsers", (room) => {
        socket.emit("availableUsers", connections)
    })
    socket.off("disconnect", () => {
        console.log("user disconnected:", socket.id)
        const index = connections.findIndex(i => i === socket.id)
        connections.splice(index, 1)
    })
    socket.on("message", (message, room, user) => {
        io.to(room).emit("new message", message, user)
    })

})

socketApi.io = io

module.exports = socketApi