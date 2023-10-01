import { Loand } from "./loands";

export interface LoandRepository{

    getAllLoans():Promise<Loand[] | null>

    getLoand(id:number):Promise<Loand | null>

    deleteLoands(id:string):Promise<boolean>

}