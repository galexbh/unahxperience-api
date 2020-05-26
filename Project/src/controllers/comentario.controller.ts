import {Application} from "express";
import { ComentarioService } from "../services/comentario.service";

export class ComentarioController{
    private Comnt_Service: ComentarioService;
    constructor(private app: Application){
        this.Comnt_Service = new ComentarioService();
        this.routes();
    }
    private routes(){
        this.app.route("/comentario").post(this.Comnt_Service.newComentario);
        this.app.route("/comentario").get(this.Comnt_Service.getAll);
        //Mandar ID 
        this.app.route("/comentario/:id")
        .get(this.Comnt_Service.getComentario)
        .put(this.Comnt_Service.updateComentario)
        .delete(this.Comnt_Service.deleteComentario);
    }
}