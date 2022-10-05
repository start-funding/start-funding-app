"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
        while (_) try {
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
exports.__esModule = true;
exports.Crowfunding = void 0;
var algosdk_1 = require("algosdk");
var bkr = require("beaker-ts");
// import algosdk = require('algosdk');
// import bkr = require('beaker-ts');
var Crowfunding = /** @class */ (function (_super) {
    __extends(Crowfunding, _super);
    function Crowfunding() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.desc = "";
        _this.methods = [
            new algosdk_1["default"].ABIMethod({ name: "claim", desc: "", args: [], returns: { type: "void", desc: "" } }),
            new algosdk_1["default"].ABIMethod({ name: "donate", desc: "", args: [{ type: "pay", name: "donation", desc: "" }], returns: { type: "uint64", desc: "" } }),
            new algosdk_1["default"].ABIMethod({ name: "get_collected", desc: "", args: [], returns: { type: "uint64", desc: "" } }),
            new algosdk_1["default"].ABIMethod({ name: "get_db_id", desc: "", args: [], returns: { type: "string", desc: "" } }),
            new algosdk_1["default"].ABIMethod({ name: "refund", desc: "", args: [{ type: "account", name: "account", desc: "" }, { type: "uint64", name: "amount", desc: "" }], returns: { type: "void", desc: "" } }),
            new algosdk_1["default"].ABIMethod({ name: "set_db_id", desc: "", args: [{ type: "string", name: "db_id", desc: "" }], returns: { type: "string", desc: "" } }),
            new algosdk_1["default"].ABIMethod({ name: "set_end_date", desc: "", args: [{ type: "uint64", name: "end_date", desc: "" }], returns: { type: "uint64", desc: "" } }),
            new algosdk_1["default"].ABIMethod({ name: "set_target", desc: "", args: [{ type: "uint64", name: "target", desc: "" }], returns: { type: "uint64", desc: "" } })
        ];
        _this.compose = {
            claim: function (txnParams, atc) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.addMethodCall(algosdk_1["default"].getMethodByName(this.methods, "claim"), {}, txnParams, atc)];
                });
            }); },
            donate: function (args, txnParams, atc) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.addMethodCall(algosdk_1["default"].getMethodByName(this.methods, "donate"), { donation: args.donation }, txnParams, atc)];
                });
            }); },
            get_collected: function (txnParams, atc) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.addMethodCall(algosdk_1["default"].getMethodByName(this.methods, "get_collected"), {}, txnParams, atc)];
                });
            }); },
            get_db_id: function (txnParams, atc) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.addMethodCall(algosdk_1["default"].getMethodByName(this.methods, "get_db_id"), {}, txnParams, atc)];
                });
            }); },
            refund: function (args, txnParams, atc) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.addMethodCall(algosdk_1["default"].getMethodByName(this.methods, "refund"), { account: args.account, amount: args.amount }, txnParams, atc)];
                });
            }); },
            set_db_id: function (args, txnParams, atc) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.addMethodCall(algosdk_1["default"].getMethodByName(this.methods, "set_db_id"), { db_id: args.db_id }, txnParams, atc)];
                });
            }); },
            set_end_date: function (args, txnParams, atc) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.addMethodCall(algosdk_1["default"].getMethodByName(this.methods, "set_end_date"), { end_date: args.end_date }, txnParams, atc)];
                });
            }); },
            set_target: function (args, txnParams, atc) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.addMethodCall(algosdk_1["default"].getMethodByName(this.methods, "set_target"), { target: args.target }, txnParams, atc)];
                });
            }); }
        };
        return _this;
    }
    Crowfunding.prototype.claim = function (txnParams) {
        return __awaiter(this, void 0, void 0, function () {
            var result, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.execute;
                        return [4 /*yield*/, this.compose.claim(txnParams)];
                    case 1: return [4 /*yield*/, _a.apply(this, [_b.sent()])];
                    case 2:
                        result = _b.sent();
                        return [2 /*return*/, new bkr.ABIResult(result)];
                }
            });
        });
    };
    Crowfunding.prototype.donate = function (args, txnParams) {
        return __awaiter(this, void 0, void 0, function () {
            var result, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.execute;
                        return [4 /*yield*/, this.compose.donate({ donation: args.donation }, txnParams)];
                    case 1: return [4 /*yield*/, _a.apply(this, [_b.sent()])];
                    case 2:
                        result = _b.sent();
                        return [2 /*return*/, new bkr.ABIResult(result, result.returnValue)];
                }
            });
        });
    };
    Crowfunding.prototype.get_collected = function (txnParams) {
        return __awaiter(this, void 0, void 0, function () {
            var result, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.execute;
                        return [4 /*yield*/, this.compose.get_collected(txnParams)];
                    case 1: return [4 /*yield*/, _a.apply(this, [_b.sent()])];
                    case 2:
                        result = _b.sent();
                        return [2 /*return*/, new bkr.ABIResult(result, result.returnValue)];
                }
            });
        });
    };
    Crowfunding.prototype.get_db_id = function (txnParams) {
        return __awaiter(this, void 0, void 0, function () {
            var result, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.execute;
                        return [4 /*yield*/, this.compose.get_db_id(txnParams)];
                    case 1: return [4 /*yield*/, _a.apply(this, [_b.sent()])];
                    case 2:
                        result = _b.sent();
                        return [2 /*return*/, new bkr.ABIResult(result, result.returnValue)];
                }
            });
        });
    };
    Crowfunding.prototype.refund = function (args, txnParams) {
        return __awaiter(this, void 0, void 0, function () {
            var result, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.execute;
                        return [4 /*yield*/, this.compose.refund({ account: args.account, amount: args.amount }, txnParams)];
                    case 1: return [4 /*yield*/, _a.apply(this, [_b.sent()])];
                    case 2:
                        result = _b.sent();
                        return [2 /*return*/, new bkr.ABIResult(result)];
                }
            });
        });
    };
    Crowfunding.prototype.set_db_id = function (args, txnParams) {
        return __awaiter(this, void 0, void 0, function () {
            var result, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.execute;
                        return [4 /*yield*/, this.compose.set_db_id({ db_id: args.db_id }, txnParams)];
                    case 1: return [4 /*yield*/, _a.apply(this, [_b.sent()])];
                    case 2:
                        result = _b.sent();
                        return [2 /*return*/, new bkr.ABIResult(result, result.returnValue)];
                }
            });
        });
    };
    Crowfunding.prototype.set_end_date = function (args, txnParams) {
        return __awaiter(this, void 0, void 0, function () {
            var result, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.execute;
                        return [4 /*yield*/, this.compose.set_end_date({ end_date: args.end_date }, txnParams)];
                    case 1: return [4 /*yield*/, _a.apply(this, [_b.sent()])];
                    case 2:
                        result = _b.sent();
                        return [2 /*return*/, new bkr.ABIResult(result, result.returnValue)];
                }
            });
        });
    };
    Crowfunding.prototype.set_target = function (args, txnParams) {
        return __awaiter(this, void 0, void 0, function () {
            var result, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.execute;
                        return [4 /*yield*/, this.compose.set_target({ target: args.target }, txnParams)];
                    case 1: return [4 /*yield*/, _a.apply(this, [_b.sent()])];
                    case 2:
                        result = _b.sent();
                        return [2 /*return*/, new bkr.ABIResult(result, result.returnValue)];
                }
            });
        });
    };
    return Crowfunding;
}(bkr.ApplicationClient));
exports.Crowfunding = Crowfunding;
