import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController, ToastController, ModalController, AlertController, Events } from 'ionic-angular';
import { EscortServiceProvider } from '../../providers/escort-service/escort-service';

@IonicPage()
@Component({
    selector: 'page-param-profile',
    templateUrl: 'param-profile.html',
})
export class ParamProfilePage {
    parametro = this.navParams.get('tipo');
    idioma = this.navParams.get('idioma');
    perfil = { pecho: 0, cintura: 0, cadera: 0, estatura: 0, peso: 0, fuma: false, bebe: false, depilacion: '', idioma: [], descripcion: '', description: '' }
    isMedidas: boolean;
    isEstatura: boolean;
    isPeso: boolean;
    isFuma: boolean;
    isBebe: boolean;
    isDepilacion: boolean;
    isIdioma: boolean;
    isDescripcion: boolean;
    isDescription: boolean;
    label: any;
    loading: any;

    constructor(public navCtrl: NavController,
        public escortService: EscortServiceProvider,
        public loadingCtrl: LoadingController,
        private toastCtrl: ToastController,
        public event: Events,
        public modalCtrl: ModalController,
        public alertCtrl: AlertController,
        public viewCtrl: ViewController,
        public navParams: NavParams) {
    }

    ionViewDidLoad() {
        let profile = JSON.parse(localStorage.getItem('profile'));
        this.perfil.pecho = profile["result"]["pecho"];
        this.perfil.cintura = profile["result"]["cintura"];
        this.perfil.cadera = profile["result"]["caderas"];
        this.perfil.estatura = profile["result"]["estatura"];
        this.perfil.peso = profile["result"]["peso"];
        this.perfil.fuma = profile["result"]["fuma"];
        this.perfil.bebe = profile["result"]["bebe"];
        this.perfil.depilacion = profile["result"]["depilacion"];
        try {
            let aux = profile["result"]["idioma"].split(',');
            for (let item of aux)
                this.perfil.idioma.push(item.trim());
        } catch (err) {
            this.perfil.idioma.push(profile["result"]["idioma"]);
        }
        this.perfil.descripcion = profile["result"]["descripcion"];
        this.perfil.description = profile["result"]["description"];

        switch (this.parametro) {
            case 'medidas':
                this.isMedidas = true;
                this.label = 'Medidas';
                break;
            case 'estatura':
                this.isEstatura = true;
                this.label = 'Estatura';
                break;
            case 'peso':
                this.isPeso = true;
                this.label = 'Peso';
                break;
            case 'fuma':
                this.isFuma = true;
                this.label = 'Fumas';
                break;
            case 'bebe':
                this.isBebe = true;
                this.label = 'Bebes';
                break;
            case 'depilacion':
                this.isDepilacion = true;
                this.label = 'Depilación';
                break;
            case 'idioma':
                this.isIdioma = true;
                this.label = 'Idiomas';
                break;
            case 'descripcion':
                this.isDescripcion = true;
                this.label = 'Descripción';
                break;
            case 'description':
                this.isDescription = true;
                this.label = 'Descripción inglés';
                break;
            default: break;
        }
    }

    updatePerfil() {
        this.showLoader();
        this.escortService.updatePerfilEscort({ token: localStorage.getItem('token'), data: this.perfil }).then((res) => {

            if (res['status'] == true) {
                this.escortService.getdataEscort({ token: localStorage.getItem('token') }).then((response) => {
                    localStorage.setItem('profile', JSON.stringify(response));
                    this.loading.dismiss();
                    this.event.publish('updatePerfil');
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
