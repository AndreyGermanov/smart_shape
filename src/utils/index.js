import {getRotatedCoords, distance, degrees_to_radians, radians_to_degrees,isPointInsidePolygon,rectsOverlap} from "./geometry.js";

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

export const dataURLtoBlob = (dataURI) => {
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], {type: mimeString});
}

export const blobToDataURL = (blob) =>{
    return new Promise(resolve => {
        const reader = new FileReader();
        reader.onload = function(e) {resolve(e.target.result);}
        reader.readAsDataURL(blob);
    })
}

export const readJSON = (jsonString) => {
    try {
        return JSON.parse(jsonString);
    } catch (err) {
        return null;
    }
}

export const CSStoJsStyleName = (cssName) => {
    let result = cssName;
    let index = result.indexOf("-");
    while (index !== -1) {
        result = result.replace("-"+result[index+1],result[index+1].toString().toUpperCase())
        index = result.indexOf("-");
    }
    return result;

}

export const recursiveDeepCopy = (o) => {
    let newO, i;

    if (typeof o !== 'object') {
        return o;
    }
    if (!o) {
        return o;
    }

    if ('[object Array]' === Object.prototype.toString.apply(o)) {
        newO = [];
        for (i = 0; i < o.length; i += 1) {
            newO[i] = recursiveDeepCopy(o[i]);
        }
        return newO;
    }

    newO = {};
    for (i in o) {
        if (o.hasOwnProperty(i)) {
            newO[i] = recursiveDeepCopy(o[i]);
        }
    }
    return newO;
}

export {radians_to_degrees,degrees_to_radians,getRotatedCoords,distance,isPointInsidePolygon,rectsOverlap};
