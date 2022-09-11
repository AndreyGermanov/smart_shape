/**
 * @ignore
 * Function used to create SmartShape event from raw Javascript DOM event.
 * @param origEvent {Event} Original DOM event to get as a base
 * @param params {object} Params to add to event
 */
export const createEvent = (origEvent,params={}) => {
    const result = {};
    for (let key in origEvent) {
        if (key !== "type" && key !== "target") {
            result[key] = origEvent[key];
        }
    }
    Object.keys(params).forEach((key) => {
        result[key] = params[key];
    })
    return result;
}

/**
 * @ignore
 * Method returns coordinates of mouse cursor from Mouse event
 * @param event {MouseEvent}
 * @returns {array} Coordinates as an array [x,y]
 */
export const getMouseCursorPos = (event) => {
    return [event.clientX+window.scrollX,event.clientY+window.scrollY];
}
