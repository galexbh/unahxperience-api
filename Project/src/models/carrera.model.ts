import mongoose from "mongoose";

export interface ICarrera extends mongoose.Document{
    NombreCarrera: string;
    Facultad: string;
}

const CarreraSchema= new mongoose.Schema({
    NombreCarrera: {type: String, required:true},
    Facultad: {type: String, required:true}
});

export const Carrera = mongoose.model<ICarrera>("Carrera",CarreraSchema);