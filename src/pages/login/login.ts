import { Component } from '@angular/core';
import { IonicPage, NavController, Loading, LoadingController, AlertController, Alert} from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailValidator } from '../../validators/email';
import { AuthProvider } from '../../providers/auth/auth';
//import { ResetPasswordPage } from '../reset-password/reset-password';
import { ListGodsonPage } from '../list-godson/list-godson';
import { ProfileProvider } from '../../providers/profile/profile';
import { HomePage } from '../home/home';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  public loginForm: FormGroup;
  public loading: Loading;

  constructor(public navCtrl: NavController, 
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public authProvider: AuthProvider,
    formBuilder: FormBuilder,
    public profileProvider: ProfileProvider
  ) {
    this.loginForm = formBuilder.group({
      email: [
        '',
        Validators.compose([Validators.required, EmailValidator.isValid])
      ],
      password: [
        '',
        Validators.compose([Validators.required, Validators.minLength(6)])
      ]
    });
  }

  goToSignup(): void {
    this.navCtrl.push("SignupPage");
  }

  goToResetPassword(): void {
    this.navCtrl.push('ResetPasswordPage');
  }

  loginUser(): void {
    if(!this.loginForm.valid) {
      console.log(`Form is not valid yet, current value: ${this.loginForm.value}`);
    } else {
      const email = this.loginForm.value.email;
      const password = this.loginForm.value.password;

      this.authProvider.loginUser(email, password).then(
        authData => {
          this.profileProvider.getUserProfileByUid(authData.uid).once('value').then(snapShot => {
            this.loading.dismiss().then(() => {
              let type = snapShot.val().type;
              if(type == "padrino"){
                this.navCtrl.setRoot(ListGodsonPage);
              } else if (type == "ahijado"){
                this.navCtrl.setRoot(HomePage);
              } else {
                this.navCtrl.setRoot(ListGodsonPage);
              }
            })
          });
        },
        error => {
          this.loading.dismiss().then(() => {
            const alert: Alert = this.alertCtrl.create({
              message: error.message,
              buttons: [{text: 'OK', role: 'cancel'}]
            });
            alert.present();
          });
        }
      );
      this.loading = this.loadingCtrl.create();
      this.loading.present();
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
