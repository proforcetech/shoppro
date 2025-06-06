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
exports.CreatePartDto = void 0;
var class_validator_1 = require("class-validator");
var CreatePartDto = function () {
    var _a;
    var _sku_decorators;
    var _sku_initializers = [];
    var _sku_extraInitializers = [];
    var _description_decorators;
    var _description_initializers = [];
    var _description_extraInitializers = [];
    var _cost_decorators;
    var _cost_initializers = [];
    var _cost_extraInitializers = [];
    var _price_decorators;
    var _price_initializers = [];
    var _price_extraInitializers = [];
    var _qty_decorators;
    var _qty_initializers = [];
    var _qty_extraInitializers = [];
    var _location_decorators;
    var _location_initializers = [];
    var _location_extraInitializers = [];
    var _vendorId_decorators;
    var _vendorId_initializers = [];
    var _vendorId_extraInitializers = [];
    return _a = /** @class */ (function () {
            function CreatePartDto() {
                this.sku = __runInitializers(this, _sku_initializers, void 0);
                this.description = (__runInitializers(this, _sku_extraInitializers), __runInitializers(this, _description_initializers, void 0));
                this.cost = (__runInitializers(this, _description_extraInitializers), __runInitializers(this, _cost_initializers, void 0));
                this.price = (__runInitializers(this, _cost_extraInitializers), __runInitializers(this, _price_initializers, void 0));
                this.qty = (__runInitializers(this, _price_extraInitializers), __runInitializers(this, _qty_initializers, void 0));
                this.location = (__runInitializers(this, _qty_extraInitializers), __runInitializers(this, _location_initializers, void 0));
                this.vendorId = (__runInitializers(this, _location_extraInitializers), __runInitializers(this, _vendorId_initializers, void 0));
                __runInitializers(this, _vendorId_extraInitializers);
            }
            return CreatePartDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _sku_decorators = [(0, class_validator_1.IsString)()];
            _description_decorators = [(0, class_validator_1.IsString)()];
            _cost_decorators = [(0, class_validator_1.IsNumber)()];
            _price_decorators = [(0, class_validator_1.IsNumber)()];
            _qty_decorators = [(0, class_validator_1.IsNumber)()];
            _location_decorators = [(0, class_validator_1.IsString)()];
            _vendorId_decorators = [(0, class_validator_1.IsUUID)()];
            __esDecorate(null, null, _sku_decorators, { kind: "field", name: "sku", static: false, private: false, access: { has: function (obj) { return "sku" in obj; }, get: function (obj) { return obj.sku; }, set: function (obj, value) { obj.sku = value; } }, metadata: _metadata }, _sku_initializers, _sku_extraInitializers);
            __esDecorate(null, null, _description_decorators, { kind: "field", name: "description", static: false, private: false, access: { has: function (obj) { return "description" in obj; }, get: function (obj) { return obj.description; }, set: function (obj, value) { obj.description = value; } }, metadata: _metadata }, _description_initializers, _description_extraInitializers);
            __esDecorate(null, null, _cost_decorators, { kind: "field", name: "cost", static: false, private: false, access: { has: function (obj) { return "cost" in obj; }, get: function (obj) { return obj.cost; }, set: function (obj, value) { obj.cost = value; } }, metadata: _metadata }, _cost_initializers, _cost_extraInitializers);
            __esDecorate(null, null, _price_decorators, { kind: "field", name: "price", static: false, private: false, access: { has: function (obj) { return "price" in obj; }, get: function (obj) { return obj.price; }, set: function (obj, value) { obj.price = value; } }, metadata: _metadata }, _price_initializers, _price_extraInitializers);
            __esDecorate(null, null, _qty_decorators, { kind: "field", name: "qty", static: false, private: false, access: { has: function (obj) { return "qty" in obj; }, get: function (obj) { return obj.qty; }, set: function (obj, value) { obj.qty = value; } }, metadata: _metadata }, _qty_initializers, _qty_extraInitializers);
            __esDecorate(null, null, _location_decorators, { kind: "field", name: "location", static: false, private: false, access: { has: function (obj) { return "location" in obj; }, get: function (obj) { return obj.location; }, set: function (obj, value) { obj.location = value; } }, metadata: _metadata }, _location_initializers, _location_extraInitializers);
            __esDecorate(null, null, _vendorId_decorators, { kind: "field", name: "vendorId", static: false, private: false, access: { has: function (obj) { return "vendorId" in obj; }, get: function (obj) { return obj.vendorId; }, set: function (obj, value) { obj.vendorId = value; } }, metadata: _metadata }, _vendorId_initializers, _vendorId_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.CreatePartDto = CreatePartDto;
