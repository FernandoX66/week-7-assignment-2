import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AppError } from 'src/app/errors/app-error';
import { NotFoundError } from 'src/app/errors/not-found-error';
import { GithubUserResponse } from 'src/app/interfaces/user.interface';
import { GithubService } from 'src/app/services/github.service';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  @Output() onUserSearch: EventEmitter<GithubUserResponse> = new EventEmitter();
  hasError: boolean = false;
  isLoading = this.loaderService.loading;

  constructor(
    private githubService: GithubService,
    private loaderService: LoaderService
  ) {}

  ngOnInit(): void {}

  searchUser(username: string) {
    this.loaderService.show();
    this.githubService.getUser(username).subscribe(
      (response: GithubUserResponse) => {
        this.hasError = false;
        this.onUserSearch.emit(response);
      },
      (error: AppError) => {
        if (error instanceof NotFoundError) {
          this.hasError = true;
          this.loaderService.hide();
          setTimeout(() => {
            this.hasError = false;
          }, 4000);
        } else {
          throw error;
        }
      },
      () => {
        this.loaderService.hide();
      }
    );
  }
}
