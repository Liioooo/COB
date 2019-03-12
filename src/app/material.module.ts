import { NgModule } from '@angular/core';

import {MatButtonModule, MatCardModule, MatSidenavModule} from '@angular/material';
import {DragDropModule} from '@angular/cdk/drag-drop';

@NgModule({
    exports: [
        MatButtonModule,
        MatSidenavModule,
        DragDropModule,
        MatCardModule
    ]
})
export class MaterialModule { }
