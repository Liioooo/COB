import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SliderPropertiesComponent} from "./components/page-property-boxes/slider-properties/slider-properties.component";
import {SplashScreenPropertiesComponent} from "./components/page-property-boxes/splash-screen-properties/splash-screen-properties.component";
import {FamilySituationPropertiesComponent} from "./components/page-property-boxes/family-situation-properties/family-situation-properties.component";
import {MultiSelectCheckboxPropertiesComponent} from "./components/page-property-boxes/multi-select-checkbox-properties/multi-select-checkbox-properties.component";
import {MonthlyInvestmentPropertiesComponent} from "./components/page-property-boxes/monthly-investment-properties/monthly-investment-properties.component";
import {SingleSelectCheckboxPropertiesComponent} from "./components/page-property-boxes/single-select-checkbox-properties/single-select-checkbox-properties.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MaterialModule} from "./material.module";
import {SummaryPropertiesComponent} from "./components/page-property-boxes/summary-properties/summary-properties.component";
import {ConfirmationRejectionProprtiesComponent} from "./components/page-property-boxes/confirmation-rejection-proprties/confirmation-rejection-proprties.component";
import {AdvisorLoginProprtiesComponent} from "./components/page-property-boxes/advisor-login-proprties/advisor-login-proprties.component";

@NgModule({
  declarations: [
    SliderPropertiesComponent,
    SplashScreenPropertiesComponent,
    FamilySituationPropertiesComponent,
    MultiSelectCheckboxPropertiesComponent,
    MonthlyInvestmentPropertiesComponent,
    SingleSelectCheckboxPropertiesComponent,
    SummaryPropertiesComponent,
    ConfirmationRejectionProprtiesComponent,
    AdvisorLoginProprtiesComponent
  ],
  exports: [
    SliderPropertiesComponent,
    SplashScreenPropertiesComponent,
    FamilySituationPropertiesComponent,
    MultiSelectCheckboxPropertiesComponent,
    MonthlyInvestmentPropertiesComponent,
    SingleSelectCheckboxPropertiesComponent,
    SummaryPropertiesComponent,
    ConfirmationRejectionProprtiesComponent,
    AdvisorLoginProprtiesComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class PagePropertyBoxesModule { }
