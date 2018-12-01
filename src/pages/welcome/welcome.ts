import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading, LoadingController, AlertController, Alert} from 'ionic-angular';
import { SignupPage } from '../signup/signup';
import { ProfileProvider } from '../../providers/profile/profile';
import { HomeGodfatherPage } from '../home-godfather/home-godfather';
import { HomeGodsonPage } from '../home-godson/home-godson';

/**
 * Generated class for the WelcomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {
  public loading: Loading;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public profileProvider: ProfileProvider, public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,) {
  }

  in() {
    this.profileProvider.getUserProfileAsync().
      then(user => {
        user.once('value').then(snap => {
          this.loading.dismiss().then(() => {
            let type = snap.val().type;
            if (type == "padrino") {
              this.navCtrl.setRoot(HomeGodfatherPage);
            } else if (type == "ahijado") {
              this.navCtrl.setRoot(HomeGodsonPage);
            } else {
              this.navCtrl.setRoot(HomeGodfatherPage);
            }
          })
        })
      })
      .catch(error => {
        this.loading.dismiss().then(() => {
          const alert: Alert = this.alertCtrl.create({
            message: error.message,
            buttons: [{text: 'OK', role: 'cancel'}]
          });
          alert.present();
        });
      });
      this.loading = this.loadingCtrl.create();
      this.loading.present();
  }

  signup() {
    this.navCtrl.push(SignupPage)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WelcomePage');
  }

}
