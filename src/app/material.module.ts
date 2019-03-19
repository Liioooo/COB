import { NgModule } from '@angular/core';
import { MatButtonModule, MatCardModule, MatIconModule, MatInputModule, MatSelectModule, MatSidenavModule, MatToolbarModule } from '@angular/material';

@NgModule({
    exports: [
        MatButtonModule,
        MatSidenavModule,
        MatCardModule,
        MatIconModule,
        MatInputModule,
        MatSelectModule
        MatToolbarModule
    ]
})
export class MaterialModule { }
