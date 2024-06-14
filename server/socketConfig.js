import { Server } from "socket.io"

const io = new Server()

io.of('/multiplayer').on('connection', (socket) => {
    console.log('a user connected');
    
    socket.on('disconnect', () => {
        socket.leaveAll()
        console.log('user disconnected');
    });
    
    socket.on('message', (msg) => {
        console.log('message: ' + msg);
    })

    socket.on('joinRoom', (room) => {
        socket.join(room)
        console.log(`User ${socket.id} joined room ${room}`)
    })

    socket.on('leaveRoom', (room) => {
        socket.leave(room)
        console.log(`User ${socket.id} left room ${room}`)
    })

    socket.on("createRoom" , () => {
        let room = `room${Math.floor(Math.random() * 1000)}`
        socket.join(room)
        console.log(`User ${socket.id} created room ${room}`)
    })

    socket.on("chat", (msg) => {
        let room = socket.rooms.values()
        room.next()
        room = room.next().value
        console.log(room)
        io.of('/multiplayer').to(room).emit("message" , msg)
    })

    socket.emit("ID" , socket.id)
})

async function getRooms(){
    let map = io.of('/multiplayer').adapter.rooms

    let rooms = []

    map.forEach((set , room) => {
        if (/room(\d)+/.test(room)){
            let users = []
            set.forEach((id) => {
                users.push(id)
            })
            rooms.push({room , users : users})
        }
    })


    return rooms
}

export {io , getRooms} 