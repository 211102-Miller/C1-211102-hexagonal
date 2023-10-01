import { IsNumber, IsNotEmpty} from 'class-validator';


export class ValidationLoandID{
    @IsNotEmpty()
    @IsNumber()
    public id: number;

    constructor(
        id:number,
        
    ) {
        this.id= id;
    }
}