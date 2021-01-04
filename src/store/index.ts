/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable prefer-const */
import { store } from 'quasar/wrappers';
import { SavedDreamList, Settings } from 'src/models/models';
import Vuex from 'vuex';
import moment from 'moment';

export default store(function ({ Vue }) {
  Vue.use(Vuex);

  const Store = new Vuex.Store({
    state: {
      ActiveDate: moment().format('MM/DD/YYYY'),
      SavedDreams: Array<SavedDreamList>(),
      Settings: { darkMode: false } as Settings,
    },
    getters: {
      getSavedDreamsList: (state) => {
        return state.SavedDreams;
      },
      getActiveDate: (state) => {
        return state.ActiveDate;
      },
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
        console.log(activeDateList);
        return activeDateList[0].dreams.includes(id);
      },
      getSavedDates: (state) => {
        let saveDates = [] as string[];
        const sDated = localStorage.getItem('SavedDates');
        if (sDated == null) {
          return saveDates;
        }
        saveDates = JSON.parse(sDated) as string[];
        return saveDates;
      },
      getSettings: (state) => {
        return state.Settings;
      },
    },
    mutations: {
      //#region Save Data Management
      loadDatesAndDreams(state) {
        let tmp = localStorage.getItem('SavedDates');
        if (tmp == null) {
          return;
        }
        const dates = JSON.parse(tmp) as string[];
        let tempArray = new Array<SavedDreamList>();
        dates.forEach((date) => {
          let ds = {} as SavedDreamList;
          ds.date = date;
          tmp = localStorage.getItem('D' + date);
          if (tmp != null) {
            ds.dreams = JSON.parse(tmp) as number[];
            tempArray.push(ds);
          }
        });
        state.SavedDreams = tempArray;
      },
      saveDatesAndDreams(state) {
        let dates = new Array<string>();
        state.SavedDreams.forEach((sd) => {
          dates.push(sd.date);
          //LocalStorage for Browsers.
          localStorage.setItem('D' + sd.date, JSON.stringify(sd.dreams));
        });
        localStorage.setItem('SavedDates', JSON.stringify(dates));
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
          localStorage.removeItem('D' + opts.date);
          state.SavedDreams.splice(state.SavedDreams.indexOf(dreams[0], 1));
        }
      },
      //#endregion
      //#region Other
      setActiveDate(state, date: string) {
        state.ActiveDate = date;
      },
      LoadSettings(state) {
        const settJson = localStorage.getItem('settings');
        if (settJson == null) {
          return;
        }
        const sett = JSON.parse(settJson) as Settings;
        state.Settings = sett;
      },
      SaveSettings(state, opts: Settings) {
        state.Settings = opts;
        localStorage.setItem('settings', JSON.stringify(opts));
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
    },
  });
  return Store;
});
