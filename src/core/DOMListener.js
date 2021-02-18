import {capitalize} from '@cor/utils';

export class DOMListener {
  constructor($root, listeners = []) {
    if (!$root) {
      throw new Error(`No root provided for DOMListener!`);
    }
    this.$root = $root;
    this.listeners = listeners;
  }
  initDOMListeners() {
    this.listeners.forEach((listener) => {
      const method = this.getMethodName(listener);
      if (!this[method]) {
        const name = this.name || '';
        throw new Error(
            `Method ${method} is not implemented in ${name} Component `
        );
      }
      this[method] = this[method].bind(this);
      // AddEventListener
      this.$root.on(listener, this['onInput'].bind(this));
    });
  }


  // input => onInput
  getMethodName(eventName) {
    return 'on' + capitalize(eventName);
  }

  removeDOMListeners() {
    this.listeners.forEach( (listener) =>{
      const method = this.getMethodName(listener);
      this.$root.off(listener, this[method]);
    });
  }
}
