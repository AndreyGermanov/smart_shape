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

export const degrees_to_radians = (degrees) =>  {
    return degrees * (Math.PI/180);
}

export const getRotatedCoords = (angle, x, y, centerX, centerY) => {
    const resultX = (x-centerX)*Math.cos(degrees_to_radians(angle))-(y-centerY)*Math.sin(degrees_to_radians(angle))+centerX;
    const resultY = (x-centerX)*Math.sin(degrees_to_radians(angle))+(y-centerY)*Math.cos(degrees_to_radians(angle))+centerY;
    return [Math.round(resultX), Math.round(resultY)];
}

