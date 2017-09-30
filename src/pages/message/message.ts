import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, AlertController, Events } from 'ionic-angular';
import { MessageServiceProvider } from '../../providers/message-service/message-service';

@IonicPage()
@Component({
	selector: 'page-message',
	templateUrl: 'message.html',
})
export class MessagePage {
	mensajes: any;
	loading: any;

	constructor(
		public loadingCtrl: LoadingController,
		private toastCtrl: ToastController,
		public alertCtrl: AlertController,
		public messageService: MessageServiceProvider,
		public event: Events,
		public navCtrl: NavController,
		public navParams: NavParams) {

		this.event.subscribe('updateMensajes', (id) => {
			this.mensajes = this.mensajes.filter(item => item.id !== id);
		});
	}

	ionViewDidLoad() {
		this.showLoader('Cargando mensajes...');
		this.messageService.getMessages({ token: localStorage.getItem('token') }).then((response) => {
			if (response['status'] == true) {
				this.mensajes = response['mensajes'];
				this.loading.dismiss();
			} else {
				this.loading.dismiss();
				this.presentToast('Ups! ocurrio un error, reintenta mas tarde');
			}
		});
	}

	showMensaje(msg) {
		this.navCtrl.push('ViewMessagePage', { id: msg['id'], status: true });
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

	formatDate(date) {
		var monthNames = [
			"Enero", "Febrero", "Marzo",
			"Abril", "Mayo", "Junio", "Julio",
			"Agosto", "Septiembre", "Octubre",
			"Noviembre", "Diciembre"
		];
		var d = new Date(date)

		var hour = d.getHours() < 10 ? '0' + d.getHours() : d.getHours();
		var minute = d.getMinutes();
		var day = d.getDate();
		var monthIndex = d.getMonth();
		var year = d.getFullYear();

		return hour + ':' + minute + ' el ' + day + ' de ' + monthNames[monthIndex] + ', ' + year;
	}

}
