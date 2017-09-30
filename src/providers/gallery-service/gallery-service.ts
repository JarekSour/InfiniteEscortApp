import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { File, FileEntry } from '@ionic-native/file';
import 'rxjs/add/operator/map';

@Injectable()
export class GalleryServiceProvider {

    constructor(public http: Http, private file: File) { }

    getGallery(json) {
        return new Promise((resolve, reject) => {
            let headers = new Headers();
            headers.append('Content-Type', 'application/json');

            this.http.post('https://infiniteescorts.com/api/v1/imagen/galeria/list', JSON.stringify(json), { headers: headers })
                .subscribe(res => {
                    resolve(res.json());
                }, (err) => {
                    reject(err);
                });
        });
    }

    deleteImagen(json) {
        return new Promise((resolve, reject) => {
            let headers = new Headers();
            headers.append('Content-Type', 'application/json');

            this.http.post('https://infiniteescorts.com/api/v1/imagen/galeria/delete', JSON.stringify(json), { headers: headers })
                .subscribe(res => {
                    resolve(res.json());
                }, (err) => {
                    reject(err);
                });
        });
    }

    uploadPhoto(file, token) {
        return new Promise((resolve, reject) => {
            this.file.resolveLocalFilesystemUrl(file)
                .then(entry => (<FileEntry>entry).file(file => {

                    const reader = new FileReader();
                    reader.onloadend = () => {
                        const formData = new FormData();
                        const imgBlob = new Blob([reader.result], { type: file.type });
                        formData.append('image', imgBlob, file.name);
                        formData.append('token', token);

                        this.http.post("https://infiniteescorts.com/api/v1/imagen/galeria/add", formData)
                            .subscribe(res => {
                                resolve(res.json());
                            }, (err) => {
                                reject(err);
                            });
                    };
                    reader.readAsArrayBuffer(file);
                }))
                .catch(err => resolve(err));
        });
    }

}
