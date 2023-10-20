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
exports.FaqController = void 0;
const catchAsync_1 = require("../../shared/catchAsync");
const http_status_1 = __importDefault(require("http-status"));
const Faq_service_1 = require("./Faq.service");
const utils_1 = require("../../utils/utils");
const commonFunction_1 = require("../../shared/commonFunction");
const faq_constant_1 = require("./faq.constant");
const createFaq = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const FaqData = req.body;
    const result = yield Faq_service_1.FaqService.createFaq(FaqData);
    (0, catchAsync_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: `Faq created successfully`,
        data: result,
    });
}));
const getAllFaq = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, commonFunction_1.pick)(req.query, faq_constant_1.faqFilterableFields);
    const paginationOptions = (0, commonFunction_1.pick)(req.query, utils_1.paginationFields);
    const result = yield Faq_service_1.FaqService.getAllFaq(filters, paginationOptions);
    (0, catchAsync_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: result == null ? "Failed to get" : "Faq retrived successfully",
        meta: result.meta,
        data: result.data,
    });
}));
const getSingleFaq = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield Faq_service_1.FaqService.getSingleFaq(id);
    (0, catchAsync_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: result == null ? "Failed to get" : "Faq retrived successfully",
        data: result,
    });
}));
const updateFaq = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const updatedData = req.body;
    const result = yield Faq_service_1.FaqService.updateFaq(id, updatedData);
    (0, catchAsync_1.sendResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Faq updated succefully",
        data: result,
    });
}));
const deleteFaq = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield Faq_service_1.FaqService.deleteFaq(id);
    (0, catchAsync_1.sendResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Faq deleted successfully!",
        data: result,
    });
}));
exports.FaqController = {
    createFaq,
    getAllFaq,
    getSingleFaq,
    updateFaq,
    deleteFaq,
};
