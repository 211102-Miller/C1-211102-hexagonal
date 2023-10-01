export class Loan {
    constructor(
        readonly id: number,
        readonly loan: string,
        readonly delivery: string,
        readonly status: boolean,
        readonly id_Book: number,
        readonly id_User: number
    ) {}
}
