import * as Symbols from '../assets/Symbols.json';
import { SymbolModel } from '../models/models';

export const DreamsDictionary = Symbols.dreams as Array<SymbolModel>;

export function getDream(id:number):SymbolModel{
    return DreamsDictionary.filter(d=>d.id===id)[0];
}
