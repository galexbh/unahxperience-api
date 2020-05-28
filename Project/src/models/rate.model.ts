import mongoose from "mongoose";
import { IEstudiante } from "../models/estudiante.model";

export interface IRate extends mongoose.Document{
    Rate: number; 
    EstudianteID: IEstudiante;
}

const RateSchema= new mongoose.Schema({
    Rate: {type: Number, required: true},
    EstudianteID: {type: mongoose.Schema.Types.ObjectId, ref: "Estudiante", required: true},
    
});

export const Rate = mongoose.model<IRate>("Rate",RateSchema);