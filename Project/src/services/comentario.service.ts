import { Request, Response } from "express";
import { Comentario,IComentario  } from "../models/comentario.model";
import {} from "../services/estudiante.service"; //--
import { MongooseDocument } from "mongoose";

class ComentarioHelpers{

    public getOneComentario(nombreComentario: string):Promise<any>{
        return new Promise<any>( resolve => {
            Comentario.findOne({ NombreComentario: nombreComentario}, (err:any,data:any) => {
                if(err){
                    resolve({});
                }else{
                    resolve(data);
                }
            } );
        });
    }
}

export class ComentarioService extends ComentarioHelpers{

    public getAll(req:Request, res:Response){
        Comentario.find({},(err:Error, comentario: MongooseDocument)=>{
            if(err){
                res.status(401).send(err);
            }else{
                res.status(200).json(comentario);
            }
            
        });
    }
   
    public async NewComentario(req: Request, res: Response) {
        console.log('entra')
        const OComentario= new Comentario(req.body);
       // const EstudianteExistentedb: any = await getEstudiante(req.body.EstudianteID);
       // OComentario.EstudianteID=EstudianteExistentedb;
        
        OComentario.save((err: Error, comentario: IComentario)=>{
                if(err){
                    res.status(401).send(err);
                }else{
                    res.status(200).json(Comentario ? {"successed": true, "Comentario": comentario} : {"successed": false});
                }           
            });
        }
}  


export function getCurso(nombreCurso: string):Promise<any>{
    return new Promise<any>( resolve => {
        Comentario.findOne({ NombreCurso: nombreCurso}, (err:any,data:any) => {
            if(err){
                resolve({});
            }else{
                resolve(data);
            }
        } );
    });
}