
import mongoose,{Schema,Document} from "mongoose";

export interface IUser extends Document {
firstname:string;
lastname:string;
email:string;
password: string;
}

const userSchema = new Schema<IUser>({
    firstname:{type:String, required:true},
    lastname:{type:String, required:true},
    email:{type:String, required:true},
    password:{type:String, required:true}
})

export const userModel = mongoose.model<IUser>('user', userSchema)