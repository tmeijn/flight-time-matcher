import { Injectable } from '@angular/core';
import { Request, XHRBackend, RequestOptions, Response, Http, RequestOptionsArgs, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Router, NavigationExtras } from '@angular/router';
//import { AuthService } from './auth/auth.service';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class ExtendedHttpService extends Http {

  constructor(backend: XHRBackend, defaultOptions: RequestOptions, private router: Router) {
    super(backend, defaultOptions);
  }

  request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
    //do whatever 
    if (typeof url === 'string') {
      if (!options) {
        options = { headers: new Headers() };
      }
      this.setHeaders(options);
    } else {
      this.setHeaders(url);
    }

    return super.request(url, options).catch(this.catchErrors);
  }

  /**
   * Standard method that handles unauthorized requests.
   * Tries to convert  the error to JSON. If failed, returns the raw error.
   * @param err The error from the observable
   */
  private catchErrors(err: any) {
    // Check if error is instance of response:
    if(err instanceof Response) {
      if (err.status === 401 || err.status === 403) {
        // Handle authorization errors
        let navigationExtras: NavigationExtras = {
          queryParams: { 'reason': 'unauthorized', 'status': err.status }
        }
        this.router.navigate(['login'], navigationExtras);
      }
      // Format response to JSON, if possible
      return Observable.throw(err.json() || 'Backend server error');
    } else {
      // Error is not an instance of Response:
      return Observable.throw(err || 'Backend server error');
    }

  }

  private setHeaders(objectToSetHeadersTo: Request | RequestOptionsArgs) {
    // Function can be used to provide additional headers on every request
  }
}
