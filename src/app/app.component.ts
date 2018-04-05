import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import firebase from 'firebase';
import { firebaseConfig } from './credentials';
import { Unsubscribe } from '@firebase/util';

//import { HomePage } from '../pages/home/home';
import { WelcomePage } from '../pages/welcome/welcome';
import { ListGodsonPage } from '../pages/list-godson/list-godson';

@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  rootPage:any; //Initial page

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

    firebase.initializeApp(firebaseConfig);

    //Modificar depende del tipo de usuario (padrino|ahijado) entra a distinta pagina
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if(!user){
        this.rootPage = WelcomePage;
        unsubscribe();
      } else {
        this.rootPage = ListGodsonPage;
        unsubscribe();
      }
    });
  }
}

