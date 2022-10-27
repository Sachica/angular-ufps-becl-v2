export interface ISection {
  id: number;
  section: string;
  capacity: number;
}

export interface ISectionStaff {
  id: number;
  section_id: string;
  staff_id: string;
}

export interface ISectionComposite extends ISection {
  staffs: ISectionStaff[];
}