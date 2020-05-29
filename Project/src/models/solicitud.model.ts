import mongoose from "mongoose";
import {IEstudiante} from "./estudiante.model"
import {ICurso} from "./curso.model"

export interface ISolicitud extends mongoose.Document { 
    Name: string;
    LastName: string;
    CursoID: ICurso;
    EstudianteID: IEstudiante;
}

const SolicitudSchema = new mongoose.Schema({
    Name: { type: String, required: true},
    LastName: {type: String, required: true},
    CursoID: {type: mongoose.Schema.Types.ObjectId, ref: "Curso"},
    EstudianteID: { type: mongoose.Schema.Types.ObjectId, ref: "Estudiante" }
});


export const Solicitud = mongoose.model<ISolicitud>("Solicitud", SolicitudSchema);
