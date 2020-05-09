import mongoose from "mongoose";
import { ICurso, Curso } from "../models/curso.model";
import { Interface } from "readline";

export interface IDocente extends mongoose.Document{
    NombreDocente: string;
    Facultad: string;
    Aprobado: boolean;
    OCurso: ICurso;
}

const DocenteSchema= new mongoose.Schema({
    NombreDocente: {type: String, required: true},
    Facultad: {type: String, required: true},
    Aprobado: {type: Boolean,required: true},
    OCurso: {type: mongoose.Schema.Types.ObjectId, ref: "Curso"}
});

export const Docente = mongoose.model<IDocente>("Docente",DocenteSchema)

