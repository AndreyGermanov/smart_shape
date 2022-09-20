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
