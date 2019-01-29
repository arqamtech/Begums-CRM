import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, LoadingController, AlertController, ToastController, ModalController } from 'ionic-angular';
import { AddUsersPage } from '../../Users/add-users/add-users';
import { AngularFireDatabase } from 'angularfire2/database';
import { EditUsersPage } from '../../Users/edit-users/edit-users';
import * as firebase from 'firebase';
import { UserDetailPage } from '../../Users/user-detail/user-detail';
import { StartSessionPage } from '../../Session/start-session/start-session';


@IonicPage()
@Component({
  selector: 'page-users',
  templateUrl: 'users.html',
})
export class UsersPage {

  Users: Array<any> = [];
  UsersLoaded : Array<any> = [];


  constructor(
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public toastCtrl: ToastController,
    public modalController : ModalController,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public db: AngularFireDatabase,
  ) {
    this.menuCtrl.enable(true);
    this.getUsers();
  }

  getUsers() {

    let loading = this.loadingCtrl.create({
      content: 'Getting Users...'
    });
    loading.present();


    this.db.list(`Users`).snapshotChanges().subscribe(snap => {
      let tempArray: Array<any> = [];
      snap.forEach(snip => {
        let temp: any = snip.payload.val();
        temp.key = snip.key;
        console.log(temp);

        tempArray.push(temp);
      })
      this.Users = tempArray;
      this.UsersLoaded = tempArray;
      loading.dismiss();
    })
  }

  initializeItems(): void {
    this.Users = this.UsersLoaded;
  }
  getItems(searchbar) {
    this.initializeItems();
    let q = searchbar;
    if (!q) {
      return;
    }
    this.Users = this.Users.filter((v) => {
      if ((v.Name) && q) {
        if (v.Name.toLowerCase().indexOf(q.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
    });
  }


  delConfirmUser(u) {
    let confirm = this.alertCtrl.create({
      title: 'Are you sure you want to Delete Client ?',
      message: 'This data cannot be recovered again.',
      buttons: [
        {
          text: 'No, Its a mistake',
          handler: () => {

          }
        },
        {
          text: "Yes, I'm sure",
          handler: () => {
            this.delUser(u);
          }
        }
      ]
    });
    confirm.present();
  }
  delUser(u) {
    let loading = this.loadingCtrl.create({
      content: 'Deleting Client...'
    });
    loading.present();

    firebase.database().ref("Users").child(u.key).remove().then(() => {
      loading.dismiss();
      this.presentToast(u.Name + " " + "deleted");
    })
  }

  startSession(u){
    const modal = this.modalController.create(StartSessionPage,{user : u})
    modal.present();
  }

  editUser(u) { this.navCtrl.push(EditUsersPage, { user: u }); }
  addUser() { this.navCtrl.push(AddUsersPage); }
  viewUser(u) { this.navCtrl.push(UserDetailPage, { user: u }); }

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
