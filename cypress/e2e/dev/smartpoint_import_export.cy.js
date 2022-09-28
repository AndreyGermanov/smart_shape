import SmartShapeManager from "../../../src/SmartShapeManager/SmartShapeManager.js";
import SmartPoint, {PointEvents} from "../../../src/SmartPoint/SmartPoint.js";
import {CSStoJsStyleName, readJSON} from "../../../src/utils/index.js";

describe('SmartPoint import/export tests', () => {
  const pointOptions = {
    width:20,
    height:20,
    id:"point1",
    classes:"newPoint",
    style: {
      "border-width":"2px",
      "border-style":"solid",
      "border-color":"green",
      "background-color":"yellow",
      "border-radius":"5px",
      "cursor": "pointer"
    },
    canDrag: false,
    canDelete: true,
    zIndex: 500,
    bounds:{left:5,right:200,top:10,bottom:300},
    moveDirections: [1,2],
    visible:true,
    hidden:true,
    forceDisplay:true
  };
  it('toJSON', () => {
    cy.visit('http://localhost:5173/tests/empty.html').then(() => {
      const point = new SmartPoint();
      point.init(100,100,pointOptions);
      const jsonString = point.toJSON();
      const jsonObj = readJSON(jsonString);
      assert.isNotNull(jsonObj,"Should correctly parse JSON object of point");
      assert.equal(jsonObj.x,point.x,"Should correctly save x option");
      assert.equal(jsonObj.y,point.y,"Should correctly save y option");
      for (let index in jsonObj.options) {
        assert.deepEqual(jsonObj.options[index],point.options[index],"Should correctly save point '"+index+"'");
      }
      assert.equal(Object.keys(jsonObj.options.style).length,Object.keys(pointOptions.style).length);
    })
  })
  it("fromJSON", () => {
    const jsonString = `
    {
      "x": 100,
      "y": 100,
      "guid": "6cc1009c0de54b81b0b805c2cfd57cfb",
      "options": {
        "id": "point1",
        "width": 20,
        "height": 20,
        "classes": "newPoint",
        "style": {
          "border-width": "2px",
          "border-style": "solid",
          "border-color": "green",
          "border-radius": "5px",
          "cursor": "pointer",
          "background-color": "yellow"
        },
        "canDrag": true,
        "canDelete": true,
        "zIndex": 500,
        "bounds": {
          "left": 5,
          "right": 200,
          "top": 10,
          "bottom": 300
        },
        "moveDirections": [1, 2],
        "visible": true,
        "hidden": false,
        "forceDisplay": true
      }
    }`;
    const jsonObj = readJSON(jsonString);
    const point = new SmartPoint();
    let triggered = false;
    point.addEventListener(PointEvents.POINT_ADDED, (event) => {
      assert.equal(event.target,point,"Should send correct point as an event target");
      triggered = true;
    })
    point.fromJSON(jsonString);
    assert.isNotNull(point.element,"Should create point element");
    assert.equal(jsonObj.x,point.x,"Should correctly save x option");
    assert.equal(jsonObj.y,point.y,"Should correctly save y option");
    for (let index in jsonObj.options) {
      assert.deepEqual(jsonObj.options[index],point.options[index],"Should correctly save point '"+index+"'");
    }
    point.redraw();
    for (let name in jsonObj.options.style) {
      assert.equal(jsonObj.options.style[name], point.element.style[CSStoJsStyleName(name)],"Should correctly apply style property '"+name+"'")
    }
    assert.equal(Object.keys(jsonObj.options.style).length,Object.keys(pointOptions.style).length);
    assert.isTrue(triggered,"Point created event should be triggered");

  })
})
