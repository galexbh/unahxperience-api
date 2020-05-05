import mongoose from "mongoose";

export interface ICarrera extends mongoose.Document{
    NombreCarrera: string;
    Facultad: string;
}

const CarreraSchema= new mongoose.Schema({
    _id: {type: String, requerid:true},
    NombreCarrera: {type: String, required:true},
    Facultad: {type: String, required:true}
});

export const Carrera = mongoose.model<ICarrera>("Carrera",CarreraSchema);