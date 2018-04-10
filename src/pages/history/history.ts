import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HistoryProvider } from '../../providers/history/history';

/**
 * Generated class for the HistoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-history',
  templateUrl: 'history.html',
})
export class HistoryPage {
  public level: string;
  public currentGodson: any;
  public params: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public historyProvider: HistoryProvider) {
  }

  ionViewDidLoad() {
    this.params = this.navParams.get('params');
    this.level = this.params.level;
    this.currentGodson = this.params.currentGodson;

    if(this.level == "normal"){
      //Deshabilitar Combobox
      console.log("Mensaje Normal");
    } else {
      //Habilitar Combobox
      console.log("Mensaje Importante");
    }
  }

  sendHistory(title: string, body: string, category: string) {
    const history = {
      title: title,
      body: body,
      category: category
    }
    this.historyProvider.sendHistory(history, this.currentGodson.id)
    this.navCtrl.pop();
  }

}
