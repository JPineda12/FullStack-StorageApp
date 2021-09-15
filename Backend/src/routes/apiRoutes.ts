import { Router } from 'express';
import { apiController } from '../controllers/apiController';
class ApiRoutes {
    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.post('/login', apiController.login);
        this.router.post('/register', apiController.register);
        this.router.post('/addFriend', apiController.addFriend);
        this.router.post('/uploadFile', apiController.uploadFile);        
        this.router.get('/getUserFiles/:idUsuario', apiController.getUserFiles);
        this.router.get('/allUsersPublic/:idUsuario', apiController.allUsersPublicCount);
        this.router.get('/getFriendsFiles/:idUsuario', apiController.friendsPublicFiles);
        this.router.put('/updateFile', apiController.updateFile);
        this.router.put('/deleteFile', apiController.deleteFile);
    }

}

const apiRoutes = new ApiRoutes();
export default apiRoutes.router;