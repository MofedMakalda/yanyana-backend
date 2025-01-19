import mongoose, {Schema, Document} from "mongoose";
export interface IHotel extends Document{
 _id: mongoose.Types.ObjectId; // Ensure _id is included
hotelname:string;
nightpackage:string;
price: string;
address: string;
hotelImages: string[];
departure:string;
arrival: string;
}
export interface ICity extends Document{
    _id: mongoose.Types.ObjectId; // Ensure _id is included
    cityname:string;
    cityImage?: string;
    description?:string;
    hotels: IHotel[];

    }
    const hotelSchema= new Schema <IHotel>({
        hotelname: {type: String, required:true},
        nightpackage:{type:String, required:true},
        price:{type:String, required:true},
        address:{type:String, required:true},
        departure:{type:String, required:true},
        arrival:{type:String, required:true},
        hotelImages:{type:[String], required:true},
    })
const citySchema= new Schema <ICity>({
    cityname: {type:String, required:true},
    cityImage: {type:String, required:true},
    description: {type:String, required:true},
    hotels: { type: [hotelSchema], required: true },
})
const cityModel = mongoose.model<ICity>('cities', citySchema);

export default cityModel;

