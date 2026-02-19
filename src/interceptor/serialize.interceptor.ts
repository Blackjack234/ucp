import {
    UseInterceptors,
    NestInterceptor,
    ExecutionContext,
    CallHandler   
} from "@nestjs/common"

import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { plainToClass } from "class-transformer";

interface ClassConsturctor{
new (...args:any[]):{}
}
export function Serialize(dto: ClassConsturctor ){
 return UseInterceptors(new SerializedInterceptor(dto))
}
export class SerializedInterceptor implements NestInterceptor {

    constructor(private dto:any){}
    intercept(context : ExecutionContext,handler:CallHandler):Observable<any>{
        // Run something before a request is handle 
        // by the request handler
        
        // console.log('im running before the handler',context);

        return handler.handle().pipe(
            map((data:any)=>{
              // run something before the response is sent out.
              // console.log('i am running after the request handler',data);

              return plainToClass(this.dto,data,{
                excludeExtraneousValues:true
              })
              
            })
        )
        
    }
}