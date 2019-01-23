import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController } from 'ionic-angular';
import { ProfileProvider } from '../../providers/profile/profile';
import firebase from 'firebase';
import { Camera } from '@ionic-native/camera';

declare var window: any;

/**
 * Generated class for the ModalPicturePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-modal-picture',
  templateUrl: 'modal-picture.html',
})
export class ModalPicturePage {
  public profilePicture: any;
  public currentProfile: any;
  public picData: any;
  public picRef: any;

  public FbREF: any;
  
  public optionsCamera = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    sourceType: this.camera.PictureSourceType.CAMERA,
    encodingType: this.camera.EncodingType.PNG,
    saveToPhotoAlbum: true
  }

  public optionsFile = {
    sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM,
    destinationType: this.camera.DestinationType.FILE_URI,
    mediaType: this.camera.MediaType.ALLMEDIA
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    private viewCtrl: ViewController, private camera: Camera,
    public profileProvider: ProfileProvider,
    public loadingCtrl: LoadingController) {
    this.picRef = firebase.storage().ref('/');
    this.FbREF = firebase.storage().ref('/');
  }

  ionViewDidLoad() {
    this.currentProfile = this.navParams.get('currentProfile');
    this.getPhotoURL(this.currentProfile.uid);
  }

  /*Metodos Camra*/
  getPhotoURL(uid) {
    this.profileProvider.getPhotoURL(uid)
      .then(snap => {
        console.log("LOGRADO");
        this.profilePicture = snap;
      })
  }

  takePicture() {
    this.camera.getPicture(this.optionsCamera).then(imageData => {
      this.picData = imageData;
      this.uploadPicture();
    })
    .catch(error => {
      console.error("No hay imagen seleccionada");
    })
  }

  uploadPicture(){
    let loading = this.loadingCtrl.create({
      content: "Please Wait..."
    });
    loading.present();
    this.picRef.child(this.uid()).child(this.currentProfile.uid + '.png')
    .putString(this.picData, 'base64', {contentType: 'image/png'})
    .then(savePic => {
      this.profilePicture = savePic.downloadURL;
      loading.dismiss();
    })
  }

  //Generador de uid
  uid(){
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx'.replace(/[xy]/g, function(c){
      var r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
  }

  /*Metodos Archivos*/
  getMedia(){
    this.camera.getPicture(this.optionsFile).then(fileURI => {
      window.resolveLocalFileSystemURL("file://"+fileURI, FE => {
        FE.file(file => {
          const FR = new FileReader();
          FR.onloadend = ((res:any) => {
            let AF = res.target.result;
            let blob = new Blob([new Uint8Array(AF)],{type: 'image/png'});
            this.uploadFile(blob);
          });
        FR.readAsArrayBuffer(file);
        })
      });
    })
    .catch(error => {
      console.error("No hay imagen seleccionada");
    })
    
  }

  uploadFile(blob:Blob){
    let loading = this.loadingCtrl.create({
      content: "Please Wait..."
    });
    loading.present();
    this.FbREF.child('profilePictures/'+this.currentProfile.uid+'.png').put(blob)
    .then(picture => {
      this.profilePicture = picture.downloadURL;
      loading.dismiss();
    })
    //console.log(this.FbREF);
    //this.profilePicture = this.FbREF.child('profilePictures/'+this.userProfile.uid+'.png');
    //this.profileProvider.updateProfilePicture();
  }

  /*Cerrar Modal y pasa un parametro*/
  closeModalPicture() {
    this.viewCtrl.dismiss(this.profilePicture);
  }
}
