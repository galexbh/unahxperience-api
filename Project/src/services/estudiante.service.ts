import { Request, Response } from "express";
import { Estudiante, IEstudiante } from "../models/estudiante.model";
import { MongooseDocument } from "mongoose";
import {getCarrera } from "../services/carrera.service";

var CryptoJS = require("crypto-js");

class EstudianteHelpers{

    public getOneEstudiante(nickname: string):Promise<any>{
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

    public getEmailEstudiante(email: string):Promise<any>{
        return new Promise<any>( resolve => {
            Estudiante.findOne({ Email: email}, (err:any,data:any) => {
                if(err){
                    resolve({});
                }else{
                    resolve(data);
                }
            } );
        });
    }

    public getArrayEstudiante(nickname: string):Promise<any>{
        console.log(nickname)
        return new Promise<any>( resolve => {
            Estudiante.find({"Carreras": { "$elemMatch": { "_id": nickname } }}, (err:any,data:any) => {
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

    public getAll(req:Request, res:Response){
        Estudiante.find({},(err:Error, estudiante: MongooseDocument)=>{
            if(err){
                res.status(401).send(err);
            }else{
                res.status(200).json(estudiante);
            }
            
        });
    }

    public async newEstudiante(req: Request, res: Response) {
        const OEstudiante= new Estudiante(req.body);        
        const CarreraExiste1db: any = await getCarrera(req.body.Carreras[0]);

        if(req.body.Carreras[1] != undefined){
        const CarreraExiste2db: any = await getCarrera(req.body.Carreras[1]);
        OEstudiante.Carreras.push(CarreraExiste1db,CarreraExiste2db)
        }else{
            OEstudiante.Carreras.push(CarreraExiste1db)
        }
        

        const NickRepitdb: any = await super.getOneEstudiante(req.body.NickName);
        const EmailRepitdb: any = await super.getEmailEstudiante(req.body.Email);        

        OEstudiante.Password=CryptoJS.AES.encrypt(req.body.Password, 'password').toString(); 
        
        if ((CarreraExiste1db != null) && (NickRepitdb == null) && (EmailRepitdb == null)){
            OEstudiante.save((err: Error, estudiante: IEstudiante)=>{
                if(err){
                    res.status(401).send(err);
                }
                res.status(200).json(Estudiante ?{"successed": true, "Estudiante": estudiante} : {"successed": false})
            });
        }else{
            res.status(400).json({successed:false, carrera:CarreraExiste1db, nick:NickRepitdb, email:EmailRepitdb});
        }
    }

    public async login(req: Request, res: Response) {
        const OPassword = (req.body.Password);       
        const OLogindb: any = await super.getOneEstudiante(req.body.NickName);

        var bytes  = CryptoJS.AES.decrypt(OLogindb.Password, 'password');
        var originalText = bytes.toString(CryptoJS.enc.Utf8);

        if(OLogindb != null){
            if(OPassword != originalText){
                res.status(400).send('Password error')
            }else{
                res.status(200).json(Estudiante ?{"successed": true} : {"successed": false})
            }
        }else{
            res.status(400).send('NickName error');
        }
    }

    public async getEstudiante(req:Request,res:Response){
        const OEstudiantedb: any = await super.getOneEstudiante(req.params.nick);  
        res.send(OEstudiantedb)  
    }


    public async updateEstudiante(req: Request, res: Response) {
        const OEstudiantedb: any = await super.getOneEstudiante(req.params.nick);    
        
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

/*
    public getEstudiante(req:Request,res:Response){
        Estudiante.findOne({NickName:req.params.nick}).populate("Carreras").exec((err:Error,estudiante:IEstudiante)=>{
            if(err){
                res.status(401).json(err);
            }else{
                res.status(200).json(estudiante);
            }
            
        });
    }*/

    //doc.markModified(path)
    //db.collection.find({"parameters": { "$elemMatch": { "foo": "bar" } }});

/*The $lookup syntax is as follows:

from: it specifies the collection in the database to perform the join with

//Nombre de la collection de la BD a la que queremos cruzar

localField: it is the field from our existing document that we want to look for in the collection

//Campo de la base de datos actual

foreignField: it is a field in the collection specified in the “from” collection

as: the name of the property holding the result. If there are multiple results, it is an array.*/ 
