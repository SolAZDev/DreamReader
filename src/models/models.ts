export interface SymbolModel {
  id: number;
  symbol: string;
  meanings: string[];
}

export interface LiveDreamList {
  date: string;
  dreams: SymbolModel[];
  // notes: string;
}

export interface SavedDreamList {
  date: string;
  dreams: number[];
  note: string;
}

export interface ExportableList {
  SavedDreamDates: string[];
  SavedDreams: SavedDreamList[];
}

export interface Settings {
  darkMode: boolean;
  invertNoteEdit: boolean;
}
