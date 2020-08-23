import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from "rxjs";

@Injectable({providedIn: 'root'})
export class UserService {

    /**
     * Observer --- Subscribe() ---> Observable
     *
     * - We know observables, we can subscribe to them as we learned but they're rather passive.
     * You'll learn how to create your own observable but the core idea always is that we wrap a callback
     * or an event or something like that.
     * e.g. HTTP request, DOM events
     * 
     * Observer --- Subscribe() ---> Subject <--- next()
     * 
     * - A subject is different.
     * A subject also is an object we can subscribe to, but it's more active because we can actively call next on it from outside.
     * Remember in the observable, we also called next but that was from inside the observable when we created it.
     * 
     * So that is a more active observable that is perfect when we want to use it as an event emitter,
     * 
     * so if we don't have passive event source, like an HTTP request or DOM events 
     * but if we have something that actively needs to be triggered by us in our application
     * and that's exactly the use case we have here.
     * 
     * We now can call next here in the user service on our activated emitter, the activated emitter is that subject and in app.component.
     * We still call it subscribe because it is an observable and therefore, we can subscribe.
     * 
     * Using a subject is recommended way. Don't use event emitter, Use subjects they are in the end a bit more efficient behind the scenes.
     * We can also now use all these cool operators because a subject in the end also is kind of an observable.
     * 
     * "Use subjects instead of observables"
     */

    // activatedEmitter = new EventEmitter<boolean>();
    activatedEmitter = new Subject<boolean>();
}
