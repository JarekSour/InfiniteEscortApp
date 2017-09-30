import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';

import { File } from '@ionic-native/file';
import { Camera } from '@ionic-native/camera';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { BrowserTab } from '@ionic-native/browser-tab';
import { FileTransfer } from '@ionic-native/file-transfer';
import { SocialSharing } from '@ionic-native/social-sharing';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { Calendar } from '@ionic-native/calendar';
import { OneSignal } from '@ionic-native/onesignal';

import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { EscortServiceProvider } from '../providers/escort-service/escort-service';
import { ServiceServiceProvider } from '../providers/service-service/service-service';
import { GalleryServiceProvider } from '../providers/gallery-service/gallery-service';
import { MessageServiceProvider } from '../providers/message-service/message-service';

@NgModule({
    declarations: [
        MyApp,
        HomePage,
        LoginPage
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(MyApp),
        HttpModule,
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        HomePage,
        LoginPage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        Camera,
        File,
        { provide: ErrorHandler, useClass: IonicErrorHandler },
        AuthServiceProvider,
        EscortServiceProvider,
        InAppBrowser,
        BrowserTab,
        FileTransfer,
        SocialSharing,
        ServiceServiceProvider,
        GalleryServiceProvider,
        PhotoViewer,
        MessageServiceProvider,
        Calendar,
        OneSignal
    ]
})
export class AppModule { }
