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
exports.AccountingController = void 0;
var common_1 = require("@nestjs/common");
var jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
var Roles_guard_1 = require("../auth/Roles.guard");
var Role_decorator_1 = require("../auth/Role.decorator");
var AccountingController = function () {
    var _classDecorators = [(0, common_1.Controller)('accounting'), (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, Roles_guard_1.RolessGuard)];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _createEntry_decorators;
    var _getAccounts_decorators;
    var _getJournal_decorators;
    var _getProfitAndLoss_decorators;
    var _getBalanceSheet_decorators;
    var AccountingController = _classThis = /** @class */ (function () {
        function AccountingController_1(accountingService) {
            this.accountingService = (__runInitializers(this, _instanceExtraInitializers), accountingService);
        }
        AccountingController_1.prototype.createEntry = function (dto) {
            return this.accountingService.createEntry(dto);
        };
        AccountingController_1.prototype.getAccounts = function () {
            return this.accountingService.getAccounts();
        };
        AccountingController_1.prototype.getJournal = function () {
            return this.accountingService.getJournal();
        };
        AccountingController_1.prototype.getProfitAndLoss = function () {
            return this.accountingService.getProfitAndLoss();
        };
        AccountingController_1.prototype.getBalanceSheet = function () {
            return this.accountingService.getBalanceSheet();
        };
        return AccountingController_1;
    }());
    __setFunctionName(_classThis, "AccountingController");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _createEntry_decorators = [(0, common_1.Post)('entry'), (0, Role_decorator_1.Roles)('ACCOUNTANT')];
        _getAccounts_decorators = [(0, common_1.Get)('accounts'), (0, Role_decorator_1.Roles)('ACCOUNTANT')];
        _getJournal_decorators = [(0, common_1.Get)('journal'), (0, Role_decorator_1.Roles)('ACCOUNTANT')];
        _getProfitAndLoss_decorators = [(0, common_1.Get)('profit-loss'), (0, Role_decorator_1.Roles)('ACCOUNTANT')];
        _getBalanceSheet_decorators = [(0, common_1.Get)('balance-sheet'), (0, Role_decorator_1.Roles)('ACCOUNTANT')];
        __esDecorate(_classThis, null, _createEntry_decorators, { kind: "method", name: "createEntry", static: false, private: false, access: { has: function (obj) { return "createEntry" in obj; }, get: function (obj) { return obj.createEntry; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getAccounts_decorators, { kind: "method", name: "getAccounts", static: false, private: false, access: { has: function (obj) { return "getAccounts" in obj; }, get: function (obj) { return obj.getAccounts; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getJournal_decorators, { kind: "method", name: "getJournal", static: false, private: false, access: { has: function (obj) { return "getJournal" in obj; }, get: function (obj) { return obj.getJournal; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getProfitAndLoss_decorators, { kind: "method", name: "getProfitAndLoss", static: false, private: false, access: { has: function (obj) { return "getProfitAndLoss" in obj; }, get: function (obj) { return obj.getProfitAndLoss; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getBalanceSheet_decorators, { kind: "method", name: "getBalanceSheet", static: false, private: false, access: { has: function (obj) { return "getBalanceSheet" in obj; }, get: function (obj) { return obj.getBalanceSheet; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AccountingController = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AccountingController = _classThis;
}();
exports.AccountingController = AccountingController;
