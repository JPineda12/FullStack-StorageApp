import { Request, Response } from 'express';

class ApiController {

    public index(req: Request, res: Response ){
        res.json({text: 'Api is at /api'})
    }
}

export const apiController = new ApiController(); 