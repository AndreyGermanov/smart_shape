import {abs} from "./index.js";

/**
 * @ignore
 * Function converts degrees to radians
 * @param degrees {number} Angle in degrees
 * @returns {number} Angle in radians
 */
export const degrees_to_radians = (degrees) =>  degrees * (Math.PI/180);

/**
 * @ignore
 * Functions converts radians to degrees
 * @param radians {number} Angle in radians
 * @returns {number} Angle in degrees
 */
export const radians_to_degrees = (radians) => radians * (180/Math.PI);

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
    if (angle === 0) {
        return [x,y];
    }
    const radians = degrees_to_radians(angle);
    const resultX = (x-centerX)*Math.cos(radians)-(y-centerY)*Math.sin(radians)+centerX;
    const resultY = (x-centerX)*Math.sin(radians)+(y-centerY)*Math.cos(radians)+centerY;
    return [resultX, resultY];
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

/**
 * @ignore
 * Function calculates distance from point (x0,y0) to line, defined by points (x1,y1) and (x2,y2)
 * https://code.germanov.dev/smart_shape/assets/distance.png
 * @param x0 X coordinate of point
 * @param y0 Y coordinate of point
 * @param x1 X coordinate of line start
 * @param y1 Y coordinate of line start
 * @param x2 X coordinate of line end
 * @param y2 Y coordinate of line end
 */
export const distanceFromLine = (x0,y0,x1,y1,x2,y2) => {
    let t = (x0-x1)*(x2-x1)+(y0-y1)*(y2-y1);
    const d = Math.pow(x2-x1,2) +Math.pow(y2-y1,2)
    if (d === 0) {
        return -1;
    }
    t /= d;
    if (t<0) {
        t = 0;
    } else if (t>1) {
        t = 1;
    }
    return Math.sqrt(Math.pow(x1-x0 + t*(x2-x1),2) + Math.pow(y1-y0+t*(y2-y1),2))
}

/**
 * @ignore
 * Function returns true is specified `point` lays inside or on the borders of specified `polygon`
 * @param polygon {array} Array of points of polygon [ [x,y] , [x,y] , [x,y] ... ]
 * @param point {array} Coordinates of point [x,y]
 * @returns {boolean} True if the point belongs to the polygon or false otherwise
 */
export const isPointInsidePolygon = (polygon,point) => {

    const onSegment = (p,q,r) => {
        return !!(q.x <= Math.max(p.x, r.x) &&
            q.x >= Math.min(p.x, r.x) &&
            q.y <= Math.max(p.y, r.y) &&
            q.y >= Math.min(p.y, r.y));
    }

    const orientation = (p,q,r) => {
        let val = (q[1] - p[1]) * (r[0] - q[0])
            - (q[0] - p[0]) * (r[1] - q[1]);

        if (val === 0) {
            return 0;
        }
        return (val > 0) ? 1 : 2;
    }

    const doIntersect = (p1,q1,p2,q2) => {
        let o1 = orientation(p1, q1, p2);
        let o2 = orientation(p1, q1, q2);
        let o3 = orientation(p2, q2, p1);
        let o4 = orientation(p2, q2, q1);

        if (o1 !== o2 && o3 !== o4) {
            return true;
        }

        if (o1 === 0 && onSegment(p1, p2, q1))  {
            return true;
        }

        if (o2 === 0 && onSegment(p1, q2, q1)) {
            return true;
        }

        if (o3 === 0 && onSegment(p2, p1, q2))  {
            return true;
        }
        return !!(o4 === 0 && onSegment(p2, q1, q2));
    }
    if (polygon.length < 3) {
        return false;
    }

    let extreme = [10000,point[1]]

    let count = 0, i = 0;
    do {
        let next = (i + 1) % polygon.length;
        if (doIntersect(polygon[i], polygon[next], point, extreme)) {
            if (orientation(polygon[i], point, polygon[next]) === 0) {
                return onSegment(polygon[i], point,
                    polygon[next]);
            }
            count++;
        }
        i = next;
    } while (i !== 0);
    return (count % 2 === 1)
}

/**
 * @ignore
 * Function used to calculate width or height respecting aspect ratio, calculated from `origWidth` and `origHeight`.
 * Either `width` or `height` must be null. Otherwise, just returns width and height
 * @param width {number|null} Destination width. If null, then calculates it
 * @param height {number|null} Destination height. If null, then calculates it
 * @param origWidth {number} Original width used to calculate aspect ratio
 * @param origHeight {number} Original height used to calculate aspect ration
 * @returns {array} Array in the form [width,height] after apply aspect ratio
 */
export const applyAspectRatio = (width,height,origWidth,origHeight) => {
    if (!width && !height || !origWidth || !origHeight) {
        return [origWidth, origHeight];
    }
    if (width && height) {
        return [width,height]
    }
    if (!width) {
        width = height * (origWidth/origHeight);
    }
    if (!height) {
        height = width * (origHeight/origWidth);
    }
    return [width,height]
}

/**
 * @ignore
 * Returns true if two rectangles overlap each other
 * @param rect1 {object} First rectangle coordinates in format {left,top,right,bottom}
 * @param rect2 {object} Second rectangle coordinates in format {left,top,right,bottom}
 * @returns {boolean} True if rectangles overlap and false otherwise
 */
export const rectsOverlap = (rect1,rect2) => {
    if (rect1.left === rect1.right || rect1.top === rect1.bottom || rect2.left === rect2.right || rect2.top === rect2.bottom)
        return false;

    if (rect1.left > rect2.right || rect2.left > rect1.left) {
        return false;
    }

    return !(rect1.bottom > rect2.top || rect2.bottom > rect1.top);
}

/**
 * Method used to transform specified coordinates
 * using transformations, specified in `params` argument.
 * @param x {number} X coordinate
 * @param y {number} Y coordinate
 * @param type {PointMapTypes} This options specifies the transformation direction.
 * If it equals to `original_to_current` then need to apply specified transformations
 * to point, if  it equals `current_to_original`, the it assumed that all transformations
 * already applied to specified coordinates and need to un-apply them.
 * @param params Transformation parameters: `offsetX` - move by X, `offsetY` - move by Y,
 * `scaleX` - scale by X, `scaleY` - scale by Y, `flippedX` - flip by X, `flippedY` - flip by Y
 * @returns {array} New coordinates after transformation in [x,y] format
 */
export const mapPointCords = (x,y,type,params) => {
    const scaleX = params.scaleFactorX || 1;
    const scaleY = params.scaleFactorY || 1;
    const offsetX = params.offsetX || 0;
    const offsetY = params.offsetY || 0;
    const flippedX = params.flippedX || false;
    const flippedY = params.flippedY || false;
    if (type === PointMapTypes.CURRENT_TO_ORIGINAL) {
        [x,y] = flipPoint(x,y,flippedX,flippedY,params);
        x -= offsetX;
        y -= offsetY;
        x *= (1/scaleX);
        y *= (1/scaleY);
    } else if (type === PointMapTypes.ORIGINAL_TO_CURRENT) {
        x *= scaleX;
        y *= scaleY;
        x += offsetX;
        y += offsetY;
        [x,y] = flipPoint(x,y,flippedX,flippedY,params);
    }
    return [x,y];
}

/**
 * @ignore
 * Internal method to flip specified point over X or/and Y axis
 * according to specified dimensions of shape
 * @param x {number} X coordinate of point
 * @param y {number} Y coordinate of point
 * @param byX {boolean} Flip horizontally
 * @param byY {boolean} Flip vertically
 * @param pos {object} Shape dimensions, object with fields: `top`,`left`,`bottom`,`right`,`width`,`height`
 * @returns {array} New point coordinates in [x,y] format
 */
export const flipPoint = (x,y, byX, byY, pos) => {
    if (byX) {
        x = abs(pos.right - x) + pos.left
    }
    if (byY) {
        y = abs(pos.bottom - y) + pos.top
    }
    return [x,y]
}

/**
 * @ignore
 * Function used to convert polar coordinates to
 * screen coordinates
 * @param lat {number} Latitude
 * @param lon {number} Longitude
 * @returns {array} X and Y coordinates as array [x,y]
 */
export const latLonToXY = (lat, lon) => {
    const width = 1000000
    const x = (width * (180 + lon) / 360) % (1.5 * width)
    const rad = lat * Math.PI / 180
    const merc = 0.5 * Math.log((1 + Math.sin(rad)) / (1 - Math.sin(rad)))
    const y = (width * merc / (2 * Math.PI))
    return [x,y]
}

export const PointMapTypes = {
    CURRENT_TO_ORIGINAL: "current_to_original",
    ORIGINAL_TO_CURRENT: "original_to_current"
}
