import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GodsonDetailsPage } from '../godson-details/godson-details';
import { GodsonProvider } from '../../providers/godson/godson';
import { ProfileProvider } from '../../providers/profile/profile'
import { HomeGodfatherPage } from '../home-godfather/home-godfather';

/**
 * Generated class for the ListGodsonPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-list-godson',
  templateUrl: 'list-godson.html',
})
export class ListGodsonPage {

  public godsonList: Array<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public godsonProvider: GodsonProvider, public profileProvider: ProfileProvider) {
  }

  ionViewDidLoad() {
    //Filtar por tipo de usuario.. Por ahora los llama a todos
    this.godsonProvider.getGodsonList().orderByChild('godfatherId').equalTo(this.profileProvider.currentUser.uid).on('value', godsonListSnapshot => {
      this.godsonList = [];
      godsonListSnapshot.forEach(snap => {
        let godsonObject = snap.val();
        godsonObject.id = snap.key;
        this.godsonList.push(godsonObject);
        return false;
      });
    });
  }

  goToGodsonDetails(godsonId): void {
    this.navCtrl.push(GodsonDetailsPage, { godsonId: godsonId });
  }

  openSelection() {

    this.navCtrl.push(GodsonDetailsPage, {}, { animate: false });
  }

  goToProfile() {
    this.navCtrl.push("ProfilePage");
  }

  returnHome() {
    this.navCtrl.setRoot(HomeGodfatherPage);
  }

}
