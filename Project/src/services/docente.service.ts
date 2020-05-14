import { Request, Response } from "express";
import { Docente, IDocente } from "../models/docente.model";
import { MongooseDocument } from "mongoose";

class DocenteHelpers{

    public getOneDocente(nombreDocente: string):Promise<any>{
        return new Promise<any>( resolve => {
            Docente.findOne({ NombreDocente: nombreDocente}, (err:any,data:any) => {
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

    public getAll(req:Request, res:Response){
        Docente.find({},(err:Error, docente: MongooseDocument)=>{
            if(err){
                res.status(401).send(err);
            }else{
                res.status(200).json(docente);
            }
            
        });
    }
   
    public async NewDocente(req: Request, res: Response) {
        const ODocente= new Docente(req.body);
        const old_Docente: any = await super.getOneDocente(req.body.Docente);
        
        //const OCurso: any = await getCurso(req.body.Ocurso);
       // ODocente.OCurso = OCurso;

       if(old_Docente != null){
            await ODocente.save((err: Error, docente: IDocente)=>{
                if(err){
                    res.status(401).send(err);
                }else{
                    res.status(200).json(Docente ? {"successed": true, "Docente": docente} : {"successed": false});
                }           
            });
        }
        res.status(200).json({successed:false, 'Docente':old_Docente});
    }
    
}