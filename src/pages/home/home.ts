import { Component } from '@angular/core';
import { IonicPage, LoadingController, Platform, NavController, ToastController, NavParams, Events, AlertController, ModalController, MenuController } from 'ionic-angular';
import { EscortServiceProvider } from '../../providers/escort-service/escort-service';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { BrowserTab } from '@ionic-native/browser-tab';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { SplashScreen } from '@ionic-native/splash-screen';

@IonicPage()
@Component({
    selector: 'page-home',
    templateUrl: 'home.html',
})
export class HomePage {

    _imgProfile: any;
    _nombre: any;
    _correo: any;
    _plan: any;
    _like: any;
    _visit: any;
    _suscripcion: any;
    nos_visita: any;
    destacada: any;
    suscripcion: any;
    ifNosVisita: boolean;
    ifDestacada: boolean;
    loading: any;
    ifPromo: any;
    ifOver:boolean;

    constructor(
        private transfer: FileTransfer,
        private file: File,
        public escortService: EscortServiceProvider,
        public navCtrl: NavController,
        public event: Events,
        public platform: Platform,
        public splashScreen: SplashScreen,
        public alertCtrl: AlertController,
        public toastCtrl: ToastController,
        public loadingCtrl: LoadingController,
        public iab: InAppBrowser,
        public modalCtrl: ModalController,
        public menuCtrl: MenuController,
        public browserTab: BrowserTab,
        public camera: Camera,
        public navParams: NavParams) {
        this._like = 0;
        this._visit = 0;
        this._imgProfile = 'assets/img/perfil.png';
        this.ifOver = false;

        this.platform.ready().then(() => {
            setTimeout(() => {
                this.splashScreen.hide();
            }, 100)
        })

        this.event.subscribe('updateHome', () => {
            let profile = JSON.parse(localStorage.getItem('profile'));
            this.ifPromo = profile["result"]["estado_promocion"] == 1 ? true : false;
            this.formatNosVisita(profile['result']['visita_limite']);
        });
    }

    ionViewDidLoad() {
        this.menuCtrl.enable(true, 'menuSlide');
        this.showLoader('cargando datos ...');
        this.escortService.getdataEscort({ token: localStorage.getItem('token') }).then((response) => {
            localStorage.setItem('profile', JSON.stringify(response));
            this._imgProfile = 'https://infiniteescorts.com/api/v1/imagen/avatar/get?image=' + response['result']['avatar'];
            this._nombre = response['result']['nombre'];
            this._plan = response['result']['categoria'];
            this.ifPromo = response["result"]["estado_promocion"] == 1 ? true : false;

            this.event.publish('loadSidebar', response);
            this.counterVisit(0, response['result']['visitas'], 3500);
            this.escortService.getLikes({ token: localStorage.getItem('token') }).then((res) => {
                this.counterLike(0, res['likes'], 3500);
                this.loading.dismiss();
            })

            this.formatNosVisita(response['result']['visita_limite']);
            this.formatSuscripcion(response['result']['suscripcion']);
            this.formatDestacadas(response['result']['destacada_limite']);
        },(err) =>{
            this.presentToast('Verifica tu conexión a internet', 10000);
        });
    }

    newMessage() {
        let modal = this.modalCtrl.create('NewMessagePage');
        modal.present();
    }

    modalEditProfile() {
        let modal = this.modalCtrl.create('EditProfilePage');
        modal.present();
    }

    modalEditCobro() {
        let modal = this.modalCtrl.create('EditCobroPage');
        modal.present();
    }

    modalEditPromo() {
        let modal = this.modalCtrl.create('EditPromoPage');
        modal.present();
    }

    updateAvatar() {
        let alert = this.alertCtrl.create({
            title: '',
            subTitle: 'Como seleccionaras la imagen',
            buttons: [{
                text: 'Cámara',
                handler: data => {
                    const options: CameraOptions = {
                        quality: 75,
                        destinationType: this.camera.DestinationType.FILE_URI,
                        encodingType: this.camera.EncodingType.JPEG,
                        mediaType: this.camera.MediaType.PICTURE,
                        correctOrientation: true
                    }

                    this.camera.getPicture(options).then((imageData) => {
                        this.showLoader('Actualizando avatar ...');
                        this.escortService.updateAvatar(imageData, localStorage.getItem('token')).then((response) => {
                            this.loading.dismiss();
                            this._imgProfile = 'https://infiniteescorts.com/api/v1/imagen/avatar/get?image=' + response['data'];
                        }, (err) => {
                            this.loading.dismiss();
                            this.presentToast('Ups! ocurrio un error, reintenta mas tarde');
                        });
                    }, (err) => {

                    });
                }
            }, {
                text: 'Galería',
                handler: data => {
                    this.camera.getPicture({
                        sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
                        destinationType: this.camera.DestinationType.FILE_URI,
                        quality: 75,
                        encodingType: this.camera.EncodingType.JPEG,
                        targetWidth: 500,
                        correctOrientation: true,
                    }).then((imageData) => {
                        this.showLoader('Actualizando avatar ...');
                        this.escortService.updateAvatar(imageData, localStorage.getItem('token')).then((response) => {
                            this.loading.dismiss();
                            this._imgProfile = 'https://infiniteescorts.com/api/v1/imagen/avatar/get?image=' + response['data'];
                        }, (err) => {
                            this.loading.dismiss();
                            this.presentToast('Ups! ocurrio un error, reintenta mas tarde');
                        });
                    }, (err) => {
                        this.presentToast('err:' + err);
                    });
                }
            }]
        });
        alert.present();
    }

    openWeb() {
        this.browserTab.isAvailable()
            .then((isAvailable: boolean) => {
                if (isAvailable) {
                    this.browserTab.openUrl('https://infiniteescorts.com/es/' + this.getPais() + '/' + this._nombre);
                } else {
                    this.iab.create('https://infiniteescorts.com/es/' + this.getPais() + '/' + this._nombre);
                }
            });
    }

    formatNosVisita(visita) {
        if (visita === null) {
            this.ifNosVisita = false;
        } else {
            var monthNames = [
                "Enero", "Febrero", "Marzo",
                "Abril", "Mayo", "Junio", "Julio",
                "Agosto", "Septiembre", "Octubre",
                "Noviembre", "Diciembre"
            ];
            var d = new Date(visita)
            var day = d.getDate();
            var monthIndex = d.getMonth();

            this.nos_visita = day + ' de ' + monthNames[monthIndex];
            this.ifNosVisita = d.getTime() > new Date().getTime() ? false : true;
        }
    }

    formatSuscripcion(suscripcion) {
        var monthNames = [
            "Enero", "Febrero", "Marzo",
            "Abril", "Mayo", "Junio", "Julio",
            "Agosto", "Septiembre", "Octubre",
            "Noviembre", "Diciembre"
        ];
        var d = new Date(suscripcion)
        var day = d.getDate();
        var monthIndex = d.getMonth();
        var year = d.getFullYear();

        this.suscripcion = day + ' de ' + monthNames[monthIndex] + ' del ' + year;
        this.ifOver = d.getTime() > new Date().getTime() ? false : true;
    }

    formatDestacadas(destacada) {
        var monthNames = [
            "Enero", "Febrero", "Marzo",
            "Abril", "Mayo", "Junio", "Julio",
            "Agosto", "Septiembre", "Octubre",
            "Noviembre", "Diciembre"
        ];
        var d = new Date(destacada)
        var day = d.getDate();
        var monthIndex = d.getMonth();
        var year = d.getFullYear();

        this.destacada = day + ' de ' + monthNames[monthIndex] + ' del ' + year;
        this.ifDestacada = d.getTime() > new Date().getTime() ? true : false;
    }

    getPais() {
        let pais = JSON.parse(localStorage.getItem('profile'));
        pais = pais['result']['pais'];

        switch (pais) {
            case 'Chile':
                pais = 'cl';
            default:
                pais = 'cl';
        }

        return pais;
    }

    counterVisit(start, end, duration) {
        var range = end - start;
        var minTimer = 50;
        var stepTime = Math.abs(Math.floor(duration / range));
        stepTime = Math.max(stepTime, minTimer);
        var startTime = new Date().getTime();
        var endTime = startTime + duration;
        var timer;

        timer = setInterval(() => {
            var that = this;
            var now = new Date().getTime();
            var remaining = Math.max((endTime - now) / duration, 0);
            var value = Math.round(end - (remaining * range));
            this._visit = value;
            if (value == end) {
                clearInterval(timer);
            }
        }, stepTime);
    }

    counterLike(start, end, duration) {
        var range = end - start;
        var minTimer = 50;
        var stepTime = Math.abs(Math.floor(duration / range));
        stepTime = Math.max(stepTime, minTimer);
        var startTime = new Date().getTime();
        var endTime = startTime + duration;
        var timer;

        timer = setInterval(() => {
            var that = this;
            var now = new Date().getTime();
            var remaining = Math.max((endTime - now) / duration, 0);
            var value = Math.round(end - (remaining * range));
            this._like = value;
            if (value == end) {
                clearInterval(timer);
            }
        }, stepTime);
    }

    showLoader(msg) {
        this.loading = this.loadingCtrl.create({
            content: msg
        });

        this.loading.present();
    }

    presentToast(msg, time = 3000) {
        let toast = this.toastCtrl.create({
            message: msg,
            duration: time,
            position: 'bottom',
            dismissOnPageChange: true
        });

        toast.present();
    }
}
