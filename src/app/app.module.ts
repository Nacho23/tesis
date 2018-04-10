import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Camera } from '@ionic-native/camera'

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { WelcomePage } from '../pages/welcome/welcome';
import { LoginPage } from '../pages/login/login';
//import { SignupPage } from '../pages/signup/signup';
import { TabsPage } from '../pages/tabs/tabs';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { ListGodsonPage } from '../pages/list-godson/list-godson';
import { GodsonDetailsPage } from '../pages/godson-details/godson-details';
import { MessagePage } from '../pages/message/message';
import { HistoryPage } from '../pages/history/history';
import { AuthProvider } from '../providers/auth/auth';
import { ProfileProvider } from '../providers/profile/profile';
import { GodsonProvider } from '../providers/godson/godson';
import { HistoryProvider } from '../providers/history/history';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    WelcomePage,
    LoginPage,
    TabsPage,
    ContactPage,
    AboutPage,
    ListGodsonPage,
    GodsonDetailsPage,
    MessagePage,
    HistoryPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    WelcomePage,
    LoginPage,
    TabsPage,
    ContactPage,
    AboutPage,
    ListGodsonPage,
    GodsonDetailsPage,
    MessagePage,
    HistoryPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    ProfileProvider,
    GodsonProvider,
    Camera,
    HistoryProvider
  ]
})
export class AppModule {}
