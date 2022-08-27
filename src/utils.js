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
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    }).replace(/\-/g,"");
}
