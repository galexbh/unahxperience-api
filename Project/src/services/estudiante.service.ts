import { Request, Response } from "express";
import { Estudiante, IEstudiante } from "../models/estudiante.model";
import { MongooseDocument } from "mongoose";
import { getCarrera } from "../services/carrera.service";



export class EstudianteService {
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



    public async NuevoEstudiante(req: Request, res: Response) {
        const OEstudiante= new Estudiante();
        const CarreraExiste: any = await getCarrera(req.body.Carreras);
        
        OEstudiante.NickName=req.body.NickName
        OEstudiante.Name=req.body.Name
        OEstudiante.LastName=req.body.LastName
        OEstudiante.Email=req.body.Email
        OEstudiante.Password=req.body.Password
        OEstudiante.AccountNumber=req.body.AccountNumber
        OEstudiante.Rol=req.body.Rol
        OEstudiante.Carreras=CarreraExiste
        console.log(req.body.Carreras);
        if (CarreraExiste != null){
            await OEstudiante.save((err: Error, estudiante: IEstudiante)=>{
                if(err){
                    res.status(401).send(err);
                }
                res.status(200).json(Estudiante ?{"successed": true, "Estudiante": estudiante} : {"successed": false})
            });
    
        }else{
            res.status(200).json({successed:false});
        }
    
    }
/* 
    public getAllEstudiantes(req:Request, res:Response){
        Estudiante.find({},(err: Error, estudiantes: MongooseDocument)=> {
            if(err){
                res.status(401).send(err);
            }else{
                res.status(200).json(estudiantes);
            }
        });
    } */
}