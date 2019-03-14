export interface Page {
  questionId: string;
  templateType: 'none' | 'AdvisorLogin' | 'SingleSelectCheckbox' | 'SplashScreen' | 'Slider' | 'FamilySituation' |
    'MultiSelectCheckbox' | 'MonthlyInvestment' | 'Summary' | 'ConfirmationRejection';
  connections: {condition: string, nextPage: Page}[];

  posX?: number;
  posY?: number;
  isSelected?: boolean;

  // nextQuestion: string;
  shortName?: string;
  title?: string;
  helpQuestion?: string;
  helpTooltip?: string;
  mandatory?: boolean;
  handover?: boolean;
  handoverText?: string;
}
