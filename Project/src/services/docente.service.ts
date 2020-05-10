import { Request, Response } from "express";
import { Docente, IDocente } from "../models/docente.model";
import { MongooseDocument } from "mongoose";
import { getCurso } from "../services/curso.service";

class DocenteHelpers{

    public getOneDocente(nickname: string):Promise<any>{
        return new Promise<any>( resolve => {
            Docente.findOne({ NickName: nickname}, (err:any,data:any) => {
                if(err){
                    resolve({});
                }else{
                    resolve(data);
                }
            } );
        });
    }


}

export class DocenteService extends DocenteHelpers{
   
    public async NewDocente(req: Request, res: Response) {
        const ODocente= new Docente(req.body);
        //const old_Docente: any = await super.getOneDocente({_id:ODocente._id});
       
            await ODocente.save((err: Error, docente: IDocente)=>{
                if(err){
                    res.status(401).send(err);
                }else{
                    res.status(200).json(Docente ? {"successed": true, "Docente": docente} : {"successed": false});
                }           
            });
    }
    
}