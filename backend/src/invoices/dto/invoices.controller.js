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
exports.InvoicesController = void 0;
var common_1 = require("@nestjs/common");
var jwt_auth_guard_1 = require("../../auth/jwt-auth.guard");
var roles_guard_1 = require("../../auth/roles.guard");
var InvoicesController = function () {
    var _classDecorators = [(0, common_1.Controller)('invoices'), (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard)];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _create_decorators;
    var _findAll_decorators;
    var _findOne_decorators;
    var _addPayment_decorators;
    var _generatePdf_decorators;
    var _sendInvoiceEmail_decorators;
    var _remove_decorators;
    var InvoicesController = _classThis = /** @class */ (function () {
        function InvoicesController_1(invoicesService, pdfService, emailService, prisma) {
            this.invoicesService = (__runInitializers(this, _instanceExtraInitializers), invoicesService);
            this.pdfService = pdfService;
            this.emailService = emailService;
            this.prisma = prisma;
        }
        InvoicesController_1.prototype.create = function (dto) {
            return this.invoicesService.create(dto);
        };
        InvoicesController_1.prototype.findAll = function () {
            return this.invoicesService.findAll();
        };
        InvoicesController_1.prototype.findOne = function (id) {
            return this.invoicesService.findOne(id);
        };
        InvoicesController_1.prototype.addPayment = function (dto) {
            return this.invoicesService.addPayment(dto);
        };
        InvoicesController_1.prototype.generatePdf = function (id, res) {
            return __awaiter(this, void 0, void 0, function () {
                var invoice, estimate, vehicle, customer, pdfPath;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.invoicesService.findOne(id)];
                        case 1:
                            invoice = _a.sent();
                            if (!invoice)
                                throw new common_1.NotFoundException('Invoice not found');
                            return [4 /*yield*/, this.prisma.estimate.findUnique({ where: { id: invoice.estimateId } })];
                        case 2:
                            estimate = _a.sent();
                            if (!estimate)
                                throw new common_1.NotFoundException('Estimate not found');
                            return [4 /*yield*/, this.prisma.vehicle.findUnique({ where: { id: estimate.vehicleId } })];
                        case 3:
                            vehicle = _a.sent();
                            if (!vehicle)
                                throw new common_1.NotFoundException('Vehicle not found');
                            return [4 /*yield*/, this.prisma.customer.findUnique({ where: { id: vehicle.customerId } })];
                        case 4:
                            customer = _a.sent();
                            if (!customer)
                                throw new common_1.NotFoundException('Customer not found');
                            return [4 /*yield*/, this.pdfService.generateInvoice(invoice, estimate, customer, vehicle)];
                        case 5:
                            pdfPath = _a.sent();
                            res.download("public/".concat(pdfPath.split('/').pop()));
                            return [2 /*return*/];
                    }
                });
            });
        };
        InvoicesController_1.prototype.sendInvoiceEmail = function (id, res) {
            return __awaiter(this, void 0, void 0, function () {
                var invoice, estimate, vehicle, customer, pdfPath, absolutePath;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.invoicesService.findOne(id)];
                        case 1:
                            invoice = _a.sent();
                            if (!invoice)
                                throw new common_1.NotFoundException('Invoice not found');
                            return [4 /*yield*/, this.prisma.estimate.findUnique({ where: { id: invoice.estimateId } })];
                        case 2:
                            estimate = _a.sent();
                            if (!estimate)
                                throw new common_1.NotFoundException('Estimate not found');
                            return [4 /*yield*/, this.prisma.vehicle.findUnique({ where: { id: estimate.vehicleId } })];
                        case 3:
                            vehicle = _a.sent();
                            if (!vehicle)
                                throw new common_1.NotFoundException('Vehicle not found');
                            return [4 /*yield*/, this.prisma.customer.findUnique({ where: { id: vehicle.customerId } })];
                        case 4:
                            customer = _a.sent();
                            if (!customer)
                                throw new common_1.NotFoundException('Customer not found');
                            return [4 /*yield*/, this.pdfService.generateInvoice(invoice, estimate, customer, vehicle)];
                        case 5:
                            pdfPath = _a.sent();
                            absolutePath = "public/".concat(pdfPath.split('/').pop());
                            // -- You must implement this in your EmailService --
                            return [4 /*yield*/, this.emailService.sendInvoicePdf(customer.email, absolutePath, customer.name)];
                        case 6:
                            // -- You must implement this in your EmailService --
                            _a.sent();
                            res.json({ message: "Invoice emailed to ".concat(customer.email) });
                            return [2 /*return*/];
                    }
                });
            });
        };
        InvoicesController_1.prototype.remove = function (id) {
            return this.invoicesService.remove(id);
        };
        return InvoicesController_1;
    }());
    __setFunctionName(_classThis, "InvoicesController");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _create_decorators = [(0, common_1.Post)()];
        _findAll_decorators = [(0, common_1.Get)()];
        _findOne_decorators = [(0, common_1.Get)(':id')];
        _addPayment_decorators = [(0, common_1.Post)(':id/payment')];
        _generatePdf_decorators = [(0, common_1.Post)(':id/pdf')];
        _sendInvoiceEmail_decorators = [(0, common_1.Post)(':id/email')];
        _remove_decorators = [(0, common_1.Delete)(':id')];
        __esDecorate(_classThis, null, _create_decorators, { kind: "method", name: "create", static: false, private: false, access: { has: function (obj) { return "create" in obj; }, get: function (obj) { return obj.create; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _findAll_decorators, { kind: "method", name: "findAll", static: false, private: false, access: { has: function (obj) { return "findAll" in obj; }, get: function (obj) { return obj.findAll; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _findOne_decorators, { kind: "method", name: "findOne", static: false, private: false, access: { has: function (obj) { return "findOne" in obj; }, get: function (obj) { return obj.findOne; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _addPayment_decorators, { kind: "method", name: "addPayment", static: false, private: false, access: { has: function (obj) { return "addPayment" in obj; }, get: function (obj) { return obj.addPayment; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _generatePdf_decorators, { kind: "method", name: "generatePdf", static: false, private: false, access: { has: function (obj) { return "generatePdf" in obj; }, get: function (obj) { return obj.generatePdf; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _sendInvoiceEmail_decorators, { kind: "method", name: "sendInvoiceEmail", static: false, private: false, access: { has: function (obj) { return "sendInvoiceEmail" in obj; }, get: function (obj) { return obj.sendInvoiceEmail; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _remove_decorators, { kind: "method", name: "remove", static: false, private: false, access: { has: function (obj) { return "remove" in obj; }, get: function (obj) { return obj.remove; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        InvoicesController = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return InvoicesController = _classThis;
}();
exports.InvoicesController = InvoicesController;
