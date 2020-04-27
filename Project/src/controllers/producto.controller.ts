import {Application} from "express";
import {ProductoService} from "../services/producto.service";

export class ProductoController{
    private prod_service: ProductoService;
    constructor(private app: Application){
        this.prod_service = new ProductoService();
        this.routes();
    }
    private routes(){
        this.app.route("/producto/:id")
        .get(this.prod_service.GetProducto);
    }
}