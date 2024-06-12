import express from 'express'
import http from 'http'
import { Server } from 'socket.io'
import Battle from './battle'

const app = express()
const server = http.createServer(app)
const io = new Server(server)

const PORT = process.env.PORT || 3000
const battles = []

io.on('connection', (socket) => {
  console.log('client connected')
  
  socket.on('message', (data) => {
    console.log(data)
  })

  socket.on('disconnec', () => {
    console.log('client disconnected')
  })
})

server.listen(PORT, () => {
  console.log('Server on port', PORT)
})