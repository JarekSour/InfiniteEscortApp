import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Events } from 'ionic-angular';

@IonicPage()
@Component({
    selector: 'page-contact',
    templateUrl: 'contact.html',
})
export class ContactPage {
    telefono: any;
    sector: any;
    donde: any;
    horario: any;

    constructor(public navCtrl: NavController, 
        public modalCtrl: ModalController,
        public event: Events,
        public navParams: NavParams) {

            this.event.subscribe('updateContact', () => {
                this.event.publish('updateHome');
                this.ionViewDidLoad();
            });
    }

    ionViewDidLoad() {
        let profile = JSON.parse(localStorage.getItem('profile'));
        this.telefono = profile["result"]["telefono"];
        this.sector = profile["result"]["pais"] + ', ' + profile["result"]["comuna"] + ', ' + profile["result"]["zona"];
        this.donde = this.getAtencion(profile["result"]["atencion"]);
        this.horario = this.gethorario(profile["result"]["horario"]);
    }

    updateDato(dato){
        let modal = this.modalCtrl.create('UpdateContactPage', { tipo: dato });
        modal.present();
    }

    getAtencion(atencion) {
        let arr = atencion.split(',')
        let aux = '';
        for (let aten of arr) {
            switch (aten.trim()) {
                case 'hotel': aux += 'Hotel, ';break;
                case 'departamento': aux += 'Departamento propio, ';break;
                case 'ciber': aux += 'Ciber Sexo, ';break;
                case 'telefono': aux += 'Telefónico, ';break;
                case 'motel': aux += 'Motel, ';break;
                case 'domicilio': aux += 'Domicilio, ';break;
                default:break;
            }
        }
        return aux.substring(0, aux.trim().length-1);
    }

    gethorario(horario) {
        switch (horario) {
            case 'full_time': horario = 'Full time';break;
            case 'laboral': horario = 'Laboral';break;
            case 'laboral': horario = 'Freelance';break;
            default:break;
        }

        return horario;

    }

}
