import mongoose from "mongoose";
import { ICarrera } from "../models/carrera.model";

export interface ICurso extends mongoose.Document{
    NombreCurso: string;
    CarreraID: ICarrera;
}

const CursoSchema= new mongoose.Schema({
    _id: {type: String, required: true},
    NombreCurso: {type: String, required: true},
    CarreraID: {type: mongoose.Schema.Types.ObjectId,ref: "Carrera"}
});

export const Curso = mongoose.model<ICurso>("Curso",CursoSchema);