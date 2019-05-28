import {ChangeDetectionStrategy, Component, Input, OnChanges, OnDestroy, SimpleChanges} from '@angular/core';
import {Page} from '../../../models/page-interface';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-selection-controls',
  templateUrl: './selection-controls.component.html',
  styleUrls: ['./selection-controls.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectionControlsComponent implements OnChanges, OnDestroy {

  @Input()
  public page: Page;

  public form: FormGroup;
  private subscription: Subscription;

  constructor(private formBuilder: FormBuilder) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.subscription) {
       this.subscription.unsubscribe();
    }

    this.form = this.formBuilder.group({
        selectionOptions: this.formBuilder.array(this.getFormControlArray())
    });

    this.subscription = this.form.controls.selectionOptions.valueChanges.subscribe((values: {label: string}[]) => {
      const options = values.map(option => {
        return {
          label: option.label,
          value: ''
        };
      });
      for (let i = 0; i < options.length; i++) {
          let foundValue = false;
          for (let j = 0; j < options[i].label.length; j++) {
              const candidate = options[i].label.charAt(j).toUpperCase();
              if (!options.find(o => o.value === candidate)) {
                  options[i].value = candidate;
                  foundValue = true;
                  break;
              }
          }
          if (!foundValue) {
              options[i].value = (Math.random() * 100).toFixed(0) + '';
          }
      }
      this.page.selectionControls = options;
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
       this.subscription.unsubscribe();
    }
  }

  public addOption() {
    const formArray = this.form.controls.selectionOptions as FormArray;
    formArray.push(this.formBuilder.group({
        label: ['']
    }));
  }

  public removeOption(id: number) {
      const formArray = this.form.controls.selectionOptions as FormArray;
      formArray.removeAt(id);
  }

  private getFormControlArray(): FormGroup[] {
    if (!this.page.selectionControls || this.page.selectionControls.length === 0) {
      return [this.formBuilder.group({
          label: ['']
      })];
    }
    return this.page.selectionControls.map(option => {
      return this.formBuilder.group({
         label: [option.label || '']
      });
    });
  }

}
