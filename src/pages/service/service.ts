import { Component } from '@angular/core';
import { IonicPage, Events, LoadingController, ToastController, ModalController, NavController, NavParams, AlertController } from 'ionic-angular';
import { ServiceServiceProvider } from '../../providers/service-service/service-service';

@IonicPage()
@Component({
    selector: 'page-service',
    templateUrl: 'service.html',
})
export class ServicePage {
    loading: any;
    servicios: any;

    constructor(
        public serviceService: ServiceServiceProvider,
        public modalCtrl: ModalController,
        public navCtrl: NavController,
        public alertCtrl: AlertController,
        public loadingCtrl: LoadingController,
        private toastCtrl: ToastController,
        public event: Events,
        public navParams: NavParams) {

        this.event.subscribe('updateServices', () => {
            this.ionViewDidLoad();
        });
    }

    ionViewDidLoad() {
        this.showLoader('Cargando servicios...');
        this.serviceService.getServices({ token: localStorage.getItem('token') }).then((res) => {
            if (res['status'] == true) {
                this.servicios = res['services'];
                this.loading.dismiss();
            } else {
                this.loading.dismiss();
                this.presentToast('Ups! ocurrio un error, reintenta mas tarde');
            }
        });
    }

    createService() {
        let modal = this.modalCtrl.create('AddServicePage', { servicios: this.servicios });
        modal.present();
    }

    deleteService(service) {
        let alert = this.alertCtrl.create({
            title: 'Atencion!',
            subTitle: '¿Estas segura que deseas eliminar el servicio?',
            buttons: [{
                text: 'Cancelar',
                handler: () => { }
            },
            {
                text: 'Aceptar',
                handler: () => {
                    this.showLoader('Eliminando servicio...');
                    this.serviceService.deleteService({ token: localStorage.getItem('token'), servicio: service['id'] }).then((res) => {
                        this.servicios = this.servicios.filter(item => item.id !== service['id']);
                        this.loading.dismiss();
                        this.presentToast('El servicio fue eliminado ...');
                    });
                }
            }]
        });
        alert.present();
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
            duration: 3000,
            position: 'bottom',
            dismissOnPageChange: true
        });
        toast.present();
    }

    transService(service) {
        switch (service) {
            case '2_hombres'             : service = '2 Hombres'; break;
            case 'americana_sin'         : service = 'Americana (s/condón)'; break;
            case 'americana_condon'      : service = 'Americana (c/condón)'; break;
            case 'americana_corporal'    : service = 'Americana Corporal'; break;
            case 'amiga_cuadro'          : service = 'Amiga para cuadro'; break;
            case 'atencion_pareja'       : service = 'Atención a parejas'; break;
            case 'atencion_discapacitado': service = 'Atención discapacitados'; break;
            case 'aromaterapia'          : service = 'Aromaterapia'; break;
            case 'baile_erotico'         : service = 'Bailes eróticos'; break;
            case 'beso'                  : service = 'Besos'; break;
            case 'cambio_rol'            : service = 'Cambio de rol'; break;
            case 'casting'               : service = 'Casting'; break;
            case 'cena'                  : service = 'Cenas'; break;
            case 'despedida_soltero'     : service = 'Despedida de solteros'; break;
            case 'dominacion'            : service = 'Dominación'; break;
            case 'ducha'                 : service = 'Ducha y/o jacuzzi'; break;
            case 'evento'                : service = 'Eventos'; break;
            case 'fantasia'              : service = 'Fantasías'; break;
            case 'garganta'              : service = 'Garganta profunda'; break;
            case 'griego'                : service = 'Griego (anal)'; break;
            case 'juguete'               : service = 'Juguetes eróticos'; break;
            case 'lesbico'               : service = 'Lesbico / Gay'; break;
            case 'lluvia'                : service = 'LLuvia dorada'; break;
            case 'masaje'                : service = 'Masajes'; break;
            case 'rusa'                  : service = 'Rusa'; break;
            case 'sadomasoquismo'        : service = 'Sadomasoquismo'; break;
            case 'completo'              : service = 'Servicios completos'; break;
            case 'normal'                : service = 'Servicios normales'; break;
            case 'viaje'                 : service = 'Viajes'; break;
            default: break;
        }
        return service;
    }

    formatDate(date) {
        var monthNames = [
            "Enero", "Febrero", "Marzo",
            "Abril", "Mayo", "Junio", "Julio",
            "Agosto", "Septiembre", "Octubre",
            "Noviembre", "Diciembre"
        ];
        var d = new Date(date)
        var day = d.getDate();
        var monthIndex = d.getMonth();
        var year = d.getFullYear();

        return day + ' de ' + monthNames[monthIndex] + ', ' + year;
    }

}
