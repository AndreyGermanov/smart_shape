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
 * `options`: shape options [SmartShape.options](#SmartShape+options) to set to each shape after import
 * @returns {array} Array of SmartShape objects
 */
export const fromGeoJSON = (container,geoJSON, options) => {
    if (!geoJSON || !notNull(geoJSON.features) || !geoJSON.features.length) {
        return null
    }
    const result = [];
    for (let index in geoJSON.features) {
        const obj = geoJSON.features[index];
        const shape = createShapeFromGeoJson(obj,index,options,container);
        if (notNull(options.width) || notNull(options.height)) {
            shape.scaleTo(options.width,options.height,true);
        }
        if (shape) {
            result.push(shape);
        }
    }
    return result;
}

const createShapeFromGeoJson = (obj, index, importOptions, container) => {
    if (!isCorrectJSON(obj)) {
        return;
    }
    let options = loadOptions(obj,index,importOptions);
    options.visible = false;
    const polygons = loadPolygons(obj,index)
    let shape = null;
    for (let idx in polygons) {
        const shapeOpts = mergeObjects({},options)
        if (idx==0) {
            shape = SmartShapeManager.createShape(container,shapeOpts,polygons[idx])
        } else {
            shapeOpts.id += "_"+idx;
            shapeOpts.name += " "+idx;
            shape.addChild(SmartShapeManager.createShape(container,shapeOpts,polygons[idx]))
        }
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
    let minX = 999999, minY = 999999;
    let maxDigits = 0;
    for (let _polygon of polygons) {
        const polygon = _polygon[0];
        for (let point of polygon) {
            maxDigits = getDecimalLength(point[0]) > maxDigits ? getDecimalLength(point[0]) : maxDigits;
            maxDigits = getDecimalLength(point[1]) > maxDigits ? getDecimalLength(point[0]) : maxDigits;
            minX = point[0] < minX ? point[0] : minX;
            minY = point[1] < minY ? point[1] : minY;
        }
    }
    const result = [];
    for (let _polygon of polygons) {
        const polygon = _polygon[0];
        for (let point of polygon) {
            point[0] -= minX;
            point[0] *= Math.pow(10,maxDigits);
            point[1] -= minY;
            point[1] *= Math.pow(10,maxDigits);
        }
        result.push(polygon)
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
