import { Request, Response } from "express";
import { Estudiante, IEstudiante } from "../models/estudiante.model";
import { MongooseDocument } from "mongoose";
import {CarreraService} from "../services/carrera.service";

var CryptoJS = require("crypto-js");

class EstudianteHelpers{
    
//Obtener arreglo de Estudiante

    GetEstudiante(filter: any):Promise<IEstudiante>{        
        return new Promise<IEstudiante>( (resolve) => {
            Estudiante.find(filter,(err:Error,estudiante:IEstudiante)=>{
                if(err){
                    console.log(err);
                }else{
                    resolve(estudiante);
                }
            }); 
        });
    }

//Obtener un Estudiante

    GetOneEstudiante(filter: any):Promise<IEstudiante>{        
        return new Promise<IEstudiante>( (resolve) => {
            Estudiante.findOne(filter,(err:Error,estudiante:IEstudiante)=>{
                if(err){
                    console.log(err);
                }else{
                    resolve(estudiante);
                }
            }); 
        });
    }
}

export class EstudianteService extends EstudianteHelpers{

    public getAll(req:Request, res:Response){
        Estudiante.aggregate([
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

    public async newEstudiante(req: Request, res: Response) {
        const estudiante= new Estudiante(req.body); 
        const carreraServices: CarreraService = new CarreraService();
        console.log(estudiante)
        const CarreraExistedb: any = await carreraServices.getOneCarrera({_id: estudiante.Carrera});
        console.log(CarreraExistedb)

        const NickRepitdb: any = await super.GetOneEstudiante({NickName: estudiante.NickName});
        //console.log(NickRepitdb)
        const EmailRepitdb: any = await super.GetOneEstudiante({Email: estudiante.Email}); 
       // console.log(EmailRepitdb)

       // estudiante.Carrera=CarreraExistedb._id
        estudiante.Password=CryptoJS.AES.encrypt(req.body.Password, 'password').toString(); 
        
        if ((CarreraExistedb != null) && (NickRepitdb == null) && (EmailRepitdb == null)){
            estudiante.save((err: Error, estudiante: IEstudiante)=>{
                if(err){
                    res.status(401).send(err);
                }
                res.status(200).json(Estudiante ?{"successed": true, "Estudiante": estudiante} : {"successed": false})
            });
        }else{
            res.status(400).json({successed:false, carrera:CarreraExistedb, nick:NickRepitdb, email:EmailRepitdb});
        }
    }

    public async login(req: Request, res: Response) {
        const OPassword = (req.body.Password);       
        const OLogindb: any = await super.GetOneEstudiante({NickName: req.body.NickName});
        console.log(OLogindb);

        var bytes  = CryptoJS.AES.decrypt(OLogindb.Password, 'password');
        var originalText = bytes.toString(CryptoJS.enc.Utf8);
        if(OLogindb != null){
            if(OPassword != originalText){
                res.status(400).send('Password error');
            }else{
                res.cookie("id",OLogindb._id);
                res.cookie("rol",OLogindb.Rol);
                res.status(200).json(Estudiante ?{"successed": true} : {"successed": false})
                console.log("Cookiesid :  ", req.cookies.id);
                console.log("Cookiesrol :  ", req.cookies.rol);
                console.log("Cookies :  ", req.cookies);
            }
        }else{
            res.status(400).send('NickName error');
        }
    }

    public async getEstudiante(req:Request,res:Response){
        const OEstudiantedb: any = await super.GetEstudiante(req.params.nick);  
        res.send(OEstudiantedb)  
    }


    public async updateEstudiante(req: Request, res: Response) {
        const OEstudiantedb: any = await super.GetEstudiante(req.params.nick);    
        
        Estudiante.findByIdAndUpdate(OEstudiantedb._id,req.body,(err:Error, estudiante:any)=>{
            if(err){
                res.status(401).send(err);
            }else{
            res.status(200).send(estudiante);
        }
        })
    }
}

  /* public getAll(req: Request, res: Response){
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