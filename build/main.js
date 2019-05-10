webpackJsonp([0],{

/***/ 113:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 113;

/***/ }),

/***/ 155:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 155;

/***/ }),

/***/ 198:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_http__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_onesignal__ = __webpack_require__(199);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__startstop_startstop__ = __webpack_require__(200);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__upcoming_upcoming__ = __webpack_require__(202);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var HomePage = /** @class */ (function () {
    function HomePage(navCtrl, loadingCtrl, http, nhttp, oneSignal) {
        this.navCtrl = navCtrl;
        this.loadingCtrl = loadingCtrl;
        this.http = http;
        this.nhttp = nhttp;
        this.oneSignal = oneSignal;
        this.error = '';
        this.p = [];
        this.mode = 0;
        this.myname = '';
        this.started = 0;
        this.txt = '';
        this.upto = 0;
        this.tick = './assets/img/tick.png';
        this.ad1 = 'http://jaydenkur.com.au/giovenco/server/ad1.png?rnd=' + Math.random();
        this.ad2 = 'http://jaydenkur.com.au/giovenco/server/ad2.png?rnd=' + Math.random();
        this.blank = './assets/img/blank.png';
        this.p = { email: '', pass: '', empcode: '', timezn: '', locn: 'Unknown', lat: '', lng: '', me: 0, job: 0 };
        this.messages = [];
        this.upto = 0;
    }
    HomePage.prototype.getpushinfo = function () {
        var _this = this;
        this.oneSignal.startInit('07718501-db1c-4b51-ade6-85b3155bab32', '126894144681');
        this.oneSignal.handleNotificationReceived().subscribe(function () {
            _this.pinme();
        });
        this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);
        this.oneSignal.endInit();
        var i = this.oneSignal.getIds();
        i.then(function (data) {
            var w = window.localStorage.getItem('me');
            window.localStorage.setItem('pushid', data.userId);
            _this.http.get('http://jaydenkur.com.au/giovenco/server/pushtoken.php?me=' + w + '&pushid=' + data.userId).subscribe(function (data2) {
            });
        });
    };
    HomePage.prototype.ionViewDidEnter = function () {
        var that = this;
        var me = window.localStorage.getItem('me');
        if (!me)
            me = '';
        if (me) {
            this.mode = 1;
            this.myname = window.localStorage.getItem('myname');
            this.getpushinfo();
            this.pinme();
            that.timer = setInterval(function () {
                that.pinme();
            }, 7000);
        }
        else
            this.mode = 0;
    };
    HomePage.prototype.checkeml = function () {
        var _this = this;
        this.error = '';
        var that = this;
        this.http.get('http://jaydenkur.com.au/giovenco/server/checkeml.php?eml=' + this.p.email + '&pwd=' + this.p.pass).subscribe(function (data) {
            var s = JSON.stringify(data);
            var d = JSON.parse(s);
            if (d.num) {
                window.localStorage.setItem('myname', d.myname);
                window.localStorage.setItem('me', d.num);
                _this.mode = 1;
                _this.myname = d.myname;
                that.getpushinfo();
                that.pinme();
            }
            else {
                _this.error = 'Incorrect - Please Try Again';
            }
        });
    };
    HomePage.prototype.pinme = function () {
        var that = this;
        var url = 'http://jaydenkur.com.au/giovenco/server/mystate.php?me=' + window.localStorage.getItem('me') + '&upto=' + that.upto + '&rnd=' + Math.random();
        //   console.log(url);
        this.http.get(url).subscribe(function (data) {
            var s = JSON.stringify(data);
            //   console.log(s);
            var d = JSON.parse(s);
            if (d.upto > that.upto) {
                that.messages = d.messages;
                that.upto = d.upto;
                that.ad2 = d.ad2;
            }
        });
    };
    HomePage.prototype.sendtxt = function () {
        var that = this;
        this.http.get('http://jaydenkur.com.au/giovenco/server/mystate.php?me=' + window.localStorage.getItem('me') + '&txt=' + encodeURIComponent(this.txt) + '&rnd=' + Math.random()).subscribe(function (data) {
            var s = JSON.stringify(data);
            var d = JSON.parse(s);
            that.messages = d.messages;
            that.txt = '';
        });
    };
    HomePage.prototype.startstop = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__startstop_startstop__["a" /* StartstopPage */]);
    };
    HomePage.prototype.shifts = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__upcoming_upcoming__["a" /* UpcomingPage */]);
    };
    HomePage.prototype.logout = function () {
        window.localStorage.removeItem('me');
        window.localStorage.setItem('myname', '');
        this.mode = 0;
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"/var/www/html/ionic/giovenco/src/pages/home/home.html"*/'<ion-header style="background-color:white; border-bottom:1px solid black">\n<ion-navbar align-title="center"  style="background-color:white">\n		<ion-title style="background-color:white"><img src="./assets/img/mainbanner.png"></ion-title>\n	</ion-navbar>\n\n<ion-grid no-padding *ngIf="mode>0">\n<ion-row text-center>\n <ion-col col-4 (click)="startstop()">\n <ion-icon name="time"> </ion-icon>\n </ion-col>\n <ion-col col-4 (click)="shifts()">\n <ion-icon name="calendar"> </ion-icon>\n </ion-col>\n\n <ion-col col-4 (click)="logout()" >\n <ion-icon name="undo"> </ion-icon>\n </ion-col>\n</ion-row>\n<ion-row text-center style="min-height:30px !important">\n\n <ion-col col-4 (click)="startstop()">\n Start/Stop Shift\n </ion-col>\n\n <ion-col col-4 (click)="shifts()">\n Upcoming Shifts\n </ion-col>\n\n <ion-col col-4 (click)="logout()" >\n Log Out\n </ion-col>\n\n</ion-row>\n\n</ion-grid>\n\n</ion-header>\n\n<ion-content padding>\n<div *ngIf="mode==0">\n<p>Welcome!</p>\n\n<ion-list>\n						<ion-item>\n							<ion-label color="primary" floating>Email Address</ion-label>\n							<ion-input type="email" [(ngModel)]="p.email" name="email"  required></ion-input>\n						</ion-item>\n						<ion-item>\n							<ion-label color="primary" floating>Password</ion-label>\n							<ion-input type="password" [(ngModel)]="p.pass" name="pass"  required></ion-input>\n						</ion-item>\n						<ion-item>\n							<ion-label color="primary" floating>Employer Code</ion-label>\n							<ion-input type="text" [(ngModel)]="p.empcode" name="empcode"  required></ion-input>\n						</ion-item>\n					</ion-list>\n			<ion-row>\n<ion-col col-1>\n</ion-col>\n				<ion-col col-10>\n					<button ion-button full (click)="checkeml()">Log In</button>\n				</ion-col>\n<ion-col col-1>\n</ion-col>\n			</ion-row>\n			<ion-row>\n				<ion-col padding class="error" *ngIf="error">\n					<p>{{error}}</p>\n				</ion-col>\n			</ion-row>\n<ion-row>\n<ion-col col-12>\n<img [src]="ad1" class="img-responsive">\n</ion-col>\n</ion-row>\n\n</div>\n<div *ngIf="mode==1" style="margin-top:40px">\n<ion-list no-lines no-padding>\n<ion-item *ngFor="let m of messages" text-wrap>\n<ion-row *ngIf="m.out==1" text-wrap>\n<ion-col col-6 style="border:1px solid black">\n<p>{{ m.msg }}</p>\n</ion-col>\n<ion-col col-6>\n</ion-col>\n</ion-row>\n\n<ion-row *ngIf="m.out==0" text-wrap>\n<ion-col col-6>\n</ion-col>\n<ion-col col-6 style="background-color:#E0FFE0; color:black; border:1px solid black">\n<p>{{ m.msg }}</p>\n</ion-col>\n</ion-row>\n</ion-item>\n</ion-list>\n</div>\n</ion-content>\n<ion-footer *ngIf="mode>0" style="background-color:gainsboro">\n<ion-row>\n<ion-col col-10>\n<input type="text" [(ngModel)]="txt" class="ntry">\n</ion-col>\n<ion-col col-2>\n<button ion-button small full (click)="sendtxt()">Send</button>\n</ion-col>\n</ion-row>\n<ion-row style="background-color:white">\n<ion-col col-12>\n<img [src]="ad2" class="img-responsive">\n</ion-col>\n</ion-row>\n</ion-footer>'/*ion-inline-end:"/var/www/html/ionic/giovenco/src/pages/home/home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_http__["a" /* HTTP */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_onesignal__["a" /* OneSignal */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 200:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StartstopPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_geolocation__ = __webpack_require__(201);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common_http__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_http__ = __webpack_require__(101);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var StartstopPage = /** @class */ (function () {
    function StartstopPage(navCtrl, loadingCtrl, geolocation, http, nhttp) {
        this.navCtrl = navCtrl;
        this.loadingCtrl = loadingCtrl;
        this.geolocation = geolocation;
        this.http = http;
        this.nhttp = nhttp;
        this.error = '';
        this.p = [];
        this.myname = '';
        this.started = 0;
        this.tick = './assets/img/tick.png';
        this.blank = './assets/img/blank.png';
        this.p = { email: '', pass: '', empcode: '', timezn: '', locn: 'Unknown', lat: '', lng: '', me: 0, job: 0 };
        this.options = [];
    }
    StartstopPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        var me = window.localStorage.getItem('me');
        this.myname = window.localStorage.getItem('myname');
        var that = this;
        var d = new Date();
        var pp = d.toString();
        var a = pp.indexOf('GMT');
        this.p.timezn = pp.substr(a);
        this.p.me = window.localStorage.getItem('me');
        this.geolocation.getCurrentPosition().then(function (resp) {
            that.p.lat = resp.coords.latitude;
            that.p.lng = resp.coords.longitude;
            _this.http.get('http://jaydenkur.com.au/giovenco/server/checklocn.php?me=' + window.localStorage.getItem('me') + '&lat=' + that.p.lat + '&lng=' + that.p.lng).subscribe(function (data) {
                var s = JSON.stringify(data);
                var d = JSON.parse(s);
                that.p.locn = d.locn;
                that.started = d.started;
                that.options = d.options;
                that.p.job = d.job;
            });
        }).catch(function (error) {
            that.p.lat = 0;
            that.p.lng = 0;
            _this.http.get('http://jaydenkur.com.au/giovenco/server/checklocn.php?me=' + window.localStorage.getItem('me') + '&noloc=1').subscribe(function (data) {
                var s = JSON.stringify(data);
                var d = JSON.parse(s);
                that.p.locn = d.locn;
                that.started = d.started;
                that.options = d.options;
                that.p.job = d.job;
            });
        });
    };
    StartstopPage.prototype.chooseOption = function (a) {
        this.p.job = a;
        for (var i = 0; i < this.options.length; i++) {
            if (this.options[i].id == a)
                this.options[i].selected = 1;
            else
                this.options[i].selected = 0;
        }
    };
    StartstopPage.prototype.startShift = function () {
        var that = this;
        var loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        var url = 'http://jaydenkur.com.au/giovenco/server/startshift.php';
        this.nhttp.post(url, that.p, {})
            .then(function (data) {
            loading.dismiss();
            that.started = 1;
            that.navCtrl.pop();
        })
            .catch(function (error) {
            loading.dismiss();
            alert(JSON.stringify(error));
        });
    };
    StartstopPage.prototype.endShift = function () {
        var that = this;
        var loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        var url = 'http://jaydenkur.com.au/giovenco/server/endshift.php';
        this.nhttp.post(url, that.p, {})
            .then(function (data) {
            loading.dismiss();
            that.started = 0;
            that.navCtrl.pop();
        })
            .catch(function (error) {
            loading.dismiss();
            alert(JSON.stringify(error));
        });
    };
    StartstopPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-startstop',template:/*ion-inline-start:"/var/www/html/ionic/giovenco/src/pages/startstop/startstop.html"*/'<ion-header style="background-color:white">\n<ion-navbar align-title="center"  style="background-color:white">\n		<ion-title style="background-color:white"><img src="./assets/img/mainbanner.png"></ion-title>\n	</ion-navbar>\n</ion-header>\n\n<ion-content padding>\n<ion-list>\n						<ion-item>\n							<ion-label color="primary" floating>Your Name</ion-label>\n							<ion-input type="text" [(ngModel)]="myname" name="myname"  readonly></ion-input>\n						</ion-item>\n						<ion-item>\n							<ion-label color="primary" floating>Current Location</ion-label>\n							<ion-input type="text" [(ngModel)]="p.locn" name="locn"  readonly></ion-input>\n						</ion-item>\n	<ion-item>\n							<ion-label color="primary" floating>TimeZone</ion-label>\n							<ion-input type="text" [(ngModel)]="p.timezn" name="timezn" readonly></ion-input>\n						</ion-item>\n       </ion-list>\n<ion-list >\n<ion-item *ngFor="let o of options" text-wrap>\n<ion-row (click)="chooseOption(o.id)" text-wrap>\n<ion-col col-2 >\n<img [src]="o.selected ? tick : blank" >\n</ion-col>\n\n<ion-col col-10>\n<p><b>{{ o.client }}</b></p>\n<p>{{ o.address }}</p>\n<p>{{ o.times }}</p>\n</ion-col>\n</ion-row>\n</ion-item>\n\n					</ion-list>\n			<ion-row *ngIf="started==0">\n<ion-col col-1>\n</ion-col>\n				<ion-col col-10>\n					<button ion-button full color="secondary" (click)="startShift()">Start Shift</button>\n				</ion-col>\n<ion-col col-1>\n</ion-col>\n			</ion-row>\n\n			<ion-row *ngIf="started==1">\n<ion-col col-1>\n</ion-col>\n				<ion-col col-10>\n					<p>Shift in Progress</p>\n				</ion-col>\n<ion-col col-1>\n</ion-col>\n			</ion-row>\n\n\n			<ion-row *ngIf="started==1">\n<ion-col col-1>\n</ion-col>\n				<ion-col col-10>\n					<button ion-button full color="secondary" (click)="endShift()">End Shift</button>\n				</ion-col>\n<ion-col col-1>\n</ion-col>\n			</ion-row>\n\n</ion-content>\n'/*ion-inline-end:"/var/www/html/ionic/giovenco/src/pages/startstop/startstop.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_geolocation__["a" /* Geolocation */], __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_http__["a" /* HTTP */]])
    ], StartstopPage);
    return StartstopPage;
}());

//# sourceMappingURL=startstop.js.map

/***/ }),

/***/ 202:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UpcomingPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__(51);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var UpcomingPage = /** @class */ (function () {
    function UpcomingPage(navCtrl, navParams, http, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.loadingCtrl = loadingCtrl;
        this.shifts = [];
        this.shifts = [];
    }
    UpcomingPage.prototype.ionViewDidLoad = function () {
        var that = this;
        this.http.get('http://jaydenkur.com.au/giovenco/server/myshifts.php?me=' + window.localStorage.getItem('me') + '&rnd=' + Math.random()).subscribe(function (data) {
            var s = JSON.stringify(data);
            var d = JSON.parse(s);
            that.shifts = d.shifts;
        });
    };
    UpcomingPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-upcoming',template:/*ion-inline-start:"/var/www/html/ionic/giovenco/src/pages/upcoming/upcoming.html"*/'<ion-header style="background-color:white">\n<ion-navbar align-title="center"  style="background-color:white">\n		<ion-title style="background-color:white"><img src="./assets/img/mainbanner.png"></ion-title>\n	</ion-navbar>\n</ion-header>\n\n<ion-content padding>\n<p>Upcoming Shifts</p>\n<ion-list>\n<ion-item *ngFor="let s of shifts" text-wrap>\n    <p style="color:purple">{{ s.nicedate }} </p>\n    <p>{{ s.client }}</p>\n    <p>{{ s.address }}</p>\n    <p>{{ s.times }}</p>\n  </ion-item>\n </ion-list>\n</ion-content>\n\n'/*ion-inline-end:"/var/www/html/ionic/giovenco/src/pages/upcoming/upcoming.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* LoadingController */]])
    ], UpcomingPage);
    return UpcomingPage;
}());

//# sourceMappingURL=upcoming.js.map

/***/ }),

/***/ 203:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(204);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(224);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 224:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(195);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(197);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_component__ = __webpack_require__(273);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_home_home__ = __webpack_require__(198);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_startstop_startstop__ = __webpack_require__(200);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_upcoming_upcoming__ = __webpack_require__(202);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_geolocation__ = __webpack_require__(201);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__angular_common_http__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_native_onesignal__ = __webpack_require__(199);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ionic_native_http__ = __webpack_require__(101);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};













var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_startstop_startstop__["a" /* StartstopPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_upcoming_upcoming__["a" /* UpcomingPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_10__angular_common_http__["b" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */], {}, {
                    links: []
                })
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_startstop_startstop__["a" /* StartstopPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_upcoming_upcoming__["a" /* UpcomingPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
                __WEBPACK_IMPORTED_MODULE_9__ionic_native_geolocation__["a" /* Geolocation */],
                __WEBPACK_IMPORTED_MODULE_11__ionic_native_onesignal__["a" /* OneSignal */],
                __WEBPACK_IMPORTED_MODULE_12__ionic_native_http__["a" /* HTTP */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicErrorHandler */] }
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 273:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(197);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(195);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(198);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen) {
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */];
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/var/www/html/ionic/giovenco/src/app/app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n'/*ion-inline-end:"/var/www/html/ionic/giovenco/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ })

},[203]);
//# sourceMappingURL=main.js.map