import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class AuthServiceProvider {

    constructor(public http: Http) { }

    isLogged() {
        return new Promise((resolve) => {
            if (!localStorage.getItem("token"))
                resolve(false);
            else
                resolve(true);
        });
    }

    login(credentials) {
        return new Promise((resolve, reject) => {
            let headers = new Headers();
            headers.append('Content-Type', 'application/json');

            this.http.post('https://infiniteescorts.com/api/v1/login', JSON.stringify(credentials), { headers: headers })
                .subscribe(res => {
                    resolve(res.json());
                }, (err) => {
                    reject(err);
                });
        });
    }

    recoverPass(json){
        return new Promise((resolve, reject) => {
            let headers = new Headers();
            headers.append('Content-Type', 'application/json');

            this.http.post('https://infiniteescorts.com/api/v1/recover', JSON.stringify(json), { headers: headers })
                .subscribe(res => {
                    resolve(res.json());
                }, (err) => {
                    reject(err);
                });
        });
    }
    
}
