"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var apiController_1 = require("../controllers/apiController");
var ApiRoutes = /** @class */ (function () {
    function ApiRoutes() {
        this.router = express_1.Router();
        this.config();
    }
    ApiRoutes.prototype.config = function () {
        this.router.post('/login', apiController_1.apiController.login);
        this.router.post('/register', apiController_1.apiController.register);
        this.router.post('/addFriend', apiController_1.apiController.addFriend);
        this.router.post('/uploadFile', apiController_1.apiController.uploadFile);
        this.router.get('/getUserFiles/:idUsuario', apiController_1.apiController.getUserFiles);
        this.router.get('/allUsersPublic/:idUsuario', apiController_1.apiController.allUsersPublicCount);
        this.router.get('/getFriendsFiles/:idUsuario', apiController_1.apiController.friendsPublicFiles);
        this.router.put('/updateFile', apiController_1.apiController.updateFile);
        this.router.put('/deleteFile', apiController_1.apiController.deleteFile);
    };
    return ApiRoutes;
}());
var apiRoutes = new ApiRoutes();
exports.default = apiRoutes.router;
