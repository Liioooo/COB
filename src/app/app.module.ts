import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { LeftSidebarComponent } from './components/left-sidebar/left-sidebar.component';
import { MainViewComponent } from './components/main-view/main-view.component';
import { RightSidebarComponent } from './components/right-sidebar/right-sidebar.component';
import {SmallPagePreviewComponent} from './components/small-page-preview/small-page-preview.component';
import { DragableDirective } from './directives/dragable/dragable.directive';
import { AppMainViewZoomDirective } from './directives/main-view-zoom/main-view-zoom.directive';
import { SelectRectDirective } from './directives/select-rect/select-rect.directive';
import {NgxElectronModule} from 'ngx-electron';

@NgModule({
  declarations: [
    AppComponent,
    LeftSidebarComponent,
    MainViewComponent,
    RightSidebarComponent,
    SmallPagePreviewComponent,
    DragableDirective,
    AppMainViewZoomDirective,
    SelectRectDirective
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    NgxElectronModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
