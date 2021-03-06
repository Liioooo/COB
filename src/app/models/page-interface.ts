export interface Page {
  questionId: string;
  templateType: 'none' | 'AdvisorLogin' | 'SingleSelectCheckbox' | 'SplashScreen' | 'Slider' | 'FamilySituation' |
    'MultiSelectCheckbox' | 'MonthlyInvestment' | 'Summary' | 'ConfirmationRejection';


  // diese sonderbare Struktur hat historische Gründe
  connections: {
    nextPage: Page;
  }[];

  condition?: string;
  nextQuestion?: string;
  thanQuestion?: string;
  elseQuestion?: string;


  prevConnected: Page[];

  posX?: number;
  posY?: number;

  // just used for connection
  pixelPosX?: number;
  pixelPosY?: number;

  isSelected?: boolean;
  currentlyDragged?: boolean;
  draggingNewConnection?: boolean;

  // config for evert page
  shortName: string;
  title: string;
  helpQuestion: string;
  helpTooltip: string;
  mandatory: boolean;
  handover: boolean;
  handoverText: string;

  // slider only
  sliderControl?: {
    lowerLimit: number;
    upperLimit: number;
    lowerLimitLabel: string;
    upperLimitLabel: string;
    stepSizeWeb: number;
    stepSizeMobile: number;
  };


  // MonthlyInvestment, MultiSelectCheckbox, SingleSelectCheckbox, FamilySituation
  selectionControls?: {
    label: string;
    value: string;
  }[];

}
