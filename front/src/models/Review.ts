export interface Review{
    client_id:string|null;
    seller_id:string|null;
    review:string;
    rating:number;
};

export interface PropertyReview{
    property_id:string ;
    client_id:string ;
    seller_id:string ;
    review:string;
    rating:number;
};

export interface ReviewResponse{
    id: number,
    fullname:string;
    photo:string;
    client_id:string;
    seller_id:string;
    review:string;
    rating:number;
    created_at:string;
 };
 