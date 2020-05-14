import mongoose, { mongo } from "mongoose";
import { IComentario } from "../models/comentario.model";
import { IEstudiante } from "./estudiante.model";

export interface IForo extends mongoose.Document{
    Title: String;
    Description: String;
    date: string;
    like: number;
    Comentario_id : [IComentario]; 
    EstudianteID: IEstudiante;  
}
const ForoSchema= new mongoose.Schema({
    Title: {type: String, required: true},
    Description: {type: String, required: true},
    date: {type: String, required: true},
    like: {type: Number, required: false},
    Comentario_id: [{type: mongoose.Schema.Types.Mixed, ref: "Comentario", required: false}],
    EstudianteID: {type: mongoose.Schema.Types.ObjectId,ref: "Estudiante", required: true}
});

export const Foro = mongoose.model<IForo>("Foro",ForoSchema);