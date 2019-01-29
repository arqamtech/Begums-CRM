import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, ToastController, LoadingController } from 'ionic-angular';
import * as firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-edit-service',
  templateUrl: 'edit-service.html',
})
export class EditServicePage {


  userLabel = "Service's";

  service = this.navParams.get("service");

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public menuCtrl: MenuController,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
  ) {
    console.log(this.service);
    
    this.menuCtrl.enable(true);
  }


  checkData() {
    if (this.service.Name) {
      if (this.service.Duration) {
          this.updateService();
      } else { this.presentToast("Enter" + this.userLabel + "Duration") }
    } else { this.presentToast("Enter" + this.userLabel + "Name") }
  }




  updateService() {
    let loading = this.loadingCtrl.create({
      content: 'Updating Client...'
    });
    loading.present();

    let ke = this.service.key;
    delete this.service.key;

    firebase.database().ref("Services").child(ke).set(this.service).then(() => {
      this.navCtrl.pop().then(() => {
        this.presentToast(this.userLabel + " " + "Updated")
        loading.dismiss();

      });

    })

  }





  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 4000,
      position: "bottom",
      showCloseButton: false,
    });
    toast.present();
  }

}
