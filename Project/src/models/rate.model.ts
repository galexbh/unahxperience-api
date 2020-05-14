import mongoose from "mongoose";
import { IEstudiante } from "../models/estudiante.model";
import { IDocente } from "./docente.model";

export interface IRate extends mongoose.Document{
    Rate: number; 
    Estudiante_id: IEstudiante;
    DocenteID: IDocente;
}

const RateSchema= new mongoose.Schema({
    Rate: {type: Number, required: true},
    Estudiante_id: {type: mongoose.Schema.Types.ObjectId, ref: "Estudiante", required: true},
    DocenteID: {type: mongoose.Schema.Types.ObjectId, ref: "Docente", required: true}
});

export const Rate = mongoose.model<IRate>("Rate",RateSchema);