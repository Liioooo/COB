import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Page} from '../../models/page-interface';

@Component({
  selector: 'app-right-sidebar',
  templateUrl: './right-sidebar.component.html',
  styleUrls: ['./right-sidebar.component.scss']
})
export class RightSidebarComponent implements OnInit, OnChanges {

    @Input()
    selectedPage: Page;

    constructor() { }

    ngOnInit() {
    }

    ngOnChanges(changes: SimpleChanges): void {
        // console.log(this.selectedPage);
    }



}
