
export type GroupUser ={
    user_id: number;
    user_name: string;
    group_id: number;
};

export type Group = {
    groupId: number;
    groupName: string;
    groupUuid: string;
    users: GroupUser[];
};