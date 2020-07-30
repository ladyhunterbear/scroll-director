'use strict';

import { Trigger } from './Triggers';
import { TriggerType, ViewportPosition, ActionType } from './enums';


interface ScrollDirectorInterface {
	add(element: string): Trigger;
	checkTriggers(): void;
	init(): void;
}


/**
 * Scroll Director
 * 
 * 
 */
class ScrollDirector implements ScrollDirectorInterface {
	private el: any = window;
	
	private minScrollTime: number = 20; // milliseconds between running through trigger queue.
	private minScrollAmount: number = 10; // distance in pixels before running through trigger queue.
	private lastScrollTime: number = 0;
	private lastScrollYPos: number = 0;
	private currentScroll: number = 0;
	private currentScrollOffset: number = this.el.scrollY;
	private scrollDirection: number = 1;
	private triggers: Trigger[] = [];

	public instance: ScrollDirector = null;
	

	/**
	 * 
	 * Determine if element is in the viewport.
	 * 
	 * @param el: any An HTMLElement object in the DOM.
	 * 
	 * @return -1|0|1 based on element position above (before), in, or below (after) viewport.
	 * 
	 */
	private inViewport(trigger: Trigger): ViewportPosition {
		let status: ViewportPosition; 
		
		if (trigger.top() < window.innerHeight && trigger.bottom() > 0) {
			status = ViewportPosition.in;
		} else if (trigger.bottom() <= 0) {
			status = ViewportPosition.before;
		} else if (trigger.top() >= window.innerHeight) {
			status = ViewportPosition.after;
		}
		
		return status;
	}


	/**
	 * Iterate through all triggers checking their conditions
	 * and running actions if required.
	 * 
	 */
	public checkTriggers() {
		const now: number = new Date().getTime();


		// Exit if no triggers or not minimum scroll time or distance.
		if (this.triggers.length == 0 || now - this.lastScrollTime < this.minScrollTime ) {
				return;
		}

		// previous additional condition for minimum scroll
		/*||
			(this.el.scrollY - this.lastScrollYPos < this.minScrollAmount || 
				this.el.scrollY - this.lastScrollYPos > this.minScrollAmount * -1 )*/
		
		this.lastScrollTime = now;
    
    // Track how far the user has scrolled in this direction or if they have switched direction.
		if (this.lastScrollYPos - this.el.scrollY > 0 && this.scrollDirection == 1) {
			this.currentScroll = 0;
			this.currentScrollOffset = this.el.scrollY;
			this.scrollDirection = -1;
		} else if (this.lastScrollYPos - this.el.scrollY < 0 && this.scrollDirection == -1) {
			this.currentScroll = 0;
			this.currentScrollOffset = this.el.scrollY;
			this.scrollDirection = 1;
		} else {
			this.currentScroll = (this.el.scrollY - this.currentScrollOffset) * this.scrollDirection;
		}

		this.lastScrollYPos = this.el.scrollY;
		
		this.draw();
	}
	

	/**
	 * 
	 * @param element 
	 * @param action 
	 * @param init 
	 * 
	 * @return Trigger
	 */
	public add(element: any): Trigger {
		const trigger = new Trigger(element);
		if (trigger) this.triggers.push(trigger);
		const i = this.triggers.length - 1;
	
		return this.triggers[i];
	}


	/**
	 * Will check to see if triggers are above, within, or below the viewport.
	 * Triggers above and within the viewport will have their trigger actions called. 
	 * 
	 */
	private draw() {
		setTimeout( () => {
			this.triggers.forEach((trigger: Trigger) => {
			// 	switch (this.inViewport(trigger.element())) {
      //     case -1: 
      //     case 0: 
			// 			trigger.action();
      //     break;
          
      //     case 1:
      //       // TODO - what happens when something that was actioned gets pushed off screen by a resize?

      //     break;
			// 	}
			trigger.update(); 	
			});	
		}, 100);
	}

	
	/**
	 * Called on window resize to recalculate all trigger 
   * focusPx and threshold properties used to calculate
   * trigger conditions.
	 * 
	 */
	private resize(): void {
    this.triggers.forEach((trigger) => {
      // this.recalculate();
    });
		console.log('resize');
		this.draw();
	}


	/**
	 * Called once triggers have been added to iterate over triggers
	 * and setup event bindings.
	 * 
	 */
	public init(): void {
    try {
			// Guard against no triggers having been added.
      if (this.triggers.length == 0) {
        throw new Error('Add triggers before calling init.');
			}
			
			window.addEventListener('scroll', () => {
				setTimeout(() => { this.checkTriggers() }, 200);
				this.checkTriggers();
			});

      window.addEventListener('resize', () => this.resize());

			// Run any actions required for current scroll state.
      this.draw();
    } catch (e) {
      console.warn(e.message);
    }
	}


	/**
	 * Return a singleton of the ScrollDirector class.
	 * 
	 */
	constructor() {
		if (! this.instance) {
			this.instance = this;
		}

		return this.instance;
	}
}

export default ScrollDirector;