import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';

/**
 * Generated class for the ListGodsonPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-list-godson',
  templateUrl: 'list-godson.html',
})
export class ListGodsonPage {

  rut = "";

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListGodsonPage');
  }

  openSelection(){
    
    this.navCtrl.push(HomePage, {}, {animate: false});
  }

}
