import { Injectable } from '@angular/core';
import firebase from 'firebase'
import { UUID } from 'angular2-uuid';

/*
  Generated class for the HistoryProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HistoryProvider {

  constructor() {
  }

  sendHistory(history:any, godsonId: string): Promise<any> {
    var title = history.title;
    var body = history.body;
    var category = history.category;
    return firebase.database().ref('userProfile/'+godsonId+'/histories/'+UUID.UUID()).update({title, body, category});
  }

  getHistory(godsonId:string): firebase.database.Reference{
    return firebase.database().ref('userProfile/'+godsonId+'/histories/');
  }

}
