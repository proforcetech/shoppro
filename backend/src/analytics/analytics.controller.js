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
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalyticsController = void 0;
var common_1 = require("@nestjs/common");
var jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
var Roles_guard_1 = require("../auth/Roles.guard");
var Role_decorator_1 = require("../auth/Role.decorator");
var AnalyticsController = function () {
    var _classDecorators = [(0, common_1.Controller)('analytics'), (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, Roles_guard_1.RolessGuard)];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _shopMetrics_decorators;
    var _techPerformance_decorators;
    var _inventoryAnalytics_decorators;
    var AnalyticsController = _classThis = /** @class */ (function () {
        function AnalyticsController_1(analyticsService) {
            this.analyticsService = (__runInitializers(this, _instanceExtraInitializers), analyticsService);
        }
        AnalyticsController_1.prototype.shopMetrics = function () {
            return this.analyticsService.shopMetrics();
        };
        AnalyticsController_1.prototype.techPerformance = function () {
            return this.analyticsService.techPerformance();
        };
        AnalyticsController_1.prototype.inventoryAnalytics = function () {
            return this.analyticsService.inventoryAnalytics();
        };
        return AnalyticsController_1;
    }());
    __setFunctionName(_classThis, "AnalyticsController");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _shopMetrics_decorators = [(0, common_1.Get)('shop'), (0, Role_decorator_1.Roles)('MANAGER')];
        _techPerformance_decorators = [(0, common_1.Get)('tech'), (0, Role_decorator_1.Roles)('MANAGER')];
        _inventoryAnalytics_decorators = [(0, common_1.Get)('inventory'), (0, Role_decorator_1.Roles)('MANAGER')];
        __esDecorate(_classThis, null, _shopMetrics_decorators, { kind: "method", name: "shopMetrics", static: false, private: false, access: { has: function (obj) { return "shopMetrics" in obj; }, get: function (obj) { return obj.shopMetrics; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _techPerformance_decorators, { kind: "method", name: "techPerformance", static: false, private: false, access: { has: function (obj) { return "techPerformance" in obj; }, get: function (obj) { return obj.techPerformance; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _inventoryAnalytics_decorators, { kind: "method", name: "inventoryAnalytics", static: false, private: false, access: { has: function (obj) { return "inventoryAnalytics" in obj; }, get: function (obj) { return obj.inventoryAnalytics; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AnalyticsController = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AnalyticsController = _classThis;
}();
exports.AnalyticsController = AnalyticsController;
