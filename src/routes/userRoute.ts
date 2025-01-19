import express from "express" 
import mongoose from "mongoose" 
import { login, register } from "../services/userService";


const router = express.Router();
router.post('/register', async (req, res)=>{
    const {firstname, lastname, email, password} = req.body;
    const {statusCode, data} = await register ({firstname, lastname, email, password})
    res.status(statusCode).json(data)
})

router.post('/login', async (req, res)=>{
    const {email, password} = req.body;
    const {statusCode, data} = await login ({email, password})
    res.status(statusCode).json(data)
})


export default router;