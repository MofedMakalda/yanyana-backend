
  
// import mongoose, { Schema, Document } from 'mongoose';

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
  

  
import mongoose, { Schema, Document } from 'mongoose';

export interface ICruiseDetails extends Document {
  _id: string
  cruisename: string; // Add cruisename reference
  destinations: string; // Add cruisename reference
  nights: string; // Add cruisename reference
  date: Date;         // Add date field
  images: string [];
  mainImage:string[];
 
}

export interface ICruise extends Document {
  month: string;
  cruisedetails: ICruiseDetails[];
}
const CruiseDetailsSchema: Schema = new Schema({
    mainImage: { type: [String], required: true },      
    images: { type: [String], required: true },
    cruisename: { type: String, required: true }, // Reference the cruisename
    destinations: { type: String, required: true }, // Reference the cruisename
    nights: { type: String, required: true }, // Reference the cruisename
    date: { type: Date, required: true },         // Date field
  });
  
  const CruiseSchema: Schema = new Schema({ 
    month: { type: String, required: true },      
    cruisedetails: [CruiseDetailsSchema],         
  });
  
  export const CruiseModel = mongoose.model<ICruise>('cruise', CruiseSchema);
  