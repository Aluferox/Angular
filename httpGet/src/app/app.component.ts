import { Component } from '@angular/core';
import { Repos } from './repos'
import { GitHubService } from './github.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'httpGet';

  userName:string = 'Aluferox';
  repos:Repos[];
  loading:boolean = false;
  errorMessage;

  constructor(private gitHubService:GitHubService) {}

  public getRepos() {
   this.loading = true;
   this.errorMessage = "";
   this.gitHubService.getRepos(this.userName)
   .subscribe(
     (response) => {
       console.log("Response Received");
       this.repos = response;
     },

     (error) => {
       console.log("Request Failed with Error");
       this.errorMessage = error;
       this.loading =false;
     },
     () => {
      console.error('Request completed')
      this.loading =false;
     }
   )
  }
}
