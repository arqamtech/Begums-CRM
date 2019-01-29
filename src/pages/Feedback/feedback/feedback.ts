import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ViewController, LoadingController, Events } from 'ionic-angular';
import * as firebase from 'firebase';



@IonicPage()
@Component({
  selector: 'page-feedback',
  templateUrl: 'feedback.html',
})
export class FeedbackPage {

  session = this.navParams.get("session");

  rating: number = 0;
  constructor(
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    public events: Events,
    public viewCtrl: ViewController,
    public loadingCtrl: LoadingController,
    public navParams: NavParams
  ) {
    console.log(this.session);
    events.subscribe('star-rating:changed', (starRating) => {
      this.rating = starRating
    });

  }


  submitRating() {
    firebase.database().ref("Sessions").child(this.session.key).child("Rating").set(this.rating).then(() => {
      this.close();
      this.presentToast("Rating Submitted");
    })
  }








  close() {
    this.viewCtrl.dismiss();
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
