import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, LoadingController, ToastController, AlertController, ViewController, Events } from 'ionic-angular';
import { EscortServiceProvider } from '../../providers/escort-service/escort-service';

@IonicPage()
@Component({
    selector: 'page-edit-profile',
    templateUrl: 'edit-profile.html',
})
export class EditProfilePage {
    _nacionalidad: any;
    _suscripcion: any;
    _nacimiento: any;
    _medidas: any;
    _estatura: any;
    _peso: any;
    _fuma: any;
    _bebe: any;
    _depilacion: any;
    _idioma = [];
    _descripcion: any;
    _description: any;
    modal: any;

    constructor(
        public escortService: EscortServiceProvider,
        public navCtrl: NavController,
        public loadingCtrl: LoadingController,
        private toastCtrl: ToastController,
        public event: Events,
        public modalCtrl: ModalController,
        public alertCtrl: AlertController,
        public viewCtrl: ViewController,
        public navParams: NavParams) {

        this.event.subscribe('updatePerfil', () => {
            this.ionViewDidLoad();
        });
    }

    ionViewDidLoad() {
        let profile = JSON.parse(localStorage.getItem('profile'));
        this._nacionalidad = profile["result"]["nacionalidad"];
        this._suscripcion = profile["result"]["categoria"];
        this._nacimiento = this.formatNacimiento(profile["result"]["nacimiento"]);
        this._medidas = profile["result"]["pecho"] + ' - ' + profile["result"]["cintura"] + ' - ' + profile["result"]["caderas"];
        this._estatura = profile["result"]["estatura"];
        this._peso = profile["result"]["peso"];
        this._fuma = this.fumaBebe(profile["result"]["fuma"]);
        this._bebe = this.fumaBebe(profile["result"]["bebe"]);
        this._depilacion = this.getDepilacion(profile["result"]["depilacion"]);
        this._descripcion = profile["result"]["descripcion"];
        this._description = profile["result"]["description"];

        let arr = profile["result"]["idioma"].split(',');
        this._idioma = [];
        for (let item of arr) {
            this._idioma.push(item.trim());
        }
    }

    closeModal() {
        this.viewCtrl.dismiss();
    }

    editParam(param) {
        switch (param) {
            case 'medidas':
                this.modal = this.modalCtrl.create('ParamProfilePage', { tipo: param });
                this.modal.present();
                break;
            case 'estatura':
                this.modal = this.modalCtrl.create('ParamProfilePage', { tipo: param });
                this.modal.present();
                break;
            case 'peso':
                this.modal = this.modalCtrl.create('ParamProfilePage', { tipo: param });
                this.modal.present();
                break;
            case 'fuma':
                this.modal = this.modalCtrl.create('ParamProfilePage', { tipo: param });
                this.modal.present();
                break;
            case 'bebe':
                this.modal = this.modalCtrl.create('ParamProfilePage', { tipo: param });
                this.modal.present();
                break;
            case 'depilacion':
                this.modal = this.modalCtrl.create('ParamProfilePage', { tipo: param });
                this.modal.present();
                break;
            case 'idioma':
                this.modal = this.modalCtrl.create('ParamProfilePage', { tipo: param });
                this.modal.present();
                break;
            case 'descripcion':
                this.modal = this.modalCtrl.create('ParamProfilePage', { tipo: param });
                this.modal.present();
                break;
            case 'description':
                
                break;

            default: break;
        }
    }

    getLenguaje(param) {
        switch (param) {
            case 'español': param = 'Español'; break;
            case 'ingles': param = 'Ingles'; break;
            case 'portugues': param = 'Portugues'; break;
            case 'italiano': param = 'Italiano'; break;
            case 'frances': param = 'Francés'; break;
            case 'chino': param = 'Chino'; break;
            case 'aleman': param = 'Alemán'; break;
            case 'ruso': param = 'Ruso'; break;
            case 'japones': param = 'Japonés'; break;
            default: break;
        }
        return param;
    }

    getDepilacion(param) {
        switch (param) {
            case 'completa': param = 'Completa'; break;
            case 'rebaje_normal': param = 'Rebaje normal'; break;
            case 'rebaje_corto': param = 'Rebaje corto'; break;
            case 'sin_depilar': param = 'Sin depilar'; break;
            default: break;
        }
        return param;

    }

    fumaBebe(param) {
        if (param == 1) {
            return 'Si';
        } else {
            return 'No';
        }
    }

    formatNacimiento(fecha) {
        var monthNames = [
            "Enero", "Febrero", "Marzo",
            "Abril", "Mayo", "Junio", "Julio",
            "Agosto", "Septiembre", "Octubre",
            "Noviembre", "Diciembre"
        ];
        var d = new Date(fecha)
        var day = d.getDate();
        var monthIndex = d.getMonth();
        var year = d.getFullYear();

        return day + ' de ' + monthNames[monthIndex] + ', ' + year;
    }

}
