import { Request, Response } from "express";
import { Estudiante, IEstudiante } from "../models/estudiante.model";
import { CarreraService } from "../services/carrera.service";

export class EstudianteService{
    public getALL(req: Request, res: Response){
        Estudiante.aggregate([
            {
                "$lookup":{
                    from:"carreras",
                    localfield:"Carrera_1",
                    foreingField:"_id",
                    as: "carreras"
                }
            }
        ],(err: Error, data:any)=>{
            if(err){
                res.status(401).send(err);
            }else{
                res.status(200).json(data);
            }
        })
    }    



    public async NuevoEstudiante(req: Request, res: Response){
        const OEstudiante= new Estudiante(req.body);

        console.log(req.body);
        OEstudiante.save((err: Error, estudiante: IEstudiante)=>{
            if(err){
                res.status(401).send(err);
            }
            res.status(200).json(Estudiante ?{"successed": true, "Estudiante": estudiante} : {"successed": false})
        });

    }
}