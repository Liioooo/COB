import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatInputModule,
  MatSelectModule,
  MatSidenavModule,
  MatToolbarModule,
  MatTooltipModule
} from '@angular/material';

@NgModule({
    exports: [
        MatButtonModule,
        MatSidenavModule,
        MatCardModule,
        MatIconModule,
        MatInputModule,
        MatSelectModule,
        MatToolbarModule,
        MatTooltipModule
    ]
})
export class MaterialModule { }
