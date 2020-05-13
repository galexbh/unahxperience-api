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

    public getOneCarrera(nickname: string):Promise<any>{
        console.log(nickname)
        return new Promise<any>( resolve => {
            Estudiante.findOne({ NickName: nickname}, (err:any,data:any) => {
                if(err){
                    resolve({});
                }else{
                    resolve(data);
                }
            } );
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
        const Carreradb: any = await getCarrera();
        if (Carreradb === 0 ){
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

    public UpdateCarrera(req: Request,res: Response){
        console.log("entro");
        Carrera.findByIdAndUpdate(req.params.id_car,req.body,(err:Error, carrera:any)=>{
            if(err){
                res.status(401).send(err);
            }
            res.status(200).json( carrera? {"updated":true} : {"updated":false} );
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