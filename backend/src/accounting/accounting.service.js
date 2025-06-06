"use strict";
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
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
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountingService = void 0;
var common_1 = require("@nestjs/common");
var AccountingService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var AccountingService = _classThis = /** @class */ (function () {
        function AccountingService_1(prisma) {
            this.prisma = prisma;
        }
        AccountingService_1.prototype.createEntry = function (data) {
            return __awaiter(this, void 0, void 0, function () {
                var accountId, amount, type, description, entry, account, isDebit, delta;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            accountId = data.accountId, amount = data.amount, type = data.type, description = data.description;
                            return [4 /*yield*/, this.prisma.journalEntry.create({
                                    data: { accountId: accountId, amount: amount, type: type, description: description },
                                })];
                        case 1:
                            entry = _a.sent();
                            return [4 /*yield*/, this.prisma.account.findUnique({ where: { id: accountId } })];
                        case 2:
                            account = _a.sent();
                            // Validate account
                            if (!account) {
                                throw new Error('Account not found');
                            }
                            isDebit = account.type === 'ASSET' || account.type === 'EXPENSE';
                            delta = isDebit ? amount : -amount;
                            // Update account balance (Prisma example)
                            return [4 /*yield*/, this.prisma.account.update({
                                    where: { id: accountId },
                                    data: { balance: { increment: delta } },
                                })];
                        case 3:
                            // Update account balance (Prisma example)
                            _a.sent();
                            return [2 /*return*/, entry];
                    }
                });
            });
        };
        AccountingService_1.prototype.getAccounts = function () {
            return this.prisma.account.findMany();
        };
        AccountingService_1.prototype.getJournal = function () {
            return this.prisma.journalEntry.findMany({ include: { account: true } });
        };
        AccountingService_1.prototype.getProfitAndLoss = function () {
            return __awaiter(this, void 0, void 0, function () {
                var revenues, expenses, totalRevenue, totalExpense;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.account.findMany({
                                where: { type: 'REVENUE' },
                            })];
                        case 1:
                            revenues = _a.sent();
                            return [4 /*yield*/, this.prisma.account.findMany({
                                    where: { type: 'EXPENSE' },
                                })];
                        case 2:
                            expenses = _a.sent();
                            totalRevenue = revenues.reduce(function (sum, a) { return sum + a.balance; }, 0);
                            totalExpense = expenses.reduce(function (sum, a) { return sum + a.balance; }, 0);
                            return [2 /*return*/, {
                                    revenue: totalRevenue,
                                    expense: totalExpense,
                                    netProfit: totalRevenue - totalExpense,
                                }];
                    }
                });
            });
        };
        AccountingService_1.prototype.getBalanceSheet = function () {
            return __awaiter(this, void 0, void 0, function () {
                var assets, liabilities, equity;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.account.findMany({ where: { type: 'ASSET' } })];
                        case 1:
                            assets = _a.sent();
                            return [4 /*yield*/, this.prisma.account.findMany({ where: { type: 'LIABILITY' } })];
                        case 2:
                            liabilities = _a.sent();
                            return [4 /*yield*/, this.prisma.account.findMany({ where: { type: 'EQUITY' } })];
                        case 3:
                            equity = _a.sent();
                            return [2 /*return*/, {
                                    assets: assets.map(function (a) { return ({ name: a.name, balance: a.balance }); }),
                                    liabilities: liabilities.map(function (l) { return ({ name: l.name, balance: l.balance }); }),
                                    equity: equity.map(function (e) { return ({ name: e.name, balance: e.balance }); }),
                                }];
                    }
                });
            });
        };
        return AccountingService_1;
    }());
    __setFunctionName(_classThis, "AccountingService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AccountingService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AccountingService = _classThis;
}();
exports.AccountingService = AccountingService;
