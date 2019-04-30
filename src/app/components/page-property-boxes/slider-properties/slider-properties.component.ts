import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {Page} from "../../../models/page-interface";
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-slider-properties',
  templateUrl: './slider-properties.component.html',
  styleUrls: ['./slider-properties.component.scss']
})
export class SliderPropertiesComponent implements OnChanges, OnDestroy {

  @Input()
  public page: Page;

  public sliderControlForm: FormGroup;
  private subscription: Subscription;

  constructor(private formBuilder: FormBuilder) { }

  ngOnChanges(changes: SimpleChanges): void {
      if (this.subscription) {
          this.subscription.unsubscribe();
      }

      if (!this.page.sliderControl) {
          this.page.sliderControl = {} as any;
      }

      this.sliderControlForm = this.formBuilder.group({
          lowerLimit: [this.page.sliderControl.lowerLimit || ''],
          upperLimit: [this.page.sliderControl.upperLimit || ''],
          lowerLimitLabel: [this.page.sliderControl.lowerLimitLabel || ''],
          upperLimitLabel: [this.page.sliderControl.upperLimitLabel || ''],
          stepSizeWeb: [this.page.sliderControl.stepSizeWeb || ''],
          stepSizeMobile: [this.page.sliderControl.stepSizeMobile || '']
      });

      this.subscription = this.sliderControlForm.valueChanges.subscribe(values => {
          this.page.sliderControl.lowerLimit = values.lowerLimit;
          this.page.sliderControl.upperLimit = values.upperLimit;
          this.page.sliderControl.upperLimitLabel = values.upperLimitLabel;
          this.page.sliderControl.lowerLimitLabel = values.lowerLimitLabel;
          this.page.sliderControl.stepSizeMobile = values.lowerLimitLabel;
          this.page.sliderControl.stepSizeWeb = values.lowerLimitLabel;
      });
    }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
