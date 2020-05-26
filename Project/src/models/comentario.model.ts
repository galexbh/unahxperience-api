import mongoose from "mongoose";
import { IEstudiante } from "../models/estudiante.model";

export interface IComentario extends mongoose.Document{
    FechaComentatio: String;
    ComentarioE: String;
    Estudiante: IEstudiante;
}

const ComentarioSchema = new mongoose.Schema({
    FechaComentatio: {type: String, required: true},
    ComentarioE: {type: String, required: true},
    Estudiante: {type: mongoose.Schema.Types.ObjectId, ref: "Estudiante"},
});

export const Comentario = mongoose.model<IComentario>("Comentario",ComentarioSchema);