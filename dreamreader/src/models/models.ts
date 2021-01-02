export interface SymbolModel {
    id: number;
    symbol: string;
    meanings: any;
}

export interface LiveDreamList{
    date:string;
    dreams: SymbolModel[];
    // notes: string;
}

export interface SavedDreamList{
    date:string;
    dreams: number[];
    // notes: string;
}

export interface ExportableList{
    SavedDreamDates: string[];
    SavedDreams: SavedDreamList[];
}
