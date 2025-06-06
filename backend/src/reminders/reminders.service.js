"use strict";
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
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
exports.RemindersService = void 0;
var common_1 = require("@nestjs/common");
var schedule_1 = require("@nestjs/schedule");
var twilio = require("twilio");
var RemindersService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _sendDailyReminders_decorators;
    var RemindersService = _classThis = /** @class */ (function () {
        function RemindersService_1(prisma, emailService, config) {
            this.prisma = (__runInitializers(this, _instanceExtraInitializers), prisma);
            this.emailService = emailService;
            this.config = config;
            this.logger = new common_1.Logger(RemindersService.name);
            this.twilioClient = twilio(this.config.get('TWILIO_ACCOUNT_SID'), this.config.get('TWILIO_AUTH_TOKEN'));
        }
        RemindersService_1.prototype.sendDailyReminders = function () {
            return __awaiter(this, void 0, void 0, function () {
                var tomorrow, dayEnd, appointments, _i, appointments_1, appt, msg;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.logger.log('Running daily reminder job...');
                            tomorrow = new Date();
                            tomorrow.setDate(tomorrow.getDate() + 1);
                            tomorrow.setHours(0, 0, 0, 0);
                            dayEnd = new Date(tomorrow);
                            dayEnd.setHours(23, 59, 59, 999);
                            return [4 /*yield*/, this.prisma.appointment.findMany({
                                    where: {
                                        startTime: { gte: tomorrow, lte: dayEnd },
                                    },
                                    include: {
                                        vehicle: { include: { customer: true } },
                                    },
                                })];
                        case 1:
                            appointments = _a.sent();
                            _i = 0, appointments_1 = appointments;
                            _a.label = 2;
                        case 2:
                            if (!(_i < appointments_1.length)) return [3 /*break*/, 8];
                            appt = appointments_1[_i];
                            msg = "Reminder: You have a ".concat(appt.type, " appointment at Auto Repair Shop on ").concat(new Date(appt.startTime).toLocaleString(), ".");
                            if (!appt.vehicle.customer.phone) return [3 /*break*/, 4];
                            return [4 /*yield*/, this.sendSms(appt.vehicle.customer.phone, msg)];
                        case 3:
                            _a.sent();
                            _a.label = 4;
                        case 4:
                            if (!appt.vehicle.customer.email) return [3 /*break*/, 6];
                            return [4 /*yield*/, this.emailService.sendGenericMessage(appt.vehicle.customer.email, 'Appointment Reminder', msg)];
                        case 5:
                            _a.sent();
                            _a.label = 6;
                        case 6:
                            this.logger.log("Reminder sent to ".concat(appt.vehicle.customer.email || appt.vehicle.customer.phone));
                            _a.label = 7;
                        case 7:
                            _i++;
                            return [3 /*break*/, 2];
                        case 8: return [2 /*return*/];
                    }
                });
            });
        };
        RemindersService_1.prototype.sendSms = function (to, body) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    try {
                        return [2 /*return*/, this.twilioClient.messages.create({
                                body: body,
                                from: this.config.get('TWILIO_FROM'),
                                to: to,
                            })];
                    }
                    catch (err) {
                        this.logger.error("SMS failed to ".concat(to), err);
                    }
                    return [2 /*return*/];
                });
            });
        };
        return RemindersService_1;
    }());
    __setFunctionName(_classThis, "RemindersService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _sendDailyReminders_decorators = [(0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_DAY_AT_6AM)];
        __esDecorate(_classThis, null, _sendDailyReminders_decorators, { kind: "method", name: "sendDailyReminders", static: false, private: false, access: { has: function (obj) { return "sendDailyReminders" in obj; }, get: function (obj) { return obj.sendDailyReminders; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        RemindersService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return RemindersService = _classThis;
}();
exports.RemindersService = RemindersService;
