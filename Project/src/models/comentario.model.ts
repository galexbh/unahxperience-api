import mongoose from "mongoose";
import { IEstudiante } from "../models/estudiante.model";

export interface IComentario extends mongoose.Document{
    FechaComentatio: Date;
    ComentarioE: String;
    EstudianteID: [IEstudiante];
}

const ComentarioSchema = new mongoose.Schema({
    FechaComentatio: {type: Date, required: true},
    ComentarioE: {type: String, required: true},
    EstudianteID: [{type: mongoose.Schema.Types.Mixed, ref: "Estudiante"}],
});

export const Comentario = mongoose.model<IComentario>("Comentario",ComentarioSchema);