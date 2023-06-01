export interface Demand{
    sender_id:string;
    receiver_id:string;
    property_id:string;
};

export interface DemandResponse{
    id:number;
    sender_id:string;
    receiver_id:string;
    fullname:string;
    photo:string;
    property_id:string;
    title:string;
    accepted:string;
    created_at:string;
};