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
exports.AnalyticsService = void 0;
var common_1 = require("@nestjs/common");
var AnalyticsService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var AnalyticsService = _classThis = /** @class */ (function () {
        function AnalyticsService_1(prisma) {
            this.prisma = prisma;
        }
        AnalyticsService_1.prototype.shopMetrics = function () {
            return __awaiter(this, void 0, void 0, function () {
                var invoices, totalRevenue, totalParts, totalLabor, _i, invoices_1, invoice, _a, _b, job, _c, _d, p;
                return __generator(this, function (_e) {
                    switch (_e.label) {
                        case 0: return [4 /*yield*/, this.prisma.invoice.findMany({
                                include: {
                                    estimate: {
                                        include: {
                                            jobs: {
                                                include: {
                                                    parts: {
                                                        include: { part: true },
                                                    },
                                                },
                                            },
                                        },
                                    },
                                },
                            })];
                        case 1:
                            invoices = _e.sent();
                            totalRevenue = 0;
                            totalParts = 0;
                            totalLabor = 0;
                            for (_i = 0, invoices_1 = invoices; _i < invoices_1.length; _i++) {
                                invoice = invoices_1[_i];
                                totalRevenue += invoice.total;
                                for (_a = 0, _b = invoice.estimate.jobs; _a < _b.length; _a++) {
                                    job = _b[_a];
                                    totalLabor += job.laborHours * job.rate;
                                    for (_c = 0, _d = job.parts; _c < _d.length; _c++) {
                                        p = _d[_c];
                                        totalParts += p.qty * p.part.price;
                                    }
                                }
                            }
                            return [2 /*return*/, {
                                    totalRevenue: totalRevenue,
                                    partsRevenue: totalParts,
                                    laborRevenue: totalLabor,
                                    aro: invoices.length > 0 ? totalRevenue / invoices.length : 0,
                                    grossMargin: ((totalRevenue - totalParts) / totalRevenue) * 100 || 0,
                                }];
                    }
                });
            });
        };
        AnalyticsService_1.prototype.techPerformance = function () {
            return __awaiter(this, void 0, void 0, function () {
                var techs;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.technician.findMany({
                                include: {
                                    jobs: true,
                                    user: true,
                                },
                            })];
                        case 1:
                            techs = _a.sent();
                            return [2 /*return*/, techs.map(function (t) {
                                    var hoursBilled = t.jobs.reduce(function (sum, a) {
                                        var duration = (new Date(a.endTime).getTime() - new Date(a.startTime).getTime()) / (1000 * 60 * 60);
                                        return sum + duration;
                                    }, 0);
                                    return {
                                        name: t.user.email,
                                        jobs: t.jobs.length,
                                        hoursBilled: hoursBilled.toFixed(2),
                                    };
                                })];
                    }
                });
            });
        };
        AnalyticsService_1.prototype.inventoryAnalytics = function () {
            return __awaiter(this, void 0, void 0, function () {
                var parts, turnoverThreshold, deadStock, turnover;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.part.findMany()];
                        case 1:
                            parts = _a.sent();
                            turnoverThreshold = 2;
                            deadStock = parts.filter(function (p) { return p.qty > 0 && p.qty > 5; });
                            turnover = parts.map(function (p) { return ({
                                sku: p.sku,
                                qty: p.qty,
                                turnoverRate: (Math.random() * 5).toFixed(2), // mock for now
                            }); });
                            return [2 /*return*/, {
                                    turnover: turnover,
                                    deadStock: deadStock.map(function (p) { return ({ sku: p.sku, qty: p.qty }); }),
                                }];
                    }
                });
            });
        };
        return AnalyticsService_1;
    }());
    __setFunctionName(_classThis, "AnalyticsService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AnalyticsService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AnalyticsService = _classThis;
}();
exports.AnalyticsService = AnalyticsService;
