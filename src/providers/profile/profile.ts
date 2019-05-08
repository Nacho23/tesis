import { Injectable } from '@angular/core';
import firebase from 'firebase';

/*
  Generated class for the ProfileProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProfileProvider {
  public currentProfile: firebase.database.Reference;
  public currentUser: firebase.User;

  constructor() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.currentUser = user;
        this.currentProfile = firebase.database().ref(`/userProfile/${user.uid}`);
      }
    });
  }

  getUserProfileByUid(uid): firebase.database.Reference {
    return firebase.database().ref(`/userProfile/${uid}`);
  }

  //Obtener perfil del usuario actual
  getUserProfileAsync(): Promise<any> {
    return new Promise(resolve => {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          console.log(user);
          this.currentUser = user;
          this.currentProfile = firebase.database().ref('/userProfile/' + user.uid);
          resolve(this.currentProfile);
        }
      });
    })
  }

  // Obtener imagen de perfil de usuario
  getPhotoURL(uid): Promise<any> {
    return new Promise(resolve => {
      firebase.storage().ref('profilePictures/' + uid + '.png').getDownloadURL().then((url) => {
        resolve(url);
      })
        .catch(error => {
          firebase.storage().ref('profilePictures/user.png').getDownloadURL().then((url) => {
            resolve(url);
          })
        })
    })
  }

  getUserProfile(): firebase.database.Reference {
    return this.currentProfile;
  }

  updateName(firstName: string, lastName: string): Promise<any> {
    return this.currentProfile.update({ firstName, lastName });
  }

  updateDOB(birthDate: string): Promise<any> {
    return this.currentProfile.update({ birthDate });
  }

  updateHometown(homeTown: string): Promise<any> {
    return this.currentProfile.update({ homeTown });
  }
  updatePhone(phone: number): Promise<any> {
    return this.currentProfile.update({ phone });
  }

  updateEmail(newEmail: string, password: string): Promise<any> {
    const credential: firebase.auth.AuthCredential = firebase.auth.EmailAuthProvider.credential(
      this.currentUser.email,
      password
    );
    return this.currentUser
      .reauthenticateWithCredential(credential)
      .then(user => {
        this.currentUser.updateEmail(newEmail).then(user => {
          this.currentProfile.update({ email: newEmail });
        });
      })
      .catch(error => {
        console.error(error);
      })
  }

  updatePassword(newPassword: string, oldPassword: string): Promise<any> {
    const credential: firebase.auth.AuthCredential = firebase.auth.EmailAuthProvider.credential(
      this.currentUser.email,
      oldPassword
    );
    return this.currentUser
      .reauthenticateWithCredential(credential)
      .then(user => {
        this.currentUser.updatePassword(newPassword).then(user => {
          console.log('Password Changed')
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  updateProfilePicture(profilePictureURL: string): Promise<any> {
    return this.currentProfile.update({ profilePictureURL });
  }

}
