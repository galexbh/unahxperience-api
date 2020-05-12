import {Application} from "express";
import { ForoService } from "../services/foro.service";

export class ForoController{
    private for_Service: ForoService;
    constructor(private app: Application){
        this.for_Service = new ForoService();
        this.routes();
    }
    private routes(){
        this.app.route("/foro").post(this.for_Service.newForo);

        
    }
}