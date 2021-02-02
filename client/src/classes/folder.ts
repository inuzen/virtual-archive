interface IFolder {
    [key: string]: any;
    id: string;
    name: string;
    short_name: string;
    designation: string;
    number: string;
    year: number;
    format: 'A3' | 'A4';
    isSubfolder: boolean;
}

export class FolderClass implements IFolder {
    [key: string]: any
    public id: string = ''
    public name: string = ''
    public short_name: string = ''
    public designation: string = ''
    public number: string = ''
    public year: number = 2020
    public format: 'A3' | 'A4' = 'A3'
    public isSubfolder: boolean = false

    constructor(data: IFolder) {
        Object.keys(data).forEach((key: string) => this[key] = data[key])
    }
}
