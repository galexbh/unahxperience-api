import { Request, Response } from "express";
import { Solicitud, ISolicitud } from "../models/solicitud.model";
//import {getEstudiante } from "../services/estudiante.service";
import { MongooseDocument } from "mongoose";

class SolicitudHelpers{

    public getOneSolicitud(nombreSolicitud: string):Promise<any>{
        return new Promise<any>( resolve => {
            Solicitud.findOne({ NombreSolicitud: nombreSolicitud}, (err:any,data:any) => {
                if(err){
                    resolve({});
                }else{
                    resolve(data);
                }
            } );
        });
    }
}

export class SolicitudService extends SolicitudHelpers{

    public getAll(req:Request, res:Response){
        Solicitud.find({},(err:Error, solicitud: MongooseDocument)=>{
            if(err){
                res.status(401).send(err);
            }else{
                res.status(200).json(solicitud);
            }
            
        });
    }
   
    public async newSolicitud(req: Request, res: Response) {
        const OSolicitud= new Solicitud(req.body);
        //const EstudianteExistedb: any = await getEstudiante(req.body.EstudianteID);
        //OSolicitud.EstudianteID=EstudianteExistedb;
        
        OSolicitud.save((err: Error, solicitud: ISolicitud)=>{
                if(err){
                    res.status(401).send(err);
                }else{
                    res.status(200).json(Solicitud ? {"successed": true, "solicitud": solicitud} : {"successed": false});
                }           
            });
        }
}  


export function getSolicitud(nombreCurso: string):Promise<any>{
    return new Promise<any>( resolve => {
        Solicitud.findOne({ NombreCurso: nombreCurso}, (err:any,data:any) => {
            if(err){
                resolve({});
            }else{
                resolve(data);
            }
        } );
    });
}