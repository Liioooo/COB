import {ChangeDetectionStrategy, Component, Input, OnChanges, OnDestroy, SimpleChanges} from '@angular/core';
import {Page} from '../../../models/page-interface';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-page-default-properties',
  templateUrl: './page-default-properties.component.html',
  styleUrls: ['./page-default-properties.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageDefaultPropertiesComponent implements OnChanges, OnDestroy {

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
            shortName: [this.page.shortName || ''],
            title: [this.page.title || ''],
            helpQuestion: [this.page.helpQuestion || ''],
            helpTooltip: [this.page.helpTooltip || ''],
            mandatory: [this.page.mandatory || ''],
            handover: [this.page.handover || ''],
            handoverText: [this.page.handoverText || '']
        });

        this.subscription = this.form.valueChanges.subscribe(values => {
            this.page.shortName = values.shortName;
            this.page.title = values.title;
            this.page.helpQuestion = values.helpQuestion;
            this.page.helpTooltip = values.helpTooltip;
            this.page.mandatory = values.mandatory !== '';
            this.page.handover = values.handover !== '';
            this.page.handoverText = values.handoverText;
        });
    }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

}
