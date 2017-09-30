import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Events, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { Calendar } from '@ionic-native/calendar';
import { OneSignal } from '@ionic-native/onesignal';

import { AuthServiceProvider } from '../providers/auth-service/auth-service';

@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    @ViewChild(Nav) nav: Nav;

    rootPage: any;
    _nombre: any;
    _email: any;
    constructor(
        public platform: Platform,
        public statusBar: StatusBar,
        public event: Events,
        private _OneSignal: OneSignal,
        private calendar: Calendar,
        public alertCtrl: AlertController,
        public splashScreen: SplashScreen,
        public auth: AuthServiceProvider) {

        this.event.subscribe('loadSidebar', (data) => {
            this._nombre = data['result']['nombre'];
            this._email = data['result']['correo'];
        });

        this.initializeApp();
    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this._OneSignal.startInit('8bebe4b0-7066-43b2-8a76-01b0e1b9ffd1', 'AIzaSyBb3vlDUlj6H3oERL23yN9UO8qEep3QNxk');
            this._OneSignal.inFocusDisplaying(this._OneSignal.OSInFocusDisplayOption.Notification);
            this._OneSignal.setSubscription(true);
            this._OneSignal.handleNotificationOpened().subscribe((data) => {
                this.nav.setRoot('ViewMessagePage', {id: data['notification']['payload']['additionalData']['id']});
            });
            this._OneSignal.endInit();
        });

        this.auth.isLogged().then((isLogged) => {
            if (isLogged) {
                this.rootPage = HomePage;
            } else {
                this.rootPage = LoginPage;
            }
        });
    }

    goToPage(page) {
        switch (page) {
            case 'home':
                //this.nav.push(HomePage);
                break;
            case 'gallery':
                this.nav.push('GalleryPage');
                break;
            case 'service':
                this.nav.push('ServicePage');
                break;
            case 'message':
                this.nav.push('MessagePage');
                break;
            case 'contact':
                this.nav.push('ContactPage');
                break;
            case 'terminos':
                this.nav.push('TerminosPage');
                break;
            case 'likes':
                this.nav.push('LikesPage');
                break;
            case 'calendar':
                this.openCalendar();
                break;
            default:
                break;
        }
    }

    openCalendar(){
        this.calendar.openCalendar(new Date()).then(
            (msg) => { console.log(msg); },
            (err) => { console.log(err); }
        );
    }

    closeSession() {
        let alert = this.alertCtrl.create({
            title: 'Alerta!',
            enableBackdropDismiss: false,
            subTitle: 'Estas segura que deseas cerrar la sesión?',
            buttons: [{
                text: 'Cancelar',
                handler: () => { }
            }, {
                text: 'Aceptar',
                handler: () => {
                    localStorage.removeItem('token');
                    localStorage.removeItem('profile');
                    localStorage.clear();
                    this.rootPage = LoginPage;
                }
            }]
        });
        alert.present();
    }


}
