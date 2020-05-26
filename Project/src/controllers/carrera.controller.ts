import { Application } from "express";
import { CarreraService } from "../services/carrera.service";

export class CarreraController{
    private Carr_Service: CarreraService;
    constructor(private app: Application){
        this.Carr_Service = new CarreraService();
        this.routes();
    }
    private routes(){
        this.app.route("/carrera").post(this.Carr_Service.NuevaCarrera);
        this.app.route("/carrera").get(this.Carr_Service.getOneCarrera);
        this.app.route("/carreras").get(this.Carr_Service.getAllCarreras);
        this.app.route("/carrera/:c_name").get(this.Carr_Service.getCarrera);

       this.app.route("/carrera/:id_car").put(this.Carr_Service.UpdateCarrera);
    }
}