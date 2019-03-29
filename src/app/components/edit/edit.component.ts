import {Component, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  @Input()
  currentVal: string;

  @Output()
  valueChange: EventEmitter<any> = new EventEmitter();

  elemStyles;
  tempVal: string;
  state: boolean = false;
  actionButtonState: boolean = false;

  constructor() {
  }

  ngOnInit() {
  }

  @HostListener('click', ['$event.target'])
  onClick(target) {
    if (!this.state && !this.actionButtonState) {
      this.state = true;
      this.tempVal = this.currentVal;
    } else if (this.actionButtonState) {
      this.actionButtonState = false;
    }
  }

  saveChanges(savedVal: string, type?: boolean) {
    if (type) {
      this.actionButtonState = true;
    }

    this.valueChange.emit(savedVal);
    this.state = false;
  }

  getStyles() {
    return;
  }

}
