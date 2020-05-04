import mongoose from "mongoose";
import {IProveedor} from "./proveedor.model"

export interface IProducts extends mongoose.Document { 
    name: string;
    precio_venta: number;
    precio_compra: number;
    cantidad: number;
    proveedor: IProveedor;
}

const ProductoSchema = new mongoose.Schema({
    name: { type: String, required: true},
    precio_venta: {type: Number, required: true},
    precio_compra: {type: Number, required: true},
    cantidad: {type: Number, required: true},
    proveedor: { type: mongoose.Schema.Types.ObjectId, ref: "Proveedor" }
});


export const Producto = mongoose.model<IProducts>("Producto", ProductoSchema);