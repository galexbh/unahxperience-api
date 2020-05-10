import mongoose, { Types } from "mongoose";
import { IComentario } from "../models/comentario.model";
import { IEstudiante } from "../models/estudiante.model";
import { IRate } from "../models/rate.model";

export interface IForo extends mongoose.Document{
    Title: String;
    Description: String;
    date: string;
    like: string;
    AccountNumber: number;  
    RateStart: IRate;
    Estudiante_id: IEstudiante;
    Comentario_id : IComentario;
    
}

const ForoSchema= new mongoose.Schema({
    NickName: {type: String, required: true},
    Name: {type: String, required: true},
    LastName: {type: String, required: true},
    Email: {type: String, required: true},
    Password: {type: String, required: true},
    AccountNumber: {type: String, required: true},
    Rol: {type: String, required: true},
    Carrera1: {type: mongoose.Schema.Types.ObjectId, ref: "Carrera", required: true},
    
});

export const Foro = mongoose.model<IForo>("Foro",ForoSchema);