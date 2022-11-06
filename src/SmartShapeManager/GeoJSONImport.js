import {mergeObjects, notNull} from "../utils/index.js";
import SmartShapeManager from "./SmartShapeManager.js";
import {latLonToXY} from "../utils/geometry.js";

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
    const {polygons,origPolygons,offsetX,offsetY} = loadPolygons(obj)
    options.offsetX = offsetX;
    options.offsetY = offsetY;
    let shape = null;
    for (let idx in polygons) {
        const shapeOpts = mergeObjects({},options)
        shapeOpts.initialPoints = [...origPolygons[idx]]
        if (idx==0) {
            if (importOptions.onlyData) {
                shape = {
                    points: polygons[idx],
                    options: shapeOpts,
                    children: []
                }
            } else {
                shape = SmartShapeManager.createShape(container,shapeOpts,polygons[idx],false)
            }
        } else {
            shapeOpts.id += "_"+idx;
            shapeOpts.name += " "+idx;
            if (importOptions.onlyData) {
                shape.children.push({
                    points: polygons[idx],
                    options:shapeOpts,
                })
            } else {
                shape.addChild(SmartShapeManager.createShape(container,shapeOpts,polygons[idx]),false)
            }

        }
    }
    if (importOptions.onlyData) {
        return shape;
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
    const result = {polygons:[],origPolygons:polygons.map(polygon => mergeObjects({},polygon[0]))};
    result.offsetX = 0;
    result.offsetY = 0;
    for (let _polygon of polygons) {
        const polygon = _polygon[0];
        const destPolygon = []
        for (let point of polygon) {
            const [x,y] = latLonToXY(point[1],point[0]);
            destPolygon.push({x,y})
        }

        result.polygons.push(destPolygon)
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
