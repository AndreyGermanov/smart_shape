import {mergeObjects, notNull} from "../utils/index.js";
import SmartShapeManager from "./SmartShapeManager.js";

/**
 * @ignore
 * Method used to import collection of shapes from JSON array in GeoJSON format: https://geojson.org/
 * @param container {HTMLElement} The HTML element to connect loaded shapes
 * @param geoJSON {object} Javascript object in geoJSON format
 * @param options {object} Options to tune the import process:
 * `idField`: the field from "properties collection of GeoJSON object that used as a shape ID,
 * `nameField`: the field from "properties" collection of GeoJSON object that used as a shape name,
 * `width`: the width to which loaded shapes should be scaled (if not specified then calc automatically based on height),
 * `height`: the height to which loaded shapes should be scaled (if not specified then calc automatically based on width),
 * `scale`: scaling factor to which loaded shapes should be scaled (if not specified, width and height used,
 * if nothing specified, then scales to 200px width if natural width is less than this)
 * `options`: shape options [SmartShape.options](#SmartShape+options) to set to each shape after import
 * `fields`: which other fields to import from GeoJSON, in addition to `idField` and `nameField`
 * @param progressCallback {function} Function that executes after loading each shape from file. If specified, it will
 * be executed with three arguments: `currentShapeIndex` - index of current processed shape, `totalShapesLength` - total
 * number of shapes in the collection, shape - SmartShape object of currently processed shape.
 * @returns {array} Array of SmartShape objects
 */
export const fromGeoJSON = (container,geoJSON, options={}, progressCallback=null) => {
    if (!notNull(geoJSON) || typeof(geoJSON) !== "object") {
        return null;
    }
    if (!notNull(geoJSON.features)) {
        geoJSON = {features:[geoJSON]}
    }
    if (!geoJSON.features.length) {
        return null
    }
    const result = [];
    for (let index in geoJSON.features) {
        const obj = geoJSON.features[index];
        const shape = createShapeFromGeoJson(obj,index,options,container);
        if (progressCallback && typeof(progressCallback) === "function") {
            progressCallback(index,geoJSON.features.length,shape);
        }
        if (shape) {
            result.push(shape);
        }
    }
    return result.length === 1 ? result[0] : result;
}

const createShapeFromGeoJson = (obj, index, importOptions, container) => {
    if (!isCorrectJSON(obj)) {
        return;
    }
    let options = loadOptions(obj,index,importOptions);
    options.visible = false;
    const polygons = loadPolygons(obj);
    if (!polygons || !polygons.length) {
        return
    }
    polygons.sort((p1,p2) => p2.dims.width*p2.dims.height - p1.dims.width * p1.dims.height)
    let shape = null;
    for (let idx in polygons) {
        const shapeOpts = mergeObjects({},options);
        if (idx==0) {
            if (importOptions.onlyData) {
                shape = {
                    points:   polygons[idx].cords,
                    options:  shapeOpts,
                    children: [],
                    ...polygons[idx].dims
                }
            } else {
                shape = SmartShapeManager.createShape(container,shapeOpts,polygons[idx].cords,false)
                shape.left = polygons[idx].dims.left;
                shape.top = polygons[idx].dims.top;
                shape.right = polygons[idx].dims.right;
                shape.bottom = polygons[idx].dims.bottom;
                shape.width = polygons[idx].dims.width;
                shape.height = polygons[idx].dims.height;
            }
        } else {
            shapeOpts.id += "_" + idx;
            shapeOpts.name += " " + idx;
            if (importOptions.onlyData) {
                shape.children.push({
                    points: polygons[idx].cords,
                    options:shapeOpts,
                    ...polygons[idx].dims
                })
            } else {
                const child = SmartShapeManager.createShape(container,shapeOpts,polygons[idx].cords);
                child.left = polygons[idx].dims.left;
                child.top = polygons[idx].dims.top;
                child.right = polygons[idx].dims.right;
                child.bottom = polygons[idx].dims.bottom;
                child.width = polygons[idx].dims.width;
                child.height = polygons[idx].dims.height;
                shape.addChild(child, false)
            }
        }
    }
    if (importOptions.onlyData) {
        return shape;
    }
    const pos = shape.getPosition();
    if ((pos.left < 0 || pos.top < 0) && (importOptions.scale || importOptions.width || importOptions.height)) {
        shape.moveTo(0,0,false,false)
    }
    if (notNull(importOptions.scale)) {
        shape.scaleBy(importOptions.scale,importOptions.scale,true);
    } else if (notNull(importOptions.width) || notNull(importOptions.height)) {
        shape.scaleTo(importOptions.width,importOptions.height)
    }
    return shape;
}

const isCorrectJSON = (obj) => {
    if (!notNull(obj.properties) || typeof(obj.properties) !== "object") {
        return false
    }
    const geometry = obj.geometry;
    if (!notNull(geometry) || typeof(geometry) !== "object") {
        return false;
    }
    if (["Polygon","MultiPolygon"].indexOf(geometry.type) === -1) {
        return false;
    }
    if (!notNull(geometry.coordinates) ||
        typeof(geometry.coordinates) !== "object" ||
        !geometry.coordinates.length) {
        return false;
    }
    return true;
}

const loadOptions = (obj,index,importOptions) => {
    const result = {};
    result.name = obj.properties[importOptions.nameField] || "Shape "+ index;
    result.id = obj.properties[importOptions.idField] || "shape_" + index;
    if (notNull(importOptions.fields) && typeof(importOptions.fields) === "object") {
        importOptions.fields
            .filter(fieldName => notNull(obj.properties[fieldName]))
            .forEach(fieldName => result[fieldName] = obj.properties[fieldName])
    }
    if (notNull(importOptions.options) && typeof(importOptions.options) === "object") {
        for (let id in importOptions.options) {
            result[id] = importOptions.options[id];
        }
    }
    return result;
}

const loadPolygons = (obj) => {
    let polygons = obj.geometry.coordinates;
    if (obj.geometry.type === "Polygon") {
        polygons = [polygons];
    }
    const result = [];
    for (let _polygon of polygons) {
        const polygon = _polygon[0];
        const cords = [];
        let left=Infinity,right=-Infinity,top=Infinity,bottom=-Infinity;
        for (let point of polygon) {
            const [x,y] = [point[0],-point[1]];
            if (x<left) {
                left = x;
            }
            if (x>right) {
                right = x;
            }
            if (y<top) {
                top = y;
            }
            if (y>bottom) {
                bottom = y;
            }
            cords.push({x,y})
        }
        result.push({cords,dims:{left,top,bottom,right,width:right-left,height:bottom-top}});
    }
    return result;
}

const getDecimalLength = (number) => {
    let parts = number.toString().split(".");
    if (parts[1]) {
        return parts[1].length
    }
    return 0
}
