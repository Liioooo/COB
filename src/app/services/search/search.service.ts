import {Injectable} from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class SearchService {
  show: boolean = false;
  keyword: string = "";

  constructor() {}

  toggle() {
    this.show = !this.show;
  }

}
