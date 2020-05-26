import { Request, Response } from "express";
import { Comentario,IComentario  } from "../models/comentario.model";
import { MongooseDocument } from "mongoose";

let moment = require('moment');

class ComentarioHelpers{

    //Obtener arreglo de Comentario

    GetComentario(filter: any):Promise<IComentario>{        
        return new Promise<IComentario>( (resolve) => {
            Comentario.find(filter,(err:Error,comentario:IComentario)=>{
                if(err){
                    console.log(err);
                }else{
                    resolve(comentario);
                }
            }); 
        });
    }

    //Obtener un Comentario

    GetOneComentario(filter: any):Promise<IComentario>{        
        return new Promise<IComentario>( (resolve) => {
            Comentario.findOne(filter,(err:Error,comentario:IComentario)=>{
                if(err){
                    console.log(err);
                }else{
                    resolve(comentario);
                }
            }); 
        });
    }
}

export class ComentarioService extends ComentarioHelpers{

    public getAll(req:Request, res:Response){
        Comentario.aggregate([
            {
                "$lookup":{
                    from: "Estudiantes",
                    localField:"Estudiante",
                    foreignField:"_id",
                    as: "Estudent"
                }
            }
        ],(err:Error, data:any)=>{
            if(err){
                res.status(401).send(err);
            }else{
                res.status(200).json(data);
            } 
          })
    }

    public getComentario(req:Request,res:Response){
        Comentario.findById(req.params.id).populate("Estudiante").exec((err:Error,comentario:IComentario)=>{
            if(err){
                res.status(401).json(err);
            }else{
                res.status(200).json(comentario);
            }
            
        });
    }

    public async newComentario(req: Request, res: Response){        
        const comentario = new Comentario(req.body);
        comentario.FechaComentatio = moment().format('LLLL');
        await comentario.save((err:Error, comentario: IComentario)=>{
            if(err){
                res.status(401).send(err);
            }else{
                res.status(200).json( Comentario? {successed:true, comentario: comentario} : {successed:false} );
            }            
        });
    }

    public async updateComentario(req:Request, res:Response){
        
        Comentario.findByIdAndUpdate(req.params.id,req.body,(err:Error)=>{
            if(err){
                res.status(401).json({successed:false, message:"server got an error, contact support if this error is still happening"});
            }else{
                res.status(200).json({successed:true,message:"Comentario updated successfully"});
            }
        })
    }

    public async deleteComentario(req:Request, res:Response){
        Comentario.findByIdAndDelete(req.params.id,(err:Error)=>{
            if(err){
                res.status(401).json({successed:false, message:"server got an error, contact support if this error is still happening"});
            }else{
                res.status(200).json({successed:true,message:"Comentario deleted successfully"});
            }
        });
    }
}