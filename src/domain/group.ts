
export interface GroupUser {
    user_id: number;
    user_name: string;
    group_uuid: string;
}

export interface Group {
    group_name: string;
    group_uuid: string;
    Users: GroupUser[];
}