import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController, LoadingController, ToastController } from 'ionic-angular';
import { EscortServiceProvider } from '../../providers/escort-service/escort-service';

@IonicPage()
@Component({
    selector: 'page-new-message',
    templateUrl: 'new-message.html',
})
export class NewMessagePage {
    txtComentario: any;
    loading: any;
    constructor(
        public escortService: EscortServiceProvider,
        public navCtrl: NavController,
        public loadingCtrl: LoadingController,
        private toastCtrl: ToastController,
        public alertCtrl: AlertController,
        public viewCtrl: ViewController,
        public navParams: NavParams) {
    }

    save() {
        if (this.txtComentario.trim().length < 10) {
            this.presentToast('El estado debe contener almenos 10 caracteres');
        } else {

            let confirm = this.alertCtrl.create({
                title: 'Alerta',
                message: '¿Estas segura que deseas enviar el estado?',
                buttons: [
                    {
                        text: 'Cancelar',
                        handler: () => { }
                    },
                    {
                        text: 'Aceptar',
                        handler: () => {
                            this.showLoader();
                            this.escortService.newEstado({ token: localStorage.getItem('token'), message: this.txtComentario }).then((response) => {
                                if(response['status'] == true){
                                    this.loading.dismiss();
                                    this.presentToast('Tu estado ha sido publicado exitosamente!');
                                    this.viewCtrl.dismiss();
                                }else{
                                    this.presentToast('Ups! ocurrio un error, reintenta mas tarde');
                                }
                            });
                        }
                    }
                ]
            });
            confirm.present();
        }
    }

    showLoader() {
        this.loading = this.loadingCtrl.create({
            content: 'Enviando estado...'
        });

        this.loading.present();
    }

    presentToast(msg) {
        let toast = this.toastCtrl.create({
            message: msg,
            duration: 3000,
            position: 'bottom',
            dismissOnPageChange: true
        });
        toast.present();
    }


    closeModal() {
        this.viewCtrl.dismiss();
    }

}
