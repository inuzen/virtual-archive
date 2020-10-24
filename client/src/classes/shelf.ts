interface IShelf {
    id: string;
    name: string;
    number: string;
}

export class ShelfClass implements IShelf {
    public id: string = ''
    public name: string = ''
    public number: string = ''
}
