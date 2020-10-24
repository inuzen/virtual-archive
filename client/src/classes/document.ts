interface IDocument {
    [key: string]: any;
    id: string;
    name: string;
    number: string;
    designation: string;
    tags: string[];
    description: string;
}

export class DocumentClass implements IDocument {
    [key: string]: any
    public id: string = ''
    public name: string = ''
    public number: string = ''
    public designation: string = ''
    public tags: string[] = []
    public description: string = ''

    constructor(data: IDocument) {
        Object.keys(data).forEach((key: string) => this[key] = data[key])
    }
}
