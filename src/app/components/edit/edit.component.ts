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

  constructor() { }

  ngOnInit() {
  }

  @HostListener('click', ['$event.target'])
  onClick(target) {
    if (!this.state) {
      this.state = true;
      this.tempVal = this.currentVal;
    }
  }

  saveChanges() {
    this.valueChange.emit(this.tempVal);
    this.state = false;
  }

  getStyles() {
    return;
  }

}
