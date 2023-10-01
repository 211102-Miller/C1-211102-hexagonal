export class ListRead {
    constructor(
        readonly id: number,
        readonly id_user: number,
        readonly list_title: string,
        readonly descriptions: string,
        readonly id_books:string ="", // Ahora 'libros' es un arreglo de cadenas
        readonly status: boolean // 'status' es una cadena que representa público o privado
    ) {}
}