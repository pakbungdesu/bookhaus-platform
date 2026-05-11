/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./apps/auth-service/src/auth.controller.ts":
/*!**************************************************!*\
  !*** ./apps/auth-service/src/auth.controller.ts ***!
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
exports.AuthController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const auth_service_1 = __webpack_require__(/*! ./auth.service */ "./apps/auth-service/src/auth.service.ts");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async login(data) {
        return this.authService.login(data.email, data.password);
    }
    async registerCustomer(customerDto) {
        return this.authService.createCustomer(customerDto);
    }
    async registerEmployee(employeeDto) {
        return this.authService.createEmployee(employeeDto);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'auth_login' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'auth_register_customer' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "registerCustomer", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'auth_register_employee' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "registerEmployee", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [typeof (_a = typeof auth_service_1.AuthService !== "undefined" && auth_service_1.AuthService) === "function" ? _a : Object])
], AuthController);


/***/ }),

/***/ "./apps/auth-service/src/auth.module.ts":
/*!**********************************************!*\
  !*** ./apps/auth-service/src/auth.module.ts ***!
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
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const jwt_1 = __webpack_require__(/*! @nestjs/jwt */ "@nestjs/jwt");
const passport_1 = __webpack_require__(/*! @nestjs/passport */ "@nestjs/passport");
const auth_controller_1 = __webpack_require__(/*! ./auth.controller */ "./apps/auth-service/src/auth.controller.ts");
const auth_service_1 = __webpack_require__(/*! ./auth.service */ "./apps/auth-service/src/auth.service.ts");
const shared_1 = __webpack_require__(/*! @app/shared */ "./libs/shared/src/index.ts");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                type: 'mysql',
                host: process.env.DB_HOST || 'localhost',
                port: 3306,
                username: 'root',
                password: 'admin',
                database: 'test1',
                entities: [shared_1.Person, shared_1.Customer, shared_1.Employee],
                synchronize: false,
                logging: true,
            }),
            typeorm_1.TypeOrmModule.forFeature([shared_1.Person, shared_1.Customer, shared_1.Employee]),
            passport_1.PassportModule,
            jwt_1.JwtModule.register({
                secret: process.env.JWT_SECRET || 'my-super-secret-key-123',
                signOptions: { expiresIn: '1h' },
            }),
        ],
        controllers: [auth_controller_1.AuthController],
        providers: [auth_service_1.AuthService],
        exports: [auth_service_1.AuthService],
    })
], AuthModule);


/***/ }),

/***/ "./apps/auth-service/src/auth.service.ts":
/*!***********************************************!*\
  !*** ./apps/auth-service/src/auth.service.ts ***!
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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const jwt_1 = __webpack_require__(/*! @nestjs/jwt */ "@nestjs/jwt");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const typeorm_2 = __webpack_require__(/*! typeorm */ "typeorm");
const bcrypt = __webpack_require__(/*! bcryptjs */ "bcryptjs");
const shared_1 = __webpack_require__(/*! @app/shared */ "./libs/shared/src/index.ts");
let AuthService = class AuthService {
    constructor(personRepository, employeeRepository, customerRepository, jwtService) {
        this.personRepository = personRepository;
        this.employeeRepository = employeeRepository;
        this.customerRepository = customerRepository;
        this.jwtService = jwtService;
    }
    async login(email, pass) {
        const person = await this.personRepository.findOne({ where: { email } });
        if (!person || !(await bcrypt.compare(pass, person.password))) {
            return null;
        }
        let position = null;
        if (person.DTYPE === 'Employee') {
            const employeeData = await this.employeeRepository.findOne({
                where: { id: person.id }
            });
            position = employeeData?.position || null;
        }
        const payload = {
            sub: person.id,
            email: person.email,
            DTYPE: person.DTYPE,
            position: position
        };
        console.log(payload ?? 'payload is null.');
        return {
            access_token: await this.jwtService.signAsync(payload),
            user: {
                id: person.id,
                firstname: person.firstname,
                DTYPE: person.DTYPE,
                position: position
            }
        };
    }
    async createCustomer(dto) {
        return { success: true };
    }
    async createEmployee(dto) {
        return { success: true };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(shared_1.Person)),
    __param(1, (0, typeorm_1.InjectRepository)(shared_1.Employee)),
    __param(2, (0, typeorm_1.InjectRepository)(shared_1.Customer)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, typeof (_b = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _b : Object, typeof (_c = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _c : Object, typeof (_d = typeof jwt_1.JwtService !== "undefined" && jwt_1.JwtService) === "function" ? _d : Object])
], AuthService);


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

/***/ "@nestjs/passport":
/*!***********************************!*\
  !*** external "@nestjs/passport" ***!
  \***********************************/
/***/ ((module) => {

module.exports = require("@nestjs/passport");

/***/ }),

/***/ "@nestjs/typeorm":
/*!**********************************!*\
  !*** external "@nestjs/typeorm" ***!
  \**********************************/
/***/ ((module) => {

module.exports = require("@nestjs/typeorm");

/***/ }),

/***/ "bcryptjs":
/*!***************************!*\
  !*** external "bcryptjs" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("bcryptjs");

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
/*!***************************************!*\
  !*** ./apps/auth-service/src/main.ts ***!
  \***************************************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
const core_1 = __webpack_require__(/*! @nestjs/core */ "@nestjs/core");
const auth_module_1 = __webpack_require__(/*! ./auth.module */ "./apps/auth-service/src/auth.module.ts");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
async function bootstrap() {
    const app = await core_1.NestFactory.createMicroservice(auth_module_1.AuthModule, {
        transport: microservices_1.Transport.TCP,
        options: {
            host: '0.0.0.0',
            port: 8001,
            serialize: (value) => JSON.stringify(value),
            deserialize: (value) => JSON.parse(value),
        },
    });
    await app.listen();
    console.log('Auth Service is listening on port 8001...');
}
bootstrap();

})();

/******/ })()
;