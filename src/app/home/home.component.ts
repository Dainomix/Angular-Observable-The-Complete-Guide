import { Component, OnInit, OnDestroy } from '@angular/core';
import { interval, Subscription, Observable } from "rxjs";
import { map, filter } from "rxjs/operators";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  private firstObsSubscription: Subscription;

  constructor() { }

  ngOnInit() {

    // this.firstObsSubscription = interval(1000).subscribe( count => {
    //   console.log(count);
    // });

    // Custom Observable Version
    const customIntervalObservable = Observable.create(observer => {
      let count = 0;
      setInterval(() => {
        observer.next(count);

        if(count === 5) {
          observer.complete();
        }

        if(count > 3) {
          observer.error(new Error('Count is greater than 3!'));
        }
        
        count++;
      }, 1000);
    });

    /*
     * throwing an error actually cancels the observable and lets it die
     * Completing can be a normal process in an observable. and also we don't need to unsubscribe
     * if our observable did complete but again, we mignt not know that here in ngOnDestroy
     * so we can still do that without getting errors
     * 
     * When it cancels due to an error, then that's a different thing than when it completes.
     * => An error cancels the observable, it does not complete it,
     *    technically in both cases, no new values are emitted but regarding the functions
     *    that get called here( ()=> {console.log('Complete)} ), there is a difference.
     */
    this.firstObsSubscription = customIntervalObservable.pipe(filter(data => {
      /* 
       * return true or false which decides whether that data point will continue in that chain,
       * so whether it will reach map and thereafter, the subscription or whether it will be dropped,
       * in which case it will neither reach map nor the subscription
       */
      return data > 0;
    }), map((data:number) => {
      return 'Round: ' + (data + 1);
    })).subscribe(data => {
      console.log(data);
    }, error => {
      console.log(error);
      alert(error.message);
    }, () => {
      console.log('Completed!');
    })
  }

  ngOnDestroy() {
    this.firstObsSubscription.unsubscribe();
  }

}
