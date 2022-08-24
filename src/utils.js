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
