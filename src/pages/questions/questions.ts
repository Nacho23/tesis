import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { QuestionProvider } from '../../providers/question/question';
import { ProfileProvider } from '../../providers/profile/profile';
import { HomeGodsonPage } from '../home-godson/home-godson';
import { HomeGodfatherPage } from '../home-godfather/home-godfather';
import { hasLifecycleHook } from '@angular/compiler/src/lifecycle_reflector';

/**
 * Generated class for the QuestionsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-questions',
  templateUrl: 'questions.html',
})
export class QuestionsPage implements OnInit {
  public currentProfile: any;

  public fullAnswerd: any = "Respuesta";

  public answerList: Array<any>;
  public questionList: Array<any>;
  public questionList_aux: Array<any>;

  public empty: boolean;

  public question: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private questionProvider: QuestionProvider, public profileProvider: ProfileProvider) {
    this.empty = true;
    this.currentProfile = this.profileProvider.getUserProfileAsync()
      .then(user => {
        user.on('value', snap => {
          this.currentProfile = snap.val();
          this.currentProfile.uid = snap.key;
        })
      })

    let date_aux = new Date();
    let date = date_aux.getFullYear() + '-' + ('0' + (date_aux.getMonth() + 1)).slice(-2) + '-' + date_aux.getDate();
    this.questionProvider.getAnswered().orderByChild('date').equalTo(date).on('value', snap => {
      this.answerList = [];
      snap.forEach(snapChild => {
        let answerObj = snapChild.val();
        answerObj.uid = snapChild.key;
        this.answerList.push(answerObj);
        return false;
      })
      console.log(this.answerList);
    })
  }

  ngOnInit(): void {
    this.questionProvider.getQuestion().on('value', snap => {
      this.questionList = [];
      snap.forEach(snapChild => {
        //Si el arreglo "fechas" existe, guarda las preguntas que correspondan.
        if (snapChild.val().dates != undefined) {
          this.questionList_aux = [];
          snapChild.child('dates').forEach(snap => {
            this.questionList_aux.push(snap.val().date);
            return false;
          })
          let exist = true;
          let i = 0;
          while (exist && i < this.questionList_aux.length) {
            let date_aux = new Date();
            let date = date_aux.getFullYear() + '-' + ('0' + (date_aux.getMonth() + 1)).slice(-2) + '-' + date_aux.getDate();
            if (date == this.questionList_aux[i]) {
              console.log("EXISTE: " + this.questionList_aux[i]);
              let questionObj = snapChild.val();
              questionObj.uid = snapChild.key;
              this.questionList.push(questionObj);
              this.empty = false;
              exist = false;
            } else {
              console.log("NO EXISTE: " + this.questionList_aux[i])
              exist = true;
            }
            i++;
          }
          console.log(this.questionList);
        } else {
          console.log(snap.key + ': NO CONTIENE FECHAS DEFINIDAS');
        }
        return false;
      })
    })
    error => {
      console.log(error);
    }
  }

  saveAnswerd(uid, answer, questionTitle) {
    console.log(uid);
    this.questionProvider.getQuestionByUid(uid).on('value', snap => {
      if (snap.val().type != 'box') {
        console.log("except box");
        let i = 0;
        let exist = false;
        let date_aux = new Date();
        let date = date_aux.getFullYear() + '-' + (date_aux.getMonth() + 1) + '-' + date_aux.getDate();
        while (i < this.answerList.length) {
          console.log('---------->' + this.answerList[i].date);
          if (this.answerList[i].title == questionTitle && this.answerList[i].date == date) {
            this.questionProvider.updateAnswerd(this.answerList[i].uid, uid, this.currentProfile.uid, answer, questionTitle, date);
            exist = true;
          }
          i++;
        }
        if (!exist) {
          console.log("AGREGA");
          this.questionProvider.saveAnswerd(uid, this.currentProfile.uid, answer, questionTitle, date);
        }
      } else {
        console.log("box");
        console.log(answer);
      }
    })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QuestionsPage');
  }

  changeRange(answerd) {
    if (answerd == "1") {
      this.fullAnswerd = "Totalmente en Desacuerdo";
    }
    else if (answerd == "2") {
      this.fullAnswerd = "En Desacuerdo";
    }
    else if (answerd == "3") {
      this.fullAnswerd = "Medianamente en Desacuerdo";
    }
    else if (answerd == "4") {
      this.fullAnswerd = "Ni de acuerdo ni en desacuerdo";
    }
    else if (answerd == "5") {
      this.fullAnswerd = "Medianamente de Acuerdo";
    }
    else if (answerd == "6") {
      this.fullAnswerd = "De Acuerdo";
    }
    else if (answerd == "7") {
      this.fullAnswerd = "Totalmente de Acuerdo";
    }
  }

  returnHome() {
    console.log(this.currentProfile.type);
    if (this.currentProfile.type == "ahijado") {
      this.navCtrl.setRoot(HomeGodsonPage);
    } else if (this.currentProfile.type == "padrino") {
      this.navCtrl.setRoot(HomeGodfatherPage);
    } else if (this.currentProfile.type == "administrator") {
      this.navCtrl.setRoot(HomeGodsonPage);
    }
  }

}
