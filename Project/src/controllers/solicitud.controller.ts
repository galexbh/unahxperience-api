import {Application} from "express";
import { SolicitudService } from "../services/solicitud.service";

export class SolicitudController{
    private Sol_Service: SolicitudService;
    constructor(private app: Application){
        this.Sol_Service = new SolicitudService();
        this.routes();
    }
    private routes(){
        this.app.route("/solicitud").post(this.Sol_Service.newOneSolicitud);
        this.app.route("/solicitud").get(this.Sol_Service.getAll);
        //Mandar ID 
        this.app.route("/solicitud/:id")
        .get(this.Sol_Service.getOneSolicitud)
        .put(this.Sol_Service.updateOneSolicitud)
        .delete(this.Sol_Service.deleteOneSolicitud);
    }
}