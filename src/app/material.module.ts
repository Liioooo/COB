import { NgModule } from '@angular/core';

import {MatButtonModule, MatCardModule, MatIconModule, MatSidenavModule, MatToolbarModule} from '@angular/material';
import {DragDropModule} from '@angular/cdk/drag-drop';

@NgModule({
    exports: [
        MatButtonModule,
        MatSidenavModule,
        DragDropModule,
        MatCardModule,
        MatToolbarModule,
        MatIconModule
    ]
})
export class MaterialModule { }
