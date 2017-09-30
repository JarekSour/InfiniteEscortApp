import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, ToastController } from 'ionic-angular';
import { GalleryServiceProvider } from '../../providers/gallery-service/gallery-service';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { Camera, CameraOptions } from '@ionic-native/camera';

@IonicPage()
@Component({
    selector: 'page-gallery',
    templateUrl: 'gallery.html',
})
export class GalleryPage {
    loading: any;
    imagenes: any;

    constructor(
        public galleryService: GalleryServiceProvider,
        public camera: Camera,
        private photoViewer: PhotoViewer,
        public navCtrl: NavController,
        public alertCtrl: AlertController,
        public toastCtrl: ToastController,
        public loadingCtrl: LoadingController,
        public navParams: NavParams) {

    }

    ionViewDidLoad() {
        this.showLoader('Cargando imagenes...');
        this.galleryService.getGallery({ token: localStorage.getItem('token') }).then((res) => {
            if (res['status'] == true) {
                this.imagenes = res['photos'];
                this.loading.dismiss();
            } else {
                this.loading.dismiss();
                this.presentToast('Ups! ocurrio un error, reintenta mas tarde');
            }
        });
    }

    zoom(image) {
        this.photoViewer.show('https://www.infiniteescorts.com/api/v1/imagen/galeria/get?image=' + image.url);
    }

    deleteImagen(imagen) {

        let alert = this.alertCtrl.create({
            title: 'Atencion!',
            subTitle: '¿Estas segura que deseas eliminar la imagen?',
            buttons: [{
                text: 'Cancelar',
                handler: () => { }
            },
            {
                text: 'Aceptar',
                handler: () => {
                    this.showLoader('Eliminando imagen...');
                    this.galleryService.deleteImagen({ token: localStorage.getItem('token'), id: imagen['id'], url: imagen['url'] }).then((res) => {
                        this.imagenes = this.imagenes.filter(item => item.id !== imagen['id']);
                        this.loading.dismiss();
                        this.presentToast('la imagen fue eliminada ...');
                    });
                }
            }]
        });
        alert.present();
    }

    UploadImagen() {
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
                        this.showLoader('Subiendo imagen a galeria ...');
                        this.galleryService.uploadPhoto(imageData, localStorage.getItem('token')).then((res) => {
                            this.imagenes.push({ "id": res['id'], "url": res['data'] });
                            this.loading.dismiss();
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
                        this.showLoader('Subiendo imagen a galeria ...');
                        this.galleryService.uploadPhoto(imageData, localStorage.getItem('token')).then((res) => {
                            this.imagenes.push({ "id": res['id'], "url": res['data'] });
                            this.loading.dismiss();
                        }, (err) => {
                            this.loading.dismiss();
                            this.presentToast('Ups! ocurrio un error, reintenta mas tarde');
                        });
                    }, (err) => {

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

}
