// import { planModel } from "../models/planModel";
// import nodemailer from 'nodemailer';

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
//---------------------------------------------------------------------
// import SibApiV3Sdk from "sib-api-v3-sdk";
// import { planModel } from "../models/planModel";
// import dotenv from "dotenv";

// // Load environment variables
// dotenv.config();

// // Initialize Brevo (Sendinblue) client
// const brevoClient = SibApiV3Sdk.ApiClient.instance as any;
// const apiKey = brevoClient.authentications['api-key'];
// apiKey.apiKey = process.env.BREVO_API_KEY;
// const transactionalEmailsApi = new SibApiV3Sdk.TransactionalEmailsApi() as any;

// interface AddPlanParams {
//   fullName: string;
//   email: string;
//   city: string;
//   hotel: string;
//   feedback: string;
//   adults: string;
//   childs: string;
//   infants: string;
//   startDate: string;
//   endDate: string;
//   countryCode: string;
//   phoneNumber: string;
// }

// // Add Plan Function
// export const addPlan = async ({
//   fullName,
//   email,
//   city,
//   hotel,
//   feedback,
//   adults,
//   childs,
//   infants,
//   startDate,
//   endDate,
//   countryCode,
//   phoneNumber,
// }: AddPlanParams) => {
//   try {
//     // Validate input fields
//     if (
//       !fullName ||
//       !email ||
//       !city ||
//       !hotel ||
//       !adults ||
//       !childs ||
//       !infants ||
//       !startDate ||
//       !endDate ||
//       !countryCode ||
//       !phoneNumber
//     ) {
//       return { data: "Invalid input", statusCode: 404 };
//     }

//     // Save the new plan to MongoDB
//     const newPlan = new planModel({
//       fullName,
//       email,
//       city,
//       hotel,
//       feedback,
//       adults,
//       childs,
//       infants,
//       startDate,
//       endDate,
//       countryCode,
//       phoneNumber,
//       messages: [
//         {
//           sender: "user",
//           message: "User has submitted their trip details.",
//           timestamp: new Date(),
//         },
//       ],
//     });
//     await newPlan.save();

//     // Email details to notify the admin
//     const emailContent = {
//       sender: { name: fullName, email }, // User as the sender
//       to: [{ email: "mofedmk1@gmail.com", name: "Admin" }], // Admin email
//       subject: "New Plan Submitted",
//       htmlContent: `  
//         <p>A new plan has been submitted with the following details:</p>
//         <ul>
//           <li>Full Name: ${fullName}</li>
//           <li>Email: ${email}</li>
//           <li>City: ${city}</li>
//           <li>Hotel: ${hotel}</li>
//           <li>Feedback: ${feedback}</li>
//           <li>Adults: ${adults}</li>
//           <li>Children: ${childs}</li>
//           <li>Infants: ${infants}</li>
//           <li>Start Date: ${startDate}</li>
//           <li>End Date: ${endDate}</li>
//           <li>Phone: ${countryCode} ${phoneNumber}</li>
//         </ul>`,
//       replyTo: email, // User's email as the reply-to address
//     };

//     // Send email using Brevo
//     try {
//       const response = await transactionalEmailsApi.sendTransacEmail(emailContent);
//       console.log("Email sent to admin successfully:", response);
//     } catch (emailError) {
//       console.error("Error sending email to admin:", emailError);
//     }

//     return { data: newPlan, statusCode: 200 };
//   } catch (error) {
//     throw new Error("Error adding a Plan form");
//   }
// };

// // Get All Plans Function
// export const getAllPlans = async () => {
//   try {
//     const plans = await planModel.find();
//     return { data: plans, statusCode: 200 };
//   } catch (error) {
//     throw new Error("Error fetching the Plans");
//   }
// };

// // Delete Plan Function
// export const deletePlan = async (planId: string) => {
//   try {
//     const deletedPlan = await planModel.findByIdAndDelete(planId);
//     if (!deletedPlan) {
//       return { data: "Plan not found", statusCode: 404 };
//     }
//     return { data: "Plan deleted successfully", statusCode: 200 };
//   } catch (error) {
//     throw new Error("Error deleting the plan");
//   }
// };

// // Send Admin Response Function
// export const sendAdminResponse = async (planId: string, message: string) => {
//   try {
//     const plan = await planModel.findById(planId);
//     if (!plan) {
//       return { data: "Plan not found", statusCode: 404 };
//     }

//     // Add the admin's response to the plan's messages array
//     plan.messages.push({
//       sender: "admin",
//       message,
//       timestamp: new Date(),
//     });
//     await plan.save();

//     // Email details for user notification
//     const emailContent = {
//       sender: { name: "Admin", email: "mofedmk1@gmail.com" },  // Your verified email
//       to: [{ email: plan.email, name: plan.fullName }], // User email
//       subject: "Response to Your Trip Plan Inquiry",
//       htmlContent: `  
//         <p>Hello ${plan.fullName},</p>
//         <p>The admin has responded to your trip plan submission:</p>
//         <blockquote>${message}</blockquote>
//         <p>Best regards,</p>
//         <p>Admin</p>
//       `,
//       replyTo: {
//         email: "mofedmk1@gmail.com",
//         name: "Admin"
//       }, // Ensure the replyTo is properly formatted
//     };

//     // Send email using Brevo
//     try {
//       const response = await transactionalEmailsApi.sendTransacEmail(emailContent);
//       console.log("Response sent to user successfully:", response);
//     } catch (emailError) {
//       console.error("Error sending email to user:", emailError);
//     }

//     return { data: "Response sent successfully", statusCode: 200 };
//   } catch (error) {
//     throw new Error("Error sending admin response");
//   }
// };
