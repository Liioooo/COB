import { NgModule } from '@angular/core';
import {MatButtonModule, MatCardModule, MatIconModule, MatInputModule, MatSelectModule, MatSidenavModule} from '@angular/material';
import {DragDropModule} from '@angular/cdk/drag-drop';

@NgModule({
    exports: [
        MatButtonModule,
        MatSidenavModule,
        DragDropModule,
        MatCardModule,
        MatIconModule,
        MatInputModule,
        MatSelectModule
    ]
})
export class MaterialModule { }
