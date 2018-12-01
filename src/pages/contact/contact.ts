import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading, AlertController, Alert } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfileProvider } from '../../providers/profile/profile';
import { HistoryProvider } from '../../providers/history/history';
import { WelcomePage } from '../welcome/welcome';
import { HomeGodsonPage } from '../home-godson/home-godson';
import { HomeGodfatherPage } from '../home-godfather/home-godfather';

/**
 * Generated class for the ContactPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',
})
export class ContactPage {
  public contactForm: FormGroup;
  public loading: Loading;

  public currentProfile: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public formBuilder: FormBuilder, public loadingCtrl: LoadingController,
    public profileProvider: ProfileProvider, public historyProvider: HistoryProvider,
    public alertCtrl: AlertController) {
    this.contactForm = formBuilder.group({
      subject: [
        '',
        Validators.compose([Validators.required])
      ],
      message: [
        '',
        Validators.compose([Validators.required])
      ]
    });
  }

  ionViewDidLoad() {
    this.currentProfile = this.profileProvider.getUserProfileAsync()
      .then(user => {
        user.on('value', snap => {
          this.currentProfile = snap.val();
          this.currentProfile.uid = snap.key;
        })
      })
  }

  sendMessage() {
    const subject = this.contactForm.value.subject;
    const message = this.contactForm.value.message;

    var fecha = new Date();
    var fechaFormat = fecha.getDate() + '-' + fecha.getMonth() + '-' + fecha.getFullYear();
    var timeFormat = fecha.getHours() + ':' + fecha.getMinutes() + ':' + fecha.getSeconds();

    const objMessage = {
      'sender': this.currentProfile.uid,
      'subject': subject,
      'message': message,
      'date': fechaFormat,
      'addressee': this.currentProfile.department,
      'time': timeFormat
    }
    this.historyProvider.sendMessage(objMessage).then(
      snap => {
        this.loading.dismiss().then(() => {
          const alert: Alert = this.alertCtrl.create({
            message: "Mensaje Enviado",
            buttons: [{ text: 'OK', role: 'cancel' }]
          });
          this.navCtrl.setRoot(WelcomePage);
          alert.present();
        });
      },
      error => {
        this.loading.dismiss().then(() => {
          const alert: Alert = this.alertCtrl.create({
            message: error.message,
            buttons: [{ text: 'OK', role: 'cancel' }]
          });
          alert.present();
        });
      }
    );
    this.loading = this.loadingCtrl.create();
    this.loading.present();
  }


  returnHome(){
    console.log(this.currentProfile.type);
    if (this.currentProfile.type == "ahijado"){
      this.navCtrl.setRoot(HomeGodsonPage);
    } else if (this.currentProfile.type == "padrino"){
      this.navCtrl.setRoot(HomeGodfatherPage);
    } else if (this.currentProfile.type == "administrator"){
      this.navCtrl.setRoot(HomeGodfatherPage);
    }
  }
}
