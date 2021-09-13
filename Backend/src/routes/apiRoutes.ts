import { Router } from 'express';
import { apiController } from '../controllers/apiController';
class ApiRoutes {
    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        //this.router.post('/login', apiController.loginUser);
    }

}

const apiRoutes = new ApiRoutes();
export default apiRoutes.router;