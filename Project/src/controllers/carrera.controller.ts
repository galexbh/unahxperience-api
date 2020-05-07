import { Application } from "express";
import { CarreraService } from "../services/carrera.service";

export class CarreraController{
    private Carr_Service: CarreraService;
    constructor(private app: Application){
        this.Carr_Service = new CarreraService();
        this.routes();
    }
    private routes(){
        this.app.route("/carrera").post(this.Carr_Service.nuevaCarrera);
        this.app.route("/carreras").get(this.Carr_Service.getAllCarreras);
    }
}