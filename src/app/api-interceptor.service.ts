import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseUrl } from '../BaseUrl';


@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const apiBaseUrl = `${BaseUrl}/api`;

    // Check if the request URL starts with '/assets' for translation files
    if (req.url.startsWith('./assets')) {

      const assetReq = req.clone({ url: req.url.substr(1) });
      return next.handle(assetReq);
    }

    if (req.url.startsWith('http://') || req.url.startsWith('https://')) {
      return next.handle(req);
    }
    const apiReq = req.clone({ url: `${apiBaseUrl}/${req.url}` });
    return next.handle(apiReq);
  }
}
