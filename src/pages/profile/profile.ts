import { Component } from '@angular/core';
import { Modal, Alert, AlertController, IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { ProfileProvider } from '../../providers/profile/profile';
import { AuthProvider } from '../../providers/auth/auth';
import { WelcomePage } from '../welcome/welcome';
import firebase from 'firebase';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  public userProfile: any;
  public birthDate: any;
  public profilePicture: any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public authProvider: AuthProvider,
    public profileProvider: ProfileProvider,
    private modalCtrl: ModalController 
    ) { }

  ionViewDidLoad() {
    this.profileProvider.getUserProfile().on('value', userProfileSnapshot => {
      this.userProfile = userProfileSnapshot.val();
      this.userProfile.uid = userProfileSnapshot.key;
      this.birthDate = this.userProfile.birthDate
    })
    this.getPhotoURL();
  }

  logOut(): void {
    this.authProvider.logoutUser().then(() => {
      this.navCtrl.setRoot(WelcomePage);
    })
  }

  updateName(): void {
    const alert: Alert = this.alertCtrl.create({
      message: 'Nombre y Apellido',
      inputs: [
        {
          name: 'firstName',
          placeholder: 'Tus nombres aquí',
          value: this.userProfile.firstName
        },
        {
          name: 'lastName',
          placeholder: 'Tu apellidos aquí',
          value: this.userProfile.lastName
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
          value: this.userProfile.homeTown
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
          value: this.userProfile.phone
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

  //BUSCAR ALTERNATIVA CATCH URL
  getPhotoURL () {
    console.log(this.userProfile);
    firebase.storage().ref('profilePictures/' + this.userProfile.uid + '.png').getDownloadURL().then((url) => {
      this.profilePicture = url;
    })
    .catch( error => {
      firebase.storage().ref('profilePictures/user.png').getDownloadURL().then((url) => {
        this.profilePicture = url;
      })
    })
  }

  openModalPicture() {
    const modalPicture: Modal = this.modalCtrl.create('ModalPicturePage', {userProfile: this.userProfile});

    modalPicture.present();

    modalPicture.onDidDismiss((newProfilePicture) => {
      console.log(newProfilePicture);
      this.getPhotoURL();
    })
  }

}
