import { Component } from '@angular/core';
import { IonicPage, Events, NavController, NavParams, ModalController, LoadingController, ToastController, AlertController, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
    selector: 'page-edit-cobro',
    templateUrl: 'edit-cobro.html',
})
export class EditCobroPage {
    modal: any;
    estado_cobro:any;
    valor: any;
    tiempo: any;
    estado_promo: any;
    valor_promo: any;
    tiempo_promo: any;
    isCobro:any;
    isActiva:any;
    constructor(
        public navCtrl: NavController,
        public loadingCtrl: LoadingController,
        private toastCtrl: ToastController,
        public alertCtrl: AlertController,
        public modalCtrl: ModalController,
        public event: Events,
        public viewCtrl: ViewController,
        public navParams: NavParams) {

        this.event.subscribe('updateCobros', () => {
            this.event.publish('updateHome');
            this.ionViewDidLoad();
        });
    }

    ionViewDidLoad() {
        let profile = JSON.parse(localStorage.getItem('profile'));
        this.estado_cobro = profile["result"]["estado_cobro"] == 1 ? 'Visible': 'Oculto';
        this.isCobro      = profile["result"]["estado_cobro"] == 1 ? true    : false;
        this.valor        = profile["result"]["valor"];
        this.tiempo       = this.getTiempo(profile["result"]["valor_tiempo"]);
        
        this.estado_promo = profile["result"]["estado_promocion"] == 1 ? 'Activa': 'Desactivada';
        this.isActiva     = profile["result"]["estado_promocion"] == 1 ? true    : false;
        this.valor_promo  = profile["result"]["promocion"];
        this.tiempo_promo = this.getTiempo(profile["result"]["promocion_tiempo"]);
    }

    editCobro(param) {
        switch (param) {
            case 'normal':
                this.modal = this.modalCtrl.create('ParamCobroPage', { tipo: param });
                this.modal.present();
                break;
            case 'promo':
                this.modal = this.modalCtrl.create('ParamCobroPage', { tipo: param });
                this.modal.present();
                break;
            default: break;
        }
    }

    getTiempo(param) {
        switch (param) {
            case '30_normal': param = 'por 30 min servicio normal'; break;
            case '30_americana': param = 'por 30 min servicio normal con americana'; break;
            case '30_todo': param = 'por 30 min servicio completo todo incluido'; break;
            case '45_normal': param = 'por 45 min servicio normal'; break;
            case '45_americana': param = 'por 45 min servicio normal con americana'; break;
            case '45_todo': param = 'por 45 min servicio completo todo incluido'; break;
            case '1_normal': param = 'por 1 hora servicio normal'; break;
            case '1_americana': param = 'por 1 hora servicio normal con americana'; break;
            case '1_todo': param = 'por 1 hora servicio completo todo incluido'; break;
            case '12_normal': param = 'por 1 hora 1/2 servicio normal'; break;
            case '12_americana': param = 'por 1 hora 1/2 servicio normal con americana'; break;
            case '12_todo': param = 'por 1 hora 1/2 servicio completo todo incluido'; break;
            case '2_normal': param = 'por 2 horas servicio normal'; break;
            case '2_americana': param = 'por 2 horas servicio normal con americana'; break;
            case '2_todo': param = 'por 2 horas servicio completo todo incluido'; break;
            default: break;
        }
        return param;
    }

    closeModal() {
        this.viewCtrl.dismiss();
    }

}
