export interface ILockerSimple{
    locker: string;
    available: boolean;
    start_time_lock: Date;
    user_id: number;
    section_id: number;
    operation_log: number;
}

export interface IAcquireLocker{
    token: string;
    id_section: number;
    id_staff: number;
}

export interface IOperationLog{
    id: number;
    user_id: number;
    section: string;
    staff_lock_id: number;
    staff_release_id: number;
    locker_name: string;
    start_time_use: Date;
    end_time_use: Date;
    updated_at: Date;
}