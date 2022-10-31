import { ISimpleStaff } from "./user.interface";

export interface ISection {
  id: number;
  section: string;
  capacity: number;
}

export interface ISectionStaffSave {
  section_id: number;
  staff_id: number;
}

export interface ISectionStaff extends ISectionStaffSave {
  id: number
}

export interface ISectionComposite extends ISection {
  staffs: ISectionStaff[];
}