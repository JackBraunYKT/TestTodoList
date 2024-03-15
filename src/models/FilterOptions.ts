export enum FilterOptions {
  all = "all",
  completed = "completed",
  uncompleted = "uncompleted",
}

export type TFilterOption = keyof typeof FilterOptions;
