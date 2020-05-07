import { Request, Response } from "express";
import { Estudiante, IEstudiante } from "../models/estudiante.model";
import { MongooseDocument } from "mongoose";

var SimpleCrypto = require("simple-crypto-js").default;
var _secretKey = "some-unique-key";
var simpleCrypto = new SimpleCrypto(_secretKey);

class EstudianteHelpers{

    GetEstudiante(id_est: string):Promise<IEstudiante>{        
        return new Promise<IEstudiante>( (resolve) => {
            Estudiante.findById(id_est,(err:Error,estudiante:IEstudiante)=>{
                if(err){
                    console.log(err);
                }
                resolve(estudiante);
            }); 
        });
    }
}

export class EstudianteService extends EstudianteHelpers{

    public getAll(req: Request, res: Response){
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

    public async nuevoEstudiante(req: Request, res: Response) {
        const OEstudiante= new Estudiante(req.body);
        OEstudiante.Password=simpleCrypto.encrypt(req.body.Password);
        OEstudiante.Carreras=
        OEstudiante.save((err:Error, estudiante: IEstudiante)=>{
            if(err){
                res.status(401).send(err);
            }
            res.status(200).json( estudiante? {"successed":true, "Proveedor": estudiante } : {"successed":false} );
        });
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