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
exports.authService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../errorHandler/ApiError"));
const user_model_1 = require("../user/user.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const commonFunction_1 = require("../../shared/commonFunction");
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = payload;
    const isUserExist = yield user_model_1.User.isUserExist(email);
    if (!isUserExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Wrong user or password ");
    }
    const response = {
        email: isUserExist.email,
        role: isUserExist.role,
        _id: isUserExist._id,
    };
    const passwordMatched = yield bcrypt_1.default.compare(password, isUserExist.password);
    if (!passwordMatched) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "Password is incorrect");
    }
    const accessToken = (0, commonFunction_1.generateAccessToken)(response);
    const refreshToken = (0, commonFunction_1.generateRefreashToken)(response);
    return {
        accessToken,
        refreshToken,
        user: response,
    };
});
const refreshToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    let verifiedToken = null;
    try {
        // verify refresh token
        verifiedToken = (0, commonFunction_1.verifyRefreshToken)(token);
    }
    catch (error) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, "User is not authorized");
    }
    const { email } = verifiedToken;
    const isUserExist = yield user_model_1.User.isUserExist(email);
    if (!isUserExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "User is not exist");
    }
    const newAccessToken = (0, commonFunction_1.generateAccessToken)({
        email: isUserExist.email,
        role: isUserExist.role,
        name: isUserExist.name,
    });
    return {
        accessToken: newAccessToken,
    };
});
exports.authService = {
    loginUser,
    refreshToken,
};
