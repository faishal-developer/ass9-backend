"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculatePagination = exports.pick = exports.verifyRefreshToken = exports.verifyAccessToken = exports.generateRefreashToken = exports.generateAccessToken = exports.calcSkip = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config/config"));
const calcSkip = (page, limit) => {
    let newPage = Number(page || 1);
    let newLimit = Number(limit || 10);
    return {
        page: newPage,
        limit: newLimit,
        skip: (newPage - 1) * newLimit,
    };
};
exports.calcSkip = calcSkip;
const generateAccessToken = (payload) => {
    return jsonwebtoken_1.default.sign(payload, config_1.default.jwt.secret, {
        expiresIn: config_1.default.jwt.expires_in,
    });
};
exports.generateAccessToken = generateAccessToken;
const generateRefreashToken = (payload) => {
    return jsonwebtoken_1.default.sign(payload, config_1.default.jwt.refresh_secret, {
        expiresIn: config_1.default.jwt.refresh_expires_in,
    });
};
exports.generateRefreashToken = generateRefreashToken;
const verifyAccessToken = (token) => {
    return jsonwebtoken_1.default.verify(token, config_1.default.jwt.secret);
};
exports.verifyAccessToken = verifyAccessToken;
const verifyRefreshToken = (token) => {
    return jsonwebtoken_1.default.verify(token, config_1.default.jwt.refresh_secret);
};
exports.verifyRefreshToken = verifyRefreshToken;
const pick = (obj, keys) => {
    const finalObj = {};
    for (const key of keys) {
        if (obj && Object.hasOwnProperty.call(obj, key)) {
            finalObj[key] = obj[key];
        }
    }
    return finalObj;
};
exports.pick = pick;
const calculatePagination = (options) => {
    const page = Number(options.page || 1);
    const limit = Number(options.limit || 10);
    const skip = (page - 1) * limit;
    const sortBy = options.sortBy || "";
    const sortOrder = options.sortOrder || "desc";
    return {
        page,
        limit,
        skip,
        sortBy,
        sortOrder,
    };
};
exports.calculatePagination = calculatePagination;
