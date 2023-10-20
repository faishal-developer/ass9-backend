"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Service = void 0;
const mongoose_1 = require("mongoose");
const ServiceSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    availableTimeSlots: {
        type: [
            {
                startsTime: Number,
                endsTime: Number,
            },
        ],
    },
    reviewRatings: {
        userId: {
            type: mongoose_1.Schema.Types.ObjectId,
        },
        review: {
            type: String,
        },
        rating: {
            type: Number,
        },
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.Service = (0, mongoose_1.model)("Service", ServiceSchema);
