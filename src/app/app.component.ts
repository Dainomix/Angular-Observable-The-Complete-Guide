import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from './user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  userActivated = false;
  private activatedSub: Subscription;

  constructor(private userService:UserService) {}

  /**
   * One important note, just as with our own observables,
   * we should unsubscribe to our subjects tough whenever we don't need them.
   * 
   * 
   * One Another important note about subject as a replacement for event emitter, 
   * This only counts if we're using them as cross component event emitters, where we manually call next or previously emit.
   * we don't use subjects instead of event emitter, when we're using @output.
   * 
   * So in a component if we're using '@output' here with our own event, we still use the Angaulr event emitter.
   * we're not using subject there because the subject is not suitable for that, there we need the Angular event emitter,
   * 
   * We only use subjects to communicate across components, through services so therough a mechanism
   * where we in the end subscribe to somewhere, like here in the app.component.
   * 
   * If we're not subscribing to an event emitter, then it probably is an output.
   * if we do plan to subscribe manually, then it is a subject
   */
  ngOnInit() {
    this.activatedSub = this.userService.activatedEmitter.subscribe(didActivate => {
      this.userActivated = didActivate;
    })
  }

  ngOnDestroy(): void {
    this,this.activatedSub.unsubscribe();
  }
}
