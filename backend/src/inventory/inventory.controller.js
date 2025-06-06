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
exports.InventoryController = void 0;
var common_1 = require("@nestjs/common");
var jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
var roles_guard_1 = require("../auth/roles.guard");
var InventoryController = function () {
    var _classDecorators = [(0, common_1.Controller)('inventory'), (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard)];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _createPart_decorators;
    var _findAllParts_decorators;
    var _updatePart_decorators;
    var _deletePart_decorators;
    var _reorderCheck_decorators;
    var _createVendor_decorators;
    var _getVendors_decorators;
    var _updateVendor_decorators;
    var _deleteVendor_decorators;
    var InventoryController = _classThis = /** @class */ (function () {
        function InventoryController_1(inventoryService) {
            this.inventoryService = (__runInitializers(this, _instanceExtraInitializers), inventoryService);
        }
        // Parts
        InventoryController_1.prototype.createPart = function (dto) {
            return this.inventoryService.createPart(dto);
        };
        InventoryController_1.prototype.findAllParts = function () {
            return this.inventoryService.findAllParts();
        };
        InventoryController_1.prototype.updatePart = function (id, dto) {
            return this.inventoryService.updatePart(id, dto);
        };
        InventoryController_1.prototype.deletePart = function (id) {
            return this.inventoryService.deletePart(id);
        };
        InventoryController_1.prototype.reorderCheck = function () {
            return this.inventoryService.reorderCheck();
        };
        // Vendors
        InventoryController_1.prototype.createVendor = function (dto) {
            return this.inventoryService.createVendor(dto);
        };
        InventoryController_1.prototype.getVendors = function () {
            return this.inventoryService.getVendors();
        };
        InventoryController_1.prototype.updateVendor = function (id, dto) {
            return this.inventoryService.updateVendor(id, dto);
        };
        InventoryController_1.prototype.deleteVendor = function (id) {
            return this.inventoryService.deleteVendor(id);
        };
        return InventoryController_1;
    }());
    __setFunctionName(_classThis, "InventoryController");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _createPart_decorators = [(0, common_1.Post)('parts'), Roles('MANAGER')];
        _findAllParts_decorators = [(0, common_1.Get)('parts')];
        _updatePart_decorators = [(0, common_1.Put)('parts/:id'), Roles('MANAGER')];
        _deletePart_decorators = [(0, common_1.Delete)('parts/:id'), Roles('ADMIN')];
        _reorderCheck_decorators = [(0, common_1.Get)('parts/reorder-check')];
        _createVendor_decorators = [(0, common_1.Post)('vendors'), Roles('MANAGER')];
        _getVendors_decorators = [(0, common_1.Get)('vendors')];
        _updateVendor_decorators = [(0, common_1.Put)('vendors/:id')];
        _deleteVendor_decorators = [(0, common_1.Delete)('vendors/:id')];
        __esDecorate(_classThis, null, _createPart_decorators, { kind: "method", name: "createPart", static: false, private: false, access: { has: function (obj) { return "createPart" in obj; }, get: function (obj) { return obj.createPart; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _findAllParts_decorators, { kind: "method", name: "findAllParts", static: false, private: false, access: { has: function (obj) { return "findAllParts" in obj; }, get: function (obj) { return obj.findAllParts; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _updatePart_decorators, { kind: "method", name: "updatePart", static: false, private: false, access: { has: function (obj) { return "updatePart" in obj; }, get: function (obj) { return obj.updatePart; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _deletePart_decorators, { kind: "method", name: "deletePart", static: false, private: false, access: { has: function (obj) { return "deletePart" in obj; }, get: function (obj) { return obj.deletePart; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _reorderCheck_decorators, { kind: "method", name: "reorderCheck", static: false, private: false, access: { has: function (obj) { return "reorderCheck" in obj; }, get: function (obj) { return obj.reorderCheck; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _createVendor_decorators, { kind: "method", name: "createVendor", static: false, private: false, access: { has: function (obj) { return "createVendor" in obj; }, get: function (obj) { return obj.createVendor; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getVendors_decorators, { kind: "method", name: "getVendors", static: false, private: false, access: { has: function (obj) { return "getVendors" in obj; }, get: function (obj) { return obj.getVendors; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _updateVendor_decorators, { kind: "method", name: "updateVendor", static: false, private: false, access: { has: function (obj) { return "updateVendor" in obj; }, get: function (obj) { return obj.updateVendor; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _deleteVendor_decorators, { kind: "method", name: "deleteVendor", static: false, private: false, access: { has: function (obj) { return "deleteVendor" in obj; }, get: function (obj) { return obj.deleteVendor; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        InventoryController = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return InventoryController = _classThis;
}();
exports.InventoryController = InventoryController;
