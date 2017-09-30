import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, MenuController, ToastController, LoadingController, AlertController } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { HomePage } from '../home/home';
import { OneSignal } from '@ionic-native/onesignal';

@IonicPage()
@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
})
export class LoginPage {

    loading: any;
    loginData = { correo: '', password: '', id: '' };

    constructor(
        public authService: AuthServiceProvider,
        public platform: Platform,
        public loadingCtrl: LoadingController,
        public toastCtrl: ToastController,
        private _OneSignal: OneSignal,
        public splashScreen: SplashScreen,
        public alertCtrl: AlertController,
        public menuCtrl: MenuController,
        public navCtrl: NavController,
        public navParams: NavParams) {

        this.platform.ready().then(() => {
            setTimeout(() => {
                this.splashScreen.hide();
            }, 100)
        })
    }

    ionViewDidLoad() {
        this.menuCtrl.enable(false, 'menuSlide');
    }

    doLogin() {
        this.showLoader('Verificando datos...');
        this._OneSignal.getIds().then((ids) => {
            this.loginData.id = ids['userId'];
            this.authService.login(this.loginData).then((result) => {
                if (result['status'] == true) {
                    localStorage.setItem('token', result['token']);
                    this.loading.dismiss();
                    this.navCtrl.setRoot(HomePage);
                } else {
                    if (result['data'] == 'invalid_email_or_password') {
                        this.loading.dismiss();
                        this.presentToast('Correo electrónico o contraseña incorrecta');
                    } else {
                        this.loading.dismiss();
                        this.presentToast('Ups! ocurrio un error');
                    }
                }
            }, (err) => {
                this.loading.dismiss();
                this.presentToast('Verifica tu conexión a internet');
            });
        });
    }

    recoverPass() {

        let prompt = this.alertCtrl.create({
            title: 'Recuperar contraseña',
            message: "Ingresa tu correo electrónico",
            inputs: [
                {
                    name: 'email',
                    placeholder: 'correo electrónico'
                },
            ],
            buttons: [
                {
                    text: 'Cancelar',
                    handler: data => {
                    }
                },
                {
                    text: 'Aceptar',
                    handler: data => {
                        this.showLoader('Cargando ...');
                        this.authService.recoverPass({ email: data.email }).then((res) => {
                            this.presentToast('Pronto recibiras un email con las instrucciones para que recuperes tu contraseña.', 6000);
                            this.loading.dismiss();
                        });
                    }
                }
            ]
        });
        prompt.present();

    }

    showLoader(msg) {
        this.loading = this.loadingCtrl.create({
            content: msg
        });

        this.loading.present();
    }

    presentToast(msg, ms = 3000) {
        let toast = this.toastCtrl.create({
            message: msg,
            duration: ms,
            position: 'bottom',
            dismissOnPageChange: true
        });

        toast.present();
    }
}
