import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { QuestionsPage } from '../questions/questions';
import { ProfilePage } from '../profile/profile';
import { ContactPage } from '../contact/contact';

/**
 * Generated class for the HomeGodsonPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-home-godson',
  templateUrl: 'home-godson.html',
})
export class HomeGodsonPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  page(page) {
    if(page == "godsonList"){
      this.navCtrl.setRoot(QuestionsPage);
    } else if (page == "profile") {
      this.navCtrl.setRoot(ProfilePage);
    } else if (page == "contact") {
      this.navCtrl.setRoot(ContactPage);
    }
  }
}
