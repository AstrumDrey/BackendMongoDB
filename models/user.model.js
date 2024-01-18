"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
//Creating a Schema.
var userSchema = new mongoose_1.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});
//Model after the Schema.
var UserModel = (0, mongoose_1.model)('User', userSchema);
// After creating the model we have to export for using It in other files.
exports.default = UserModel;
