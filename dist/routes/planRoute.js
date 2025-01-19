"use strict";
// import express from "express"
// import { Request, Response } from 'express';
// import { addPlan, deletePlan, getAllPlans } from "../services/planService";
// import { planModel } from "../models/planModel";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const router= express.Router();
// router.post('/', async (req , res)=>{
//   const { fullName, email, city, hotel,feedback ,adults, childs, infants, startDate, endDate,countryCode,phoneNumber } = req.body;
//   try {
//      // Call the addCity function
//       const { data, statusCode } = await addPlan({fullName, email, city, hotel , feedback,adults,childs, infants,startDate,endDate,countryCode,phoneNumber });
//       res.status(statusCode).json(data);
//     } catch (error) {
//       // Handle any errors from addCity
//       res.status(500).json('Server error');
//     }
//   });
//     router.get('/', async (req, res)=>{
//       const {data, statusCode} = await getAllPlans();
//       res.status(statusCode).json(data) 
//      })  
//     router.delete('/:id', async (req: Request, res: Response)=>{
//       const {id}= req.params;
//       try {
//         const {data, statusCode} = await deletePlan(id);
//         res.status(statusCode).json(data);
//       } catch (error) {
//         res.status(500).json('Server error');
//       }    
//      })   
// export default router;
const express_1 = __importDefault(require("express"));
const planService_1 = require("../services/planService");
const planModel_1 = require("../models/planModel");
const router = express_1.default.Router();
// Add Plan Route
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { fullName, email, city, hotel, feedback, adults, childs, infants, startDate, endDate, countryCode, phoneNumber, } = req.body;
    try {
        // Call the addPlan function
        const { data, statusCode } = yield (0, planService_1.addPlan)({
            fullName,
            email,
            city,
            hotel,
            feedback,
            adults,
            childs,
            infants,
            startDate,
            endDate,
            countryCode,
            phoneNumber,
        });
        res.status(statusCode).json(data);
    }
    catch (error) {
        res.status(500).json("Server error");
    }
}));
// Get All Plans Route
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { data, statusCode } = yield (0, planService_1.getAllPlans)();
    res.status(statusCode).json(data);
}));
// Delete Plan Route
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const { data, statusCode } = yield (0, planService_1.deletePlan)(id);
        res.status(statusCode).json(data);
    }
    catch (error) {
        res.status(500).json("Server error");
    }
}));
// Get Plan Messages Route
router.get("/:id/messages", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const plan = yield planModel_1.planModel.findById(id);
        if (!plan) {
            return res.status(404).json("Plan not found");
        }
        res.status(200).json(plan.messages);
    }
    catch (error) {
        res.status(500).json("Server error");
    }
}));
// Send Admin Response Route (Updated)
router.post("/:id/messages", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { message } = req.body;
    try {
        const { data, statusCode } = yield (0, planService_1.sendAdminResponse)(id, message);
        res.status(statusCode).json(data);
    }
    catch (error) {
        res.status(500).json("Server error");
    }
}));
exports.default = router;
