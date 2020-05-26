import mongoose from "mongoose";
import { ICarrera } from "../models/carrera.model";

export interface ICurso extends mongoose.Document{
    NombreCurso: string;
    Carrera: ICarrera;
}

const CursoSchema= new mongoose.Schema({
    NombreCurso: {type: String, required: true},
    Carrera: {type: mongoose.Schema.Types.ObjectId,ref: "Carrera"}
});

export const Curso = mongoose.model<ICurso>("Curso",CursoSchema);