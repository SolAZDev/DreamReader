import { stat } from 'fs'
import { tmpdir } from 'os'
import { store } from 'quasar/wrappers'
import { SavedDreamList } from 'src/models/models'
import Vuex from 'vuex'
import * as DreamDB from '../utils/dreams'
import moment from 'moment'
import { date } from 'quasar'

export default store(function ({ Vue }) {
  Vue.use(Vuex)

  const Store = new Vuex.Store({
    state:{
      // SavedDreamsDate: Array<string>(),
      SavedDreams: Array<SavedDreamList>(),
    },
    mutations:{
      //#region Save Data Management
      loadDatesAndDreams(state){
        let tmp = localStorage.getItem('SavedDates');
        if(tmp==null){return;}
        const dates = JSON.parse(tmp) as string[];
        let tempArray = new Array<SavedDreamList>();
        dates.forEach(date=>{
          let ds = {} as SavedDreamList;
          ds.date=date;
          tmp =  localStorage.getItem("D"+date);
          if(tmp!=null){
            ds.dreams = JSON.parse(tmp) as number[];
            tempArray.push(ds);
          }          
        });
        state.SavedDreams=tempArray;
      },
      saveDatesAndDreams(state){
        let dates = new Array<string>();
        state.SavedDreams.forEach(sd=>{
          dates.push(sd.date);
          //LocalStorage for Browsers.
          localStorage.setItem("D"+sd.date, JSON.stringify(sd.dreams))
        });
        localStorage.setItem('SavedDates',JSON.stringify(dates));
      },
      //#endregion
      //#region Saved Dreams Management
      addDreamOnDate(state, id:number){
        let date = moment().format('DD/MM/YYYY');
        let dream = state.SavedDreams.filter(sd=>sd.date===date);
        if(dream.length>0){ //Found!
          dream[0].dreams.push(id)
        }else{ //The date doesn't exist
          let tmp = {} as SavedDreamList;
          tmp.date=date;
          tmp.dreams = new Array<number>();
          tmp.dreams.push(id);
          state.SavedDreams.push(tmp);
        }
      },
      removeDreamOnDate(state, opts:{date:string, id:number}){
        let dreams = state.SavedDreams.filter(sd=>sd.date==opts.date);
        if(dreams.length<0){return;} //Nothing found, how did we get here?
        dreams[0].dreams.slice(dreams[0].dreams.indexOf(opts.id),1);
      },
      //#endregion
    },
    getters:{
      getSavedDreamsList:state=>{
        return state.SavedDreams;
      }
    },
    actions:{
      ReloadSavedData(context){context.commit("loadDatesAndDreams");},
      SaveData(context){context.commit("saveDatesAndDreams");},
      SaveDream(context, id:number){context.commit("addDreamOnDate", id);this.dispatch("SaveData");},
      RemoveDream(context, opts:{date:string, id:number}){context.commit("removeDreamOnDate", opts); this.dispatch("SaveData");}
    }
  })
  return Store
})
