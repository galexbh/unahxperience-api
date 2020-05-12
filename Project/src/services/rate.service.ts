import { Request, Response } from "express";
import { Rate, IRate } from "../models/rate.model";
//import {getEstudiante } from "../services/estudiante.service";
import { MongooseDocument } from "mongoose";

class RateHelpers{

    public getOneRate(nombreRate: string):Promise<any>{
        return new Promise<any>( resolve => {
            Rate.findOne({ NombreRate: nombreRate}, (err:any,data:any) => {
                if(err){
                    resolve({});
                }else{
                    resolve(data);
                }
            } );
        });
    }
}

export class RateService extends RateHelpers{

    public getAll(req:Request, res:Response){
        Rate.find({},(err:Error, rate: MongooseDocument)=>{
            if(err){
                res.status(401).send(err);
            }else{
                res.status(200).json(rate);
            }
            
        });
    }
   
    public async newRate(req: Request, res: Response) {
        const OSolicitud= new Rate(req.body);
       // const EstudianteExistedb: any = await getEstudiante(req.body.Estudiante_id[0]);
       // OSolicitud.Estudiante_id.push(EstudianteExistedb);
        
        OSolicitud.save((err: Error, rate: IRate)=>{
                if(err){
                    res.status(401).send(err);
                }else{
                    res.status(200).json(Rate ? {"successed": true, "rate": rate} : {"successed": false});
                }           
            });
        }
}  


export function getRate(nombreCurso: string):Promise<any>{
    return new Promise<any>( resolve => {
        Rate.findOne({ NombreCurso: nombreCurso}, (err:any,data:any) => {
            if(err){
                resolve({});
            }else{
                resolve(data);
            }
        } );
    });
}