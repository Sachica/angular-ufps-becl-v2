export interface IGeneral {
  visits: number;
  visitors: number;
  avg_time: number;
}

export interface IPaginator {
  page: number;
  size_page: number;
}

export interface IFilterLog extends IPaginator {
  only_staff: boolean;
  filter_date: string;
  filter_date_v: Date;
}