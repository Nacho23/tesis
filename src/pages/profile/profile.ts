import { Component } from '@angular/core';
import { Modal, Alert, AlertController, IonicPage, NavController, NavParams, ModalController, Platform, App } from 'ionic-angular';
import { ProfileProvider } from '../../providers/profile/profile';
import { AuthProvider } from '../../providers/auth/auth';
import { LoginPage } from '../login/login';
import { HomeGodfatherPage } from '../home-godfather/home-godfather';
import { HomeGodsonPage } from '../home-godson/home-godson';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  public currentProfile: any;
  public profilePicture: any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public authProvider: AuthProvider,
    public profileProvider: ProfileProvider,
    private modalCtrl: ModalController
    ) { 

    }

  ionViewDidLoad() {
    this.currentProfile = this.profileProvider.getUserProfileAsync()
    .then(user => {
      user.on('value', snap => {
        this.currentProfile = snap.val();
        this.currentProfile.uid = snap.key;
        this.getPhotoURL(this.currentProfile.uid);
      })
    })
  }

  logOut(): void {
    this.authProvider.logoutUser().then(() => {
      this.navCtrl.setRoot(LoginPage);
    })
  }

  updateName(): void {
    const alert: Alert = this.alertCtrl.create({
      message: 'Nombre y Apellido',
      inputs: [
        {
          name: 'firstName',
          placeholder: 'Tus nombres aquí',
          value: this.currentProfile.firstName
        },
        {
          name: 'lastName',
          placeholder: 'Tu apellidos aquí',
          value: this.currentProfile.lastName
        }
      ],
      buttons: [
        {text: 'Cancelar'},
        {
          text: 'Guardar',
          handler: data => {
            this.profileProvider.updateName(data.firstName, data.lastName);
          }
        }
      ]
    });
    alert.present();
  }

  updateDOB(birthDate: string): void {
    this.profileProvider.updateDOB(birthDate);
  }

  updateHometown(): void {
    const alert: Alert = this.alertCtrl.create({
      message: 'Ciudad de Origen',
      inputs: [
        {
          name: 'homeTown',
          placeholder: 'Ciudad aquí',
          value: this.currentProfile.homeTown
        }
      ],
      buttons: [
        {text: 'Cancelar'},
        {
          text: 'Guardar',
          handler: data => {
            this.profileProvider.updateHometown(data.homeTown);
          }
        }
      ]
    });
    alert.present();
  }

  updatePhone(): void {
    const alert: Alert = this.alertCtrl.create({
      message: 'Teléfono',
      inputs: [
        {
          name: 'phone',
          placeholder: 'Teléfono aquí',
          value: this.currentProfile.phone
        }
      ],
      buttons: [
        {text: 'Cancelar'},
        {
          text: 'Guardar',
          handler: data => {
            this.profileProvider.updatePhone(data.phone);
          }
        }
      ]
    });
    alert.present();
  }

  updateEmail(): void {
    let alert: Alert = this.alertCtrl.create({
      inputs: [
        {
          name: "newEmail", 
          placeholder: "Tu Correo Electrónico"
        },
        { 
          name: "password", 
          placeholder: "Tu contraseña", 
          type:"password"
        }],
      buttons: [
        { text: "Cancelar" },
        { text: "Guardar", handler: data => {
          this.profileProvider
          .updateEmail(data.newEmail, data.password)
          .then(() => {console.log("Email Changed Successfuly"); })
          .catch( error => {
            console.log("ERROR: " + error.message);
          });
        }}
      ]
    });
    alert.present();
  }

  updatePassword(): void {
    let alert: Alert = this.alertCtrl.create({
      inputs: [
        {
          name: "newPassword", 
          placeholder: "Contraseña Nueva",
          type: "password"
        },
        {
          name: "oldPassword",
          placeholder: "Contraseña Actual", 
          type: "password"
        }],
      buttons: [
        { text: "Cancel" },
        { text: "Save", handler: data => {
          this.profileProvider
            .updatePassword(data.newPassword, data.oldPassword)
            .then(() => {console.log("Password Changed Successfuly"); })
            .catch( error => {
              console.log("ERROR: " + error.message);
            });
          }
        }]
    });
    alert.present();
  }

  getPhotoURL(uid) {
    this.profileProvider.getPhotoURL(uid)
      .then(snap => {
        console.log("LOGRADO");
        this.profilePicture = snap;
      })
  }

  openModalPicture() {
    const modalPicture: Modal = this.modalCtrl.create('ModalPicturePage', {currentProfile: this.currentProfile});

    modalPicture.present();

    modalPicture.onDidDismiss((newProfilePicture) => {
      console.log(newProfilePicture);
      this.getPhotoURL(this.currentProfile.uid);
    })
  }

  returnHome(){
    console.log(this.currentProfile.type);
    if (this.currentProfile.type == "ahijado"){
      this.navCtrl.setRoot(HomeGodsonPage);
    } else if (this.currentProfile.type == "padrino"){
      this.navCtrl.setRoot(HomeGodfatherPage);
    } else if (this.currentProfile.type == "administrator"){
      this.navCtrl.setRoot(HomeGodfatherPage);
    }
  }
}
