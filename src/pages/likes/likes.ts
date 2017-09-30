import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { EscortServiceProvider } from '../../providers/escort-service/escort-service';

@IonicPage()
@Component({
    selector: 'page-likes',
    templateUrl: 'likes.html',
})
export class LikesPage {
    loading:any;
    likes:any;
    constructor(public navCtrl: NavController, 
        public loadingCtrl: LoadingController,
        public escortService: EscortServiceProvider,
        public navParams: NavParams) {

    }

    ionViewDidLoad() {
        this.showLoader('Cargando datos...');
        this.escortService.getlistLikes({ token: localStorage.getItem('token') }).then((res) => {
            if (res['status'] == true) {
                this.likes = res['likes'];
                this.loading.dismiss();
            } else {
                this.loading.dismiss();
            }
        });
    }

    showLoader(msg) {
        this.loading = this.loadingCtrl.create({
            content: msg
        });

        this.loading.present();
    }

}
