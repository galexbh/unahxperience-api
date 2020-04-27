import {Application} from "express";
import {ProveedorService} from "../services/proveedor.service";

export class ProveedorController{
    private prov_service: ProveedorService;
    constructor(private app: Application){
        this.prov_service = new ProveedorService();
        this.routes();
    }
    private routes(){
        this.app.route("/proveedores").get(this.prov_service.getAll);

        this.app.route("/proveedor").post(this.prov_service.NewOne);

        this.app.route("/proveedor/:id_prov")
        .get(this.prov_service.GetById)
        .put(this.prov_service.Update)
        .delete(this.prov_service.Delete);
    }
}