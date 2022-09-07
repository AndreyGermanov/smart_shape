export const getOffset = ( elem,deep=true ) => {
    let x = 0;
    let y = 0;
    if (!deep) {
        return {top: elem.offsetTop - elem.scrollTop, left: elem.offsetLeft - elem.scrollLeft};
    }
    while( elem && !isNaN( elem.offsetLeft ) && !isNaN( elem.offsetTop ) ) {
        x += elem.offsetLeft - elem.scrollLeft;
        y += elem.offsetTop - elem.scrollTop;
        elem = elem.offsetParent;
    }
    return { top: y, left: x };
}

export const uuid = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    }).replace(/\-/g,"");
}

export const pauseEvent = (e) => {
    if(e.stopPropagation) e.stopPropagation();
    if(e.preventDefault) e.preventDefault();
    e.cancelBubble=true;
    e.returnValue=false;
    return false;
}

/**
 * @ignore
 * Function converts degrees to radians
 * @param degrees {number} Angle in degrees
 * @returns {number} Angle in radians
 */
export const degrees_to_radians = (degrees) =>  {
    return degrees * (Math.PI/180);
}

/**
 * @ignore
 * Functions converts radians to degrees
 * @param radians {number} Angle in radians
 * @returns {number} Angle in degrees
 */
export const radians_to_degrees = (radians) => {
    return radians * (180/Math.PI);
}

/**
 * @ignore
 * Function used to rotate point with specified coordinate x,y around the center with
 * coordinates centerX, centerY by specified angle in degrees.
 * @param angle {number} Rotation angle
 * @param x {number} X coordinate of point
 * @param y {number} Y coordinate of point
 * @param centerX {number} X coordinate of center
 * @param centerY {number} Y coordinate of center
 * @returns {array} New coordinates of point in array [x,y]
 */
export const getRotatedCoords = (angle, x, y, centerX, centerY) => {
    const resultX = (x-centerX)*Math.cos(degrees_to_radians(angle))-(y-centerY)*Math.sin(degrees_to_radians(angle))+centerX;
    const resultY = (x-centerX)*Math.sin(degrees_to_radians(angle))+(y-centerY)*Math.cos(degrees_to_radians(angle))+centerY;
    return [Math.round(resultX), Math.round(resultY)];
}

/**
 * @ignore
 * Function calculates euclidean distance between two points
 * @param x1 {number} X coordinate of point 1
 * @param y1 {number} Y coordinate of point 1
 * @param x2 {number} X coordinate of point 2
 * @param y2 {number} Y coordinate of point 2
 * @returns {number} Distance from (x1,y1) to (x2,y2)
 */
export const distance = (x1,y1,x2,y2) => {
    return Math.sqrt(Math.pow(x2-x1,2)+Math.pow(y2-y1,2))
}

