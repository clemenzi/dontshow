export interface Settings {
  sensitiveAlert?: boolean;
  inputCensoring?: boolean;
  uncensorOnFocus?: boolean;
  enableOnLocalhost?: boolean;
  debugMessages?: boolean;
  dynamicFiltersIp?: boolean;
}

export interface Filter {
  expression: string;
  domain: string;
  type: "censor" | "remove";
  automatic?: boolean;
  enabled: boolean;
}

export interface Element {
  website: string;
  selector: string;
  action: "censor" | "remove";
}
