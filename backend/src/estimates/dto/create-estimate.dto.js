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
exports.CreateEstimateDto = exports.EstimateStatus = void 0;
var class_validator_1 = require("class-validator");
var class_transformer_1 = require("class-transformer");
var EstimateStatus;
(function (EstimateStatus) {
    EstimateStatus["DRAFT"] = "DRAFT";
    EstimateStatus["APPROVED"] = "APPROVED";
    EstimateStatus["REJECTED"] = "REJECTED";
})(EstimateStatus || (exports.EstimateStatus = EstimateStatus = {}));
var PartItemDto = function () {
    var _a;
    var _partId_decorators;
    var _partId_initializers = [];
    var _partId_extraInitializers = [];
    var _qty_decorators;
    var _qty_initializers = [];
    var _qty_extraInitializers = [];
    var _warrantyMonths_decorators;
    var _warrantyMonths_initializers = [];
    var _warrantyMonths_extraInitializers = [];
    return _a = /** @class */ (function () {
            function PartItemDto() {
                this.partId = __runInitializers(this, _partId_initializers, void 0);
                this.qty = (__runInitializers(this, _partId_extraInitializers), __runInitializers(this, _qty_initializers, void 0));
                this.warrantyMonths = (__runInitializers(this, _qty_extraInitializers), __runInitializers(this, _warrantyMonths_initializers, void 0));
                __runInitializers(this, _warrantyMonths_extraInitializers);
            }
            return PartItemDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _partId_decorators = [(0, class_validator_1.IsUUID)()];
            _qty_decorators = [(0, class_validator_1.IsOptional)()];
            _warrantyMonths_decorators = [(0, class_validator_1.IsOptional)()];
            __esDecorate(null, null, _partId_decorators, { kind: "field", name: "partId", static: false, private: false, access: { has: function (obj) { return "partId" in obj; }, get: function (obj) { return obj.partId; }, set: function (obj, value) { obj.partId = value; } }, metadata: _metadata }, _partId_initializers, _partId_extraInitializers);
            __esDecorate(null, null, _qty_decorators, { kind: "field", name: "qty", static: false, private: false, access: { has: function (obj) { return "qty" in obj; }, get: function (obj) { return obj.qty; }, set: function (obj, value) { obj.qty = value; } }, metadata: _metadata }, _qty_initializers, _qty_extraInitializers);
            __esDecorate(null, null, _warrantyMonths_decorators, { kind: "field", name: "warrantyMonths", static: false, private: false, access: { has: function (obj) { return "warrantyMonths" in obj; }, get: function (obj) { return obj.warrantyMonths; }, set: function (obj, value) { obj.warrantyMonths = value; } }, metadata: _metadata }, _warrantyMonths_initializers, _warrantyMonths_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
var JobDto = function () {
    var _a;
    var _parts_decorators;
    var _parts_initializers = [];
    var _parts_extraInitializers = [];
    return _a = /** @class */ (function () {
            function JobDto() {
                this.parts = __runInitializers(this, _parts_initializers, void 0);
                this.description = __runInitializers(this, _parts_extraInitializers);
            }
            return JobDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _parts_decorators = [(0, class_validator_1.IsArray)(), (0, class_validator_1.ValidateNested)({ each: true }), (0, class_transformer_1.Type)(function () { return PartItemDto; })];
            __esDecorate(null, null, _parts_decorators, { kind: "field", name: "parts", static: false, private: false, access: { has: function (obj) { return "parts" in obj; }, get: function (obj) { return obj.parts; }, set: function (obj, value) { obj.parts = value; } }, metadata: _metadata }, _parts_initializers, _parts_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
var CreateEstimateDto = function () {
    var _a;
    var _vehicleId_decorators;
    var _vehicleId_initializers = [];
    var _vehicleId_extraInitializers = [];
    var _jobs_decorators;
    var _jobs_initializers = [];
    var _jobs_extraInitializers = [];
    var _status_decorators;
    var _status_initializers = [];
    var _status_extraInitializers = [];
    return _a = /** @class */ (function () {
            function CreateEstimateDto() {
                this.vehicleId = __runInitializers(this, _vehicleId_initializers, void 0);
                this.jobs = (__runInitializers(this, _vehicleId_extraInitializers), __runInitializers(this, _jobs_initializers, void 0));
                this.status = (__runInitializers(this, _jobs_extraInitializers), __runInitializers(this, _status_initializers, void 0));
                __runInitializers(this, _status_extraInitializers);
            }
            return CreateEstimateDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _vehicleId_decorators = [(0, class_validator_1.IsUUID)()];
            _jobs_decorators = [(0, class_validator_1.IsArray)(), (0, class_validator_1.ValidateNested)({ each: true }), (0, class_transformer_1.Type)(function () { return JobDto; })];
            _status_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsEnum)(EstimateStatus)];
            __esDecorate(null, null, _vehicleId_decorators, { kind: "field", name: "vehicleId", static: false, private: false, access: { has: function (obj) { return "vehicleId" in obj; }, get: function (obj) { return obj.vehicleId; }, set: function (obj, value) { obj.vehicleId = value; } }, metadata: _metadata }, _vehicleId_initializers, _vehicleId_extraInitializers);
            __esDecorate(null, null, _jobs_decorators, { kind: "field", name: "jobs", static: false, private: false, access: { has: function (obj) { return "jobs" in obj; }, get: function (obj) { return obj.jobs; }, set: function (obj, value) { obj.jobs = value; } }, metadata: _metadata }, _jobs_initializers, _jobs_extraInitializers);
            __esDecorate(null, null, _status_decorators, { kind: "field", name: "status", static: false, private: false, access: { has: function (obj) { return "status" in obj; }, get: function (obj) { return obj.status; }, set: function (obj, value) { obj.status = value; } }, metadata: _metadata }, _status_initializers, _status_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.CreateEstimateDto = CreateEstimateDto;
