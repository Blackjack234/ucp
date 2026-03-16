import { Injectable,NestMiddleware } from "@nestjs/common";
import { Request,Response,NextFunction } from "express";
import { UserService } from "../user.service";
import { User } from "../entities/user.entity";

declare global {
    namespace Express {
        interface Request {
            currentUser?: User | null;
        }
    }
}

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware{

    constructor(private readonly userService:UserService){

    }
    async use(req:Request,res:Response,next:NextFunction){
       const {userId} = req.session || {}

    //    console.log(userId," userId from middleware");
       

       if(userId){
           const user = await this.userService.findOne(userId)
           //@ts-ignore
           req.currentUser = user
       }
       next()
    }
}