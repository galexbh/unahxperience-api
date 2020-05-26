import mongoose from "mongoose";
import {IEstudiante} from "./estudiante.model"
import {ICurso} from "./curso.model"

export interface ISolicitud extends mongoose.Document { 
    Name: string;
    LastName: number;
    Curso: ICurso;
    Estudiante: IEstudiante;
}

const SolicitudSchema = new mongoose.Schema({
    name: { type: String, required: true},
    LastName: {type: String, required: true},
    Curso: {type: mongoose.Schema.Types.ObjectId, ref: "Curso"},
    Estudiante: { type: mongoose.Schema.Types.ObjectId, ref: "Estudiante" }
});


export const Solicitud = mongoose.model<ISolicitud>("Solicitud", SolicitudSchema);