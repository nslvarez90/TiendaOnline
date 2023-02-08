import { ProductService } from 'src/app/services/product.service';
import { ConvertService } from './services/convert.service';
import { UtilityService } from './services/utility.service';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BootstrapIconsModule } from 'ng-bootstrap-icons';
import { allIcons } from 'ng-bootstrap-icons/icons';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,    
    BootstrapIconsModule.pick(allIcons)
  ],  
  exports: [
    BootstrapIconsModule
  ],
  providers: [{
    provide: LocationStrategy,
    useClass: PathLocationStrategy,
  },
    UtilityService,
    ConvertService,
    ProductService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
