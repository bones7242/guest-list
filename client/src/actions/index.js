export function selectEvent(event) {
    // selectEvent is an ActionCreator, it needs to return an action, which is a plain js object with a type property and a payload (a piece of data).
    return {
        type: "EVENT_SELECTED",
        payload: event
    };
}