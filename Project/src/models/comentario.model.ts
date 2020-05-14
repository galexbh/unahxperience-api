import mongoose from "mongoose";
import { IEstudiante } from "../models/estudiante.model";
import { IDocente } from "../models/docente.model";

export interface IComentario extends mongoose.Document{
    FechaComentario: string;
    ComentarioE: String;
    EstudianteID: IEstudiante;
    DocenteID: IDocente;
}

const ComentarioSchema = new mongoose.Schema({
    FechaComentario: {type: String, required: true},
    ComentarioE: {type: String, required: true},
    EstudianteID: {type: mongoose.Schema.Types.ObjectId, ref: "Estudiante"},
    DocenteID: {type: mongoose.Schema.Types.ObjectId, ref: "Estudiante",required:false},
    ForoID: {type: mongoose.Schema.Types.ObjectId, ref: "Foro",required:false},
});

export const Comentario = mongoose.model<IComentario>("Comentario",ComentarioSchema);