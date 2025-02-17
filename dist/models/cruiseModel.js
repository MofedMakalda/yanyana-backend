"use strict";
// import mongoose, { Schema, Document } from 'mongoose';
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
exports.CruiseModel = void 0;
// export interface ICruiseDetails extends Document {
//   _id: string
//   cruisename: string; // Add cruisename reference
//   destinations: string; // Add cruisename reference
//   nights: string; // Add cruisename reference
//   date: Date;         // Add date field
//   images: string [];
// }
// export interface ICruise extends Document {
//   month: string;
//   cruisedetails: ICruiseDetails[];
// }
// const CruiseDetailsSchema: Schema = new Schema({
//     images: { type: [String], required: true },
//     cruisename: { type: String, required: true }, // Reference the cruisename
//     destinations: { type: String, required: true }, // Reference the cruisename
//     nights: { type: String, required: true }, // Reference the cruisename
//     date: { type: Date, required: true },         // Date field
//   });
//   const CruiseSchema: Schema = new Schema({ 
//     month: { type: String, required: true },      
//     cruisedetails: [CruiseDetailsSchema],         
//   });
//   export const CruiseModel = mongoose.model<ICruise>('cruise', CruiseSchema);
const mongoose_1 = __importStar(require("mongoose"));
const CruiseDetailsSchema = new mongoose_1.Schema({
    mainImage: { type: [String], required: true },
    images: { type: [String], required: true },
    cruisename: { type: String, required: true }, // Reference the cruisename
    destinations: { type: String, required: true }, // Reference the cruisename
    nights: { type: String, required: true }, // Reference the cruisename
    date: { type: Date, required: true }, // Date field
});
const CruiseSchema = new mongoose_1.Schema({
    month: { type: String, required: true },
    cruisedetails: [CruiseDetailsSchema],
});
exports.CruiseModel = mongoose_1.default.model('cruise', CruiseSchema);
