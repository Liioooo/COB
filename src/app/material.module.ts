import { NgModule } from '@angular/core';

import {MatButtonModule, MatCardModule, MatIconModule, MatSidenavModule} from '@angular/material';
import {DragDropModule} from '@angular/cdk/drag-drop';

@NgModule({
    exports: [
        MatButtonModule,
        MatSidenavModule,
        DragDropModule,
        MatCardModule,
        MatIconModule
    ]
})
export class MaterialModule { }
