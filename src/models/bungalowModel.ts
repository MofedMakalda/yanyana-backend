import mongoose, {Schema, Document} from "mongoose";

export interface Bungalow extends Document {
location: string,
capacity: string,
bungalowImages: string [],
}

const bungalowSchema = new Schema <Bungalow>({
    location:{type: String, required:true},
    capacity:{type: String, required:true},
    bungalowImages:{type: [String], required:true}
})

const bungalowModel= mongoose.model<Bungalow>('bungalows', bungalowSchema);
export default bungalowModel;


