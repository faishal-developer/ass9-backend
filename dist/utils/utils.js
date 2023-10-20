"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginationFields = exports.maxNumber = exports.userRoles = void 0;
exports.userRoles = {
    admin: "admin",
    user: "user",
    super_admin: "super-admin",
};
exports.maxNumber = Number.MAX_SAFE_INTEGER;
exports.paginationFields = ["page", "limit", "sortBy", "sortOrder"];
