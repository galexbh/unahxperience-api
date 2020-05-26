import { Request, Response } from "express";
import { Curso, ICurso } from "../models/curso.model";
import { MongooseDocument } from "mongoose";
import {CarreraService} from "../services/carrera.service";
class CursoHelpers{

        
    //Obtener arreglo de Cursos

    GetCurso(filter: any):Promise<ICurso>{        
        return new Promise<ICurso>( (resolve) => {
            Curso.find(filter,(err:Error,curso:ICurso)=>{
                if(err){
                    console.log(err);
                }else{
                    resolve(curso);
                }
            }); 
        });
    }

    //Obtener un Curso

    GetOneCurso(filter: any):Promise<ICurso>{        
        return new Promise<ICurso>( (resolve) => {
            Curso.findOne(filter,(err:Error,curso:ICurso)=>{
                if(err){
                    console.log(err);
                }else{
                    resolve(curso);
                }
            }); 
        });
    }
}

export class CursoService extends CursoHelpers{

    public getAll(req:Request, res:Response){
        Curso.aggregate([
            {
                "$lookup":{
                    from: "Carreras",
                    localField:"Carrera",
                    foreignField:"_id",
                    as: "c"
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

    public getCurso(req:Request,res:Response){
        Curso.findById(req.params.id).populate("Carrera").exec((err:Error,curso:ICurso)=>{
            if(err){
                res.status(401).json(err);
            }else{
                res.status(200).json(curso);
            }
            
        });
    }

    public async newOneCurso(req: Request, res: Response){        
        const curso = new Curso(req.body);
        const Cursodb:any = await super.GetCurso({NombreCurso: curso.NombreCurso});

        if( Cursodb.length === 0 ){
            await curso.save((err:Error, curso: ICurso)=>{
                if(err){
                    res.status(401).send(err);
                }else{
                    res.status(200).json( Curso? {successed:true, Curso: curso} : {successed:false} );
                }            
            });
        }else{
            res.status(200).json({successed:false});
        } 
    }

    public async updateOneCurso(req:Request, res:Response){       
        const cursodb:any = await super.GetCurso({
            _id: { $nin: [req.params.id] }
        });

        if( cursodb.length === 0 ){

            Curso.findByIdAndUpdate(req.params.id,req.body,(err:Error)=>{
                if(err){
                    res.status(401).json({successed:false, message:"server got an error, contact support if this error is still happening"});
                }else{
                    res.status(200).json({successed:true,message:"Curso updated successfully"});
                }
            });

        }else{
            res.status(200).json({successed:false});
        } 
    }

    public async deleteOneCurso(req:Request, res:Response){
        Curso.findByIdAndDelete(req.params.id,(err:Error)=>{
            if(err){
                res.status(401).json({successed:false, message:"server got an error, contact support if this error is still happening"});
            }else{
                res.status(200).json({successed:true,message:"Language deleted successfully"});
            }
        });
    }

}