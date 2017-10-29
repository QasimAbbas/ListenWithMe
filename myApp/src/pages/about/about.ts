import { Component, OnInit } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { InAppBrowser, InAppBrowserOptions} from "@ionic-native/in-app-browser";

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage implements OnInit{
  options : InAppBrowserOptions = {
    location : 'yes',//Or 'no'
    hidden : 'no', //Or  'yes'
    clearcache : 'yes',
    clearsessioncache : 'yes',
    zoom : 'yes',//Android only ,shows browser zoom controls
    hardwareback : 'yes',
    mediaPlaybackRequiresUserAction : 'no',
    shouldPauseOnSuspend : 'no', //Android only
    closebuttoncaption : 'Close', //iOS only
    disallowoverscroll : 'no', //iOS only
    toolbar : 'yes', //iOS only
    enableViewportScale : 'no', //iOS only
    allowInlineMediaPlayback : 'no',//iOS only
    presentationstyle : 'pagesheet',//iOS only
    fullscreen : 'yes',//Windows only
};

  constructor(private theInAppBrowser: InAppBrowser) {
  }

  ngOnInit(){
      const browser = this.theInAppBrowser.create('http://ec2-54-146-188-183.compute-1.amazonaws.com/sync/','_blank',{location:'no'});
  }

  openWithSystemBrowser(url : string){
    this.theInAppBrowser.create(url,"_system",this.options);

  }
  openWithInAppBrowser(url : string){
    this.theInAppBrowser.create(url,"_blank",this.options);

  }
  openWithCordovaBrowser(url : string){
    this.theInAppBrowser.create(url,"_self",this.options);

  }
}
