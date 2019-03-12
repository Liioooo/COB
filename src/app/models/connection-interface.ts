import {Page} from './page-interface';

export interface Connection {
  condition: string;
  nextPage: Page;
}
