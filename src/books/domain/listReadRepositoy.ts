import { ListRead } from "./listRead";

export interface ListReadRepository{
    createRead(
        id_user:number,
        list_title:string,
        descriptions:string,
        status:boolean
    ): Promise<ListRead | null>;
    
    getAll():Promise<ListRead[]|null>;

    getAllStatus():Promise<ListRead[]| null>


    creeateUrl(id:number):Promise<ListRead | null>;

}