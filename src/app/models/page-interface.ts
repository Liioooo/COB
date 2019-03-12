import {Connection} from './connection-interface';

export interface Page {
  questionId: string;
  connections: Connection[];

  // templateType: string;
  // nextQuestion: string;
  // shortName: string;
  // title: string;
  // helpQuestion: string;
  // helpTooltip: string;
  // mandatory: boolean;
  // handover: boolean;
  // handoverText: string;
}
