// import express from "express"
// import { Request, Response } from 'express';
// import { addPlan, deletePlan, getAllPlans } from "../services/planService";
// import { planModel } from "../models/planModel";

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

import express from "express";
import { Request, Response } from "express";
import { addPlan, deletePlan, getAllPlans, sendAdminResponse } from "../services/planService";
import { planModel } from "../models/planModel";

const router = express.Router();

// Add Plan Route
router.post("/", async (req, res) => {
  const {
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
  } = req.body;
  try {
    // Call the addPlan function
    const { data, statusCode } = await addPlan({
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
  } catch (error) {
    res.status(500).json("Server error");
  }
});

// Get All Plans Route
router.get("/", async (req, res) => {
  const { data, statusCode } = await getAllPlans();
  res.status(statusCode).json(data);
});

// Delete Plan Route
router.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const { data, statusCode } = await deletePlan(id);
    res.status(statusCode).json(data);
  } catch (error) {
    res.status(500).json("Server error");
  }
});

// Get Plan Messages Route
router.get("/:id/messages", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const plan = await planModel.findById(id);
    if (!plan) {
      return res.status(404).json("Plan not found");
    }
    res.status(200).json(plan.messages);
  } catch (error) {
    res.status(500).json("Server error");
  }
});

// Send Admin Response Route (Updated)
router.post("/:id/messages", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { message } = req.body;
  try {
    const { data, statusCode } = await sendAdminResponse(id, message);
    res.status(statusCode).json(data);
  } catch (error) {
    res.status(500).json("Server error");
  }
});

export default router;
