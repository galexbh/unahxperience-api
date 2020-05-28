import { Request, Response } from "express";
import { Rate, IRate } from "../models/rate.model";
import { MongooseDocument } from "mongoose";

class RateHelpers{

     //Obtener arreglo de Rate

     GetRate(filter: any):Promise<IRate>{        
        return new Promise<IRate>( (resolve) => {
            Rate.find(filter,(err:Error,curso:IRate)=>{
                if(err){
                    console.log(err);
                }else{
                    resolve(curso);
                }
            }); 
        });
    }

    //Obtener un Rate

    GetOneRate(filter: any):Promise<IRate>{        
        return new Promise<IRate>( (resolve) => {
            Rate.findOne(filter,(err:Error,curso:IRate)=>{
                if(err){
                    console.log(err);
                }else{
                    resolve(curso);
                }
            }); 
        });
    }
}

export class RateService extends RateHelpers{

    public getAll(req:Request, res:Response){
        Rate.aggregate([
            {
                "$lookup":{
                    from: "estudiantes",
                    localField:"EstudianteID",
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

    public async newOneRate(req: Request, res: Response){        
        const rate = new Rate(req.body);
        
        await rate.save((err:Error, rate: IRate)=>{
            if(err){
                res.status(401).send(err);
            }else{
                res.status(200).json( Rate? {successed:true, Docente: rate } : {successed:false} );
            }            
        });
    } 

    public async deleteOneRate(req:Request, res:Response){
        Rate.findByIdAndDelete(req.params.id,(err:Error)=>{
            if(err){
                res.status(401).json({successed:false, message:"server got an error, contact support if this error is still happening"});
            }else{
                res.status(200).json({successed:true,message:"Rate deleted successfully"});
            }
        });
    }

    public async getOneRate(req:Request, res:Response){
        const rate:any = await super.GetRate({_id:req.params.id});
        res.status(200).json(rate[0]);
    }

    public async updateOneRate(req:Request, res:Response){       
        
        Rate.findByIdAndUpdate(req.params.id,req.body,(err:Error)=>{
            if(err){
                res.status(401).json({successed:false, message:"server got an error, contact support if this error is still happening"});
            }else{
                res.status(200).json({successed:true,message:"Rate updated successfully"});
            }
        });
    }
}