import {Application} from "express";
import { ForoService } from "../services/foro.service";

export class ForoController{
    private for_Service: ForoService;
    constructor(private app: Application){
        this.for_Service = new ForoService();
        this.routes();
    }
    private routes(){
        this.app.route("/foro").post(this.for_Service.newOneForo);
        this.app.route("/foro").get(this.for_Service.getAll);
        //Mandar ID 
        this.app.route("/foro/:id")
        .get(this.for_Service.getOneForo)
        .put(this.for_Service.updateOneForo)
        .delete(this.for_Service.deleteOneForo);
    }
}