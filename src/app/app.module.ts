import {BrowserModule} from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './material.module';
import {LeftSidebarComponent} from './components/left-sidebar/left-sidebar.component';
import {MainViewComponent} from './components/main-view/main-view.component';
import {RightSidebarComponent} from './components/right-sidebar/right-sidebar.component';
import {SmallPagePreviewComponent} from './components/small-page-preview/small-page-preview.component';
import {DragableDirective} from './directives/dragable/dragable.directive';
import {AppMainViewZoomDirective} from './directives/main-view-zoom/main-view-zoom.directive';
import {SelectRectDirective} from './directives/select-rect/select-rect.directive';
import {NgxElectronModule} from 'ngx-electron';
import {EditComponent} from './components/edit/edit.component';
import {FormsModule} from '@angular/forms';
import {MiniPageMenuComponent} from './components/mini-page-menu/mini-page-menu.component';
import {RightClickMenuComponent} from './components/right-click-menu/right-click-menu.component';

@NgModule({
  declarations: [
    AppComponent,
    LeftSidebarComponent,
    MainViewComponent,
    RightSidebarComponent,
    SmallPagePreviewComponent,
    DragableDirective,
    AppMainViewZoomDirective,
    SelectRectDirective,
    EditComponent,
    MiniPageMenuComponent,
    RightClickMenuComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    NgxElectronModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
}
