import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Camera } from '@ionic-native/camera'

import { MyApp } from './app.component';
import { HomeGodfatherPage } from '../pages/home-godfather/home-godfather';
import { HomeGodsonPage } from '../pages/home-godson/home-godson';
import { WelcomePage } from '../pages/welcome/welcome';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { ResetPasswordPage } from '../pages/reset-password/reset-password';
import { ProfilePage } from '../pages/profile/profile';
import { ModalPicturePage } from '../pages/modal-picture/modal-picture';
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
import { QuestionsPage } from '../pages/questions/questions';
import { QuestionProvider } from '../providers/question/question';

@NgModule({
  declarations: [
    MyApp,
    HomeGodfatherPage,
    HomeGodsonPage,
    WelcomePage,
    LoginPage,
    SignupPage,
    ResetPasswordPage,
    ProfilePage,
    ModalPicturePage,
    ContactPage,
    AboutPage,
    ListGodsonPage,
    GodsonDetailsPage,
    MessagePage,
    HistoryPage,
    QuestionsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomeGodfatherPage,
    HomeGodsonPage,
    WelcomePage,
    LoginPage,
    SignupPage,
    ResetPasswordPage,
    ProfilePage,
    ModalPicturePage,
    ContactPage,
    AboutPage,
    ListGodsonPage,
    GodsonDetailsPage,
    MessagePage,
    HistoryPage,
    QuestionsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    ProfileProvider,
    GodsonProvider,
    Camera,
    HistoryProvider,
    QuestionProvider
  ]
})
export class AppModule {}
