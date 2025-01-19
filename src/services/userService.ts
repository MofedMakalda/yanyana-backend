import { userModel } from "../models/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"


interface RegisterParams {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

export const register = async ({
  firstname,
  lastname,
  email,
  password,
}: RegisterParams) => {
  const findUser = await userModel.findOne({ email });

  if (findUser) {
    return { data: "User Already Exists", statusCode:400 } ;
  }

  const hashedPassword= await bcrypt.hash(password, 10)
  const newUser = new userModel({ email, password:hashedPassword, firstname, lastname });
  await newUser.save();

  return { data: generateJWT({email, firstname, lastname}), statusCode:200 } ;
};

interface LoginParams {
  email: string;
  password: string;
}

export const login = async ({ email, password }: LoginParams) => {
  const findUser = await userModel.findOne({ email });
  if (!findUser) {
    return { data: "Incorrect email or password!", statusCode:400 } ;
  }

  const passwordMatch = await bcrypt.compare(password, findUser.password);
  if (passwordMatch) {
    return { data: generateJWT({email, firstname:findUser.firstname, lastname:findUser.lastname}), statusCode:200 } ;
  }
  return { data: "Incorrect email or password!", statusCode:400 } ;
};

const generateJWT = (data: any)=>{
    return jwt.sign(data, "OMqfPcOo3umFwxCTrohQZpJKRtkyczc9" )
   }