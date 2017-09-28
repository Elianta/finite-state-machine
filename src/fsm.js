class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
      this.states = config.states;
      this.initialState = config.initial;
      this.currentState = config.initial;
      this.history = [this.currentState];
      this.statePosition = 1;
    }
    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
      return this.currentState;
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
      if (this.states.hasOwnProperty(state)) {
        this.currentState = state;
        this.history.push(this.currentState);
        while (this.statePosition < this.history.length) {
          this.statePosition += 1;
        }
      } else {
        throw new Error();
      }
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
      let transitions = this.states[this.currentState].transitions;
      for (let transition in transitions) {
        if (transition === event) {
          this.currentState = transitions[event];
          if (this.history[this.history.length - 1] !== transitions[event]) {
            this.history.push(this.currentState);
          }
          while (this.statePosition < this.history.length) {
            this.statePosition += 1;
          }
          return;
        }
      }
      throw new Error();
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
      this.currentState = this.initialState;
      this.history.push(this.currentState);
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
      let array = [];
      if (arguments.length === 0) {
        for (let state in this.states) {
          array.push(state);
        }
      } else {
        for (let state in this.states){
          if(this.states[state].transitions.hasOwnProperty(event)){
            array.push(state);                }
        }
      }
      return array;
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
      if (this.statePosition !== 1) {
        this.currentState = this.history[this.statePosition - 2];
        this.statePosition -= 1;
        return true;
      } else {
        return false;
      }
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
      if (this.statePosition < this.history.length) {
        this.currentState = this.history[this.statePosition];
        this.statePosition += 1;
        return true;
      } else {
        return false;
      }
    }

    /**
     * Clears transition history
     */
    clearHistory() {
      this.history = [this.initialState];
      this.statePosition = 1;
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
