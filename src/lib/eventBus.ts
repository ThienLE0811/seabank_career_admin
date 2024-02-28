import { useEventEmitter } from "ahooks";

class EventBus {
  private event$ = useEventEmitter();
  //   private event$.useSubscription(() => {})
  constructor() {
    this.event$.useSubscription((val) => {
      console.log(val);
    });
  }

  init() {
    Object.assign(window, { event$: this.event$ });
  }
}

export default EventBus;
