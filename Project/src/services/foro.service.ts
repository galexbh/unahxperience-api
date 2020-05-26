import { Request, Response } from "express";
import { Foro, IForo } from "../models/foro.models";
import { MongooseDocument } from "mongoose";

class ForoHelpers{

    //Obtener arreglo de Foro

    GetForo(filter: any):Promise<IForo>{        
        return new Promise<IForo>( (resolve) => {
            Foro.find(filter,(err:Error,curso:IForo)=>{
                if(err){
                    console.log(err);
                }else{
                    resolve(curso);
                }
            }); 
        });
    }

    //Obtener un Foro

    GetOneForo(filter: any):Promise<IForo>{        
        return new Promise<IForo>( (resolve) => {
            Foro.findOne(filter,(err:Error,curso:IForo)=>{
                if(err){
                    console.log(err);
                }else{
                    resolve(curso);
                }
            }); 
        });
    }
}

export class ForoService extends ForoHelpers{

    public getAll(req:Request, res:Response){
        Foro.aggregate([
            {
                    "$lookup":{
                    from: "Rates",
                    localField:"RateStart",
                    foreignField:"_id",
                    as: "rate"
                }
            },
            {
                "$lookup":{
                    from: "Estudiantes",
                    localField:"Estudiante",
                    foreignField:"_id",
                    as: "estudiante"
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

    public async newOneForo(req: Request, res: Response){        
        const foro = new Foro(req.body);
    
        await foro.save((err:Error, foro: IForo)=>{
            if(err){
                res.status(401).send(err);
            }else{
                res.status(200).json( Foro? {successed:true, foro: foro } : {successed:false} );
            }            
        });
    
    }

    public async deleteOneForo(req:Request, res:Response){
        Foro.findByIdAndDelete(req.params.id,(err:Error)=>{
            if(err){
                res.status(401).json({successed:false, message:"server got an error, contact support if this error is still happening"});
            }else{
                res.status(200).json({successed:true,message:"Foro deleted successfully"});
            }
        });
    }

    public async getOneForo(req:Request, res:Response){
        const lan:any = await super.GetForo({_id:req.params.id});
        res.status(200).json(lan[0]);
    }

    public async updateOneForo(req:Request, res:Response){       

    Foro.findByIdAndUpdate(req.params.id,req.body,(err:Error)=>{
            if(err){
                res.status(401).json({successed:false, message:"server got an error, contact support if this error is still happening"});
            }else{
                res.status(200).json({successed:true,message:"Docente updated successfully"});
            }
        });
    }
}  

