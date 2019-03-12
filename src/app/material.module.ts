import { NgModule } from '@angular/core';

import {MatButtonModule} from '@angular/material';
import {DragDropModule} from '@angular/cdk/drag-drop';

@NgModule({
    exports: [
        MatButtonModule,
        DragDropModule
    ]
})
export class MaterialModule { }
