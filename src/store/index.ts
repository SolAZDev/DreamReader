/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable prefer-const */
import * as DreamDB from './../utils/dreams';
import { SymbolModel } from './../models/models';
import { store } from 'quasar/wrappers';
import { SavedDreamList, Settings } from 'src/models/models';
import Vuex from 'vuex';
import moment from 'moment';
import localforage from 'localforage';

export default store(function ({ Vue }) {
  Vue.use(Vuex);

  const Store = new Vuex.Store({
    state: {
      ActiveDate: moment().format('MM/DD/YYYY'),
      SavedDreams: new Array<SavedDreamList>(),
      Settings: { darkMode: false } as Settings,
      SavedDates: new Array<string>(),
      local: localforage.createInstance({
        name: 'DreamReader',
        driver: localforage.INDEXEDDB,
      }),
      // history: new Array<number>(),
    },
    getters: {
      getLocalForage: (state) => state.local,
      getSavedDreamsList: (state) => state.SavedDreams,
      getActiveDate: (state) => state.ActiveDate,
      dreamIsSavedOnActiveDate: (state) => (id: number) => {
        if (state.SavedDreams.length == 0) {
          return false;
        }
        const activeDateList = state.SavedDreams.filter(
          (sd) => sd.date === state.ActiveDate
        );
        if (activeDateList.length == 0) {
          return false;
        }
        return activeDateList[0].dreams.includes(id);
      },
      getSavedDates: (state) => {
        return state.SavedDates;
        // state.local.getItem('SavedDates').then((data) => {
        //   if (data == null) {
        //     return [];
        //   }
        //   return data;
        // });
      },
      getSettings: (state) => {
        return state.Settings;
      },
      getHistory: (state) => {
        // state.local.getItem('history').then((hist) => {
        //   if (hist != null) {
        //     state.history = hist as number[];
        //   }
        // });
        let history = new Array<SymbolModel>();
        state.local.getItem('history').then((hist) => {
          let dreamIds = [];
          if (hist == null) {
            hist = localStorage.getItem('history');
            if (hist == null) {
              return;
            }
            dreamIds = JSON.parse(hist as string) as number[];
          }
          dreamIds = hist as number[];
          dreamIds.forEach((did) => {
            history.push(DreamDB.getDream(did));
          });
        });
        return history;
      },
    },
    mutations: {
      //#region Save Data Management
      loadDatesAndDreams(state) {
        let tempArray = new Array<SavedDreamList>();
        state.local.getItem('SavedDates').then((savedDates) => {
          let dates = [];
          if (savedDates == null) {
            //Import from localStorage to localForage
            savedDates = localStorage.getItem('SavedDates');
            if (savedDates == null) {
              return;
            }
            dates = JSON.parse(savedDates as string) as string[];
          } else {
            dates = savedDates as string[];
          }
          state.SavedDates = dates;
          dates.forEach((date) => {
            let ds = {} as SavedDreamList;
            ds.date = date;
            state.local.getItem('D' + date).then((sDate) => {
              if (sDate != null) {
                ds.dreams = sDate as number[];
                tempArray.push(ds);
              } else {
                const tmp = localStorage.getItem('D' + date);
                if (tmp != null) {
                  ds.dreams = JSON.parse(tmp as string) as number[];
                  tempArray.push(ds);
                }
              }
            });
          });
        });
        state.SavedDreams = tempArray;
      },
      saveDatesAndDreams(state) {
        let dates = new Array<string>();
        state.SavedDreams.forEach((sd) => {
          dates.push(sd.date);
          //LocalStorage for Browsers.
          state.local.setItem('D' + sd.date, sd.dreams);
        });
        dates.sort((a: string, b: string) => moment(a).diff(b)).reverse();
        state.SavedDates = dates;
        state.local.setItem('SavedDates', dates);
      },
      //#endregion
      //#region Saved Dreams Management
      addDreamOnDate(state, id: number) {
        const dream = state.SavedDreams.filter(
          (sd) => sd.date === state.ActiveDate
        );
        if (dream.length > 0) {
          //Found!
          if (dream[0].dreams.includes(id)) {
            return;
          } //Dupe Avoidance
          dream[0].dreams.unshift(id);
        } else {
          //The date doesn't exist
          let tmp = {} as SavedDreamList;
          tmp.date = state.ActiveDate;
          tmp.dreams = new Array<number>();
          tmp.dreams.push(id);
          state.SavedDreams.unshift(tmp);
        }
      },
      removeDreamOnDate(state, opts: { date: string; id: number }) {
        const dreams = state.SavedDreams.filter((sd) => sd.date == opts.date);
        if (dreams.length < 0) {
          return;
        } //Nothing found, how did we get here?
        dreams[0].dreams.splice(dreams[0].dreams.indexOf(opts.id), 1);
        if (dreams[0].dreams.length == 0) {
          //Empty Dream List
          //TODO: Add Note Checking.
          state.local.removeItem('D' + opts.date);
          state.SavedDreams.splice(state.SavedDreams.indexOf(dreams[0], 1));
        }
      },
      //#endregion
      //#region Other
      setActiveDate(state, date: string) {
        state.ActiveDate = date;
      },
      addToHistory(state, id: number) {
        console.log('adding ' + id);
        let fArray = [] as number[];
        let newArray = new Array<number>();
        state.local.getItem('history').then((lsh) => {
          if (lsh == null) {
            const ls = localStorage.getItem('history');
            if (ls != null || undefined || 'underfined') {
              lsh = JSON.parse(ls as string) as number[];
            }
          }
          newArray.push(id);
          if (lsh != null) {
            const ogArr = Array.from(lsh as number[]);
            const saved = [...new Set(ogArr)];
            saved.forEach((s) => newArray.push(s as number));
          }
          fArray = [...new Set(newArray)];
          const final = fArray.slice(0, 50);
          // state.history = final;
          state.local.setItem('history', final);
        });
      },
      LoadSettings(state) {
        state.local.getItem('settings').then((settJson) => {
          if (settJson == null) {
            return;
          }
          const sett = JSON.parse(settJson as string) as Settings;
          state.Settings = sett;
        });
      },
      SaveSettings(state, opts: Settings) {
        state.Settings = opts;
        state.local.setItem('settings', JSON.stringify(opts));
      },
      //#endregion
    },

    actions: {
      ReloadSavedData(context) {
        context.commit('loadDatesAndDreams');
      },
      SaveData(context) {
        context.commit('saveDatesAndDreams');
      },
      SaveDream(context, id: number) {
        context.commit('addDreamOnDate', id);
        this.dispatch('SaveData');
      },
      RemoveDream(context, opts: { date: string; id: number }) {
        context.commit('removeDreamOnDate', opts);
        this.dispatch('SaveData');
      },
      SetActiveDate(context, date: string) {
        context.commit('setActiveDate', date);
      },
      LoadSettigs(context) {
        context.commit('LoadSettings');
      },
      SaveSettings(context, opts: Settings) {
        context.commit('SaveSettings', opts);
      },
      addToHistory(context, id: number) {
        context.commit('addToHistory', id);
      },
    },
  });
  return Store;
});
