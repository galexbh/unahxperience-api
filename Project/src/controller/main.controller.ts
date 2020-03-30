import {Application} from "express";
import {MainService} from "../services/main.service";

export class MainController{
    private mainService: MainService;

    constructor(private app:Application){
        this.mainService = new MainService();
        this.routes();
    }

    public routes(){
        this.app.get("/",this.mainService.welcome);
    }
}