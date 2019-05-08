import { Injectable } from '@angular/core';
import firebase from 'firebase';
import { Reference } from '@firebase/database-types';

/*
  Generated class for the GodsonProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GodsonProvider {
  public godsonListRef: Reference;

  constructor() {
    firebase.auth().onAuthStateChanged(user => {
      this.godsonListRef = firebase.database().ref('/userProfile/');
    })
  }

  getGodsonList(): Reference {
    return this.godsonListRef;
  }

  getGodsonDetail(eventId: string): Reference {
    return this.godsonListRef.child(eventId);
  }
}
