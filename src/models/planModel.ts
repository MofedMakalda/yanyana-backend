// import mongoose, { Schema, Document } from "mongoose";

// export interface IPlan extends Document {
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
// }

// const IPlanSchema : Schema = new Schema({
// fullName:{type:String, required: true},
// email:{type:String, required: true},
// city:{type:String, required: true},
// hotel:{type:String, required: true},
// feedback:{type:String, required: true},
// adults:{type:String, required: true},
// childs:{type:String, required: true},
// infants:{type:String, required: true},
// startDate:{type:String, required: true},
// endDate:{type:String, required: true},
// countryCode:{type:String, required: true},
// phoneNumber:{type:String, required: true}
// })

// export const  planModel = mongoose.model<IPlan> ('plan',IPlanSchema) ;

import mongoose, { Schema, Document } from "mongoose";

export interface IMessage {
  sender: "admin" | "user";
  message: string;
  timestamp: Date;
}

export interface IPlan extends Document {
  fullName: string;
  email: string;
  city: string;
  hotel: string;
  feedback: string;
  adults: string;
  childs: string;
  infants: string;
  startDate: string;
  endDate: string;
  countryCode: string;
  phoneNumber: string;
  messages: IMessage[];  // New field for storing chat messages
}

const IPlanSchema: Schema = new Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  city: { type: String, required: true },
  hotel: { type: String, required: true },
  feedback: { type: String, required: true },
  adults: { type: String, required: true },
  childs: { type: String, required: true },
  infants: { type: String, required: true },
  startDate: { type: String, required: true },
  endDate: { type: String, required: true },
  countryCode: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  messages: [{ sender: { type: String, enum: ['admin', 'user'], required: true }, message: { type: String, required: true }, timestamp: { type: Date, default: Date.now } }],
});

export const planModel = mongoose.model<IPlan>("plan", IPlanSchema);
