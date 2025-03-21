import { ApplicationConfig } from "@angular/core";
import { provideRouter } from "@angular/router";
import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { provideAnimations } from "@angular/platform-browser/animations";
import { routes } from "./app.routes";
import { provideToastr } from "ngx-toastr";
import { errorInterceptor } from "./_interceptors/error.interceptor";

export const appConfig: ApplicationConfig ={
    providers: [
        provideRouter(routes),
        provideHttpClient(withInterceptors([errorInterceptor])),
        provideAnimations(),
        provideToastr({
            positionClass: 'toast-bottom-right'
        })
    ]
}