import { Router } from "express";
import {getRooms} from "./socketConfig.js"

const router = Router()
export default router

router.get("/" , (req, res) => {
  res.sendFile("/client/index.html" , { root: process.cwd()})
})

router.get("/multiplayer" , async (req, res) => {
    res.sendFile("/client/multiplayer.html" , { root: process.cwd()})
    })

router.get("/rooms" , async (req, res) => {
    let rooms = await getRooms()
    res.header("Content-Type" , "application/json").send(rooms)
})