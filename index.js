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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var mongoose_1 = require("mongoose");
var cors = require("cors");
var dotenv = require("dotenv");
var userGet_1 = require("./router/userGet");
var userPost_1 = require("./router/userPost");
var userUpdate_1 = require("./router/userUpdate");
var useDelete_1 = require("./router/useDelete");
dotenv.config({ path: "".concat(__dirname, "/.env.local") });
var MONGO_URI = process.env.MONGO_URI;
var PORT = process.env.PORT;
var app = express();
var apiRouter = express.Router();
app.use(express.json());
app.use(cors());
// Function to create a connection with mongodb
var connectMongo = function (tries) {
    if (tries === void 0) { tries = 3; }
    return __awaiter(void 0, void 0, void 0, function () {
        var error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    if (!MONGO_URI) return [3 /*break*/, 2];
                    return [4 /*yield*/, mongoose_1.default.connect(MONGO_URI)];
                case 1:
                    _a.sent();
                    console.log('Connected to MongoDB');
                    // Server Creation.
                    app.listen(PORT, function () {
                        console.log('Server listening');
                    });
                    return [3 /*break*/, 3];
                case 2:
                    console.error("There's no info about URI");
                    _a.label = 3;
                case 3: return [3 /*break*/, 5];
                case 4:
                    error_1 = _a.sent();
                    // Handling the error
                    console.error('Error: Connection Failed');
                    if (tries > 0) {
                        setTimeout(function () { return connectMongo(tries - 1); }, 5000);
                    }
                    else {
                        console.error("It's impossible to connect");
                        mongoose_1.default.connection.close();
                        console.log('Trying again...');
                        connectMongo();
                    }
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
};
connectMongo();
// CREATING ROUTERS
var testGET = userGet_1.default;
var testPOST = userPost_1.default;
var testPUT = userUpdate_1.default;
var testDEL = useDelete_1.default;
//USING ROUTERS
apiRouter.use(testGET);
apiRouter.use(testPOST);
apiRouter.use(testPUT);
apiRouter.use(testDEL);
app.use("/api", apiRouter);
