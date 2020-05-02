import mongoose from "mongoose";
import { ICurso, Curso } from "../models/curso.model";
import { Interface } from "readline";

export interface IDocente extends mongoose.Document{
    NombreDocente: string;
    Facultad: string;
    OCurso: ICurso;
    Aprobado: boolean;
}

const DocenteSchema= new mongoose.Schema({
    NombreDocente: {type: String, required: true},
    Facultad: {type: String, required: true},
    OCurso: {type: mongoose.Schema.Types.ObjectId, ref: "Curso"},
    Aprobado: {type: Boolean,required: true}
});

export const Docente = mongoose.model<IDocente>("Docentes",DocenteSchema)

