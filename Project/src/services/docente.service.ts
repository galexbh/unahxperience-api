import { Request, Response } from "express";
import { Docente, IDocente } from "../models/docente.model";
import { MongooseDocument } from "mongoose";

class DocenteHelpers{

    //Obtener arreglo de Cursos

    GetDocente(filter: any):Promise<IDocente>{        
        return new Promise<IDocente>( (resolve) => {
            Docente.find(filter,(err:Error,curso:IDocente)=>{
                if(err){
                    console.log(err);
                }else{
                    resolve(curso);
                }
            }); 
        });
    }

    //Obtener un Curso

    GetOneDocente(filter: any):Promise<IDocente>{        
        return new Promise<IDocente>( (resolve) => {
            Docente.findOne(filter,(err:Error,curso:IDocente)=>{
                if(err){
                    console.log(err);
                }else{
                    resolve(curso);
                }
            }); 
        });
    }
}


export class DocenteService extends DocenteHelpers{

    
    public getAll(req:Request, res:Response){
        Docente.aggregate([
            {
                "$lookup":{
                    from: "Cursos",
                    localField:"curso",
                    foreignField:"_id",
                    as: "cursos"
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

    public async newOneDocente(req: Request, res: Response){        
        const docente = new Docente(req.body);
        const Docentedb:any = await super.GetDocente({NombreDocente:docente.NombreDocente});

        if( Docentedb.length === 0 ){
            await docente.save((err:Error, docente: IDocente)=>{
                if(err){
                    res.status(401).send(err);
                }else{
                    res.status(200).json( Docente? {successed:true, Docente: docente } : {successed:false} );
                }            
            });
        }else{
            res.status(200).json({successed:false});
        } 
    }

    public async deleteOneDocente(req:Request, res:Response){
        Docente.findByIdAndDelete(req.params.id,(err:Error)=>{
            if(err){
                res.status(401).json({successed:false, message:"server got an error, contact support if this error is still happening"});
            }else{
                res.status(200).json({successed:true,message:"Docente deleted successfully"});
            }
        });
    }

    public async getOneDocente(req:Request, res:Response){
        const lan:any = await super.GetDocente({_id:req.params.id});
        res.status(200).json(lan[0]);
    }

    public async updateOneDocente(req:Request, res:Response){       
        const old_lan:any = await super.GetDocente({
            _id: { $nin: [req.params.id] }
        });

        if( old_lan.length === 0 ){

            Docente.findByIdAndUpdate(req.params.id,req.body,(err:Error)=>{
                if(err){
                    res.status(401).json({successed:false, message:"server got an error, contact support if this error is still happening"});
                }else{
                    res.status(200).json({successed:true,message:"Docente updated successfully"});
                }
            });

        }else{
            res.status(200).json({successed:false});
        } 
    }

}