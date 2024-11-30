export interface PageRoute {
  key: string;// path
  label: string;
  children?: PageRoute[];
}