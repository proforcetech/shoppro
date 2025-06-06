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
exports.LookupPartsDto = void 0;
var class_validator_1 = require("class-validator");
var LookupPartsDto = function () {
    var _a;
    var _keyword_decorators;
    var _keyword_initializers = [];
    var _keyword_extraInitializers = [];
    var _vin_decorators;
    var _vin_initializers = [];
    var _vin_extraInitializers = [];
    var _brand_decorators;
    var _brand_initializers = [];
    var _brand_extraInitializers = [];
    return _a = /** @class */ (function () {
            function LookupPartsDto() {
                this.keyword = __runInitializers(this, _keyword_initializers, void 0);
                this.vin = (__runInitializers(this, _keyword_extraInitializers), __runInitializers(this, _vin_initializers, void 0));
                this.brand = (__runInitializers(this, _vin_extraInitializers), __runInitializers(this, _brand_initializers, void 0));
                __runInitializers(this, _brand_extraInitializers);
            }
            return LookupPartsDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _keyword_decorators = [(0, class_validator_1.IsString)()];
            _vin_decorators = [(0, class_validator_1.IsOptional)()];
            _brand_decorators = [(0, class_validator_1.IsOptional)()];
            __esDecorate(null, null, _keyword_decorators, { kind: "field", name: "keyword", static: false, private: false, access: { has: function (obj) { return "keyword" in obj; }, get: function (obj) { return obj.keyword; }, set: function (obj, value) { obj.keyword = value; } }, metadata: _metadata }, _keyword_initializers, _keyword_extraInitializers);
            __esDecorate(null, null, _vin_decorators, { kind: "field", name: "vin", static: false, private: false, access: { has: function (obj) { return "vin" in obj; }, get: function (obj) { return obj.vin; }, set: function (obj, value) { obj.vin = value; } }, metadata: _metadata }, _vin_initializers, _vin_extraInitializers);
            __esDecorate(null, null, _brand_decorators, { kind: "field", name: "brand", static: false, private: false, access: { has: function (obj) { return "brand" in obj; }, get: function (obj) { return obj.brand; }, set: function (obj, value) { obj.brand = value; } }, metadata: _metadata }, _brand_initializers, _brand_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.LookupPartsDto = LookupPartsDto;
