"use strict";
// import { planModel } from "../models/planModel";
// import nodemailer from 'nodemailer';
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
exports.sendAdminResponse = exports.deletePlan = exports.getAllPlans = exports.addPlan = void 0;
// interface AddPlanParams {
//     fullName:string,
//     email:string,
//     city:string,
//     hotel:string,
//     feedback:string,
//     adults:string,
//     childs:string,
//     infants:string,
//     startDate:string,
//     endDate:string,
//     countryCode:string,
//     phoneNumber:string,
//     }
// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: 'dedoshmk@gmail.com',  // Replace with your Gmail
//     pass: 'ptzy kskl ckko gfgb'     // Use App Password for security
//   },
// });
// export const addPlan = async ({ fullName, email, city, hotel, feedback, adults, childs, infants, startDate, endDate, countryCode, phoneNumber }: AddPlanParams) => {
//   try {
//     // Validate the input fields
//     if (!fullName || !email || !city || !hotel || !adults || !childs || !infants || !startDate || !endDate || !countryCode || !phoneNumber) {
//       return { data: 'Invalid input', statusCode: 404 };
//     }
//     // Save the new plan to MongoDB
//     const newPlan = new planModel({
//       fullName, email, city, hotel, feedback, adults, childs, infants, startDate, endDate, countryCode, phoneNumber
//     });
//     await newPlan.save();
//     // Email options
//     const mailOptions = {
//       from: 'dedoshmk@gmail.com',  // Sender email
//       to: 'makalda90@gmail.com',   // Admin email address
//       subject: 'New Plan Submitted',
//       text: `
//         A new plan has been submitted with the following details:
//         - Full Name: ${fullName}
//         - Email: ${email}
//         - City: ${city}
//         - Hotel: ${hotel}
//         - Feedback: ${feedback}
//         - Adults: ${adults}
//         - Children: ${childs}
//         - Infants: ${infants}
//         - Start Date: ${startDate}
//         - End Date: ${endDate}
//         - Phone: ${countryCode} ${phoneNumber}
//       `,
//     };
//     // Send the email using Nodemailer with error handling
//     try {
//       const info = await transporter.sendMail(mailOptions);
//       console.log('Email sent successfully:', info.response);
//     } catch (emailError) {
//       console.error('Error sending email:', emailError);
//     }
//     // Return the saved plan data
//     return { data: newPlan, statusCode: 200 };
//   } catch (error) {
//     throw new Error("Error adding a Plan form");
//   }
// };
// export const  getAllPlans = async () => {
//  try {
//   const Plans = await planModel.find();
//   return {data: Plans, statusCode:200}
//  } catch (error) {
//   throw new Error ('error fetching the Plans')
//  } 
// }
// export const deletePlan = async (planId:string) => {
//   try {
//   const deletedPlan = await planModel.findByIdAndDelete(planId);
//   if(!deletedPlan){
//     return {data:("plan not found"), statusCode:404};
//   }
//   return {data:("Plan deleted successfully"), statusCode:200};
// } catch (error) {
//   throw new Error('Error deleting the plan');
// }
// }
const planModel_1 = require("../models/planModel");
const SibApiV3Sdk = __importStar(require("sib-api-v3-sdk"));
const dotenv_1 = __importDefault(require("dotenv"));
// Load environment variables
dotenv_1.default.config();
// Initialize Brevo (Sendinblue) client
const brevoClient = SibApiV3Sdk.ApiClient.instance;
const apiKey = brevoClient.authentications['api-key'];
apiKey.apiKey = process.env.BREVO_API_KEY;
const transactionalEmailsApi = new SibApiV3Sdk.TransactionalEmailsApi();
// Add Plan Function
const addPlan = (_a) => __awaiter(void 0, [_a], void 0, function* ({ fullName, email, city, hotel, feedback, adults, childs, infants, startDate, endDate, countryCode, phoneNumber, }) {
    try {
        // Validate input fields
        if (!fullName ||
            !email ||
            !city ||
            !hotel ||
            !adults ||
            !childs ||
            !infants ||
            !startDate ||
            !endDate ||
            !countryCode ||
            !phoneNumber) {
            return { data: "Invalid input", statusCode: 404 };
        }
        // Save the new plan to MongoDB
        const newPlan = new planModel_1.planModel({
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
            messages: [
                {
                    sender: "user",
                    message: "User has submitted their trip details.",
                    timestamp: new Date(),
                },
            ],
        });
        yield newPlan.save();
        // Email details to notify the admin
        const emailContent = {
            sender: { name: fullName, email }, // User as the sender
            to: [{ email: "mofedmk1@gmail.com", name: "Admin" }], // Admin email
            subject: "New Plan Submitted",
            htmlContent: `  
        <p>A new plan has been submitted with the following details:</p>
        <ul>
          <li>Full Name: ${fullName}</li>
          <li>Email: ${email}</li>
          <li>City: ${city}</li>
          <li>Hotel: ${hotel}</li>
          <li>Feedback: ${feedback}</li>
          <li>Adults: ${adults}</li>
          <li>Children: ${childs}</li>
          <li>Infants: ${infants}</li>
          <li>Start Date: ${startDate}</li>
          <li>End Date: ${endDate}</li>
          <li>Phone: ${countryCode} ${phoneNumber}</li>
        </ul>`,
            replyTo: email, // User's email as the reply-to address
        };
        // Send email using Brevo
        try {
            const response = yield transactionalEmailsApi.sendTransacEmail(emailContent);
            console.log("Email sent to admin successfully:", response);
        }
        catch (emailError) {
            console.error("Error sending email to admin:", emailError);
        }
        return { data: newPlan, statusCode: 200 };
    }
    catch (error) {
        throw new Error("Error adding a Plan form");
    }
});
exports.addPlan = addPlan;
// Get All Plans Function
const getAllPlans = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const plans = yield planModel_1.planModel.find();
        return { data: plans, statusCode: 200 };
    }
    catch (error) {
        throw new Error("Error fetching the Plans");
    }
});
exports.getAllPlans = getAllPlans;
// Delete Plan Function
const deletePlan = (planId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedPlan = yield planModel_1.planModel.findByIdAndDelete(planId);
        if (!deletedPlan) {
            return { data: "Plan not found", statusCode: 404 };
        }
        return { data: "Plan deleted successfully", statusCode: 200 };
    }
    catch (error) {
        throw new Error("Error deleting the plan");
    }
});
exports.deletePlan = deletePlan;
// Send Admin Response Function
const sendAdminResponse = (planId, message) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const plan = yield planModel_1.planModel.findById(planId);
        if (!plan) {
            return { data: "Plan not found", statusCode: 404 };
        }
        // Add the admin's response to the plan's messages array
        plan.messages.push({
            sender: "admin",
            message,
            timestamp: new Date(),
        });
        yield plan.save();
        // Email details for user notification
        const emailContent = {
            sender: { name: "Admin", email: "mofedmk1@gmail.com" }, // Your verified email
            to: [{ email: plan.email, name: plan.fullName }], // User email
            subject: "Response to Your Trip Plan Inquiry",
            htmlContent: `  
        <p>Hello ${plan.fullName},</p>
        <p>The admin has responded to your trip plan submission:</p>
        <blockquote>${message}</blockquote>
        <p>Best regards,</p>
        <p>Admin</p>
      `,
            replyTo: {
                email: "mofedmk1@gmail.com",
                name: "Admin"
            }, // Ensure the replyTo is properly formatted
        };
        // Send email using Brevo
        try {
            const response = yield transactionalEmailsApi.sendTransacEmail(emailContent);
            console.log("Response sent to user successfully:", response);
        }
        catch (emailError) {
            console.error("Error sending email to user:", emailError);
        }
        return { data: "Response sent successfully", statusCode: 200 };
    }
    catch (error) {
        throw new Error("Error sending admin response");
    }
});
exports.sendAdminResponse = sendAdminResponse;
