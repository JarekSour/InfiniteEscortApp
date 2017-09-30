import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController, ToastController, ModalController, AlertController, Events } from 'ionic-angular';
import { EscortServiceProvider } from '../../providers/escort-service/escort-service';


@IonicPage()
@Component({
    selector: 'page-param-cobro',
    templateUrl: 'param-cobro.html',
})
export class ParamCobroPage {
    loading: any;
    parametro = this.navParams.get('tipo');
    isNormal: boolean;
    isActiva: boolean;
    isCobro:boolean;
    isPromo: boolean;
    cobro = { estado_cobro: false, costo: 0, tiempo: '', estado_promocion: false, costo_promo: 0, tiempo_promo: '' };

    constructor(
        public escortService: EscortServiceProvider,
        public loadingCtrl: LoadingController,
        private toastCtrl: ToastController,
        public event: Events,
        public modalCtrl: ModalController,
        public alertCtrl: AlertController,
        public viewCtrl: ViewController,
        public navCtrl: NavController,
        public navParams: NavParams) {

    }

    ionViewDidLoad() {
        let profile = JSON.parse(localStorage.getItem('profile'));
        this.cobro.estado_cobro = profile["result"]["estado_cobro"];
        this.cobro.costo = profile["result"]["valor"];
        this.cobro.tiempo = profile["result"]["valor_tiempo"];
        this.cobro.estado_promocion = profile["result"]["estado_promocion"];
        this.cobro.costo_promo = profile["result"]["promocion"];
        this.cobro.tiempo_promo = profile["result"]["promocion_tiempo"];
        switch (this.parametro) {
            case 'normal':
                this.isCobro = true
                this.isNormal = this.cobro.estado_cobro == true ? true : false;
                break;
            case 'promo':
                this.isActiva = true;
                this.isPromo = this.cobro.estado_promocion == true ? true : false;
                break;
            default:
                break;
        }
    }

    updatePerfil() {
        this.showLoader();
        this.escortService.updateCostosEscort({ token: localStorage.getItem('token'), data: this.cobro }).then((res) => {

            if (res['status'] == true) {
                this.escortService.getdataEscort({ token: localStorage.getItem('token') }).then((response) => {
                    localStorage.setItem('profile', JSON.stringify(response));
                    this.loading.dismiss();
                    this.event.publish('updateCobros');
                    this.navCtrl.pop();
                });

            } else {
                this.presentToast('Ups! ocurrio un error, reintenta mas tarde');
            }
        });
    }

    changeEstadoCobro() {
        this.isNormal = this.cobro.estado_cobro == true ? true : false;
    }

    changeEstadoPromo() {
        this.isPromo = this.cobro.estado_promocion == true ? true : false;
    }

    closeModal() {
        this.viewCtrl.dismiss();
    }

    showLoader() {
        this.loading = this.loadingCtrl.create({
            content: 'Actualizando datos ...'
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

}
