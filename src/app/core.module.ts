import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { InterceptorService } from './auth/auth.interceptor.service';


@NgModule({
     providers: [ 
        { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true}
     ]
})
export class CoreModule{

}