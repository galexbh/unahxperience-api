import mongoose from "mongoose";

export interface IDocente extends mongoose.Document{
    NombreDocente: string;
    LastName: number;
    Cursos: string;
}

const DocenteSchema= new mongoose.Schema({
    NombreDocente: {type: String, required: true},
    LastName: {type: Number,required: true},
    Cursos: {type: String}
});

export const Docente = mongoose.model<IDocente>("Docente",DocenteSchema)

