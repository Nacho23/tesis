import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HistoryProvider } from '../../providers/history/history';
import { ProfileProvider } from '../../providers/profile/profile';

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

  public categoryList: Array<any> = [];

  public level: string;
  public currentGodson: any;
  public currentProfile: any;
  public params: any;
  public droptownDisabled;

  constructor(public navCtrl: NavController, public navParams: NavParams, public historyProvider: HistoryProvider,
    private profileProvider: ProfileProvider) {

  }

  ionViewDidLoad() {
    this.currentProfile = this.profileProvider.getUserProfileAsync()
    .then(user => {
      user.on('value', snap => {
        this.currentProfile = snap.val();
        this.currentProfile.uid = snap.key;        
      })
    })
    this.params = this.navParams.get('params');
    this.level = this.params.level;
    this.currentGodson = this.params.currentGodson;
    console.log(this.currentGodson.department);
    this.historyProvider.getCategory(this.currentGodson.department).on('child_added', snap => {
      let categoryObj = snap.val();
      categoryObj.uid = snap.key;
      this.categoryList.push(categoryObj);
      console.log(this.categoryList);
    })
  }

  sendHistory(title: string, body: string, category: string) {
    
    var fecha = new Date();
    var fechaFormat = fecha.getDate() + '-' + fecha.getMonth() + '-' + fecha.getFullYear();
    var timeFormat = fecha.getHours() + ':' + fecha.getMinutes() + ':' + fecha.getSeconds()

    const history = {
      title: title,
      body: body,
      category: category,
      important: this.level,
      date: fechaFormat,
      time: timeFormat
    }
    if(this.level == 'true'){
      console.log("IMPORTANT TRUE");

      const alert = {
        type: 'manual',
        subject: title,
        description: body,
        status: 'pending',
        target: this.currentGodson.id,
        sender: this.currentProfile.uid,
        date: fechaFormat,
        time: timeFormat
      }
      this.historyProvider.sendHistory(history, this.currentGodson.id)
      this.historyProvider.sendAlert(alert);
    }
    else {
      console.log("IMPORTANT FALSE");
      this.historyProvider.sendHistory(history, this.currentGodson.id)
    }    
    this.navCtrl.pop();
  }

}
