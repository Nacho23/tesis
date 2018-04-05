import { Injectable } from '@angular/core';
import firebase from 'firebase';
import { User } from '@firebase/auth-types';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {

  constructor() { }

  loginUser(email:string, password:string): Promise<any> {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  signupUser(email:string, password:string): Promise<any> {
    return firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(newUser => {
      firebase
      .database()
      .ref('/userProfile/${newUser.uid}/')
      .set({
        email: email
      });
    })
    .catch(error => {
      console.error(error);
      throw new Error(error);
    });
  }

  resetPassword(email:string): Promise<any> {
    return firebase.auth().sendPasswordResetEmail(email);
  }

  logoutUser(): Promise<any> {
    const userId: string = firebase.auth().currentUser.uid;
    firebase
    .database()
    .ref('/userProfile/${userId}')
    .off();
    return firebase.auth().signOut();
  }

}
