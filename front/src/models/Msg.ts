export interface Msg{
msg:string;
file:string;
sender_id:string;
receiver_id:string;
};
export interface MsgResponse{
    id: number,
    msg_id: string,
    msg:string;
    file:string|null;
    sender_id:string;
    receiver_id:string;
    hasFile: number,
    seen: number,
    created_at: string,
    updated_at: string,
    sender_user_photo:string,
    receiver_user_photo:string,
    sender_user_name:string,
    receiver_user_name:string,
};
