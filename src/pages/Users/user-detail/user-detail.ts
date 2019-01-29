import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';

@IonicPage()
@Component({
  selector: 'page-user-detail',
  templateUrl: 'user-detail.html',
})
export class UserDetailPage {

  user = this.navParams.get("user");

  sessions: Array<any> = [];
  constructor(
    public navCtrl: NavController,
    public db: AngularFireDatabase,
    public navParams: NavParams
  ) {
    this.getSessions();
  }

  getSessions() {
    this.db.list(`User Sessions/${this.user.key}`).snapshotChanges().subscribe(snap => {
      this.sessions = [];
      snap.forEach(snip => {
        this.db.object(`Sessions/${snip.key}`).snapshotChanges().subscribe(clip => {
          let temp: any = clip.payload.val();
          temp.key = clip.key;
          console.log(temp);
          
          this.sessions.push(temp)
        })

      })
    })
  }
}
