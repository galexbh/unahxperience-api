import mongoose from "mongoose";

export interface ICarrera extends mongoose.Document{
    NombreCarrera: string;
}

const CarreraSchema= new mongoose.Schema({
    _IdCarrera: {type: String, requerid:true},
    NombreCarrera: {type: String, required:true}
});

export const Carrera = mongoose.model<ICarrera>("Carreras",CarreraSchema);