"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateChangePassword = exports.validatePost = exports.validateProfileDetails = exports.signin_out = void 0;
const zod_1 = __importDefault(require("zod"));
exports.signin_out = zod_1.default.object({
    first_name: zod_1.default.string().max(50).optional(),
    last_name: zod_1.default.string().max(50).optional(),
    email: zod_1.default.string().email(),
    password: zod_1.default.string().min(8)
});
exports.validateProfileDetails = zod_1.default.object({
    last_name: zod_1.default.string().max(25).optional(),
    first_name: zod_1.default.string().max(25).optional(),
    domain: zod_1.default.string().url().optional(),
    about: zod_1.default.string().min(50).optional(),
    pronoun: zod_1.default.string().max(10).optional(),
    image: zod_1.default.string().url().optional(),
    cover_image: zod_1.default.string().url().optional(),
    domain_title: zod_1.default.string().max(50).optional()
});
exports.validatePost = zod_1.default.object({
    title: zod_1.default.string().max(50).optional(),
    description: zod_1.default.string().min(50).optional(),
    image: zod_1.default.string().url().optional(),
    category: zod_1.default.string().max(100).optional()
});
exports.validateChangePassword = zod_1.default.object({
    oldPassword: zod_1.default.string().min(8),
    newPassword: zod_1.default.string().min(8)
});
