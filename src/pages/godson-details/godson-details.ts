import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GodsonProvider } from '../../providers/godson/godson';
import firebase from 'firebase';
import { HistoryPage } from '../history/history';
import { HistoryProvider } from '../../providers/history/history';


/**
 * Generated class for the GodsonDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  segment: 'godson-details/:godsonId'
})
@Component({
  selector: 'page-godson-details',
  templateUrl: 'godson-details.html',
})
export class GodsonDetailsPage {
  public currentGodson: any = {};
  public profilePicture: any;
  public historyList: Array<any>;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public godsonProvider: GodsonProvider,
    public historyProvider: HistoryProvider) {
  }

  ionViewDidLoad() {
    this.godsonProvider.getGodsonDetail(this.navParams.get('godsonId')).on('value', godsonSnapshot => {
      this.currentGodson = godsonSnapshot.val();
      this.currentGodson.id = godsonSnapshot.key;
    });
    this.getPhotoURL();
    this.historyProvider.getHistory(this.currentGodson.id).on('value', historySnapshot => {
      this.historyList = [];
      historySnapshot.forEach(snap => {
        let historyObject = snap.val();
        historyObject.id = snap.key;
        this.historyList.push(historyObject);
        return false;
      });
    });
  }

  //arreglar catch
  getPhotoURL () {
    firebase.storage().ref('profilePictures/' + this.currentGodson.uid + '.png').getDownloadURL().then((url) => {
      this.profilePicture = url;
    })
    .catch( error => {
      firebase.storage().ref('profilePictures/user.png').getDownloadURL().then((url) => {
        this.profilePicture = url;
      })
    })
  }

  goToHistory (level: string) {
    const params = {
      level: level,
      currentGodson: this.currentGodson
    }
    this.navCtrl.push(HistoryPage, {params});
  }

}
