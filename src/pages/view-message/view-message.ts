import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, LoadingController, ToastController, AlertController, Events } from 'ionic-angular';
import { MessageServiceProvider } from '../../providers/message-service/message-service';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
    selector: 'page-view-message',
    templateUrl: 'view-message.html',
})
export class ViewMessagePage {
    id: any;
    loading: any;
    texto: any;
    status: boolean;
    constructor(
        public loadingCtrl: LoadingController,
        private toastCtrl: ToastController,
        public alertCtrl: AlertController,
        public messageService: MessageServiceProvider,
        public navCtrl: NavController,
        public event: Events,
        public menuCtrl: MenuController,
        public navParams: NavParams) {
    }

    ionViewDidLoad() {
        this.id = this.navParams.get('id');

        if (this.navParams.get('status')) {
            this.status = true
        }
        else {
            this.menuCtrl.enable(false, 'menuSlide');
            this.status = false;
        }

        this.showLoader('Obteniendo mensaje...');
        this.messageService.loadMessage({ token: localStorage.getItem('token'), id: this.id }).then((data) => {
            this.loading.dismiss();
            this.texto = data['mensaje']['mensaje'];
        });
    }

    ToHome() {
        this.navCtrl.setRoot(HomePage);
    }

    eliminar() {
        let confirm = this.alertCtrl.create({
            title: 'Alerta',
            message: '¿Estás segura que desear eliminar el mensaje?',
            buttons: [
                {
                    text: 'Eliminar',
                    handler: () => {
                        this.showLoader('Eliminando mensaje...');
                        this.messageService.deleteMessage({ token: localStorage.getItem('token'), id: this.id }).then((response) => {
                            this.loading.dismiss();
                            this.navCtrl.setRoot(HomePage);
                        });
                    }
                },
                {
                    text: 'Cancelar',
                    handler: () => { }
                }
            ]
        });
        confirm.present();
    }

    eliminarAlone() {
        let confirm = this.alertCtrl.create({
            title: 'Alerta',
            message: '¿Estás segura que desear eliminar el mensaje?',
            buttons: [
                {
                    text: 'Eliminar',
                    handler: () => {
                        this.showLoader('Eliminando mensaje...');
                        this.messageService.deleteMessage({ token: localStorage.getItem('token'), id: this.id }).then((response) => {
                            this.loading.dismiss();
                            this.event.publish('updateMensajes', this.id);
                            this.navCtrl.pop();
                        });
                    }
                },
                {
                    text: 'Cancelar',
                    handler: () => { }
                }
            ]
        });
        confirm.present();
    }

    showLoader(msg) {
        this.loading = this.loadingCtrl.create({
            content: msg
        });

        this.loading.present();
    }

    presentToast(msg) {
        let toast = this.toastCtrl.create({
            message: msg,
            duration: 4000,
            position: 'bottom',
            dismissOnPageChange: true
        });
        toast.present();
    }

}
