import app from "./app";
import {config} from "dotenv";
import {resolve} from "path";

config({path:resolve(__dirname,"../../.env")});

app.listen(3000, ()=>{
    console.log("http://localhost:3000/");
})