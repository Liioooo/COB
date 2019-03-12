import { NgModule } from '@angular/core';

import {MatButtonModule, MatSidenavModule} from '@angular/material';

@NgModule({
    exports: [
        MatButtonModule,
        MatSidenavModule
    ]
})
export class MaterialModule { }
