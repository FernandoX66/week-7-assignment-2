import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ObservableInput, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AppError } from '../errors/app-error';
import { NotFoundError } from '../errors/not-found-error';

@Injectable()
export class GithubService {
  constructor(private http: HttpClient) {}

  getUser(username: string): Observable<any> {
    return this.http.get(`https://api.github.com/users/${username}`).pipe(
      catchError((error: Response) => {
        if (error.status === 404) {
          return throwError(new NotFoundError());
        } else {
          return throwError(new AppError(error));
        }
      })
    );
  }

  getStars(username: string): Observable<any> {
    return this.http
      .get(`https://api.github.com/users/${username}/starred`)
      .pipe(
        catchError((error: Response) => {
          return throwError(new AppError(error));
        })
      );
  }

  getRepositories(username: string): Observable<any> {
    return this.http.get(`https://api.github.com/users/${username}/repos`).pipe(
      catchError((error: Response) => {
        return throwError(new AppError(error));
      })
    );
  }

  getFollowers(username: string): Observable<any> {
    return this.http
      .get(`https://api.github.com/users/${username}/followers`)
      .pipe(
        catchError((error: Response) => {
          return throwError(new AppError(error));
        })
      );
  }
}
