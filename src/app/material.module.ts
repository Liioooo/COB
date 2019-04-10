import {NgModule} from '@angular/core';
import {
  MatButtonModule,
  MatCardModule, MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatSelectModule,
  MatSidenavModule,
  MatToolbarModule,
  MatTooltipModule
} from '@angular/material';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  exports: [
    MatButtonModule,
    MatSidenavModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatToolbarModule,
    MatTooltipModule,
    ReactiveFormsModule,
    MatFormFieldModule
  ]
})
export class MaterialModule {
}
