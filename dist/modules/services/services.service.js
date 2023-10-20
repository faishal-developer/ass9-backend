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
exports.ServiceService = void 0;
const service_model_1 = require("./service.model");
const ApiError_1 = __importDefault(require("../../errorHandler/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const commonFunction_1 = require("../../shared/commonFunction");
const utils_1 = require("../../utils/utils");
const service_constant_1 = require("./service.constant");
const createService = (ServiceData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield service_model_1.Service.create(ServiceData);
    return result;
});
const getAllService = (queryData) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { page, limit, sortBy, sortOrder, minPrice = 0, maxPrice = utils_1.maxNumber, searchTerm, startsTime, endsTime, } = queryData;
    const pagination = (0, commonFunction_1.calcSkip)(page, limit);
    let query = {};
    //pricing
    query.price = { $gte: Number(minPrice), $lte: Number(maxPrice) };
    if (startsTime && endsTime) {
        query["availableTimeSlots.startsTime"] = { $gte: Number(startsTime) };
        query["availableTimeSlots.endsTime"] = { $lte: Number(endsTime) };
    }
    //searchTerm
    if (searchTerm) {
        query["$or"] = service_constant_1.ServiceSearchableFields.map((field) => ({
            [field]: {
                $regex: searchTerm,
                $options: "i",
            },
        }));
    }
    const sortCondition = {};
    if (sortBy) {
        sortCondition[sortBy] = (_a = sortOrder) !== null && _a !== void 0 ? _a : "asc";
    }
    console.log("query", query);
    const result = yield service_model_1.Service.find(query)
        .sort(sortCondition)
        .skip(pagination.skip)
        .limit(pagination.limit);
    const total = yield service_model_1.Service.countDocuments(query);
    return {
        meta: {
            page: Number(page),
            limit: Number(limit),
            total,
        },
        data: result,
    };
});
const getSingleService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield service_model_1.Service.findById({ _id: id });
    return result;
});
const updateService = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield service_model_1.Service.findById({ _id: id });
    if (!isExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Service not found !");
    }
    const result = yield service_model_1.Service.findOneAndUpdate({ _id: id }, data, {
        new: true,
    });
    return result;
});
const deleteService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield service_model_1.Service.findByIdAndDelete({ _id: id });
    return result;
});
exports.ServiceService = {
    createService,
    getAllService,
    getSingleService,
    updateService,
    deleteService,
};
