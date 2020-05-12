import {Application} from "express";
import { SolicitudService } from "../services/solicitud.service";

export class SolicitudController{
    private Sol_Service: SolicitudService;
    constructor(private app: Application){
        this.Sol_Service = new SolicitudService();
        this.routes();
    }
    private routes(){
        this.app.route("/solicitud").post(this.Sol_Service.newSolicitud);
        
    }
}