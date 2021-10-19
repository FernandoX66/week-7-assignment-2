import { Component, OnInit } from '@angular/core';
import { GithubFollower } from 'src/app/interfaces/follower.interface';
import { GithubRepository } from 'src/app/interfaces/repository.interface';
import { GithubUserResponse } from 'src/app/interfaces/user.interface';
import { GithubService } from 'src/app/services/github.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  userInformation: GithubUserResponse = {
    login: '',
    id: 0,
    node_id: '',
    avatar_url: '',
    gravatar_id: '',
    url: '',
    html_url: '',
    followers_url: '',
    following_url: '',
    gists_url: '',
    starred_url: '',
    subscriptions_url: '',
    organizations_url: '',
    repos_url: '',
    events_url: '',
    received_events_url: '',
    type: '',
    site_admin: false,
    name: '',
    company: '',
    blog: '',
    location: '',
    email: '',
    hireable: '',
    bio: '',
    twitter_username: '',
    public_repos: 0,
    public_gists: 0,
    followers: 0,
    following: 0,
    created_at: new Date(),
    updated_at: new Date(),
  };
  repositories: GithubRepository[] = [];
  followers: GithubFollower[] = [];
  stars: number = 0;

  constructor(private githubService: GithubService) {}

  ngOnInit(): void {}

  setUserInformation(event: GithubUserResponse): void {
    this.userInformation = event;

    this.githubService
      .getStars(this.userInformation.login)
      .subscribe(
        (response: GithubRepository[]) => (this.stars = response.length)
      );

    this.repositories = [];
    this.followers = [];
  }

  searchRepositories(): void {
    this.githubService
      .getRepositories(this.userInformation.login)
      .subscribe(
        (response: GithubRepository[]) => (this.repositories = response)
      );
  }

  searchFollowers(): void {
    this.githubService
      .getFollowers(this.userInformation.login)
      .subscribe((response: GithubFollower[]) => (this.followers = response));
  }

  trackFollower(index: number, follower: GithubFollower) {
    return follower ? follower.login : undefined;
  }

  trackRepository(index: number, repository: GithubRepository) {
    return repository ? repository.name : undefined;
  }
}
