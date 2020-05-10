import mongoose from "mongoose";
import { IEstudiante } from "../models/estudiante.model";
import { IDocente } from "../models/docente.model";
import { IForo } from "../models/foro.models";


export interface IComentario extends mongoose.Document{
    FechaComentatio: Date;
    ComentarioE: String;
    ONickName: IEstudiante;
    ODocente: IDocente;
    OForo: IForo;
}

const ComentarioSchema = new mongoose.Schema({
    FechaComentatio: {type: Date, required: true},
    ComentarioE: {type: String, required: true},
    ONickName: {type: mongoose.Schema.Types.ObjectId, ref: "Estudiante"},
    ODocente: {type: mongoose.Schema.Types.ObjectId, ref: "Docente", required: false},
    OForo: {type: mongoose.Schema.Types.ObjectId, ref: "Foro", required: false}
});

export const Comentario = mongoose.model<IComentario>("Comentario",ComentarioSchema);