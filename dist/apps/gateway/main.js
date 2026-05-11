/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./apps/gateway/src/app/app.controller.ts":
/*!************************************************!*\
  !*** ./apps/gateway/src/app/app.controller.ts ***!
  \************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
let AppController = class AppController {
    getHome() {
        return { title: 'Bookhaus | Home' };
    }
};
exports.AppController = AppController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getHome", null);
exports.AppController = AppController = __decorate([
    (0, common_1.Controller)()
], AppController);


/***/ }),

/***/ "./apps/gateway/src/auth/auth.controller.ts":
/*!**************************************************!*\
  !*** ./apps/gateway/src/auth/auth.controller.ts ***!
  \**************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e, _f;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const express_1 = __webpack_require__(/*! express */ "express");
const rxjs_1 = __webpack_require__(/*! rxjs */ "rxjs");
let AuthController = class AuthController {
    constructor(client) {
        this.client = client;
    }
    async getProfile(res) {
        try {
            const user = await (0, rxjs_1.lastValueFrom)(this.client.send({ cmd: 'auth_profile' }, {}));
            return res.json(user);
        }
        catch (error) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
    }
    async login(loginDto, res) {
        try {
            const result = await (0, rxjs_1.lastValueFrom)(this.client.send({ cmd: 'auth_login' }, loginDto));
            if (!result || !result.access_token) {
                return res.status(common_1.HttpStatus.UNAUTHORIZED).json({
                    success: false,
                    message: 'Invalid Credentials'
                });
            }
            res.cookie('access_token', result.access_token, {
                httpOnly: true,
                secure: false,
                maxAge: 3600000,
            });
            return res.status(common_1.HttpStatus.OK).json({
                success: true,
                user: result.user,
                message: 'Login successful'
            });
        }
        catch (error) {
            console.error('Login Error:', error);
            return res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: 'Internal Server Error'
            });
        }
    }
    logout(res) {
        res.clearCookie('access_token');
        return res.redirect('/');
    }
    async registerCustomer(dto, res) {
        try {
            await (0, rxjs_1.lastValueFrom)(this.client.send({ cmd: 'register_customer' }, dto));
            return res.redirect('/auth/login/cust?success=Registration successful');
        }
        catch (err) {
            return res.redirect('/auth/register/cust?error=Registration failed.');
        }
    }
    async registerEmployee(dto, res) {
        try {
            await (0, rxjs_1.lastValueFrom)(this.client.send({ cmd: 'register_employee' }, dto));
            return res.redirect('/auth/login/emp?success=Staff registered');
        }
        catch (err) {
            return res.redirect('/auth/register/emp?error=Registration failed.');
        }
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Get)('profile'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _b : Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getProfile", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, typeof (_c = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _c : Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('logout'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_d = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _d : Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "logout", null);
__decorate([
    (0, common_1.Post)('register/cust'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, typeof (_e = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _e : Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "registerCustomer", null);
__decorate([
    (0, common_1.Post)('register/emp'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, typeof (_f = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _f : Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "registerEmployee", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __param(0, (0, common_1.Inject)('AUTH_SERVICE')),
    __metadata("design:paramtypes", [typeof (_a = typeof microservices_1.ClientProxy !== "undefined" && microservices_1.ClientProxy) === "function" ? _a : Object])
], AuthController);


/***/ }),

/***/ "./apps/gateway/src/auth/auth.module.ts":
/*!**********************************************!*\
  !*** ./apps/gateway/src/auth/auth.module.ts ***!
  \**********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const auth_controller_1 = __webpack_require__(/*! ./auth.controller */ "./apps/gateway/src/auth/auth.controller.ts");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            microservices_1.ClientsModule.register([
                {
                    name: 'AUTH_SERVICE',
                    transport: microservices_1.Transport.TCP,
                    options: {
                        host: process.env.AUTH_HOST || 'localhost',
                        port: 8001,
                    },
                }
            ]),
        ],
        controllers: [auth_controller_1.AuthController],
        exports: [microservices_1.ClientsModule],
    })
], AuthModule);


/***/ }),

/***/ "./apps/gateway/src/customer/customer.controller.ts":
/*!**********************************************************!*\
  !*** ./apps/gateway/src/customer/customer.controller.ts ***!
  \**********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CustomerController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const rxjs_1 = __webpack_require__(/*! rxjs */ "rxjs");
const shared_1 = __webpack_require__(/*! @app/shared */ "./libs/shared/src/index.ts");
let CustomerController = class CustomerController {
    constructor(customerClient, orderClient) {
        this.customerClient = customerClient;
        this.orderClient = orderClient;
    }
    async getProfile(req) {
        const customerId = Number(req.user?.sub);
        if (!customerId)
            throw new common_1.UnauthorizedException('Please log in again.');
        const [customer, orderHistory] = await Promise.all([
            (0, rxjs_1.firstValueFrom)(this.customerClient.send({ cmd: 'find_one_customer' }, customerId)),
            (0, rxjs_1.firstValueFrom)(this.orderClient.send({ cmd: 'find_by_customer' }, customerId)).catch(() => [])
        ]);
        return {
            customer,
            orderHistory: orderHistory || [],
            user: req.user
        };
    }
    async getCustomerRecords(req) {
        const customers = await (0, rxjs_1.firstValueFrom)(this.customerClient.send({ cmd: 'find_all_customers' }, {}));
        const allOrders = await (0, rxjs_1.firstValueFrom)(this.orderClient.send({ cmd: 'find_all_orders' }, {})).catch(() => []);
        const customersWithCounts = customers.map(cus => {
            const customerOrders = allOrders.filter(ord => ord.customerId === cus.id);
            return {
                ...cus,
                orderCount: customerOrders.length
            };
        });
        return {
            customers: customersWithCounts,
            user: req.user
        };
    }
    async getUpdateProfile(req) {
        const customerId = Number(req.user?.sub);
        if (!customerId)
            throw new common_1.UnauthorizedException('Please log in again.');
        const customer = await (0, rxjs_1.firstValueFrom)(this.customerClient.send({ cmd: 'find_one_customer' }, customerId));
        return {
            customer,
            user: req.user
        };
    }
    async updateProfile(updateData, req, res) {
        const userId = Number(req.user.sub);
        await (0, rxjs_1.firstValueFrom)(this.customerClient.send({ cmd: 'update_customer' }, { id: userId, dto: updateData }));
        return res.redirect('/customer/profile');
    }
    async remove(id) {
        return this.customerClient.send({ cmd: 'delete_customer' }, +id);
    }
    async findOne(id) {
        return await (0, rxjs_1.firstValueFrom)(this.customerClient.send({ cmd: 'find_one_customer' }, +id).pipe((0, rxjs_1.catchError)((err) => {
            const status = err.status || common_1.HttpStatus.INTERNAL_SERVER_ERROR;
            const message = err.message || 'Error occurred in customer service';
            return (0, rxjs_1.throwError)(() => new common_1.HttpException(message, status));
        })));
    }
};
exports.CustomerController = CustomerController;
__decorate([
    (0, common_1.Get)('profile'),
    (0, shared_1.Roles)('Customer'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CustomerController.prototype, "getProfile", null);
__decorate([
    (0, common_1.Get)('records'),
    (0, shared_1.Roles)('Manager'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CustomerController.prototype, "getCustomerRecords", null);
__decorate([
    (0, common_1.Get)('edit'),
    (0, shared_1.Roles)('Customer'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CustomerController.prototype, "getUpdateProfile", null);
__decorate([
    (0, common_1.Post)(),
    (0, shared_1.Roles)('Customer'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], CustomerController.prototype, "updateProfile", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, shared_1.Roles)('Manager'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CustomerController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, shared_1.Roles)('Employee', 'Manager', 'Customer'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CustomerController.prototype, "findOne", null);
exports.CustomerController = CustomerController = __decorate([
    (0, common_1.Controller)('customer'),
    (0, common_1.UseGuards)(shared_1.JwtAuthGuard, shared_1.RolesGuard),
    __param(0, (0, common_1.Inject)('CUSTOMER_SERVICE')),
    __param(1, (0, common_1.Inject)('ORDER_SERVICE')),
    __metadata("design:paramtypes", [typeof (_a = typeof microservices_1.ClientProxy !== "undefined" && microservices_1.ClientProxy) === "function" ? _a : Object, typeof (_b = typeof microservices_1.ClientProxy !== "undefined" && microservices_1.ClientProxy) === "function" ? _b : Object])
], CustomerController);


/***/ }),

/***/ "./apps/gateway/src/customer/customer.module.ts":
/*!******************************************************!*\
  !*** ./apps/gateway/src/customer/customer.module.ts ***!
  \******************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CustomerModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const customer_controller_1 = __webpack_require__(/*! ./customer.controller */ "./apps/gateway/src/customer/customer.controller.ts");
let CustomerModule = class CustomerModule {
};
exports.CustomerModule = CustomerModule;
exports.CustomerModule = CustomerModule = __decorate([
    (0, common_1.Module)({
        imports: [
            microservices_1.ClientsModule.register([
                {
                    name: 'CUSTOMER_SERVICE',
                    transport: microservices_1.Transport.TCP,
                    options: {
                        host: process.env.CUSTOMER_HOST || 'localhost',
                        port: 8004,
                    },
                },
                {
                    name: 'ORDER_SERVICE',
                    transport: microservices_1.Transport.TCP,
                    options: {
                        host: process.env.ORDER_HOST || 'localhost',
                        port: 8003,
                    },
                },
            ]),
        ],
        controllers: [customer_controller_1.CustomerController],
    })
], CustomerModule);


/***/ }),

/***/ "./apps/gateway/src/employee/employee.controller.ts":
/*!**********************************************************!*\
  !*** ./apps/gateway/src/employee/employee.controller.ts ***!
  \**********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EmployeeController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const rxjs_1 = __webpack_require__(/*! rxjs */ "rxjs");
const shared_1 = __webpack_require__(/*! @app/shared */ "./libs/shared/src/index.ts");
let EmployeeController = class EmployeeController {
    constructor(client) {
        this.client = client;
    }
    async getProfile(req) {
        const employee = await (0, rxjs_1.firstValueFrom)(this.client.send({ cmd: 'find_one_employee' }, req.user.sub));
        return { employee, user: req.user };
    }
    async updateProfile(req) {
        const employee = await (0, rxjs_1.firstValueFrom)(this.client.send({ cmd: 'find_one_employee' }, req.user.sub));
        return { employee, user: req.user };
    }
    async getStaffDirectory(status, req) {
        const employees = await (0, rxjs_1.firstValueFrom)(this.client.send({ cmd: 'find_all_employees' }, {}));
        return {
            employees,
            user: req.user,
            status: status || null
        };
    }
    async editProfile(updateDto, req, res) {
        await (0, rxjs_1.firstValueFrom)(this.client.send({ cmd: 'update_employee_profile' }, { id: req.user.sub, updateDto }));
        return res.redirect('/employee/profile');
    }
    async showEditStaff(id, req) {
        const employee = await (0, rxjs_1.firstValueFrom)(this.client.send({ cmd: 'find_one_employee' }, id));
        return { employee, user: req.user };
    }
    async updateStaff(id, updateDto, res) {
        try {
            await (0, rxjs_1.firstValueFrom)(this.client.send({ cmd: 'update_employee_manager' }, {
                id: +id,
                updateDto
            }));
            return res.redirect('/employee/staff?status=updated');
        }
        catch (error) {
            console.error('Update Staff Error:', error);
            return res.redirect(`/employee/editStaff/${id}?error=Failed to update`);
        }
    }
};
exports.EmployeeController = EmployeeController;
__decorate([
    (0, common_1.Get)('profile'),
    (0, shared_1.Roles)('Employee', 'Manager'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EmployeeController.prototype, "getProfile", null);
__decorate([
    (0, common_1.Get)('update'),
    (0, shared_1.Roles)('Employee', 'Manager'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EmployeeController.prototype, "updateProfile", null);
__decorate([
    (0, common_1.Get)('staff'),
    (0, shared_1.Roles)('Employee', 'Manager'),
    __param(0, (0, common_1.Query)('status')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], EmployeeController.prototype, "getStaffDirectory", null);
__decorate([
    (0, common_1.Post)(),
    (0, shared_1.Roles)('Employee'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], EmployeeController.prototype, "editProfile", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], EmployeeController.prototype, "showEditStaff", null);
__decorate([
    (0, common_1.Post)(':id'),
    (0, shared_1.Roles)('Manager'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], EmployeeController.prototype, "updateStaff", null);
exports.EmployeeController = EmployeeController = __decorate([
    (0, common_1.Controller)('employee'),
    (0, common_1.UseGuards)(shared_1.JwtAuthGuard, shared_1.RolesGuard),
    __param(0, (0, common_1.Inject)('EMPLOYEE_SERVICE')),
    __metadata("design:paramtypes", [typeof (_a = typeof microservices_1.ClientProxy !== "undefined" && microservices_1.ClientProxy) === "function" ? _a : Object])
], EmployeeController);


/***/ }),

/***/ "./apps/gateway/src/employee/employee.module.ts":
/*!******************************************************!*\
  !*** ./apps/gateway/src/employee/employee.module.ts ***!
  \******************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EmployeeModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const employee_controller_1 = __webpack_require__(/*! ./employee.controller */ "./apps/gateway/src/employee/employee.controller.ts");
let EmployeeModule = class EmployeeModule {
};
exports.EmployeeModule = EmployeeModule;
exports.EmployeeModule = EmployeeModule = __decorate([
    (0, common_1.Module)({
        imports: [
            microservices_1.ClientsModule.register([
                {
                    name: 'EMPLOYEE_SERVICE',
                    transport: microservices_1.Transport.TCP,
                    options: { host: 'employee-service', port: 8007 },
                },
            ]),
        ],
        controllers: [employee_controller_1.EmployeeController],
    })
], EmployeeModule);


/***/ }),

/***/ "./apps/gateway/src/favorite/favorite.controller.ts":
/*!**********************************************************!*\
  !*** ./apps/gateway/src/favorite/favorite.controller.ts ***!
  \**********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FavoriteController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const rxjs_1 = __webpack_require__(/*! rxjs */ "rxjs");
const shared_1 = __webpack_require__(/*! @app/shared */ "./libs/shared/src/index.ts");
let FavoriteController = class FavoriteController {
    constructor(favoriteClient, inventoryClient) {
        this.favoriteClient = favoriteClient;
        this.inventoryClient = inventoryClient;
    }
    async findAll(req) {
        const userId = Number(req.user.sub);
        const favoriteRecords = await (0, rxjs_1.firstValueFrom)(this.favoriteClient.send({ cmd: 'get_favorites' }, userId));
        const favoritesWithBooks = await Promise.all(favoriteRecords.map(async (fav) => {
            try {
                const book = await (0, rxjs_1.firstValueFrom)(this.inventoryClient.send({ cmd: 'find_one_book' }, fav.productId));
                return { ...fav, book };
            }
            catch (err) {
                console.error(`Book ID ${fav.productId} not found in Inventory`);
                return { ...fav, book: null };
            }
        }));
        return {
            favorites: favoritesWithBooks,
            user: req.user
        };
    }
    async add(productId, req) {
        const payload = {
            userId: Number(req.user.sub),
            productId: Number(productId)
        };
        const result = await (0, rxjs_1.firstValueFrom)(this.favoriteClient.send({ cmd: 'add_favorite' }, payload));
        return { success: true, message: 'Added to wishlist!', data: result };
    }
    async remove(productId, req) {
        const payload = {
            userId: Number(req.user.sub),
            productId: Number(productId)
        };
        await (0, rxjs_1.firstValueFrom)(this.favoriteClient.send({ cmd: 'remove_favorite' }, payload));
        return { success: true, message: 'Removed from wishlist' };
    }
};
exports.FavoriteController = FavoriteController;
__decorate([
    (0, common_1.Get)(),
    (0, shared_1.Roles)('Customer'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FavoriteController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)(':productId'),
    (0, shared_1.Roles)('Customer'),
    __param(0, (0, common_1.Param)('productId')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], FavoriteController.prototype, "add", null);
__decorate([
    (0, common_1.Delete)(),
    (0, shared_1.Roles)('Customer'),
    __param(0, (0, common_1.Body)('productId')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], FavoriteController.prototype, "remove", null);
exports.FavoriteController = FavoriteController = __decorate([
    (0, common_1.Controller)('favorite'),
    (0, common_1.UseGuards)(shared_1.JwtAuthGuard, shared_1.RolesGuard),
    __param(0, (0, common_1.Inject)('FAVORITE_SERVICE')),
    __param(1, (0, common_1.Inject)('INVENTORY_SERVICE')),
    __metadata("design:paramtypes", [typeof (_a = typeof microservices_1.ClientProxy !== "undefined" && microservices_1.ClientProxy) === "function" ? _a : Object, typeof (_b = typeof microservices_1.ClientProxy !== "undefined" && microservices_1.ClientProxy) === "function" ? _b : Object])
], FavoriteController);


/***/ }),

/***/ "./apps/gateway/src/favorite/favorite.module.ts":
/*!******************************************************!*\
  !*** ./apps/gateway/src/favorite/favorite.module.ts ***!
  \******************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FavoriteModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const favorite_controller_1 = __webpack_require__(/*! ./favorite.controller */ "./apps/gateway/src/favorite/favorite.controller.ts");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
let FavoriteModule = class FavoriteModule {
};
exports.FavoriteModule = FavoriteModule;
exports.FavoriteModule = FavoriteModule = __decorate([
    (0, common_1.Module)({
        imports: [
            microservices_1.ClientsModule.register([
                {
                    name: 'FAVORITE_SERVICE',
                    transport: microservices_1.Transport.TCP,
                    options: {
                        host: process.env.FAVORITE_HOST || 'localhost',
                        port: 8006,
                    },
                },
                {
                    name: 'INVENTORY_SERVICE',
                    transport: microservices_1.Transport.TCP,
                    options: {
                        host: process.env.INVENTORY_HOST || 'localhost',
                        port: 8002,
                    },
                },
            ]),
        ],
        controllers: [favorite_controller_1.FavoriteController],
    })
], FavoriteModule);


/***/ }),

/***/ "./apps/gateway/src/gateway.module.ts":
/*!********************************************!*\
  !*** ./apps/gateway/src/gateway.module.ts ***!
  \********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GatewayModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const jwt_1 = __webpack_require__(/*! @nestjs/jwt */ "@nestjs/jwt");
const auth_module_1 = __webpack_require__(/*! ./auth/auth.module */ "./apps/gateway/src/auth/auth.module.ts");
const inventory_module_1 = __webpack_require__(/*! ./inventory/inventory.module */ "./apps/gateway/src/inventory/inventory.module.ts");
const order_module_1 = __webpack_require__(/*! ./order/order.module */ "./apps/gateway/src/order/order.module.ts");
const info_module_1 = __webpack_require__(/*! ./info/info.module */ "./apps/gateway/src/info/info.module.ts");
const customer_module_1 = __webpack_require__(/*! ./customer/customer.module */ "./apps/gateway/src/customer/customer.module.ts");
const favorite_module_1 = __webpack_require__(/*! ./favorite/favorite.module */ "./apps/gateway/src/favorite/favorite.module.ts");
const employee_module_1 = __webpack_require__(/*! ./employee/employee.module */ "./apps/gateway/src/employee/employee.module.ts");
const app_controller_1 = __webpack_require__(/*! ./app/app.controller */ "./apps/gateway/src/app/app.controller.ts");
let GatewayModule = class GatewayModule {
};
exports.GatewayModule = GatewayModule;
exports.GatewayModule = GatewayModule = __decorate([
    (0, common_1.Module)({
        imports: [
            jwt_1.JwtModule.register({
                global: true,
                secret: process.env.JWT_SECRET || 'my-super-secret-key-123',
                signOptions: { expiresIn: '1h' },
            }),
            auth_module_1.AuthModule,
            inventory_module_1.InventoryModule,
            order_module_1.OrderModule,
            info_module_1.InfoModule,
            customer_module_1.CustomerModule,
            favorite_module_1.FavoriteModule,
            employee_module_1.EmployeeModule
        ],
        controllers: [app_controller_1.AppController],
    })
], GatewayModule);


/***/ }),

/***/ "./apps/gateway/src/info/info.controller.ts":
/*!**************************************************!*\
  !*** ./apps/gateway/src/info/info.controller.ts ***!
  \**************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.InfoController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const shared_1 = __webpack_require__(/*! @app/shared */ "./libs/shared/src/index.ts");
const rxjs_1 = __webpack_require__(/*! rxjs */ "rxjs");
let InfoController = class InfoController {
    constructor(infoClient) {
        this.infoClient = infoClient;
    }
    async getMicroserviceInfo() {
        try {
            return await (0, rxjs_1.firstValueFrom)(this.infoClient.send({ cmd: 'get_app_info' }, {}));
        }
        catch (err) {
            return {
                description: 'Welcome to Bookhaus!',
                status: 'Offline'
            };
        }
    }
    async homePage(req) {
        const info = await this.getMicroserviceInfo();
        return {
            title: 'Home',
            description: info.description,
            user: req.user
        };
    }
    async aboutPage(req) {
        const info = await this.getMicroserviceInfo();
        return {
            title: 'About Us',
            description: info.aboutText || 'Learn more about our story.',
            user: req.user
        };
    }
    async contactPage(req) {
        return {
            title: 'Contact Us',
            description: 'Get in touch with Bookhaus!',
            user: req.user
        };
    }
    async servicePage(req) {
        return {
            title: 'Our Services',
            description: 'Check out what Bookhaus has to offer!',
            user: req.user
        };
    }
};
exports.InfoController = InfoController;
__decorate([
    (0, common_1.Get)('home'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], InfoController.prototype, "homePage", null);
__decorate([
    (0, common_1.Get)('about'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], InfoController.prototype, "aboutPage", null);
__decorate([
    (0, common_1.Get)('contact'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], InfoController.prototype, "contactPage", null);
__decorate([
    (0, common_1.Get)('service'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], InfoController.prototype, "servicePage", null);
exports.InfoController = InfoController = __decorate([
    (0, common_1.Controller)('info'),
    (0, common_1.UseGuards)(shared_1.JwtAuthGuard),
    __param(0, (0, common_1.Inject)('INFO_SERVICE')),
    __metadata("design:paramtypes", [typeof (_a = typeof microservices_1.ClientProxy !== "undefined" && microservices_1.ClientProxy) === "function" ? _a : Object])
], InfoController);


/***/ }),

/***/ "./apps/gateway/src/info/info.module.ts":
/*!**********************************************!*\
  !*** ./apps/gateway/src/info/info.module.ts ***!
  \**********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.InfoModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const info_controller_1 = __webpack_require__(/*! ./info.controller */ "./apps/gateway/src/info/info.controller.ts");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
let InfoModule = class InfoModule {
};
exports.InfoModule = InfoModule;
exports.InfoModule = InfoModule = __decorate([
    (0, common_1.Module)({
        imports: [
            microservices_1.ClientsModule.register([
                {
                    name: 'INFO_SERVICE',
                    transport: microservices_1.Transport.TCP,
                    options: {
                        host: process.env.INFO_HOST || 'localhost',
                        port: 8005,
                    },
                },
            ]),
        ],
        controllers: [info_controller_1.InfoController],
    })
], InfoModule);


/***/ }),

/***/ "./apps/gateway/src/inventory/inventory.controller.ts":
/*!************************************************************!*\
  !*** ./apps/gateway/src/inventory/inventory.controller.ts ***!
  \************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.InventoryController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const platform_express_1 = __webpack_require__(/*! @nestjs/platform-express */ "@nestjs/platform-express");
const express_1 = __webpack_require__(/*! express */ "express");
const rxjs_1 = __webpack_require__(/*! rxjs */ "rxjs");
const shared_1 = __webpack_require__(/*! @app/shared */ "./libs/shared/src/index.ts");
let InventoryController = class InventoryController {
    constructor(client) {
        this.client = client;
        this.genres = [
            "Classic", "Science Fiction", "Fiction", "Technology", "Young Adult",
            "Fantasy", "Horror", "Thriller", "Non-Fiction", "Mystery", "Children", "Philosophy"
        ];
    }
    async showAddNewBookPage(req) {
        return { genres: this.genres, user: req.user };
    }
    async editBook(query, req, res) {
        const result = await (0, rxjs_1.firstValueFrom)(this.client.send({ cmd: 'find_all_books' }, {
            page: query.page || 1,
            limit: 12,
            title: query.title || '',
            author: query.author || '',
            genre: query.genre || ''
        }));
        const data = {
            user: req.user || null,
            books: result.data,
            pagination: {
                current: result.currentPage,
                total: result.totalPages,
                totalItems: result.total
            },
            filters: query
        };
    }
    async showEditPage(id) {
        const book = await (0, rxjs_1.firstValueFrom)(this.client.send({ cmd: 'find_one_book' }, +id));
        return { book, genres: this.genres };
    }
    async searchBooks(query, req) {
        try {
            const result = await (0, rxjs_1.firstValueFrom)(this.client.send({ cmd: 'find_all_books' }, {
                page: Number(query.page) || 1,
                limit: 12,
                title: query.title || '',
                author: query.author || '',
                genre: query.genre || ''
            }));
            return {
                user: req.user || null,
                books: result?.data || [],
                pagination: {
                    current: result?.currentPage || 1,
                    total: result?.totalPages || 1,
                    totalItems: result?.total || 0
                },
                filters: query
            };
        }
        catch (error) {
            console.error("Gateway Search Error:", error);
            throw new common_1.InternalServerErrorException("Microservice communication failed");
        }
    }
    async viewPage(id, req) {
        try {
            console.log(`Fetching book details for ID: ${id}`);
            const book = await (0, rxjs_1.firstValueFrom)(this.client.send({ cmd: 'find_one_book' }, +id));
            if (!book)
                throw new common_1.NotFoundException('Book not found');
            return {
                book,
                user: req.user || null
            };
        }
        catch (err) {
            throw new common_1.NotFoundException('Book not found');
        }
    }
    async getBookImage(id, res) {
        console.log(`Fetching image for book ID: ${id}`);
        const book = await (0, rxjs_1.firstValueFrom)(this.client.send({ cmd: 'find_one_book' }, +id));
        if (!book || !book.photo) {
            throw new common_1.NotFoundException('Image not found');
        }
        const imageBuffer = Buffer.from(book.photo);
        res.setHeader('Content-Type', 'image/jpeg');
        return res.send(imageBuffer);
    }
    async create(dto, file, res, req) {
        try {
            await (0, rxjs_1.firstValueFrom)(this.client.send({ cmd: 'create_book' }, {
                dto,
                file: file ? {
                    buffer: file.buffer.toString('base64'),
                    originalname: file.originalname,
                    mimetype: file.mimetype,
                }
                    : null
            }));
            return res.redirect('/book/add?status=success');
        }
        catch (err) {
            return res.redirect('/book/add?status=error');
        }
    }
    async remove(id) {
        return await (0, rxjs_1.firstValueFrom)(this.client.send({ cmd: 'delete_book' }, +id));
    }
    async update(id, updateBookDto) {
        return await (0, rxjs_1.firstValueFrom)(this.client.send({ cmd: 'update_book' }, { id: +id, dto: updateBookDto }));
    }
};
exports.InventoryController = InventoryController;
__decorate([
    (0, common_1.Get)('add'),
    (0, shared_1.Roles)('Employee', 'Manager'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], InventoryController.prototype, "showAddNewBookPage", null);
__decorate([
    (0, common_1.Get)('edit'),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], InventoryController.prototype, "editBook", null);
__decorate([
    (0, common_1.Get)('edit-view/:id'),
    (0, shared_1.Roles)('Employee', 'Manager'),
    (0, common_1.Render)('employee/editView'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], InventoryController.prototype, "showEditPage", null);
__decorate([
    (0, common_1.Get)('search'),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], InventoryController.prototype, "searchBooks", null);
__decorate([
    (0, common_1.Get)('view/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], InventoryController.prototype, "viewPage", null);
__decorate([
    (0, common_1.Get)('image/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_b = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _b : Object]),
    __metadata("design:returntype", Promise)
], InventoryController.prototype, "getBookImage", null);
__decorate([
    (0, common_1.Post)(),
    (0, shared_1.Roles)('Employee', 'Manager'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('photo')),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __param(2, (0, common_1.Res)()),
    __param(3, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, typeof (_d = typeof Express !== "undefined" && (_c = Express.Multer) !== void 0 && _c.File) === "function" ? _d : Object, Object, Object]),
    __metadata("design:returntype", Promise)
], InventoryController.prototype, "create", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, shared_1.Roles)('Manager'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], InventoryController.prototype, "remove", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, shared_1.Roles)('Manager'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], InventoryController.prototype, "update", null);
exports.InventoryController = InventoryController = __decorate([
    (0, common_1.Controller)('book'),
    (0, common_1.UseGuards)(shared_1.JwtAuthGuard, shared_1.RolesGuard),
    __param(0, (0, common_1.Inject)('INVENTORY_SERVICE')),
    __metadata("design:paramtypes", [typeof (_a = typeof microservices_1.ClientProxy !== "undefined" && microservices_1.ClientProxy) === "function" ? _a : Object])
], InventoryController);


/***/ }),

/***/ "./apps/gateway/src/inventory/inventory.module.ts":
/*!********************************************************!*\
  !*** ./apps/gateway/src/inventory/inventory.module.ts ***!
  \********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.InventoryModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const inventory_controller_1 = __webpack_require__(/*! ./inventory.controller */ "./apps/gateway/src/inventory/inventory.controller.ts");
let InventoryModule = class InventoryModule {
};
exports.InventoryModule = InventoryModule;
exports.InventoryModule = InventoryModule = __decorate([
    (0, common_1.Module)({
        imports: [
            microservices_1.ClientsModule.register([
                {
                    name: 'INVENTORY_SERVICE',
                    transport: microservices_1.Transport.TCP,
                    options: {
                        host: process.env.INVENTORY_HOST || 'localhost',
                        port: 8002,
                    },
                }
            ]),
        ],
        controllers: [inventory_controller_1.InventoryController],
    })
], InventoryModule);


/***/ }),

/***/ "./apps/gateway/src/order/order.controller.ts":
/*!****************************************************!*\
  !*** ./apps/gateway/src/order/order.controller.ts ***!
  \****************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OrderController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const rxjs_1 = __webpack_require__(/*! rxjs */ "rxjs");
const shared_1 = __webpack_require__(/*! @app/shared */ "./libs/shared/src/index.ts");
const express_1 = __webpack_require__(/*! express */ "express");
let OrderController = class OrderController {
    constructor(client, customerClient) {
        this.client = client;
        this.customerClient = customerClient;
    }
    async updateStatus(id, status, req) {
        const payload = {
            id: +id,
            status,
            userId: Number(req.user.sub),
            userRole: req.user.DTYPE
        };
        return await (0, rxjs_1.firstValueFrom)(this.client.send({ cmd: 'update_order_status' }, payload));
    }
    async checkout(req, res) {
        const userId = Number(req.user.sub);
        const cart = await (0, rxjs_1.firstValueFrom)(this.client.send({ cmd: 'get_cart' }, userId));
        if (!cart || cart.length === 0) {
            return res.redirect('/order/cart?error=empty');
        }
        const orderId = cart[0].orderId;
        return res.redirect(`/order/payment/${orderId}`);
    }
    async showSuccess(orderId, req) {
        const order = await (0, rxjs_1.firstValueFrom)(this.client.send({ cmd: 'find_one_order' }, +orderId));
        if (!order)
            throw new common_1.NotFoundException('Order not found');
        const customer = await (0, rxjs_1.firstValueFrom)(this.customerClient.send({ cmd: 'find_one_customer' }, order.customerId)).catch(() => null);
        return { order, customer, user: req.user };
    }
    async viewCart(req) {
        const cart = await (0, rxjs_1.firstValueFrom)(this.client.send({ cmd: 'get_cart' }, Number(req.user.sub))).catch(() => []);
        const cartTotal = cart.reduce((sum, item) => {
            return sum + (Number(item.unitPrice) * item.quantity);
        }, 0);
        return { cart, cartTotal, user: req.user };
    }
    async showPayment(orderId, req) {
        return { orderId, user: req.user };
    }
    async confirmPayment(orderId, req) {
        const payload = {
            userId: Number(req.user.sub),
            orderId: Number(orderId)
        };
        const completedOrder = await (0, rxjs_1.firstValueFrom)(this.client.send({ cmd: 'process_checkout' }, payload));
        return { success: true, redirectUrl: `/order/success/${completedOrder.orderId}` };
    }
    async addToCart(productId, req) {
        try {
            const userId = Number(req.user?.sub);
            const pid = Number(productId);
            if (!userId || !pid) {
                throw new common_1.BadRequestException('Invalid User or Product ID');
            }
            const payload = { userId: userId, productId: pid };
            return await (0, rxjs_1.firstValueFrom)(this.client.send({ cmd: 'add_to_cart' }, payload));
        }
        catch (err) {
            console.error('Order Service Error:', err);
            throw new common_1.InternalServerErrorException(err instanceof Error ? err.message : 'Order service unreachable');
        }
    }
    async removeFromCart(productId, req) {
        const payload = {
            userId: Number(req.user.sub),
            productId: +productId,
            userRole: req.user.DTYPE
        };
        try {
            await (0, rxjs_1.firstValueFrom)(this.client.send({ cmd: 'remove_item' }, payload));
            return { success: true };
        }
        catch (err) {
            return { success: false, error: err instanceof Error ? err.message : 'Unknown error' };
        }
    }
    async updateCartQuantity(data, req) {
        if (!data.productId || !data.quantity)
            throw new common_1.BadRequestException('Invalid data');
        const payload = {
            userId: Number(req.user.sub),
            productId: Number(data.productId),
            quantity: Number(data.quantity)
        };
        try {
            await (0, rxjs_1.firstValueFrom)(this.client.send({ cmd: 'update_cart_quantity' }, payload));
            return { success: true };
        }
        catch (err) {
            return { success: false };
        }
    }
    async remove(id, req) {
        return await (0, rxjs_1.firstValueFrom)(this.client.send({ cmd: 'delete_order' }, { id: +id, userRole: req.user.DTYPE }));
    }
    async cancelCart(req) {
        const userId = Number(req.user.sub);
        await (0, rxjs_1.firstValueFrom)(this.client.send({ cmd: 'cancel_order' }, userId));
        return { success: true };
    }
    async getCompletedOrders(req) {
        const historyOrders = await (0, rxjs_1.firstValueFrom)(this.client.send({ cmd: 'find_completed_orders' }, { userRole: req.user.DTYPE })).catch(() => []);
        const ordersWithCustomers = await Promise.all(historyOrders.map(async (ord) => {
            const customer = await (0, rxjs_1.firstValueFrom)(this.customerClient.send({ cmd: 'find_one_customer' }, ord.customerId)).catch(() => null);
            return { ...ord, customer };
        }));
        const totalRevenue = historyOrders.reduce((sum, ord) => sum + (ord.orderTotal || 0), 0);
        return {
            historyOrders: ordersWithCustomers,
            totalRevenue,
            user: req.user
        };
    }
    async getCustomerHistory(customerId, req) {
        if (!customerId)
            throw new common_1.BadRequestException('Customer ID is required');
        const [customer, orderHistory] = await Promise.all([
            (0, rxjs_1.firstValueFrom)(this.customerClient.send({ cmd: 'find_one_customer' }, customerId)),
            (0, rxjs_1.firstValueFrom)(this.client.send({ cmd: 'find_by_customer' }, customerId)).catch(() => [])
        ]);
        console.log(customer);
        console.log(orderHistory);
        const totalRevenue = orderHistory.reduce((acc, ord) => acc + Number(ord.orderTotal), 0);
        return { orderHistory, totalRevenue, customer, user: req.user };
    }
    async getCustomerData(customerId) {
        const customer = (0, rxjs_1.firstValueFrom)(this.client.send({ cmd: 'find_by_customer' }, customerId)).catch(() => []);
        return { customer: customer };
    }
    async getActiveOrders(req) {
        const orders = await (0, rxjs_1.firstValueFrom)(this.client.send({ cmd: 'find_active_orders' }, { userRole: req.user.DTYPE })).catch(() => []);
        return { orders, user: req.user };
    }
    async getOrder(id) {
        return await (0, rxjs_1.firstValueFrom)(this.client.send({ cmd: 'find_one_order' }, +id));
    }
};
exports.OrderController = OrderController;
__decorate([
    (0, common_1.Post)('update-status/:id'),
    (0, shared_1.Roles)('Employee', 'Manager', 'Customer'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('status')),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "updateStatus", null);
__decorate([
    (0, common_1.Post)('checkout'),
    (0, shared_1.Roles)('Customer'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, typeof (_c = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _c : Object]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "checkout", null);
__decorate([
    (0, common_1.Get)('success/:id'),
    (0, shared_1.Roles)('Customer'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "showSuccess", null);
__decorate([
    (0, common_1.Get)('cart'),
    (0, shared_1.Roles)('Customer'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "viewCart", null);
__decorate([
    (0, common_1.Get)('payment/:id'),
    (0, shared_1.Roles)('Customer'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "showPayment", null);
__decorate([
    (0, common_1.Post)('payment/confirm'),
    (0, shared_1.Roles)('Customer'),
    __param(0, (0, common_1.Body)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "confirmPayment", null);
__decorate([
    (0, common_1.Post)('add/:id'),
    (0, shared_1.Roles)('Customer'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "addToCart", null);
__decorate([
    (0, common_1.Post)('cart/remove'),
    (0, shared_1.Roles)('Customer'),
    __param(0, (0, common_1.Body)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "removeFromCart", null);
__decorate([
    (0, common_1.Post)('cart/update'),
    (0, shared_1.Roles)('Customer'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "updateCartQuantity", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, shared_1.Roles)('Customer', 'Manager'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)('cart/cancel'),
    (0, shared_1.Roles)('Customer'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "cancelCart", null);
__decorate([
    (0, common_1.Get)('completed'),
    (0, shared_1.Roles)('Manager'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "getCompletedOrders", null);
__decorate([
    (0, common_1.Get)('history'),
    (0, shared_1.Roles)('Employee', 'Manager'),
    __param(0, (0, common_1.Query)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "getCustomerHistory", null);
__decorate([
    (0, common_1.Get)('customer/:id'),
    (0, shared_1.Roles)('Employee', 'Manager'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "getCustomerData", null);
__decorate([
    (0, common_1.Get)('active'),
    (0, shared_1.Roles)('Employee', 'Manager'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "getActiveOrders", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, shared_1.Roles)('Employee', 'Manager', 'Customer'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "getOrder", null);
exports.OrderController = OrderController = __decorate([
    (0, common_1.Controller)('order'),
    (0, common_1.UseGuards)(shared_1.JwtAuthGuard, shared_1.RolesGuard),
    __param(0, (0, common_1.Inject)('ORDER_SERVICE')),
    __param(1, (0, common_1.Inject)('CUSTOMER_SERVICE')),
    __metadata("design:paramtypes", [typeof (_a = typeof microservices_1.ClientProxy !== "undefined" && microservices_1.ClientProxy) === "function" ? _a : Object, typeof (_b = typeof microservices_1.ClientProxy !== "undefined" && microservices_1.ClientProxy) === "function" ? _b : Object])
], OrderController);


/***/ }),

/***/ "./apps/gateway/src/order/order.module.ts":
/*!************************************************!*\
  !*** ./apps/gateway/src/order/order.module.ts ***!
  \************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OrderModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const order_controller_1 = __webpack_require__(/*! ./order.controller */ "./apps/gateway/src/order/order.controller.ts");
let OrderModule = class OrderModule {
};
exports.OrderModule = OrderModule;
exports.OrderModule = OrderModule = __decorate([
    (0, common_1.Module)({
        imports: [
            microservices_1.ClientsModule.register([
                {
                    name: 'CUSTOMER_SERVICE',
                    transport: microservices_1.Transport.TCP,
                    options: {
                        host: process.env.CUSTOMER_HOST || 'localhost',
                        port: 8004,
                    },
                },
                {
                    name: 'ORDER_SERVICE',
                    transport: microservices_1.Transport.TCP,
                    options: {
                        host: process.env.ORDER_HOST || 'localhost',
                        port: 8003,
                    },
                },
            ]),
        ],
        controllers: [order_controller_1.OrderController],
    })
], OrderModule);


/***/ }),

/***/ "./libs/shared/src/decorators/roles.decorator.ts":
/*!*******************************************************!*\
  !*** ./libs/shared/src/decorators/roles.decorator.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Roles = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const Roles = (...roles) => (0, common_1.SetMetadata)('roles', roles);
exports.Roles = Roles;


/***/ }),

/***/ "./libs/shared/src/dtos/create-customer.dto.ts":
/*!*****************************************************!*\
  !*** ./libs/shared/src/dtos/create-customer.dto.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateCustomerDto = void 0;
const create_person_dto_1 = __webpack_require__(/*! ./create-person.dto */ "./libs/shared/src/dtos/create-person.dto.ts");
class CreateCustomerDto extends create_person_dto_1.CreatePersonDto {
}
exports.CreateCustomerDto = CreateCustomerDto;


/***/ }),

/***/ "./libs/shared/src/dtos/create-employee.dto.ts":
/*!*****************************************************!*\
  !*** ./libs/shared/src/dtos/create-employee.dto.ts ***!
  \*****************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateEmployeeDto = exports.Position = void 0;
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const create_person_dto_1 = __webpack_require__(/*! ./create-person.dto */ "./libs/shared/src/dtos/create-person.dto.ts");
var Position;
(function (Position) {
    Position["MANAGER"] = "Manager";
    Position["DEVELOPER"] = "Developer";
    Position["SALES"] = "Sales";
    Position["DELIVERY"] = "Delivery";
    Position["INTERN"] = "Intern";
})(Position || (exports.Position = Position = {}));
class CreateEmployeeDto extends create_person_dto_1.CreatePersonDto {
}
exports.CreateEmployeeDto = CreateEmployeeDto;
__decorate([
    (0, class_validator_1.IsNumber)({}, { message: 'Salary must be a valid number' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Salary is required' }),
    __metadata("design:type", Number)
], CreateEmployeeDto.prototype, "salary", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'Position must be a string' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Position is required' }),
    __metadata("design:type", String)
], CreateEmployeeDto.prototype, "position", void 0);
__decorate([
    (0, class_validator_1.IsDateString)({}, { message: 'Hire date must be a valid ISO date string' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Hire date is required' }),
    __metadata("design:type", String)
], CreateEmployeeDto.prototype, "hiredate", void 0);


/***/ }),

/***/ "./libs/shared/src/dtos/create-favorite.dto.ts":
/*!*****************************************************!*\
  !*** ./libs/shared/src/dtos/create-favorite.dto.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateFavoriteDto = void 0;
class CreateFavoriteDto {
}
exports.CreateFavoriteDto = CreateFavoriteDto;


/***/ }),

/***/ "./libs/shared/src/dtos/create-person.dto.ts":
/*!***************************************************!*\
  !*** ./libs/shared/src/dtos/create-person.dto.ts ***!
  \***************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreatePersonDto = exports.Gender = void 0;
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const class_transformer_1 = __webpack_require__(/*! class-transformer */ "class-transformer");
var Gender;
(function (Gender) {
    Gender["MALE"] = "Male";
    Gender["FEMALE"] = "Female";
    Gender["OTHER"] = "Other";
})(Gender || (exports.Gender = Gender = {}));
class CreatePersonDto {
}
exports.CreatePersonDto = CreatePersonDto;
__decorate([
    (0, class_validator_1.IsEmail)({}, { message: 'Please enter a valid email address' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Email is required' }),
    __metadata("design:type", String)
], CreatePersonDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'Password must be a string' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Password is required' }),
    (0, class_validator_1.MinLength)(7, { message: 'Password must be at least 7 characters long' }),
    __metadata("design:type", String)
], CreatePersonDto.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'First name must be a string' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'First name is required' }),
    (0, class_validator_1.Matches)(/^[a-zA-Z][a-zA-Z]{1,98}$/, {
        message: 'First name must start with a letter and contain only letters.',
    }),
    __metadata("design:type", String)
], CreatePersonDto.prototype, "firstname", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'Last name must be a string' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Last name is required' }),
    (0, class_validator_1.Matches)(/^[a-zA-Z][a-zA-Z]{1,98}$/, {
        message: 'Last name must start with a letter and contain only letters.',
    }),
    __metadata("design:type", String)
], CreatePersonDto.prototype, "lastname", void 0);
__decorate([
    (0, class_validator_1.IsDate)({ message: 'Birthdate must be a valid date' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Birthdate is required' }),
    (0, class_transformer_1.Type)(() => Date),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], CreatePersonDto.prototype, "birthdate", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(Gender, { message: 'Gender must be Male, Female, or Other' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Gender is required' }),
    __metadata("design:type", String)
], CreatePersonDto.prototype, "gender", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'Address must be a string' }),
    __metadata("design:type", String)
], CreatePersonDto.prototype, "address", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'Phone number must be a string' }),
    (0, class_validator_1.Matches)(/^[0-9]{7,15}$/, {
        message: 'Phone number must contain only digits and can optionally start with a +.',
    }),
    __metadata("design:type", String)
], CreatePersonDto.prototype, "phone", void 0);


/***/ }),

/***/ "./libs/shared/src/dtos/update-customer.dto.ts":
/*!*****************************************************!*\
  !*** ./libs/shared/src/dtos/update-customer.dto.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateCustomerDto = void 0;
const mapped_types_1 = __webpack_require__(/*! @nestjs/mapped-types */ "@nestjs/mapped-types");
const create_customer_dto_1 = __webpack_require__(/*! ./create-customer.dto */ "./libs/shared/src/dtos/create-customer.dto.ts");
class UpdateCustomerDto extends (0, mapped_types_1.PartialType)(create_customer_dto_1.CreateCustomerDto) {
}
exports.UpdateCustomerDto = UpdateCustomerDto;


/***/ }),

/***/ "./libs/shared/src/dtos/update-employee.dto.ts":
/*!*****************************************************!*\
  !*** ./libs/shared/src/dtos/update-employee.dto.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateEmployeeDto = void 0;
const mapped_types_1 = __webpack_require__(/*! @nestjs/mapped-types */ "@nestjs/mapped-types");
const create_employee_dto_1 = __webpack_require__(/*! ./create-employee.dto */ "./libs/shared/src/dtos/create-employee.dto.ts");
class UpdateEmployeeDto extends (0, mapped_types_1.PartialType)(create_employee_dto_1.CreateEmployeeDto) {
}
exports.UpdateEmployeeDto = UpdateEmployeeDto;


/***/ }),

/***/ "./libs/shared/src/dtos/update-favorite.dto.ts":
/*!*****************************************************!*\
  !*** ./libs/shared/src/dtos/update-favorite.dto.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateFavoriteDto = void 0;
const mapped_types_1 = __webpack_require__(/*! @nestjs/mapped-types */ "@nestjs/mapped-types");
const create_favorite_dto_1 = __webpack_require__(/*! ./create-favorite.dto */ "./libs/shared/src/dtos/create-favorite.dto.ts");
class UpdateFavoriteDto extends (0, mapped_types_1.PartialType)(create_favorite_dto_1.CreateFavoriteDto) {
}
exports.UpdateFavoriteDto = UpdateFavoriteDto;


/***/ }),

/***/ "./libs/shared/src/dtos/update-person.dto.ts":
/*!***************************************************!*\
  !*** ./libs/shared/src/dtos/update-person.dto.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdatePersonDto = void 0;
const mapped_types_1 = __webpack_require__(/*! @nestjs/mapped-types */ "@nestjs/mapped-types");
const create_person_dto_1 = __webpack_require__(/*! ./create-person.dto */ "./libs/shared/src/dtos/create-person.dto.ts");
class UpdatePersonDto extends (0, mapped_types_1.PartialType)(create_person_dto_1.CreatePersonDto) {
}
exports.UpdatePersonDto = UpdatePersonDto;


/***/ }),

/***/ "./libs/shared/src/entities/book.entity.ts":
/*!*************************************************!*\
  !*** ./libs/shared/src/entities/book.entity.ts ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Book = void 0;
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
let Book = class Book {
};
exports.Book = Book;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'product_id' }),
    __metadata("design:type", Number)
], Book.prototype, "productId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Book.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Book.prototype, "author", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Book.prototype, "year", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Book.prototype, "genre", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Book.prototype, "subgenre", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Book.prototype, "page", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'avg_rating', type: 'float', nullable: true }),
    __metadata("design:type", Number)
], Book.prototype, "avgRating", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float' }),
    __metadata("design:type", Number)
], Book.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 1000, nullable: true }),
    __metadata("design:type", String)
], Book.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'longblob', nullable: true }),
    __metadata("design:type", typeof (_a = typeof Buffer !== "undefined" && Buffer) === "function" ? _a : Object)
], Book.prototype, "photo", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Book.prototype, "stock", void 0);
exports.Book = Book = __decorate([
    (0, typeorm_1.Entity)({ name: 'book' })
], Book);


/***/ }),

/***/ "./libs/shared/src/entities/customer.entity.ts":
/*!*****************************************************!*\
  !*** ./libs/shared/src/entities/customer.entity.ts ***!
  \*****************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Customer = void 0;
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const person_entity_1 = __webpack_require__(/*! ./person.entity */ "./libs/shared/src/entities/person.entity.ts");
let Customer = class Customer {
};
exports.Customer = Customer;
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", Number)
], Customer.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => person_entity_1.Person, { cascade: true, onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'id' }),
    __metadata("design:type", typeof (_a = typeof person_entity_1.Person !== "undefined" && person_entity_1.Person) === "function" ? _a : Object)
], Customer.prototype, "person", void 0);
exports.Customer = Customer = __decorate([
    (0, typeorm_1.Entity)('customer')
], Customer);


/***/ }),

/***/ "./libs/shared/src/entities/employee.entity.ts":
/*!*****************************************************!*\
  !*** ./libs/shared/src/entities/employee.entity.ts ***!
  \*****************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Employee = void 0;
const person_entity_1 = __webpack_require__(/*! ./person.entity */ "./libs/shared/src/entities/person.entity.ts");
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
let Employee = class Employee {
};
exports.Employee = Employee;
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", Number)
], Employee.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => person_entity_1.Person, { cascade: true, onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'id' }),
    __metadata("design:type", typeof (_a = typeof person_entity_1.Person !== "undefined" && person_entity_1.Person) === "function" ? _a : Object)
], Employee.prototype, "person", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Employee.prototype, "salary", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Employee.prototype, "position", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', nullable: true }),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], Employee.prototype, "hiredate", void 0);
exports.Employee = Employee = __decorate([
    (0, typeorm_1.Entity)('employee')
], Employee);


/***/ }),

/***/ "./libs/shared/src/entities/favorite.entity.ts":
/*!*****************************************************!*\
  !*** ./libs/shared/src/entities/favorite.entity.ts ***!
  \*****************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Favorite = void 0;
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
let Favorite = class Favorite {
};
exports.Favorite = Favorite;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'favorite_id' }),
    __metadata("design:type", Number)
], Favorite.prototype, "favoriteId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'customer_id' }),
    __metadata("design:type", Number)
], Favorite.prototype, "customerId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'product_id' }),
    __metadata("design:type", Number)
], Favorite.prototype, "productId", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'added_date', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' }),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], Favorite.prototype, "addedDate", void 0);
exports.Favorite = Favorite = __decorate([
    (0, typeorm_1.Entity)('favorite')
], Favorite);


/***/ }),

/***/ "./libs/shared/src/entities/order-detail.entity.ts":
/*!*********************************************************!*\
  !*** ./libs/shared/src/entities/order-detail.entity.ts ***!
  \*********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OrderDetail = void 0;
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const order_entity_1 = __webpack_require__(/*! ./order.entity */ "./libs/shared/src/entities/order.entity.ts");
const book_entity_1 = __webpack_require__(/*! ./book.entity */ "./libs/shared/src/entities/book.entity.ts");
let OrderDetail = class OrderDetail {
};
exports.OrderDetail = OrderDetail;
__decorate([
    (0, typeorm_1.PrimaryColumn)({ name: 'order_id' }),
    __metadata("design:type", Number)
], OrderDetail.prototype, "orderId", void 0);
__decorate([
    (0, typeorm_1.PrimaryColumn)({ name: 'product_id' }),
    __metadata("design:type", Number)
], OrderDetail.prototype, "productId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], OrderDetail.prototype, "quantity", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'unit_price', type: 'decimal', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], OrderDetail.prototype, "unitPrice", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => order_entity_1.Order, (order) => order.orderDetails, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'order_id' }),
    __metadata("design:type", typeof (_a = typeof order_entity_1.Order !== "undefined" && order_entity_1.Order) === "function" ? _a : Object)
], OrderDetail.prototype, "order", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => book_entity_1.Book),
    (0, typeorm_1.JoinColumn)({ name: 'product_id' }),
    __metadata("design:type", typeof (_b = typeof book_entity_1.Book !== "undefined" && book_entity_1.Book) === "function" ? _b : Object)
], OrderDetail.prototype, "book", void 0);
exports.OrderDetail = OrderDetail = __decorate([
    (0, typeorm_1.Entity)('order_detail')
], OrderDetail);


/***/ }),

/***/ "./libs/shared/src/entities/order.entity.ts":
/*!**************************************************!*\
  !*** ./libs/shared/src/entities/order.entity.ts ***!
  \**************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Order = void 0;
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const order_detail_entity_1 = __webpack_require__(/*! ./order-detail.entity */ "./libs/shared/src/entities/order-detail.entity.ts");
const customer_entity_1 = __webpack_require__(/*! ./customer.entity */ "./libs/shared/src/entities/customer.entity.ts");
let Order = class Order {
};
exports.Order = Order;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'order_id' }),
    __metadata("design:type", Number)
], Order.prototype, "orderId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'order_total', type: 'float' }),
    __metadata("design:type", Number)
], Order.prototype, "orderTotal", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'order_date', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' }),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], Order.prototype, "orderDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'customer_id' }),
    __metadata("design:type", Number)
], Order.prototype, "customerId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'payment_id', nullable: true }),
    __metadata("design:type", Number)
], Order.prototype, "paymentId", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'Pending' }),
    __metadata("design:type", String)
], Order.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => order_detail_entity_1.OrderDetail, (orderDetail) => orderDetail.order),
    __metadata("design:type", Array)
], Order.prototype, "orderDetails", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => customer_entity_1.Customer),
    (0, typeorm_1.JoinColumn)({ name: 'customer_id' }),
    __metadata("design:type", typeof (_b = typeof customer_entity_1.Customer !== "undefined" && customer_entity_1.Customer) === "function" ? _b : Object)
], Order.prototype, "customer", void 0);
exports.Order = Order = __decorate([
    (0, typeorm_1.Entity)({ name: 'order' })
], Order);


/***/ }),

/***/ "./libs/shared/src/entities/person.entity.ts":
/*!***************************************************!*\
  !*** ./libs/shared/src/entities/person.entity.ts ***!
  \***************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Person = void 0;
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
let Person = class Person {
};
exports.Person = Person;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Person.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Person.prototype, "firstname", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Person.prototype, "lastname", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], Person.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], Person.prototype, "birthdate", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Person.prototype, "gender", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Person.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Person.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Person.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Person.prototype, "DTYPE", void 0);
exports.Person = Person = __decorate([
    (0, typeorm_1.Entity)('person')
], Person);


/***/ }),

/***/ "./libs/shared/src/guards/jwt-auth.guard.ts":
/*!**************************************************!*\
  !*** ./libs/shared/src/guards/jwt-auth.guard.ts ***!
  \**************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JwtAuthGuard = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const jwt_1 = __webpack_require__(/*! @nestjs/jwt */ "@nestjs/jwt");
let JwtAuthGuard = class JwtAuthGuard {
    constructor(jwtService) {
        this.jwtService = jwtService;
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const token = request.headers.authorization?.split(' ')[1] ||
            request.cookies?.['access_token'];
        if (!token) {
            request['user'] = null;
            return true;
        }
        try {
            const payload = await this.jwtService.verifyAsync(token);
            request['user'] = payload;
        }
        catch (err) {
            request['user'] = null;
        }
        return true;
    }
};
exports.JwtAuthGuard = JwtAuthGuard;
exports.JwtAuthGuard = JwtAuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof jwt_1.JwtService !== "undefined" && jwt_1.JwtService) === "function" ? _a : Object])
], JwtAuthGuard);


/***/ }),

/***/ "./libs/shared/src/guards/roles.guard.ts":
/*!***********************************************!*\
  !*** ./libs/shared/src/guards/roles.guard.ts ***!
  \***********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RolesGuard = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const core_1 = __webpack_require__(/*! @nestjs/core */ "@nestjs/core");
let RolesGuard = class RolesGuard {
    constructor(reflector) {
        this.reflector = reflector;
    }
    canActivate(context) {
        const requiredRoles = this.reflector.get('roles', context.getHandler());
        if (!requiredRoles)
            return true;
        const { user } = context.switchToHttp().getRequest();
        const hasRole = requiredRoles.includes(user.DTYPE) ||
            (user.DTYPE === 'Employee' && user.position === 'Manager');
        if (!hasRole)
            throw new common_1.ForbiddenException('Access Denied');
        return true;
    }
};
exports.RolesGuard = RolesGuard;
exports.RolesGuard = RolesGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof core_1.Reflector !== "undefined" && core_1.Reflector) === "function" ? _a : Object])
], RolesGuard);


/***/ }),

/***/ "./libs/shared/src/index.ts":
/*!**********************************!*\
  !*** ./libs/shared/src/index.ts ***!
  \**********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(/*! ./shared.module */ "./libs/shared/src/shared.module.ts"), exports);
__exportStar(__webpack_require__(/*! ./shared.service */ "./libs/shared/src/shared.service.ts"), exports);
__exportStar(__webpack_require__(/*! ./dtos/create-person.dto */ "./libs/shared/src/dtos/create-person.dto.ts"), exports);
__exportStar(__webpack_require__(/*! ./dtos/create-customer.dto */ "./libs/shared/src/dtos/create-customer.dto.ts"), exports);
__exportStar(__webpack_require__(/*! ./dtos/create-employee.dto */ "./libs/shared/src/dtos/create-employee.dto.ts"), exports);
__exportStar(__webpack_require__(/*! ./dtos/update-person.dto */ "./libs/shared/src/dtos/update-person.dto.ts"), exports);
__exportStar(__webpack_require__(/*! ./dtos/update-customer.dto */ "./libs/shared/src/dtos/update-customer.dto.ts"), exports);
__exportStar(__webpack_require__(/*! ./dtos/update-employee.dto */ "./libs/shared/src/dtos/update-employee.dto.ts"), exports);
__exportStar(__webpack_require__(/*! ./dtos/update-favorite.dto */ "./libs/shared/src/dtos/update-favorite.dto.ts"), exports);
__exportStar(__webpack_require__(/*! ./dtos/update-favorite.dto */ "./libs/shared/src/dtos/update-favorite.dto.ts"), exports);
__exportStar(__webpack_require__(/*! ./entities/person.entity */ "./libs/shared/src/entities/person.entity.ts"), exports);
__exportStar(__webpack_require__(/*! ./entities/customer.entity */ "./libs/shared/src/entities/customer.entity.ts"), exports);
__exportStar(__webpack_require__(/*! ./entities/employee.entity */ "./libs/shared/src/entities/employee.entity.ts"), exports);
__exportStar(__webpack_require__(/*! ./entities/book.entity */ "./libs/shared/src/entities/book.entity.ts"), exports);
__exportStar(__webpack_require__(/*! ./entities/order.entity */ "./libs/shared/src/entities/order.entity.ts"), exports);
__exportStar(__webpack_require__(/*! ./entities/order-detail.entity */ "./libs/shared/src/entities/order-detail.entity.ts"), exports);
__exportStar(__webpack_require__(/*! ./entities/favorite.entity */ "./libs/shared/src/entities/favorite.entity.ts"), exports);
__exportStar(__webpack_require__(/*! ./guards/jwt-auth.guard */ "./libs/shared/src/guards/jwt-auth.guard.ts"), exports);
__exportStar(__webpack_require__(/*! ./guards/roles.guard */ "./libs/shared/src/guards/roles.guard.ts"), exports);
__exportStar(__webpack_require__(/*! ./decorators/roles.decorator */ "./libs/shared/src/decorators/roles.decorator.ts"), exports);


/***/ }),

/***/ "./libs/shared/src/shared.module.ts":
/*!******************************************!*\
  !*** ./libs/shared/src/shared.module.ts ***!
  \******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SharedModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const shared_service_1 = __webpack_require__(/*! ./shared.service */ "./libs/shared/src/shared.service.ts");
let SharedModule = class SharedModule {
};
exports.SharedModule = SharedModule;
exports.SharedModule = SharedModule = __decorate([
    (0, common_1.Module)({
        providers: [shared_service_1.SharedService],
        exports: [shared_service_1.SharedService],
    })
], SharedModule);


/***/ }),

/***/ "./libs/shared/src/shared.service.ts":
/*!*******************************************!*\
  !*** ./libs/shared/src/shared.service.ts ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SharedService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
let SharedService = class SharedService {
};
exports.SharedService = SharedService;
exports.SharedService = SharedService = __decorate([
    (0, common_1.Injectable)()
], SharedService);


/***/ }),

/***/ "@nestjs/common":
/*!*********************************!*\
  !*** external "@nestjs/common" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),

/***/ "@nestjs/core":
/*!*******************************!*\
  !*** external "@nestjs/core" ***!
  \*******************************/
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),

/***/ "@nestjs/jwt":
/*!******************************!*\
  !*** external "@nestjs/jwt" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("@nestjs/jwt");

/***/ }),

/***/ "@nestjs/mapped-types":
/*!***************************************!*\
  !*** external "@nestjs/mapped-types" ***!
  \***************************************/
/***/ ((module) => {

module.exports = require("@nestjs/mapped-types");

/***/ }),

/***/ "@nestjs/microservices":
/*!****************************************!*\
  !*** external "@nestjs/microservices" ***!
  \****************************************/
/***/ ((module) => {

module.exports = require("@nestjs/microservices");

/***/ }),

/***/ "@nestjs/platform-express":
/*!*******************************************!*\
  !*** external "@nestjs/platform-express" ***!
  \*******************************************/
/***/ ((module) => {

module.exports = require("@nestjs/platform-express");

/***/ }),

/***/ "class-transformer":
/*!************************************!*\
  !*** external "class-transformer" ***!
  \************************************/
/***/ ((module) => {

module.exports = require("class-transformer");

/***/ }),

/***/ "class-validator":
/*!**********************************!*\
  !*** external "class-validator" ***!
  \**********************************/
/***/ ((module) => {

module.exports = require("class-validator");

/***/ }),

/***/ "connect-redis":
/*!********************************!*\
  !*** external "connect-redis" ***!
  \********************************/
/***/ ((module) => {

module.exports = require("connect-redis");

/***/ }),

/***/ "cookie-parser":
/*!********************************!*\
  !*** external "cookie-parser" ***!
  \********************************/
/***/ ((module) => {

module.exports = require("cookie-parser");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("express");

/***/ }),

/***/ "express-session":
/*!**********************************!*\
  !*** external "express-session" ***!
  \**********************************/
/***/ ((module) => {

module.exports = require("express-session");

/***/ }),

/***/ "redis":
/*!************************!*\
  !*** external "redis" ***!
  \************************/
/***/ ((module) => {

module.exports = require("redis");

/***/ }),

/***/ "rxjs":
/*!***********************!*\
  !*** external "rxjs" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("rxjs");

/***/ }),

/***/ "typeorm":
/*!**************************!*\
  !*** external "typeorm" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("typeorm");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!**********************************!*\
  !*** ./apps/gateway/src/main.ts ***!
  \**********************************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
const core_1 = __webpack_require__(/*! @nestjs/core */ "@nestjs/core");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const gateway_module_1 = __webpack_require__(/*! ./gateway.module */ "./apps/gateway/src/gateway.module.ts");
const connect_redis_1 = __webpack_require__(/*! connect-redis */ "connect-redis");
const redis_1 = __webpack_require__(/*! redis */ "redis");
const cookieParser = __webpack_require__(/*! cookie-parser */ "cookie-parser");
const session = __webpack_require__(/*! express-session */ "express-session");
async function bootstrap() {
    const app = await core_1.NestFactory.create(gateway_module_1.GatewayModule);
    app.setGlobalPrefix('api');
    app.enableCors({
        origin: 'http://localhost:3000',
        credentials: true,
    });
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
    const redisUrl = process.env.REDIS_URL || 'redis://127.0.0.1:6379';
    const redisClient = (0, redis_1.createClient)({ url: redisUrl });
    redisClient.connect().catch((err) => console.error('❌ Redis Error:', err));
    const redisStore = new connect_redis_1.RedisStore({
        client: redisClient,
        prefix: "bookhaus_sess:",
    });
    app.use(cookieParser());
    app.use(session({
        store: redisStore,
        secret: process.env.SESSION_SECRET || 'bookhaus_super_secret_key',
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 1000 * 60 * 60 * 24,
        },
    }));
    await app.listen(3001);
    console.log('🚀 Gateway API is live at http://localhost:3001/api');
}
bootstrap();

})();

/******/ })()
;