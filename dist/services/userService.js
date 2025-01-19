"use strict";
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
exports.login = exports.register = void 0;
const userModel_1 = require("../models/userModel");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const register = (_a) => __awaiter(void 0, [_a], void 0, function* ({ firstname, lastname, email, password, }) {
    const findUser = yield userModel_1.userModel.findOne({ email });
    if (findUser) {
        return { data: "User Already Exists", statusCode: 400 };
    }
    const hashedPassword = yield bcrypt_1.default.hash(password, 10);
    const newUser = new userModel_1.userModel({ email, password: hashedPassword, firstname, lastname });
    yield newUser.save();
    return { data: generateJWT({ email, firstname, lastname }), statusCode: 200 };
});
exports.register = register;
const login = (_a) => __awaiter(void 0, [_a], void 0, function* ({ email, password }) {
    const findUser = yield userModel_1.userModel.findOne({ email });
    if (!findUser) {
        return { data: "Incorrect email or password!", statusCode: 400 };
    }
    const passwordMatch = yield bcrypt_1.default.compare(password, findUser.password);
    if (passwordMatch) {
        return { data: generateJWT({ email, firstname: findUser.firstname, lastname: findUser.lastname }), statusCode: 200 };
    }
    return { data: "Incorrect email or password!", statusCode: 400 };
});
exports.login = login;
const generateJWT = (data) => {
    return jsonwebtoken_1.default.sign(data, "OMqfPcOo3umFwxCTrohQZpJKRtkyczc9");
};
