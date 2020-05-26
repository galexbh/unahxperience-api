import { Request, Response } from "express";
import { Carrera, ICarrera } from "../models/carrera.model";
import { MongooseDocument } from "mongoose";



class CarreraHelpers{
//Obtener una Carrera
    getOneCarrera(filter: any):Promise<ICarrera>{
        return new Promise<ICarrera>( (resolve)=> {
            Carrera.findOne(filter,(err: Error, carrera: ICarrera)=> {
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

    public getAllCarreras(req:Request, res:Response){
        Carrera.find({},(err: Error, carreras: MongooseDocument)=> {
            if(err){
                res.status(401).send(err);
            }else{
                res.status(200).json(carreras);
            }
        });
    }

    public async getCarrera(req: Request, res: Response){
        const Carreradb: any = await super.getOneCarrera({NombreCarrera: req.params.c_name});
        res.status(200).json({carrera:Carreradb})
    }


    public async NuevaCarrera(req: Request, res: Response){
        const carrera= new Carrera(req.body);
        const Carreradb: any = await super.getOneCarrera({NombreCarrera: carrera.NombreCarrera});
        if (Carreradb === null ){
            await carrera.save((err: Error, carrera: ICarrera)=>{
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

    public UpdateCarrera(req: Request,res: Response){
        console.log("entro");
        Carrera.findByIdAndUpdate({_id:req.params.id_car},req.body,(err:Error, carrera:any)=>{
            if(err){
                res.status(401).send(err);
            }
            res.status(200).json( carrera? {"updated":true} : {"updated":false} );
        })
    }

    public DeleteCarrera(req: Request,res: Response){
        console.log("entro");
        Carrera.findByIdAndDelete({_id:req.params.id_car},req.body,(err:Error, carrera:any)=>{
            if(err){
                res.status(401).send(err);
            }
            res.status(200).json( carrera? {"updated":true} : {"updated":false} );
        })
    }

}
