import { Request, Response } from "express";
import { Estudiante, IEstudiante } from "../models/estudiante.model";
import { MongooseDocument } from "mongoose";
import { getCarrera } from "../services/carrera.service";

var CryptoJS = require("crypto-js");

class EstudianteHelpers{
    public getOneEstudiante(nickname: string):Promise<any>{
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

export class EstudianteService extends EstudianteHelpers{
   
    public async NewEstudiante(req: Request, res: Response) {
        const OEstudiante= new Estudiante(req.body);
        const CarreraExiste1db: any = await getCarrera(req.body.Carrera1);
        const CarreraExiste2db: any = await getCarrera(req.body.Carrera2);

        const NickRepitkdb: any = await super.getOneEstudiante(req.body.NickName);
        const EmailRepitdb: any = await super.getOneEstudiante(req.body.Email);

        OEstudiante.Carrera1=CarreraExiste1db
        OEstudiante.Carrera2=CarreraExiste2db
        OEstudiante.Password=CryptoJS.AES.encrypt(req.body.Password, 'password').toString(); 
        
        if ((CarreraExiste1db != null) && (NickRepitkdb == null) && (EmailRepitdb == null)){
            await OEstudiante.save((err: Error, estudiante: IEstudiante)=>{
                if(err){
                    res.status(401).send(err);
                }
                res.status(200).json(Estudiante ?{"successed": true, "Estudiante": estudiante} : {"successed": false})
            });
    
        }else{
            res.status(400).json({successed:false, carrera:CarreraExiste1db, nick:NickRepitkdb, email:NickRepitkdb});
        }
    
    }

    public async login(req: Request, res: Response) {
        const OLogin = (req.body.Password);       
        const OLogindb: any = await super.getOneEstudiante(req.body.NickName);

        var bytes  = CryptoJS.AES.decrypt(OLogindb.Password, 'password');
        var originalText = bytes.toString(CryptoJS.enc.Utf8);

        if(OLogindb != null){
            if(OLogin != originalText){
                res.status(400).send('Password error')
            }else{
                res.status(200).json(Estudiante ?{"successed": true} : {"successed": false})
            }
        }else{
            res.status(400).send('NickName error');
        }
    }
/* 
    public getAllEstudiantes(req:Request, res:Response){
      
        Estudiante.find({}).populate({ path: 'NombreCarrera', model: Carreras}).exec((err: Error, estudiantes: MongooseDocument)=> {
            if(err){
                res.status(401).send(err);
            }else{
                res.status(200).json(estudiantes);
            }
        });
    }  
 */
/* public getALL(req: Request, res: Response){
        Estudiante.aggregate([
            {
                "$lookup":{
                    from:"carreras",
                    localfield:"Carrera",
                    foreingField:"_id",
                    as: "carrera"
                }
            }
        ],(err: Error, data:any)=>{
            if(err){
                res.status(401).send(err);
            }else{
                res.status(200).json(data);
            }
        })
    }    
*/

}