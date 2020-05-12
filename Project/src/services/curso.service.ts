import { Request, Response } from "express";
import { Curso, ICurso } from "../models/curso.model";
import {getCarrera } from "../services/carrera.service";
import { MongooseDocument } from "mongoose";

class CursoHelpers{

    public getOneCurso(nombreCurso: string):Promise<any>{
        return new Promise<any>( resolve => {
            Curso.findOne({ NombreCurso: nombreCurso}, (err:any,data:any) => {
                if(err){
                    resolve({});
                }else{
                    resolve(data);
                }
            } );
        });
    }
}

export class CursoService extends CursoHelpers{

    public getAll(req:Request, res:Response){
        Curso.find({},(err:Error, curso: MongooseDocument)=>{
            if(err){
                res.status(401).send(err);
            }else{
                res.status(200).json(curso);
            }
            
        });
    }
   
    public async NewCurso(req: Request, res: Response) {
        const OCurso= new Curso(req.body);
        const CarreraExiste1db: any = await getCarrera(req.body.CarreraID);
        OCurso.CarreraID=CarreraExiste1db;
        
        OCurso.save((err: Error, curso: ICurso)=>{
                if(err){
                    res.status(401).send(err);
                }else{
                    res.status(200).json(Curso ? {"successed": true, "curso": curso} : {"successed": false});
                }           
            });
        }
}  


export function getCurso(nombreCurso: string):Promise<any>{
    return new Promise<any>( resolve => {
        Curso.findOne({ NombreCurso: nombreCurso}, (err:any,data:any) => {
            if(err){
                resolve({});
            }else{
                resolve(data);
            }
        } );
    });
}