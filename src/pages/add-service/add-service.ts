import { Component } from '@angular/core';
import { IonicPage, NavController, Events, ViewController, NavParams, AlertController, LoadingController, ToastController } from 'ionic-angular';
import { ServiceServiceProvider } from '../../providers/service-service/service-service';

@IonicPage()
@Component({
    selector: 'page-add-service',
    templateUrl: 'add-service.html',
})
export class AddServicePage {
    loading: any;
    checkItems = [];
    arr = [];
    tomados = this.navParams.get('servicios');

    constructor(public navCtrl: NavController,
        public serviceService: ServiceServiceProvider,
        public alertCtrl: AlertController,
        public loadingCtrl: LoadingController,
        private toastCtrl: ToastController,
        public viewCtrl: ViewController,
        public event: Events,
        public navParams: NavParams) { }

    ionViewDidLoad() {
        this.loadToArray();

        for (let item of this.tomados) {
            this.removeItemFromArr(this.arr, item.servicio);
        }
    }

    saveService() {
        if (Object.keys(this.checkItems).length > 0) {
            this.showLoader();
            this.serviceService.addService({ token: localStorage.getItem('token'), servicios: Object.keys(this.checkItems) }).then((res) => {
                this.loading.dismiss();
                let alert = this.alertCtrl.create({
                    title: 'Alerta!',
                    enableBackdropDismiss:false,
                    subTitle: 'Los servicio(s) fueron agregados',
                    buttons: [{
                        text: 'Ok',
                        handler: () => {
                            this.event.publish('updateServices');
                            this.navCtrl.pop();
                        }
                    }]
                });
                alert.present();
            });
        } else {
            this.presentToast('No has seleccionado ningún servicio aun');
        }
    }

    removeItemFromArr(arr, item) {
        var i = arr.indexOf(item);
        if (i !== -1) {
            arr.splice(i, 1);
        }
    }

    closeModal() {
        this.viewCtrl.dismiss();
    }

    loadToArray() {
        this.arr.push('2_hombres');
        this.arr.push('americana_sin');
        this.arr.push('americana_condon');
        this.arr.push('americana_corporal');
        this.arr.push('amiga_cuadro');
        this.arr.push('atencion_pareja');
        this.arr.push('atencion_discapacitado');
        this.arr.push('aromaterapia');
        this.arr.push('baile_erotico');
        this.arr.push('beso');
        this.arr.push('cambio_rol');
        this.arr.push('casting');
        this.arr.push('cena');
        this.arr.push('despedida_soltero');
        this.arr.push('dominacion');
        this.arr.push('ducha');
        this.arr.push('evento');
        this.arr.push('fantasia');
        this.arr.push('garganta');
        this.arr.push('griego');
        this.arr.push('juguete');
        this.arr.push('lesbico');
        this.arr.push('lluvia');
        this.arr.push('masaje');
        this.arr.push('rusa');
        this.arr.push('sadomasoquismo');
        this.arr.push('completo');
        this.arr.push('normal');
        this.arr.push('viaje');
    }

    transService(service) {
        switch (service) {
            case '2_hombres': service = '2 Hombres'; break;
            case 'americana_sin': service = 'Americana (s/condón)'; break;
            case 'americana_condon': service = 'Americana (c/condón)'; break;
            case 'americana_corporal': service = 'Americana Corporal'; break;
            case 'amiga_cuadro': service = 'Amiga para cuadro'; break;
            case 'atencion_pareja': service = 'Atención a parejas'; break;
            case 'atencion_discapacitado': service = 'Atención discapacitados'; break;
            case 'aromaterapia': service = 'Aromaterapia'; break;
            case 'baile_erotico': service = 'Bailes eróticos'; break;
            case 'beso': service = 'Besos'; break;
            case 'cambio_rol': service = 'Cambio de rol'; break;
            case 'casting': service = 'Casting'; break;
            case 'cena': service = 'Cenas'; break;
            case 'despedida_soltero': service = 'Despedida de solteros'; break;
            case 'dominacion': service = 'Dominación'; break;
            case 'ducha': service = 'Ducha y/o jacuzzi'; break;
            case 'evento': service = 'Eventos'; break;
            case 'fantasia': service = 'Fantasías'; break;
            case 'garganta': service = 'Garganta profunda'; break;
            case 'griego': service = 'Griego (anal)'; break;
            case 'juguete': service = 'Juguetes eróticos'; break;
            case 'lesbico': service = 'Lesbico / Gay'; break;
            case 'lluvia': service = 'LLuvia dorada'; break;
            case 'masaje': service = 'Masajes'; break;
            case 'rusa': service = 'Rusa'; break;
            case 'sadomasoquismo': service = 'Sadomasoquismo'; break;
            case 'completo': service = 'Servicios completos'; break;
            case 'normal': service = 'Servicios normales'; break;
            case 'viaje': service = 'Viajes'; break;
            default: break;
        }
        return service;
    }

    showLoader() {
        this.loading = this.loadingCtrl.create({
            content: 'Guardando servicios...'
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
