/**
 * @ignore
 * Function used to create SmartShape event from raw Javascript DOM event.
 * @param origEvent {Event} Original DOM event to get as a base
 * @param params {object} Params to add to event
 */
export const createEvent = (origEvent,params={}) => {
    const result = {};
    Object.keys(origEvent).forEach((key) => {
        if (key !== "type" && key !== "target") {
            result[key] = origEvent[key];
        }
    })
    Object.keys(params).forEach((key) => {
        result[key] = params[key];
    })
    return result;
}
