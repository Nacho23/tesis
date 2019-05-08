import { Injectable } from '@angular/core';
import firebase from 'firebase'

/*
  Generated class for the HistoryProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HistoryProvider {

  constructor() {
  }

  sendHistory(history:any, godsonId: string): firebase.database.ThenableReference {
    var title = history.title;
    var body = history.body;
    var category = history.category;
    return firebase.database().ref('userProfile/'+godsonId+'/histories').push({title, body, category});
  }

  sendAlert(alert: object) {
    return firebase.database().ref('alerts/').push(alert);
  }

  getHistory(godsonId:string): firebase.database.Reference{
    return firebase.database().ref('userProfile/'+godsonId+'/histories/');
  }

  sendMessage(ojbMessage: object) {
    return firebase.database().ref('/messages/').push(ojbMessage);
  }

  getCategory(departmentUid) {
    return firebase.database().ref('/category/').orderByChild('departmentUid').equalTo(departmentUid);
  }
}
