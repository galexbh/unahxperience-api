import mongoose from "mongoose";
import { IComentario } from "../models/comentario.model";
import { IRate } from "../models/rate.model";

export interface IForo extends mongoose.Document{
    Title: String;
    Description: String;
    date: string;
    like: number;
    RateStart: IRate;
    ComentarioID: IComentario;
}
const ForoSchema= new mongoose.Schema({
    Title: {type: String, required: true},
    Description: {type: String, required: true},
    date: {type: String, required: true},
    like: {type: Number, required: true},
    RateStart: {type: mongoose.Schema.Types.ObjectId, ref: "Rate"},
    ComentarioID: {type: mongoose.Schema.Types.ObjectId, ref: "Comentario"},
});

export const Foro = mongoose.model<IForo>("Foro",ForoSchema);