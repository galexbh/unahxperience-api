import { Request, Response } from "express";
import { Carrera, ICarrera } from "../models/carrera.model";
import { MongooseDocument } from "mongoose";



class CarreraHelpers{
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

    public getAllCarreras(req:Request, res:Response){
        Carrera.find({},(err: Error, carreras: MongooseDocument)=> {
            if(err){
                res.status(401).send(err);
            }else{
                res.status(200).json(carreras);
            }
        });
    }

    public async NuevaCarrera(req: Request, res: Response){
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

    public Update(req: Request,res: Response){
        console.log("entro");
        Carrera.findByIdAndUpdate(req.params.id_car,req.body,(err:Error, proveedor:any)=>{
            if(err){
                res.status(401).send(err);
            }
            res.status(200).json( proveedor? {"updated":true} : {"updated":false} );
        })
    }

}

export function getCarrera(nombrecarrera: string):Promise<any>{
    return new Promise<any>( resolve => {
        Carrera.findOne({ NombreCarrera: nombrecarrera}, (err:any,data:any) => {
            if(err){
                resolve({});
            }else{
                resolve(data);
            }
        } );
    });
}