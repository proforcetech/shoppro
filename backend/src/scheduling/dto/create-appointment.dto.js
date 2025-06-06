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
exports.CreateAppointmentDto = void 0;
var class_validator_1 = require("class-validator");
var CreateAppointmentDto = function () {
    var _a;
    var _vehicleId_decorators;
    var _vehicleId_initializers = [];
    var _vehicleId_extraInitializers = [];
    var _techId_decorators;
    var _techId_initializers = [];
    var _techId_extraInitializers = [];
    var _startTime_decorators;
    var _startTime_initializers = [];
    var _startTime_extraInitializers = [];
    var _endTime_decorators;
    var _endTime_initializers = [];
    var _endTime_extraInitializers = [];
    var _type_decorators;
    var _type_initializers = [];
    var _type_extraInitializers = [];
    var _notes_decorators;
    var _notes_initializers = [];
    var _notes_extraInitializers = [];
    return _a = /** @class */ (function () {
            function CreateAppointmentDto() {
                this.vehicleId = __runInitializers(this, _vehicleId_initializers, void 0);
                this.techId = (__runInitializers(this, _vehicleId_extraInitializers), __runInitializers(this, _techId_initializers, void 0));
                this.startTime = (__runInitializers(this, _techId_extraInitializers), __runInitializers(this, _startTime_initializers, void 0));
                this.endTime = (__runInitializers(this, _startTime_extraInitializers), __runInitializers(this, _endTime_initializers, void 0));
                this.type = (__runInitializers(this, _endTime_extraInitializers), __runInitializers(this, _type_initializers, void 0));
                this.notes = (__runInitializers(this, _type_extraInitializers), __runInitializers(this, _notes_initializers, void 0));
                __runInitializers(this, _notes_extraInitializers);
            }
            return CreateAppointmentDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _vehicleId_decorators = [(0, class_validator_1.IsUUID)()];
            _techId_decorators = [(0, class_validator_1.IsUUID)()];
            _startTime_decorators = [(0, class_validator_1.IsDateString)()];
            _endTime_decorators = [(0, class_validator_1.IsDateString)()];
            _type_decorators = [(0, class_validator_1.IsString)()];
            _notes_decorators = [(0, class_validator_1.IsString)(), (0, class_validator_1.IsOptional)()];
            __esDecorate(null, null, _vehicleId_decorators, { kind: "field", name: "vehicleId", static: false, private: false, access: { has: function (obj) { return "vehicleId" in obj; }, get: function (obj) { return obj.vehicleId; }, set: function (obj, value) { obj.vehicleId = value; } }, metadata: _metadata }, _vehicleId_initializers, _vehicleId_extraInitializers);
            __esDecorate(null, null, _techId_decorators, { kind: "field", name: "techId", static: false, private: false, access: { has: function (obj) { return "techId" in obj; }, get: function (obj) { return obj.techId; }, set: function (obj, value) { obj.techId = value; } }, metadata: _metadata }, _techId_initializers, _techId_extraInitializers);
            __esDecorate(null, null, _startTime_decorators, { kind: "field", name: "startTime", static: false, private: false, access: { has: function (obj) { return "startTime" in obj; }, get: function (obj) { return obj.startTime; }, set: function (obj, value) { obj.startTime = value; } }, metadata: _metadata }, _startTime_initializers, _startTime_extraInitializers);
            __esDecorate(null, null, _endTime_decorators, { kind: "field", name: "endTime", static: false, private: false, access: { has: function (obj) { return "endTime" in obj; }, get: function (obj) { return obj.endTime; }, set: function (obj, value) { obj.endTime = value; } }, metadata: _metadata }, _endTime_initializers, _endTime_extraInitializers);
            __esDecorate(null, null, _type_decorators, { kind: "field", name: "type", static: false, private: false, access: { has: function (obj) { return "type" in obj; }, get: function (obj) { return obj.type; }, set: function (obj, value) { obj.type = value; } }, metadata: _metadata }, _type_initializers, _type_extraInitializers);
            __esDecorate(null, null, _notes_decorators, { kind: "field", name: "notes", static: false, private: false, access: { has: function (obj) { return "notes" in obj; }, get: function (obj) { return obj.notes; }, set: function (obj, value) { obj.notes = value; } }, metadata: _metadata }, _notes_initializers, _notes_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.CreateAppointmentDto = CreateAppointmentDto;
