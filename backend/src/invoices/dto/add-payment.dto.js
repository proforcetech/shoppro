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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddPaymentDto = exports.PaymentMethod = void 0;
var class_validator_1 = require("class-validator");
var PaymentMethod;
(function (PaymentMethod) {
    PaymentMethod["CASH"] = "CASH";
    PaymentMethod["CREDIT_CARD"] = "CREDIT_CARD";
    PaymentMethod["STRIPE"] = "STRIPE";
    PaymentMethod["PAYPAL"] = "PAYPAL";
    PaymentMethod["CHECK"] = "CHECK";
})(PaymentMethod || (exports.PaymentMethod = PaymentMethod = {}));
var AddPaymentDto = function () {
    var _a;
    var _invoiceId_decorators;
    var _invoiceId_initializers = [];
    var _invoiceId_extraInitializers = [];
    var _amount_decorators;
    var _amount_initializers = [];
    var _amount_extraInitializers = [];
    var _method_decorators;
    var _method_initializers = [];
    var _method_extraInitializers = [];
    return _a = /** @class */ (function () {
            function AddPaymentDto() {
                this.invoiceId = __runInitializers(this, _invoiceId_initializers, void 0);
                this.amount = (__runInitializers(this, _invoiceId_extraInitializers), __runInitializers(this, _amount_initializers, void 0));
                this.method = (__runInitializers(this, _amount_extraInitializers), __runInitializers(this, _method_initializers, void 0));
                __runInitializers(this, _method_extraInitializers);
            }
            return AddPaymentDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _invoiceId_decorators = [(0, class_validator_1.IsUUID)()];
            _amount_decorators = [(0, class_validator_1.IsNumber)()];
            _method_decorators = [(0, class_validator_1.IsEnum)(PaymentMethod)];
            __esDecorate(null, null, _invoiceId_decorators, { kind: "field", name: "invoiceId", static: false, private: false, access: { has: function (obj) { return "invoiceId" in obj; }, get: function (obj) { return obj.invoiceId; }, set: function (obj, value) { obj.invoiceId = value; } }, metadata: _metadata }, _invoiceId_initializers, _invoiceId_extraInitializers);
            __esDecorate(null, null, _amount_decorators, { kind: "field", name: "amount", static: false, private: false, access: { has: function (obj) { return "amount" in obj; }, get: function (obj) { return obj.amount; }, set: function (obj, value) { obj.amount = value; } }, metadata: _metadata }, _amount_initializers, _amount_extraInitializers);
            __esDecorate(null, null, _method_decorators, { kind: "field", name: "method", static: false, private: false, access: { has: function (obj) { return "method" in obj; }, get: function (obj) { return obj.method; }, set: function (obj, value) { obj.method = value; } }, metadata: _metadata }, _method_initializers, _method_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.AddPaymentDto = AddPaymentDto;
