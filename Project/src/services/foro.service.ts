import { Request, Response } from "express";
import { Foro, IForo } from "../models/foro.models";
//import {getEstudiante } from "../services/estudiante.service";
import { MongooseDocument } from "mongoose";

class ForoHelpers{

    public getOneForo(nombreForo: string):Promise<any>{
        return new Promise<any>( resolve => {
            Foro.findOne({ NombreForo: nombreForo}, (err:any,data:any) => {
                if(err){
                    resolve({});
                }else{
                    resolve(data);
                }
            } );
        });
    }
}

export class ForoService extends ForoHelpers{

    public getAll(req:Request, res:Response){
        Foro.find({},(err:Error, foro: MongooseDocument)=>{
            if(err){
                res.status(401).send(err);
            }else{
                res.status(200).json(foro);
            }
            
        });
    }
   
    public async newForo(req: Request, res: Response) {
        const OSolicitud= new Foro(req.body);
       // const EstudianteExistedb: any = await getEstudiante(req.body.EstudianteID);
       // OSolicitud.EstudianteID=EstudianteExistedb;
        
        OSolicitud.save((err: Error, foro: IForo)=>{
                if(err){
                    res.status(401).send(err);
                }else{
                    res.status(200).json(Foro ? {"successed": true, "foro": foro} : {"successed": false});
                }           
            });
        }
}  


export function getForo(nombreCurso: string):Promise<any>{
    return new Promise<any>( resolve => {
        Foro.findOne({ NombreCurso: nombreCurso}, (err:any,data:any) => {
            if(err){
                resolve({});
            }else{
                resolve(data);
            }
        } );
    });
}