import { Request, Response } from "express";
import { Solicitud, ISolicitud } from "../models/solicitud.model";
import { MongooseDocument } from "mongoose";

class SolicitudHelpers{

    //Obtener arreglo de Solicitud

    GetSolicitud(filter: any):Promise<ISolicitud>{        
        return new Promise<ISolicitud>( (resolve) => {
            Solicitud.find(filter,(err:Error,solicitud:ISolicitud)=>{
                if(err){
                    console.log(err);
                }else{
                    resolve(solicitud);
                }
            }); 
        });
    }

    //Obtener un Solicitud

    GetOneSolicitud(filter: any):Promise<ISolicitud>{        
        return new Promise<ISolicitud>( (resolve) => {
            Solicitud.findOne(filter,(err:Error,solicitud:ISolicitud)=>{
                if(err){
                    console.log(err);
                }else{
                    resolve(solicitud);
                }
            }); 
        });
    }
}

export class SolicitudService extends SolicitudHelpers{
    
    public getAll(req:Request, res:Response){
        Solicitud.aggregate([
            {
                    "$lookup":{
                    from: "Cursos",
                    localField:"Curso",
                    foreignField:"_id",
                    as: "Curso"
                }
            },
            {
                "$lookup":{
                    from: "Estudiantes",
                    localField:"Estudiante",
                    foreignField:"_id",
                    as: "Estudiante"
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

    public async newOneSolicitud(req: Request, res: Response){        
        const solicitud = new Solicitud(req.body);

        await solicitud.save((err:Error, solicitud: ISolicitud)=>{
            if(err){
                res.status(401).send(err);
            }else{
                res.status(200).json( Solicitud? {successed:true, solicitud: solicitud } : {successed:false} );
            }            
        });
    
    }

    public async deleteOneSolicitud(req:Request, res:Response){
        Solicitud.findByIdAndDelete(req.params.id,(err:Error)=>{
            if(err){
                res.status(401).json({successed:false, message:"server got an error, contact support if this error is still happening"});
            }else{
                res.status(200).json({successed:true,message:"Solicitud deleted successfully"});
            }
        });
    }

    public async getOneSolicitud(req:Request, res:Response){
        const lan:any = await super.GetSolicitud({_id:req.params.id});
        res.status(200).json(lan[0]);
    }

    public async updateOneSolicitud(req:Request, res:Response){       

        Solicitud.findByIdAndUpdate(req.params.id,req.body,(err:Error)=>{
            if(err){
                res.status(401).json({successed:false, message:"server got an error, contact support if this error is still happening"});
            }else{
                res.status(200).json({successed:true,message:"Solicitud updated successfully"});
            }
        });

    }
}