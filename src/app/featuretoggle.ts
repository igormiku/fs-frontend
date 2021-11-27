export interface FeatureToggle {
    id: number;
    displayname: string;
    technicalname: string;
    expireson: string;
    description: string;
    inverted: boolean;
    customerids: Array<string>;
  }
  
