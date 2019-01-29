import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController, ToastController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';
import moment from 'moment';




@IonicPage()
@Component({
  selector: 'page-start-session',
  templateUrl: 'start-session.html',
})
export class StartSessionPage {

  user = this.navParams.get("user")

  Services: Array<any> = [];
  ServicesLoaded: Array<any> = [];

  selArray: Array<any> = [];

  constructor(
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    public viewCtrl: ViewController,
    public db: AngularFireDatabase,
    public loadingCtrl: LoadingController,
    public navParams: NavParams
  ) {
    console.log(this.user);
    this.getServices();
  }

  addToArr(a) {
    switch (a.Checked) {
      case true: this.selArray.push(a);
        break;
      case false: this.rmFrmArray(a);
        break;
    }
  }
  rmFrmArray(a) {
    var ind = this.selArray.indexOf(a);
    this.selArray.splice(ind, 1)
  }
  getServices() {

    let loading = this.loadingCtrl.create({
      content: 'Loading Services...'
    });
    loading.present();


    this.db.list(`Services`).snapshotChanges().subscribe(snap => {
      let tempArray: Array<any> = [];
      snap.forEach(snip => {
        let temp: any = snip.payload.val();
        temp.key = snip.key;
        console.log(temp);

        tempArray.push(temp);
      })
      this.Services = tempArray;
      this.ServicesLoaded = tempArray;
      loading.dismiss();
    })
  }


  start() {
    let loading = this.loadingCtrl.create({
      content: 'Loading Services...'
    });
    loading.present();


    firebase.database().ref("Sessions/").push({
      Services: this.selArray,
      Client: this.user.key,
      Started: moment().format()
    }).then((res) => {
      firebase.database().ref("Current Sessions").child(res.key).set(true).then(() => {
        firebase.database().ref("User Sessions").child(this.user.key).child(res.key).set(true).then(() => {
          loading.dismiss();
          this.close();
          this.presentToast("Session Started for "+" "+this.user.Name);
        })
      })
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
