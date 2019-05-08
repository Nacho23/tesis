import { Injectable } from '@angular/core';
import firebase from 'firebase'

/*
  Generated class for the QuestionProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class QuestionProvider {

  constructor() {
  }

  getQuestion() {
    return firebase.database().ref('/questions/');
  }

  getQuestionByUid(uid: string) {
    return firebase.database().ref('/questions/' + uid);
  }

  saveAnswerd(questionUid, userUid, answer, title, date) {
    console.log(userUid + '-' + date);
    return firebase.database().ref('/answer/').push({
      questionUid: questionUid,
      userUid: userUid,
      answer: answer,
      date: date,
      title: title,
      answered: true
    })
  }

  updateAnswerd(uid, questionUid, userUid, answer, title, date) {
    console.log(userUid + '-' + date);
    return firebase.database().ref('/answer/' + uid + '/').update({
      questionUid: questionUid,
      userUid: userUid,
      answer: answer,
      date: date,
      title: title,
      answered: true
    })
  }

  getAnswered() {
    return firebase.database().ref('/answer/');
  }

  getAnsweredByUid(uid) {
    return firebase.database().ref('/answer/' + uid);
  }

}
