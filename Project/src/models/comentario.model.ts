import mongoose from "mongoose";
import { IEstudiante } from "../models/estudiante.model";
import { IDocente } from "../models/docente.model";

export interface IComentario extends mongoose.Document{
    FechaComentatio: String;
    ComentarioE: String;
    EstudianteID: IEstudiante;
    DocenteID: IDocente;
}

const ComentarioSchema = new mongoose.Schema({
    FechaComentatio: {type: String, required: true},
    ComentarioE: {type: String, required: true},
    EstudianteID: {type: mongoose.Schema.Types.ObjectId, ref: "Estudiante"},
    DocenteID: {type: mongoose.Schema.Types.ObjectId, ref: "Docente"},
});

export const Comentario = mongoose.model<IComentario>("Comentario",ComentarioSchema);