import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { File, FileEntry } from '@ionic-native/file';
import "rxjs/add/operator/catch";
import 'rxjs/add/observable/throw';

@Injectable()
export class EscortServiceProvider {

    constructor(public http: Http, private file: File) { }

    getdataEscort(token) {
        return new Promise((resolve, reject) => {
            let headers = new Headers();
            headers.append('Content-Type', 'application/json');

            this.http.post('https://infiniteescorts.com/api/v1/auth', JSON.stringify(token), { headers: headers })
                .subscribe(res => {
                    resolve(res.json());
                }, (err) => {
                    reject(err);
                });
        });
    }

    updateAvatar(file, token) {
        return new Promise((resolve, reject) => {
            this.file.resolveLocalFilesystemUrl(file)
                .then(entry => (<FileEntry>entry).file(file => {

                    const reader = new FileReader();
                    reader.onloadend = () => {
                        const formData = new FormData();
                        const imgBlob = new Blob([reader.result], { type: file.type });
                        formData.append('image', imgBlob, file.name);
                        formData.append('token', token);

                        this.http.post("https://infiniteescorts.com/api/v1/imagen/avatar/update", formData)
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

    updateContactEscort(data) {
        return new Promise((resolve, reject) => {
            let headers = new Headers();
            headers.append('Content-Type', 'application/json');

            this.http.post('https://infiniteescorts.com/api/v1/escort/contacto/update', JSON.stringify(data), { headers: headers })
                .subscribe(res => {
                    resolve(res.json());
                }, (err) => {
                    reject(err);
                });
        });
    }

    updatePerfilEscort(data) {
        return new Promise((resolve, reject) => {
            let headers = new Headers();
            headers.append('Content-Type', 'application/json');

            this.http.post('https://infiniteescorts.com/api/v1/escort/perfil/update', JSON.stringify(data), { headers: headers })
                .subscribe(res => {
                    resolve(res.json());
                }, (err) => {
                    reject(err);
                });
        });
    }

    updateCostosEscort(data) {
        return new Promise((resolve, reject) => {
            let headers = new Headers();
            headers.append('Content-Type', 'application/json');

            this.http.post('https://infiniteescorts.com/api/v1/escort/cobros/update', JSON.stringify(data), { headers: headers })
                .subscribe(res => {
                    resolve(res.json());
                }, (err) => {
                    reject(err);
                });
        });
    }

    newEstado(data) {
        return new Promise((resolve, reject) => {
            let headers = new Headers();
            headers.append('Content-Type', 'application/json');

            this.http.post('https://infiniteescorts.com/api/v1/escort/estado/new', JSON.stringify(data), { headers: headers })
                .subscribe(res => {
                    resolve(res.json());
                }, (err) => {
                    reject(err);
                });
        });
    }

    getLikes(token) {
        return new Promise((resolve, reject) => {
            let headers = new Headers();
            headers.append('Content-Type', 'application/json');

            this.http.post('https://infiniteescorts.com/api/v1/escort/like/get', JSON.stringify(token), { headers: headers })
                .subscribe(res => {
                    resolve(res.json());
                }, (err) => {
                    reject(err);
                });
        });
    }

    getlistLikes(token) {
        return new Promise((resolve, reject) => {
            let headers = new Headers();
            headers.append('Content-Type', 'application/json');

            this.http.post('https://infiniteescorts.com/api/v1/like/list', JSON.stringify(token), { headers: headers })
                .subscribe(res => {
                    resolve(res.json());
                }, (err) => {
                    reject(err);
                });
        });
    }

}
