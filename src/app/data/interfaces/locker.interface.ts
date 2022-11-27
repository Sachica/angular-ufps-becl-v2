export interface ILockerSimple{
    locker: string,
    available: boolean,
    start_time_lock: Date,
    user_id: number,
    section_id: number,
    operation_log: number,
}

export interface IAcquireLocker{
    token: string,
    id_section: number,
    id_staff: number,
}