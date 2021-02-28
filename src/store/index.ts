/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable prefer-const */
import { store } from 'quasar/wrappers';
import { SavedDreamList, Settings } from 'src/models/models';
import Vuex from 'vuex';
import moment from 'moment';
import localforage from 'localforage';
import { debug } from 'console';

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
      getSavedDates: (state) => state.SavedDates,
      getSettings: (state) => state.Settings,
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
      getSavedNote: (state) => async (date: string) => {
        return await state.local.getItem('N' + date);
      },
    },
    mutations: {
      createDB(state) {
        console.log('initiating db');
        state.local = localforage.createInstance({
          name: 'DreamReader',
          driver: localforage.INDEXEDDB,
        });
      },
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
      async saveDatesAndDreams(state) {
        let dates = new Array<string>();
        await state.SavedDreams.forEach(async (sd) => {
          dates.push(sd.date);
          //LocalStorage for Browsers.
          await state.local.setItem('D' + sd.date, sd.dreams);
        });
        dates.sort((a: string, b: string) => moment(a).diff(b)).reverse();
        state.SavedDates = dates;
        await state.local.setItem('SavedDates', dates);
      },
      //#endregion
      //#region Saved Dreams Management
      addDreamOnDate(state, opts: { id: number; date: string }) {
        const compareDate = opts.date != '' ? opts.date : state.ActiveDate;
        // debugger;
        const dream = state.SavedDreams.filter((sd) => sd.date == compareDate);
        console.log(dream);
        if (dream.length > 0) {
          //Found!
          if (dream[0].dreams.includes(opts.id)) {
            return;
          } //Dupe Avoidance
          dream[0].dreams.unshift(opts.id);
        } else {
          //The date doesn't exist
          let tmp = {} as SavedDreamList;
          tmp.date = state.ActiveDate;
          tmp.dreams = new Array<number>();
          tmp.dreams.push(opts.id);
          state.SavedDreams.unshift(tmp);
        }
      },
      async removeDreamOnDate(state, opts: { date: string; id: number }) {
        const dreams = state.SavedDreams.filter((sd) => sd.date == opts.date);
        if (dreams.length < 0) {
          return;
        } //Nothing found, how did we get here?
        dreams[0].dreams.splice(dreams[0].dreams.indexOf(opts.id), 1);
        if (dreams[0].dreams.length == 0) {
          //Empty Dream List
          //TODO: Add Note Checking.
          await state.local.removeItem('D' + opts.date);
          state.SavedDreams.splice(state.SavedDreams.indexOf(dreams[0], 1));
        }
      },
      //#endregion
      //#region Other
      setActiveDate(state, date: string) {
        state.ActiveDate = date;
      },
      async setNoteOnDate(state, note: string) {
        if (note == null || note == '' || note == ' ') {
          await state.local.removeItem('N' + state.ActiveDate);
        } else {
          await state.local.setItem('N' + state.ActiveDate, note);
        }
      },
      async addToHistory(state, id: number) {
        console.log('adding ' + id);
        let fArray = [] as number[];
        let newArray = new Array<number>();
        await state.local.getItem('history').then(async (lsh) => {
          if (lsh == null) {
            const ls = localStorage.getItem('history');
            if (ls != null || undefined || 'undefined') {
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
          await state.local.setItem('history', final);
        });
      },
      async LoadSettings(state) {
        console.log('Loading settings');
        await state.local.getItem('settings').then((settJson) => {
          if (settJson == null) {
            return;
          }
          console.log(settJson);
          state.Settings = settJson as Settings;
        });
      },
      async SaveSettings(state, opts: Settings) {
        state.Settings = opts;
        await state.local.setItem('settings', opts);
      },
      //#endregion
    },

    actions: {
      initDB(context) {
        context.commit('createDB');
      },
      ReloadSavedData(context) {
        context.commit('loadDatesAndDreams');
      },
      SaveData(context) {
        context.commit('saveDatesAndDreams');
      },
      SaveDream(context, opts: { id: number; date: string }) {
        context.commit('addDreamOnDate', opts);
        this.dispatch('SaveData');
      },
      RemoveDream(context, opts: { date: string; id: number }) {
        context.commit('removeDreamOnDate', opts);
        this.dispatch('SaveData');
      },
      SaveNote(context, note: string) {
        context.commit('setNoteOnDate', note);
      },
      SetActiveDate(context, date: string) {
        context.commit('setActiveDate', date);
      },
      LoadSettings(context) {
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
