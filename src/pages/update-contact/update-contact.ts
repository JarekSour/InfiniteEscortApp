import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ToastController, LoadingController, AlertController, Events } from 'ionic-angular';
import { EscortServiceProvider } from '../../providers/escort-service/escort-service';

@IonicPage()
@Component({
    selector: 'page-update-contact',
    templateUrl: 'update-contact.html',
})
export class UpdateContactPage {

    contacto = { telefono: '', pais: '', comuna: '', zona: '', donde: [], horario: '' };
    parametro = this.navParams.get('tipo');
    label: any;
    isTelefono: boolean;
    isSector: boolean;
    isDonde: boolean;
    isHorario: boolean;
    loading: any;

    constructor(public navCtrl: NavController,
        public viewCtrl: ViewController,
        public toastCtrl: ToastController,
        public loadingCtrl: LoadingController,
        public event: Events,
        public alertCtrl: AlertController,
        public escortService: EscortServiceProvider,
        public navParams: NavParams) {
    }

    ionViewDidLoad() {
        let profile = JSON.parse(localStorage.getItem('profile'));
        this.contacto.telefono = profile["result"]["telefono"];
        this.contacto.pais = profile["result"]["pais"];
        this.contacto.comuna = profile["result"]["comuna"];
        this.contacto.zona = profile["result"]["zona"];
        try {
            let aux = profile["result"]["atencion"].split(',');
            for (let item of aux)
                this.contacto.donde.push(item.trim());
        } catch (err) {
            this.contacto.donde.push(profile["result"]["atencion"]);
        }
        this.contacto.horario = profile["result"]["horario"];

        switch (this.parametro) {
            case 'telefono':
                this.label = 'Teléfono';
                this.isTelefono = true;
                break;
            case 'sector':
                this.label = 'Sector de atención';
                this.isSector = true;
                break;
            case 'donde':
                this.label = 'Donde atiendes';
                this.isDonde = true;
                break;
            case 'horario':
                this.label = 'Horario de atención';
                this.isHorario = true;
                break;
            default:
                break;
        }
    }

    updateContacto() {
        this.showLoader();
        this.escortService.updateContactEscort({ token: localStorage.getItem('token'), data: this.contacto }).then((res) => {

            if (res['status'] == true) {
                this.escortService.getdataEscort({ token: localStorage.getItem('token') }).then((response) => {
                    localStorage.setItem('profile', JSON.stringify(response));
                    this.loading.dismiss();
                    this.event.publish('updateContact');
                    this.navCtrl.pop();
                });
            } else {
                this.presentToast('Ups! ocurrio un error, reintenta mas tarde');
            }
        });
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
