import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, ToastController, LoadingController } from 'ionic-angular';
import * as firebase from 'firebase';
import { AngularFireDatabase } from 'angularfire2/database';
import moment from 'moment';




@IonicPage()
@Component({
  selector: 'page-add-service',
  templateUrl: 'add-service.html',
})
export class AddServicePage {


  userLabel = "Service's";

  name: string;
  dur: number;
  des: string ="" ;


  constructor(
    public navCtrl: NavController,
    public db: AngularFireDatabase,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public menuCtrl: MenuController,
    public navParams: NavParams
  ) {
    this.menuCtrl.enable(true);
  }


  checkData() {
    if (this.name) {
      if (this.dur) {
          this.addUser();
      } else { this.presentToast("Enter" + this.userLabel + "Duration") }
    } else { this.presentToast("Enter" + this.userLabel + "Name") }
  }



  addUser() {
    let loading = this.loadingCtrl.create({
      content: 'Adding Client...'
    });
    loading.present();


    firebase.database().ref("Services").push({
      Name: this.name,
      Duration: this.dur,
      Description: this.des,
      TimeStamp: moment().format()
    }).then(() => {
      this.navCtrl.pop().then(() => {
        this.presentToast(this.userLabel + " " + "Added")
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
