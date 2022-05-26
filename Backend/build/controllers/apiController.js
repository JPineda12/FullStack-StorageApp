"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiController = void 0;
var database_1 = __importDefault(require("../config/database"));
var uuid_1 = require("uuid");
var ApiController = /** @class */ (function () {
    function ApiController() {
    }
    ApiController.prototype.login = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var user, sql, result, crypto, hash, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        user = req.body.user;
                        sql = "SELECT idUsuario, username, contrasena, correo, nombre, imagen_url, Rol_idRol FROM Usuario\n        WHERE username=?";
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, database_1.default.query(sql, [user])];
                    case 2:
                        result = _a.sent();
                        if (result.length > 0) {
                            crypto = require("crypto");
                            hash = crypto
                                .createHash("sha256")
                                .update(req.body.contrasena)
                                .digest("hex");
                            if (result[0].contrasena === hash + "D**") {
                                res.json({ status: true, result: result });
                            }
                            else {
                                res.json([]);
                            }
                        }
                        else {
                            res.json([]);
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _a.sent();
                        res.json([]);
                        console.log("ERROR: " + err_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ApiController.prototype.signup = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, user, correo, nombre, contrasena, base64, idRol, sql, img_name, file_destination, base64File, fs, crypto, hash, result, err_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, user = _a.user, correo = _a.correo, nombre = _a.nombre, contrasena = _a.contrasena, base64 = _a.base64, idRol = _a.idRol;
                        sql = "INSERT INTO Usuario(username, correo, nombre, contrasena, imagen_url, Rol_idRol)\n    VALUES(?, ?, ?, ?, ?, ?)";
                        img_name = user + "-" + uuid_1.v4() + ".jpg";
                        file_destination = "files/profile-pictures/" + img_name;
                        base64File = base64.split(";base64,").pop();
                        fs = require("fs");
                        fs.writeFile(file_destination, base64File, { encoding: "base64" }, function (err) {
                            if (err)
                                console.log("Error al crear archivo:\n", err);
                            console.log("File created");
                        });
                        crypto = require("crypto");
                        hash = crypto.createHash("sha256").update(contrasena).digest("hex");
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, database_1.default.query(sql, [
                                user,
                                correo,
                                nombre,
                                hash + "D**",
                                process.env.FILES_SERVER_URL + "/profile-pictures/" + img_name,
                                idRol,
                            ])];
                    case 2:
                        result = _b.sent();
                        res
                            .status(200)
                            .json({ status: true, result: "Registrado Satisfactoriamente" });
                        return [3 /*break*/, 4];
                    case 3:
                        err_2 = _b.sent();
                        res.status(200).json({ status: false, result: "Ocurrio un error" });
                        console.log("ERROR: " + err_2);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ApiController.prototype.uploadFile = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, nombre, fecha_subida, idUsuario, idVisibilidad, idTipoArchivo, base64, file_destination, img_name, url_aux, base64File, fs, sql, result, err_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, nombre = _a.nombre, fecha_subida = _a.fecha_subida, idUsuario = _a.idUsuario, idVisibilidad = _a.idVisibilidad, idTipoArchivo = _a.idTipoArchivo, base64 = _a.base64;
                        if (idTipoArchivo === 1) {
                            //Es Imagen, se guarda en la carpeta "files" del servidor http-server
                            img_name = nombre + "-" + uuid_1.v4() + ".jpg";
                            file_destination = "files/images/" + img_name;
                            url_aux = "images/" + img_name;
                        }
                        else {
                            //Es Pdf, se guarda en la carpeta "files" del servidor http-server
                            img_name = nombre + "-" + uuid_1.v4() + ".pdf";
                            file_destination = "files/docs/" + img_name;
                            url_aux = "docs/" + img_name;
                        }
                        base64File = base64.split(";base64,").pop();
                        fs = require("fs");
                        fs.writeFile(file_destination, base64File, { encoding: "base64" }, function (err) {
                            if (err)
                                console.log("Error al crear archivo:\n", err);
                            console.log("File created");
                        });
                        sql = "INSERT INTO Archivo(nombre, archivo_url, fecha_subida, Archivo_idUsuario, Archivo_idVisibilidad, Archivo_idTipoArchivo)\n    VALUES(?, ?, ?, ?, ?, ?)";
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, database_1.default.query(sql, [
                                nombre,
                                process.env.FILES_SERVER_URL + "/" + url_aux,
                                fecha_subida,
                                idUsuario,
                                idVisibilidad,
                                idTipoArchivo,
                            ])];
                    case 2:
                        result = _b.sent();
                        res
                            .status(200)
                            .json({ status: true, result: "Archivo subido satisfactoriamente" });
                        return [3 /*break*/, 4];
                    case 3:
                        err_3 = _b.sent();
                        res.status(200).json({ status: false, result: err_3 });
                        console.log("ERROR: " + err_3);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ApiController.prototype.getUserFiles = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var idUsuario, sql, result, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        idUsuario = req.params.idUsuario;
                        sql = "SELECT idArchivo, nombre, archivo_url, fecha_subida, v.idVisibilidad, v.visibilidad, t.tipo\n    from Archivo a, Visibilidad v, Tipo_Archivo t\n    WHERE A.Archivo_idUsuario = ?\n    AND\tA.Archivo_idVisibilidad = v.idVisibilidad\n    AND v.idVisibilidad != 3\n    AND A.Archivo_idTipoArchivo = t.idTipo_Archivo\n    ORDER BY v.visibilidad, a.idArchivo";
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, database_1.default.query(sql, [idUsuario])];
                    case 2:
                        result = _a.sent();
                        if (result.length > 0) {
                            res.json(result);
                        }
                        else {
                            res.json([]);
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        err_4 = _a.sent();
                        res.json([]);
                        console.log("ERROR: " + err_4);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ApiController.prototype.allUsersPublicCount = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var idUsuario, sql, result, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        idUsuario = req.params.idUsuario;
                        sql = "SELECT u.idUsuario, u.username, u.nombre, u.imagen_url, COUNT(a.idArchivo) as cantidad\nFROM Usuario u, Archivo a, Visibilidad v\nWHERE u.idUsuario = a.Archivo_idUsuario\nAND a.Archivo_idVisibilidad = v.idVisibilidad\nAND a.Archivo_idVisibilidad = 1\nAND u.idUsuario <> " + idUsuario + "\nAND NOT EXISTS (\n        SELECT d.idAmigo1, d.idAmigo2\n                FROM detalle_amistad d\n                WHERE d.idAmigo2 = u.idUsuario\n                AND d.idAmigo1 = " + idUsuario + "\n        )\nGROUP BY u.idUsuario\nUNION \nSELECT u2.idUsuario, u2.username, u2.nombre, u2.imagen_url, 0\n  FROM Usuario u2\n    WHERE u2.idUsuario <> " + idUsuario + "\n     AND not exists  (SELECT * FROM Archivo a2\n              WHERE u2.idUsuario = a2.Archivo_idUsuario);";
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, database_1.default.query(sql)];
                    case 2:
                        result = _a.sent();
                        if (result.length > 0) {
                            res.json(result);
                        }
                        else {
                            res.json([]);
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        err_5 = _a.sent();
                        res.json([]);
                        console.log("ERROR: " + err_5);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ApiController.prototype.friendsPublicFiles = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var idUsuario, sql, result, err_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        idUsuario = req.params.idUsuario;
                        sql = "SELECT u.idUsuario, u.username, u.imagen_url, a.idArchivo, a.nombre as archivo, a.archivo_url, a.fecha_subida, t.tipo\n    FROM Usuario u, Detalle_Amistad d, Archivo a, tipo_archivo t\n    WHERE d.idAmigo1 = ?\n    AND d.idAmigo2 = u.idUsuario\n    AND u.idUsuario = a.Archivo_idUsuario\n    AND a.Archivo_idVisibilidad = 1\n    AND a.Archivo_idTipoArchivo = t.idTipo_Archivo";
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, database_1.default.query(sql, [idUsuario])];
                    case 2:
                        result = _a.sent();
                        if (result.length > 0) {
                            res.json(result);
                        }
                        else {
                            res.json([]);
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        err_6 = _a.sent();
                        res.json([]);
                        console.log("ERROR: " + err_6);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ApiController.prototype.updateFile = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, idArchivo, nombre, idVisibilidad, sql, result, err_7;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, idArchivo = _a.idArchivo, nombre = _a.nombre, idVisibilidad = _a.idVisibilidad;
                        sql = "UPDATE Archivo\n    SET nombre=?, Archivo_idVisibilidad = ?\n    WHERE idArchivo = ?";
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, database_1.default.query(sql, [nombre, idVisibilidad, idArchivo])];
                    case 2:
                        result = _b.sent();
                        res
                            .status(200)
                            .json({ status: true, result: "Actualizado correctamente" });
                        return [3 /*break*/, 4];
                    case 3:
                        err_7 = _b.sent();
                        res.status(200).json({ status: false, result: err_7 });
                        console.log("ERROR: " + err_7);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ApiController.prototype.deleteFile = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var idArchivo, sql, result, err_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        idArchivo = req.params.idArchivo;
                        sql = "UPDATE Archivo\n    SET Archivo_idVisibilidad = 3\n    WHERE idArchivo = ?";
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, database_1.default.query(sql, [idArchivo])];
                    case 2:
                        result = _a.sent();
                        res.status(200).json({ status: true, result: "Eliminado correctamente" });
                        return [3 /*break*/, 4];
                    case 3:
                        err_8 = _a.sent();
                        res.status(200).json({ status: false, result: err_8 });
                        console.log("ERROR: " + err_8);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ApiController.prototype.addFriend = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, idAmigo1, idAmigo2, fecha_amistad, sql, result, err_9;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, idAmigo1 = _a.idAmigo1, idAmigo2 = _a.idAmigo2, fecha_amistad = _a.fecha_amistad;
                        sql = "INSERT INTO Detalle_Amistad(idAmigo1, idAmigo2, fecha_amistad, idEstado)\n    VALUES (?, ?, ?, 1)";
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, database_1.default.query(sql, [idAmigo1, idAmigo2, fecha_amistad])];
                    case 2:
                        result = _b.sent();
                        res
                            .status(200)
                            .json({ status: true, result: "Amigo agregado correctamente" });
                        return [3 /*break*/, 4];
                    case 3:
                        err_9 = _b.sent();
                        res.status(200).json({ status: false, result: err_9 });
                        console.log("ERROR: " + err_9);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return ApiController;
}());
exports.apiController = new ApiController();
