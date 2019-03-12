import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { LeftSidebarComponent } from './components/left-sidebar/left-sidebar.component';
import { MainViewComponent } from './components/main-view/main-view.component';
import { SidebarModule } from 'ng-sidebar';
import { RightSidebarComponent } from './components/right-sidebar/right-sidebar.component';
import {SmallPagePreviewComponent} from './components/small-page-preview/small-page-preview.component';

@NgModule({
  declarations: [
    AppComponent,
    LeftSidebarComponent,
    MainViewComponent,
    RightSidebarComponent,
    SmallPagePreviewComponent
  ],
  imports: [
    BrowserModule,
    SidebarModule.forRoot(),
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
