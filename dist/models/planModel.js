"use strict";
// import mongoose, { Schema, Document } from "mongoose";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.planModel = void 0;
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
const mongoose_1 = __importStar(require("mongoose"));
const IPlanSchema = new mongoose_1.Schema({
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
exports.planModel = mongoose_1.default.model("plan", IPlanSchema);
