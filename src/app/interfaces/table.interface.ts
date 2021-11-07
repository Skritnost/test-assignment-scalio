export interface TableInterface<T = string | number> {
  value: T;
  label: string;
  isUrl?: boolean;
  isHidden?: boolean;
}

export interface TableRowInterface {
  [key: string]: TableInterface;
}
