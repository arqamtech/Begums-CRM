import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, LoadingController, ToastController, AlertController, ModalController } from 'ionic-angular';
import { UsersPage } from '../users/users';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';
import moment from 'moment';
import { FeedbackPage } from '../../Feedback/feedback/feedback';
import { Events } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {

  ll: string = null;
  users: number = 0;
  sess: number = 0;

  sessions: Array<any> = [];

  constructor(
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public toastCtrl: ToastController,
    public modalController: ModalController,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public db: AngularFireDatabase,
    public navParams: NavParams
  ) {

    this.menuCtrl.enable(true);
    this.getUsers();
    this.getLastlogin();
    this.getSessions();
  }

  getLastlogin() {
    this.db.object(`Admin Data/Admins/${firebase.auth().currentUser.uid}/Last Login`).snapshotChanges().subscribe(snap => {
      let temp: any = snap.payload.val();
      this.ll = temp;
    })

  }

  getUsers() {

    let loading = this.loadingCtrl.create({
      content: 'Loading Data...'
    });
    loading.present();
    this.db.list(`Users`).snapshotChanges().subscribe(snap => {
      this.users = snap.length;
    })
    this.db.list(`Current Sessions`).snapshotChanges().subscribe(snap => {
      this.sess = snap.length;
    })
    loading.dismiss();
  }
  getSessions() {

    let loading = this.loadingCtrl.create({
      content: 'Loading Current Sessions...'
    });
    loading.present();


    this.db.list(`Current Sessions`).snapshotChanges().subscribe(snap => {
      this.sessions = [];
      snap.forEach(snip => {
        this.db.object(`Sessions/${snip.key}`).snapshotChanges().subscribe(clip => {

          let temp: any = clip.payload.val();
          temp.key = clip.key;
          this.db.object(`Users/${temp.Client}`).snapshotChanges().subscribe(iip => {
            let te: any = iip.payload.val();
            temp.ClientName = te.Name;
          })
          temp.StartedNow = moment(temp.Started).fromNow();
          console.log(temp);

          this.sessions.push(temp);

        })
      })
      loading.dismiss();
    })
  }

  confirmEndSession(s) {
    let confirm = this.alertCtrl.create({
      title: 'Are you sure you want to End Session ?',
      buttons: [
        {
          text: 'No, Its a mistake',
          handler: () => {

          }
        },
        {
          text: "Yes, I'm sure",
          handler: () => {
            this.endSession(s);
          }
        }
      ]
    });
    confirm.present();
  }

  endSession(s) {
    let loading = this.loadingCtrl.create({
      content: 'Loading Data...'
    });
    loading.present();
    firebase.database().ref("Current Sessions").child(s.key).remove().then(() => {
      firebase.database().ref("Sessions").child(s.key).child("Ended").set(moment().format()).then(() => {
        this.viewFeedback(s);
        this.presentToast("Session Ended");
        loading.dismiss();
        this.getSessions();
      })
    })
  }


  viewFeedback(s) {
    const modal = this.modalController.create(FeedbackPage, { session: s })
    modal.present();
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
  gtUsers() { this.navCtrl.push(UsersPage); }
}
