import {getRotatedCoords, distance, degrees_to_radians, radians_to_degrees,isPointInsidePolygon} from "./geometry.js";

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
        const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    }).replace(/-/g,"");
}

export const pauseEvent = (e) => {
    try {
        if (e.stopPropagation) e.stopPropagation();
        if (e.preventDefault) e.preventDefault();
        e.cancelBubble = true;
        e.returnValue = false;
    } catch (err) {}
    return false;
}



export const notNull = (value) => {
    return typeof(value) !== "undefined" && value !== null;
}

export const mergeObjects = (obj1, obj2) => {
    if (obj1 && typeof(obj1) === "object" && obj2 && typeof(obj2) === "object") {
        return Object.assign(obj1,obj2);
    }
    return obj1;
}

export const round = (number,precission) => {
    return Math.round(number*precission)/precission;
}

export {radians_to_degrees,degrees_to_radians,getRotatedCoords,distance,isPointInsidePolygon};
