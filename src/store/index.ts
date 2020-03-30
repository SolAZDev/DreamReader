import Vue from "vue";
import Vuex from "vuex";
import { Symbol } from "../models/models";
import * as SymbolsFile from "../../public/Symbols.json";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // eslint-disable-next-line @typescript-eslint/ban-types
    Symbols: new Array<Symbol>(),
    SymbolsFound: Array<number>()
  },
  mutations: {
    ReloadSymbols(state) {
      if (state.Symbols.length > 0) {
        return;
      }
      // eslint-disable-next-line @typescript-eslint/ban-types
      state.Symbols = new Array<Symbol>();
      SymbolsFile.forEach(entry => {
        state.Symbols.push({
          symbol: entry.symbol,
          meanings: entry.meanings as string[]
        });
      });
    },
    AddFoundSymbol(state, id: number) {
      if (state.SymbolsFound.filter(sym => sym == id).length == 0) {
        state.SymbolsFound.push(id);
      }
    }
  },
  getters: {
    getAllSymbols: state => {
      return state.Symbols;
    },
    getAllSymbolsFound: state => {
      return state.SymbolsFound;
    },
    getSymbol: state => (id: number) => {
      return state.SymbolsFound.filter(sym => sym == id)[0];
    },
    filterSymbols: state => (query: string) => {
      return state.Symbols.filter(sym =>
        sym.symbol.toLocaleLowerCase().includes(query.toLocaleLowerCase())
      );
    }
  },
  actions: {
    LoadSymbols(context) {
      context.commit("ReloadSymbols");
    },
    AddSymbolToFoundList(context, id: number) {
      context.commit("AddFoundSymbol", id);
    }
  },
  modules: {}
});
