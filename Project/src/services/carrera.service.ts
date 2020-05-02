import { Request, Response, response } from "express";
import { Carrera, ICarrera } from "../models/carrera.model";
import { MongooseDocument } from "mongoose";

export class CarreraService{

    public NuevaCarrera(req: Request, res: Response){
        console.log("Ver1");
        const OCarrera= new Carrera(req.body);
        OCarrera.save((err: Error, carrera: ICarrera)=>{
            if(err){
                res.status(401).send(err);
                console.log("Ver");
            }
            res.status(200).json(Carrera ? {"successed": true, "Carrera": carrera} : {"successed": false});
        });
    
    }

}
