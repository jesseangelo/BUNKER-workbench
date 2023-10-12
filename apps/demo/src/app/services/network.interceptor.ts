import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, Observable } from 'rxjs';
import { LoadingService } from './loading.service';

@Injectable()
export class NetworkInterceptor implements HttpInterceptor {
  totalRequests = 0;
  completedRequests = 0;

  constructor(private loader: LoadingService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    this.loader.show();
    this.totalRequests++;

    return next.handle(request).pipe(
      finalize(() => {
        this.completedRequests++;

        // console.log(this.completedRequests, this.totalRequests);

        if (this.completedRequests === this.totalRequests) {
          this.loader.hide();
          this.completedRequests = 0;
          this.totalRequests = 0;
        }
      })
    );
  }
}
