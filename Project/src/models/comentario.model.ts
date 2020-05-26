import mongoose from "mongoose";
import { IEstudiante } from "../models/estudiante.model";
import { IDocente } from "../models/docente.model";

export interface IComentario extends mongoose.Document{
    FechaComentatio: String;
    ComentarioE: String;
    Estudiante: IEstudiante;
    Docente: IDocente;
}

const ComentarioSchema = new mongoose.Schema({
    FechaComentatio: {type: String, required: true},
    ComentarioE: {type: String, required: true},
    Estudiante: {type: mongoose.Schema.Types.ObjectId, ref: "Estudiante"},
    Docente: {type: mongoose.Schema.Types.ObjectId, ref: "Docente"},
});

export const Comentario = mongoose.model<IComentario>("Comentario",ComentarioSchema);