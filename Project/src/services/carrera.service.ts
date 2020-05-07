import { Request, Response } from "express";
import { Carrera, ICarrera } from "../models/carrera.model";
import { MongooseDocument } from "mongoose";



export class CarreraHelpers{
    getCarrera(filter: any):Promise<ICarrera>{
        return new Promise<ICarrera>( (resolve)=> {
            Carrera.find(filter,(err: Error, carrera: ICarrera)=> {
                if(err){
                    console.log(err);
                }else{
                    resolve(carrera);
                }
            });
        });
    }
}

export class CarreraService extends CarreraHelpers{

    public GetCarrera(req:Request,res:Response){
        Carrera.findById(req.params.id).populate("carrera").exec((err:Error,carrera:ICarrera)=>{
            if(err){
                res.status(401).json(err);
            }else{
                res.status(200).json(carrera);
            }
            
        });
    }

    public getAllCarreras(req:Request, res:Response){
        Carrera.find({},(err: Error, carreras: MongooseDocument)=> {
            if(err){
                res.status(401).send(err);
            }else{
                res.status(200).json(carreras);
            }
        });
    }

    public async  nuevaCarrera(req: Request, res: Response){
        const OCarrera= new Carrera(req.body);
        const old_Carrera: any = await super.getCarrera({_id:OCarrera._id});
        if (old_Carrera.length === 0 ){
            await OCarrera.save((err: Error, carrera: ICarrera)=>{
                if(err){
                    res.status(401).send(err);
                }else{
                    res.status(200).json(Carrera ? {"successed": true, "Carrera": carrera} : {"successed": false});
                }           
            });
        }else{
            res.status(200).json({successed:false});
        }
    
    }

}

