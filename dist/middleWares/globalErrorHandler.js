"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorHandler = void 0;
const config_1 = __importDefault(require("../config/config"));
const zod_1 = require("zod");
const ApiError_1 = __importDefault(require("../errorHandler/ApiError"));
const handleValidationError_1 = require("../errorHandler/handleValidationError");
const handleZodError_1 = require("../errorHandler/handleZodError");
const handleCastError_1 = require("../errorHandler/handleCastError");
const globalErrorHandler = (error, req, res, next) => {
    config_1.default.env === "development"
        ? console.log("error occured")
        : console.log("should log error file");
    let statusCode = 500;
    let message = "Something went wrong!";
    let errorMessages = [];
    if ((error === null || error === void 0 ? void 0 : error.name) === "validationError") {
        ({ statusCode, message, errorMessages } = (0, handleValidationError_1.handleValidationError)(error));
    }
    else if (error instanceof zod_1.ZodError) {
        ({ statusCode, message, errorMessages } = (0, handleZodError_1.handleZodError)(error));
    }
    else if ((error === null || error === void 0 ? void 0 : error.name) === "castError") {
        ({ statusCode, message, errorMessages } = (0, handleCastError_1.handleCastError)(error));
    }
    else if (error instanceof ApiError_1.default) {
        statusCode = error === null || error === void 0 ? void 0 : error.statusCode;
        message = error.message;
        errorMessages = (error === null || error === void 0 ? void 0 : error.message)
            ? [
                {
                    path: "",
                    message: error === null || error === void 0 ? void 0 : error.message,
                },
            ]
            : [];
    }
    else if (error instanceof Error) {
        message = error === null || error === void 0 ? void 0 : error.message;
        errorMessages = (error === null || error === void 0 ? void 0 : error.message)
            ? [
                {
                    path: "",
                    message: error === null || error === void 0 ? void 0 : error.message,
                },
            ]
            : [];
    }
    res.status(statusCode).json({
        success: false,
        message,
        errorMessages,
        stack: config_1.default.env !== "production" ? error === null || error === void 0 ? void 0 : error.stack : undefined,
    });
};
exports.globalErrorHandler = globalErrorHandler;
