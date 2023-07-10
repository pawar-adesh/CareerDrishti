import { Injectable } from '@angular/core';
import { CanActivate, Router, CanDeactivate } from '@angular/router';
import { TestComponent } from './test.component';
import { Observable } from 'rxjs';

export interface CanComponentDeactivate {
  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

@Injectable()
export class TestGuard implements CanActivate, CanDeactivate<CanComponentDeactivate>{
  constructor(private router: Router) {}

  canActivate(): boolean {
    const element = document.documentElement as HTMLElement;

    const enterFullScreen = () => {
      if (element.requestFullscreen) {
        element.requestFullscreen();
      // } else if (element['mozRequestFullScreen']) {
      //   element['mozRequestFullScreen']();
      // } else if (element['webkitRequestFullscreen']) {
      //   element['webkitRequestFullscreen']();
      // } else if (element['msRequestFullscreen']) {
      //   element['msRequestFullscreen']();
      }
    };

    const exitFullScreen = () => {
      if (document.exitFullscreen) {
        console.log("exit screen!");
        !document.exitFullscreen();
      // } else if (document['mozCancelFullScreen']) {
      //   document['mozCancelFullScreen']();
      // } else if (document['webkitExitFullscreen']) {
      //   document['webkitExitFullscreen']();
      // } else if (document['msExitFullscreen']) {
      //   document['msExitFullscreen']();
      }
    };

    const handleFullScreenChange = () => {
      // if (!document.fullscreenElement && !document['webkitFullscreenElement'] && !document['mozFullScreenElement'] && !document['msFullscreenElement']) {
      if (!document.fullscreenElement) {
        enterFullScreen();
      }
    };

    document.addEventListener('fullscreenchange', handleFullScreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullScreenChange);
    document.addEventListener('mozfullscreenchange', handleFullScreenChange);
    document.addEventListener('MSFullscreenChange', handleFullScreenChange);

    enterFullScreen();

    return true;
  }

  canDeactivate(component: CanComponentDeactivate): Observable<boolean> | Promise<boolean> | boolean {
    return component.canDeactivate ? component.canDeactivate() : true;
  }

}
