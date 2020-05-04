import mongoose from "mongoose";
import { IEstudiante } from "../models/estudiante.model";
import { IDocente } from "../models/docente.model";

export interface IComentario extends mongoose.Document{
    FechaComentatio: Date;
    ComentarioE: String;
    RateStar: number;
    ONickName: IEstudiante;
    ODocente: IDocente;
}

const ComentarioSchema = new mongoose.Schema({
    FechaComentatio: {type: Date, required: true},
    ComentarioE: {type: String, required: true},
    RateStar: {type: Number, required: true},
    ONickName: {type: mongoose.Schema.Types.ObjectId, ref: "Estudiante"},
    ODocente: {type: mongoose.Schema.Types.ObjectId, ref: "Docente"}
});

export const Comentario = mongoose.model<IComentario>("Comentario",ComentarioSchema);