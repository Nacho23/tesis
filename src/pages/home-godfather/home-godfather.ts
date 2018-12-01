import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ListGodsonPage } from '../list-godson/list-godson';
import { ProfilePage } from '../profile/profile';
import { ContactPage } from '../contact/contact';

/**
 * Generated class for the HomeGodfatherPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home-godfather',
  templateUrl: 'home-godfather.html',
})
export class HomeGodfatherPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  page(page) {
    if(page == "godsonList"){
      this.navCtrl.setRoot(ListGodsonPage);
    } else if (page == "profile") {
      this.navCtrl.setRoot(ProfilePage);
    } else if (page == "contact") {
      this.navCtrl.setRoot(ContactPage);
    }
  }

}
