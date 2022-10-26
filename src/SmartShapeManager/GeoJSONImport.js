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
    if (!notNull(geoJSON) || typeof(geoJSON) !== "object") {
        return null;
    }
    if (!geoJSON.length) {
        geoJSON = {features:[geoJSON]}
    }
    if (!geoJSON.features.length) {
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
    let offsetX = 999999, offsetY = 999999;
    const result = {polygons:[],origPolygons:[]};
    for (let _polygon of polygons) {
        const polygon = _polygon[0];
        const origPolygon = [];
        for (let point of polygon) {
            offsetX = point[0] < offsetX ? point[0] : offsetX;
            offsetY = point[1] < offsetY ? point[1] : offsetY;
            origPolygon.push([point[0],point[1]])
        }
        result.origPolygons.push(origPolygon);
    }
    result.offsetX = offsetX;
    result.offsetY = offsetY;
    for (let _polygon of polygons) {
        const polygon = _polygon[0];
        for (let point of polygon) {
            point[0] -= offsetX;
            point[1] -= offsetY;
        }
        result.polygons.push(polygon)
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
