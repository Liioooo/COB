import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  public state: boolean = false;

  constructor() { }

  toggle() {
    this.state = !this.state;
  }
}
