import {Application} from "express";
import { RateService } from "../services/rate.service";

export class RateController{
    private rate_Service: RateService;
    constructor(private app: Application){
        this.rate_Service = new RateService();
        this.routes();
    }
    private routes(){
        this.app.route("/rate").post(this.rate_Service.newRate);

        
    }
}