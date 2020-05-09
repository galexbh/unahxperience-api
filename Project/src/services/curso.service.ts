import { Request, Response } from "express";
import { Docente, IDocente } from "../models/docente.model";
import { MongooseDocument } from "mongoose";
import { Curso } from "../models/curso.model";

class CursoHelpers{

    public getOneCurso(nombreCurso: string):Promise<any>{
        return new Promise<any>( resolve => {
            Docente.findOne({ NombreCurso: nombreCurso}, (err:any,data:any) => {
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
   
    public async NewDocente(req: Request, res: Response) {
        const ODocente= new Docente(req.body);
        //const old_Docente: any = await super.getOneDocente({_id:ODocente._id});
        if (ODocente){
            await ODocente.save((err: Error, docente: IDocente)=>{
                if(err){
                    res.status(401).send(err);
                }else{
                    res.status(200).json(Docente ? {"successed": true, "Docente": docente} : {"successed": false});
                }           
            });
        }else{
            res.status(200).json({successed:false});
        }
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