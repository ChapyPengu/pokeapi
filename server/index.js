import express from 'express'
import http from 'http'
import {io} from './socketConfig.js'
import router from './multiplayer.routes'
import Battle from './battle.js'


const app = express()
const server = http.createServer(app)
io.attach(server)

const PORT = process.env.PORT
const battles = []

app.use("/" , router)

server.listen(PORT || 8000, (...things) => {
  console.log(things)
  console.log(process.cwd())
})