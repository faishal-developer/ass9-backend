"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FaqModel = void 0;
const mongoose_1 = require("mongoose");
const blogSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Types.ObjectId,
        ref: "User",
        required: true,
    },
    question: {
        type: String,
        required: true,
        unique: true,
    },
    ans: {
        type: String,
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.FaqModel = (0, mongoose_1.model)("Faq", blogSchema);
