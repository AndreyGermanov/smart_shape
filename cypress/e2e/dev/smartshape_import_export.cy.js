import SmartShapeManager from "../../../src/SmartShapeManager/SmartShapeManager.js";
import SmartShape from "../../../src/SmartShape/SmartShape.js";
import {SmartShapeDisplayMode} from "../../../src/SmartShape/SmartShape.js";
import {readJSON} from "../../../src/utils/index.js";
import SmartShapeEventListener,{ShapeEvents} from "../../../src/SmartShape/SmartShapeEventListener.js";

describe('SmartShape import/export tests', () => {
  const shape1Options = {
    id: "shape1",
    name: "Shape 1",
    maxPoints: 15,
    fillGradient: {
      type:"linear",
      steps: [
        {
          offset: "30%",
          stopColor: "#ffaa00",
          stopOpacity: "1"
        },
        {
          offset: "63%",
          stopColor: "#ff0000",
          stopOpacity: "0.5"
        },
        {
          offset: "100%",
          stopColor: "#ffaa00",
          stopOpacity: "1"
        }
      ]
    },
    fillImage: {
      href:"../assets/demo.jpg",
      width:200,
      height:133,
    },
    filters: {
      feDropShadow: {
        dx:0.2,
        dy:0.4,
        stdDeviation:0.5,
        floodColor:"#555555",
        floodOpacity:0.9
      },
      feGaussianBlur: {
        in:"SourceGraphic",
        stdDeviation: 3,
      }
    },
    canDragShape: true,
    canAddPoints: true,
    canScale: true,
    canRotate: true,
    offsetX: 20,
    offsetY: 30,
    classes: "newShape",
    style: {
      fill:"none",
      "fill-opacity":1,
      "stroke":"black",
      "stroke-width":2,
      "stroke-opacity":1,
      "stroke-dasharray":0,
      "stroke-linecap":"square",
      "border-color": "blue",
      "border-width": "10px"
    },
    pointOptions: {
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
      canDrag: true,
      canDelete: true,
      zIndex: 500,
      bounds:{left:5,right:200,top:10,bottom:300},
      moveDirections: [1,2],
      visible:true,
      hidden:false,
      forceDisplay:true
    },
    zIndex: 200,
    bounds: {left:20,top:10,right:300,bottom:400},
    visible:true,
    displayMode: SmartShapeDisplayMode.DEFAULT,
    managed: true,
    minWidth: 50,
    minHeight : 40,
    maxWidth: 200,
    maxHeight: 150,
    minPoints:3,
    hasContextMenu: true,
    groupChildShapes:true,
    moveToTop: true,
    compactExport: false,
    forceCreateEvent: false,
    zoomLevel:1,
    zoomable: true,
    zoomStep: 0.1,
    initialPoints: [],
    displayAsPath: false,
    simpleMode: false,
    scaleFactorX: 1,
    scaleFactorY: 1,
    rotateAngle: 0,
    flippedX: false,
    flippedY: false
  }
  it('toJSON basic', () => {
    cy.visit('http://localhost:5173/tests/empty.html').then(() => {
      const app = Cypress.$("#app").toArray()[0];
      app.style.height = "800px";
      const shape = new SmartShape().init(app,shape1Options,[[0,100],[100,0],[200,100]]);
      const jsonString = shape.toJSON();
      const jsonObj = readJSON(jsonString);
      assert.isNotNull(jsonObj,"Should correctly parse JSON object from string");
      assert.deepEqual(jsonObj.options,shape.options, "Should save shape options correctly");
      assert.equal(jsonObj.points.length,shape.points.length,"Should save all points");
      for (let index in jsonObj.points) {
        assert.equal(jsonObj.points[index].x,shape.points[index].x,"Should save x coordinate of point");
        assert.equal(jsonObj.points[index].y,shape.points[index].y,"Should save x coordinate of point");
        for (let name in jsonObj.points[index].options) {
          assert.deepEqual(jsonObj.points[index].options[name],shape.points[index].options[name],
              "Should correctly save option '"+name+"' for point");
        }
      }
      shape.destroy();
    });
  })
  it("toJSON with children", () => {
    cy.visit('http://localhost:5173/tests/empty.html').then(() => {
      const app = Cypress.$("#app").toArray()[0];
      app.style.height = "800px";
      const shape1 = new SmartShape().init(app, {id:"shape1",name:"Shape 1"}, [[0, 100], [100, 0], [200, 100]]);
      const shape2 = new SmartShape().init(app, {id:"shape2",name:"Shape 2"}, [[10, 10], [20, 20], [30, 10]]);
      const shape3 = new SmartShape().init(app, {id:"shape3",name:"Shape 3"}, [[50, 50], [60, 40], [70, 50]]);
      const shape4 = new SmartShape().init(app, {id:"shape4",name:"Shape 4"}, [[20, 80], [30, 70], [40, 80]]);
      shape1.addChild(shape2);
      shape2.addChild(shape3);
      shape2.addChild(shape4);
      let jsonString = shape1.toJSON(false);
      let jsonObj = readJSON(jsonString);
      assert.isNotNull(jsonObj,"Should correctly parse JSON object from string");
      assert.isUndefined(jsonObj.children,"Should not save children if it's disabled");
      jsonString = shape1.toJSON(true);
      jsonObj = readJSON(jsonString);
      assert.isNotNull(jsonObj,"Should correctly parse JSON object from string");
      assert.equal(jsonObj.children.length,1,"Should save child of first shape");
      assert.equal(jsonObj.children[0].options.id,shape2.options.id,"Should save correct ID of first child");
      assert.equal(jsonObj.children[0].children[0].options.id,shape3.options.id,"Should save correct ID of second child");
      assert.equal(jsonObj.children[0].children[1].options.id,shape4.options.id,"Should save correct ID of third child");
      assert.equal(jsonObj.children[0].options.name,shape2.options.name,"Should save correct name of first child");
      assert.equal(jsonObj.children[0].children[0].options.name,shape3.options.name,"Should save correct name of second child");
      assert.equal(jsonObj.children[0].children[1].options.name,shape4.options.name,"Should save correct name of third child");
      shape1.destroy();
      shape2.destroy();
      shape3.destroy();
      shape4.destroy();
    })
  })
  it('toJSON compact', () => {
    cy.visit('http://localhost:5173/tests/empty.html').then(() => {
      const app = Cypress.$("#app").toArray()[0];
      app.style.height = "800px";
      const shape = new SmartShape().init(app,shape1Options,[[0,100],[100,0],[200,100]]);
      const jsonString = shape.toJSON(true,true);
      const jsonObj = readJSON(jsonString);
      assert.isNotNull(jsonObj,"Should correctly parse JSON object from string");
      assert.deepEqual(jsonObj.options,shape.options, "Should save shape options correctly");
      assert.equal(jsonObj.points.length,shape.points.length,"Should save all points");
      assert.equal(jsonObj.points[0].length,2,"Should save points as an array of coordinates only");
      shape.destroy();
    });
  })
  it("fromJSON basic", () => {
    cy.visit('http://localhost:5173/tests/empty.html').then(() => {
      const app = Cypress.$("#app").toArray()[0];
      app.style.height = "800px";
      const shape = new SmartShape();
      shape.eventListener = new SmartShapeEventListener(shape);
      let triggered = false;
      shape.addEventListener(ShapeEvents.SHAPE_CREATE, (event) => {
        triggered = true;
        assert.equal(event.target, shape, "Should send correct object to event");
      })
      const jsonString = `{"options":{"id":"shape1","name":"Shape 1","maxPoints":15,"fillGradient":{"type":"linear","steps":[{"offset":"30%","stopColor":"#ffaa00","stopOpacity":"1"},{"offset":"63%","stopColor":"#ff0000","stopOpacity":"0.5"},{"offset":"100%","stopColor":"#ffaa00","stopOpacity":"1"}]},"fillImage":{"href":"../assets/demo.jpg","width":200,"height":133},"filters":{"feDropShadow":{"dx":0.2,"dy":0.4,"stdDeviation":0.5,"floodColor":"#555555","floodOpacity":0.9},"feGaussianBlur":{"in":"SourceGraphic","stdDeviation":3}},"canDragShape":true,"canAddPoints":true,"canScale":true,"canRotate":true,"offsetX":20,"offsetY":30,"classes":"newShape","style":{"stroke-width":2,"stroke":"black","fill":"none","border-color":"blue","border-width":"10px"},"pointOptions":{"width":20,"height":20,"id":"point1","classes":"newPoint","style":{"border-width":"2px","border-style":"solid","border-color":"green","background-color":"yellow","border-radius":"5px","cursor":"pointer"},"canDrag":true,"canDelete":true,"zIndex":500,"bounds":{"left":5,"right":200,"top":10,"bottom":300},"moveDirections":[1,2],"visible":true,"hidden":false,"forceDisplay":true},"zIndex":200,"bounds":{"left":20,"top":10,"right":300,"bottom":400},"visible":true,"displayMode":"default","managed":true,"minWidth":50,"minHeight":40,"maxWidth":200,"maxHeight":150,"hasContextMenu":true,"minPoints":3,"groupChildShapes":true,"moveToTop":true,"compactExport":false},"points":[{"x":20,"y":130,"options":{"id":"point1","width":20,"height":20,"classes":"newPoint","style":{"border-width":"2px","border-style":"solid","border-color":"green","border-radius":"5px","cursor":"pointer","background-color":"yellow"},"canDrag":true,"canDelete":true,"zIndex":202,"bounds":{"left":20,"top":10,"right":300,"bottom":400},"moveDirections":[1,2],"visible":true,"hidden":false,"forceDisplay":true}},{"x":120,"y":30,"options":{"id":"point1","width":20,"height":20,"classes":"newPoint","style":{"border-width":"2px","border-style":"solid","border-color":"green","border-radius":"5px","cursor":"pointer","background-color":"yellow"},"canDrag":true,"canDelete":true,"zIndex":202,"bounds":{"left":20,"top":10,"right":300,"bottom":400},"moveDirections":[1,2],"visible":true,"hidden":false,"forceDisplay":true}},{"x":220,"y":130,"options":{"id":"point1","width":20,"height":20,"classes":"newPoint","style":{"border-width":"2px","border-style":"solid","border-color":"green","border-radius":"5px","cursor":"pointer","background-color":"yellow"},"canDrag":true,"canDelete":true,"zIndex":202,"bounds":{"left":20,"top":10,"right":300,"bottom":400},"moveDirections":[1,2],"visible":true,"hidden":false,"forceDisplay":true}}]}`;
      shape.fromJSON(app, jsonString);
      assert.equal(shape.root, app, "Should put loaded shape to correct container");
      assert.isTrue(triggered, 'Should trigger shape create event');
      assert.deepEqual(shape.options, shape1Options, "Should load shape options correctly");
      assert.equal(shape.points.length, 3, "Should load shape points correctly");
      shape.destroy();
    });
  })
  it("fromJSON with children", () => {
    cy.visit('http://localhost:5173/tests/empty.html').then(() => {
      SmartShapeManager.clear();
      const app = Cypress.$("#app").toArray()[0];
      app.style.height = "800px";
      const jsonString = `{"options":{"id":"shape1","name":"Shape 1","maxPoints":-1,"fillGradient":null,"fillImage":null,"fillOpacity":"1","filters":{},"canDragShape":true,"canAddPoints":false,"canScale":false,"canRotate":false,"offsetX":0,"offsetY":0,"classes":"","style":{"stroke-width":2,"stroke":"black","fill":"none"},"pointOptions":{},"zIndex":1000,"bounds":{"left":-1,"top":-1,"right":-1,"bottom":-1},"visible":true,"displayMode":"default","managed":true,"minWidth":-1,"minHeight":-1,"maxWidth":-1,"maxHeight":-1,"hasContextMenu":true},"points":[{"x":0,"y":100,"options":{"id":"","width":10,"height":10,"classes":"","style":{"border-width":"1px","border-style":"solid","border-color":"black","border-radius":"25px","cursor":"pointer","background-color":"red"},"canDrag":true,"canDelete":false,"zIndex":1001,"bounds":{"left":0,"top":0,"right":969,"bottom":800},"moveDirections":[1,0,2,3],"visible":true,"hidden":false,"forceDisplay":false}},{"x":100,"y":0,"options":{"id":"","width":10,"height":10,"classes":"","style":{"border-width":"1px","border-style":"solid","border-color":"black","border-radius":"25px","cursor":"pointer","background-color":"red"},"canDrag":true,"canDelete":false,"zIndex":1001,"bounds":{"left":0,"top":0,"right":969,"bottom":800},"moveDirections":[1,0,2,3],"visible":true,"hidden":false,"forceDisplay":false}},{"x":200,"y":100,"options":{"id":"","width":10,"height":10,"classes":"","style":{"border-width":"1px","border-style":"solid","border-color":"black","border-radius":"25px","cursor":"pointer","background-color":"red"},"canDrag":true,"canDelete":false,"zIndex":1001,"bounds":{"left":0,"top":0,"right":969,"bottom":800},"moveDirections":[1,0,2,3],"visible":true,"hidden":false,"forceDisplay":false}}],"children":[{"options":{"id":"shape2","name":"Shape 2","maxPoints":-1,"stroke":"","strokeWidth":"","strokeLinecap":"","strokeDasharray":"","fill":"","fillGradient":null,"fillImage":null,"fillOpacity":"1","filters":{},"canDragShape":true,"canAddPoints":false,"canScale":false,"canRotate":false,"offsetX":0,"offsetY":0,"classes":"","style":{"stroke-width":2,"stroke":"black","fill":"none"},"pointOptions":{},"zIndex":1000,"bounds":{"left":-1,"top":-1,"right":-1,"bottom":-1},"visible":true,"displayMode":"default","managed":true,"minWidth":-1,"minHeight":-1,"maxWidth":-1,"maxHeight":-1,"hasContextMenu":true},"points":[{"x":10,"y":10,"options":{"id":"","width":10,"height":10,"classes":"","style":{"border-width":"1px","border-style":"solid","border-color":"black","border-radius":"25px","cursor":"pointer","background-color":"red"},"canDrag":true,"canDelete":false,"zIndex":1001,"bounds":{"left":0,"top":0,"right":969,"bottom":800},"moveDirections":[1,0,2,3],"visible":true,"hidden":false,"forceDisplay":false}},{"x":20,"y":20,"options":{"id":"","width":10,"height":10,"classes":"","style":{"border-width":"1px","border-style":"solid","border-color":"black","border-radius":"25px","cursor":"pointer","background-color":"red"},"canDrag":true,"canDelete":false,"zIndex":1001,"bounds":{"left":0,"top":0,"right":969,"bottom":800},"moveDirections":[1,0,2,3],"visible":true,"hidden":false,"forceDisplay":false}},{"x":30,"y":10,"options":{"id":"","width":10,"height":10,"classes":"","style":{"border-width":"1px","border-style":"solid","border-color":"black","border-radius":"25px","cursor":"pointer","background-color":"red"},"canDrag":true,"canDelete":false,"zIndex":1001,"bounds":{"left":0,"top":0,"right":969,"bottom":800},"moveDirections":[1,0,2,3],"visible":true,"hidden":false,"forceDisplay":false}}],"children":[{"options":{"id":"shape3","name":"Shape 3","maxPoints":-1,"stroke":"","strokeWidth":"","strokeLinecap":"","strokeDasharray":"","fill":"","fillGradient":null,"fillImage":null,"fillOpacity":"1","filters":{},"canDragShape":true,"canAddPoints":false,"canScale":false,"canRotate":false,"offsetX":0,"offsetY":0,"classes":"","style":{"stroke-width":2,"stroke":"black","fill":"none"},"pointOptions":{},"zIndex":1000,"bounds":{"left":-1,"top":-1,"right":-1,"bottom":-1},"visible":true,"displayMode":"default","managed":true,"minWidth":-1,"minHeight":-1,"maxWidth":-1,"maxHeight":-1,"hasContextMenu":true},"points":[{"x":50,"y":50,"options":{"id":"","width":10,"height":10,"classes":"","style":{"border-width":"1px","border-style":"solid","border-color":"black","border-radius":"25px","cursor":"pointer","background-color":"red"},"canDrag":true,"canDelete":false,"zIndex":1001,"bounds":{"left":0,"top":0,"right":969,"bottom":800},"moveDirections":[1,0,2,3],"visible":true,"hidden":false,"forceDisplay":false}},{"x":60,"y":40,"options":{"id":"","width":10,"height":10,"classes":"","style":{"border-width":"1px","border-style":"solid","border-color":"black","border-radius":"25px","cursor":"pointer","background-color":"red"},"canDrag":true,"canDelete":false,"zIndex":1001,"bounds":{"left":0,"top":0,"right":969,"bottom":800},"moveDirections":[1,0,2,3],"visible":true,"hidden":false,"forceDisplay":false}},{"x":70,"y":50,"options":{"id":"","width":10,"height":10,"classes":"","style":{"border-width":"1px","border-style":"solid","border-color":"black","border-radius":"25px","cursor":"pointer","background-color":"red"},"canDrag":true,"canDelete":false,"zIndex":1001,"bounds":{"left":0,"top":0,"right":969,"bottom":800},"moveDirections":[1,0,2,3],"visible":true,"hidden":false,"forceDisplay":false}}]},{"options":{"id":"shape4","name":"Shape 4","maxPoints":-1,"stroke":"","strokeWidth":"","strokeLinecap":"","strokeDasharray":"","fill":"","fillGradient":null,"fillImage":null,"fillOpacity":"1","filters":{},"canDragShape":true,"canAddPoints":false,"canScale":false,"canRotate":false,"offsetX":0,"offsetY":0,"classes":"","style":{"stroke-width":2,"stroke":"black","fill":"none"},"pointOptions":{},"zIndex":1000,"bounds":{"left":-1,"top":-1,"right":-1,"bottom":-1},"visible":true,"displayMode":"default","managed":true,"minWidth":-1,"minHeight":-1,"maxWidth":-1,"maxHeight":-1,"hasContextMenu":true},"points":[{"x":20,"y":80,"options":{"id":"","width":10,"height":10,"classes":"","style":{"border-width":"1px","border-style":"solid","border-color":"black","border-radius":"25px","cursor":"pointer","background-color":"red"},"canDrag":true,"canDelete":false,"zIndex":1001,"bounds":{"left":0,"top":0,"right":969,"bottom":800},"moveDirections":[1,0,2,3],"visible":true,"hidden":false,"forceDisplay":false}},{"x":30,"y":70,"options":{"id":"","width":10,"height":10,"classes":"","style":{"border-width":"1px","border-style":"solid","border-color":"black","border-radius":"25px","cursor":"pointer","background-color":"red"},"canDrag":true,"canDelete":false,"zIndex":1001,"bounds":{"left":0,"top":0,"right":969,"bottom":800},"moveDirections":[1,0,2,3],"visible":true,"hidden":false,"forceDisplay":false}},{"x":40,"y":80,"options":{"id":"","width":10,"height":10,"classes":"","style":{"border-width":"1px","border-style":"solid","border-color":"black","border-radius":"25px","cursor":"pointer","background-color":"red"},"canDrag":true,"canDelete":false,"zIndex":1001,"bounds":{"left":0,"top":0,"right":969,"bottom":800},"moveDirections":[1,0,2,3],"visible":true,"hidden":false,"forceDisplay":false}}]}]}]}`;
        let shape = new SmartShape().fromJSON(app,jsonString,false);
        assert.isNotNull(shape,"Should load shape");
        assert.equal(shape.getChildren().length,0,"Should not load children if it should not be done");
        shape.destroy();
        assert.equal(SmartShapeManager.length(),0,"Should not have any shapes after destroy");
        shape = new SmartShape().fromJSON(app,jsonString,true);
        assert.isNotNull(shape,"Should load shape");
        assert.equal(shape.getChildren().length,1,"Should contain 1 direct child");
        assert.equal(shape.getChildren(true).length,3,"Should contain 3 total children");
        assert.equal(SmartShapeManager.length(),4,
            "Should contain correct total number of shapes in manager");
        //shape.destroy();
        //assert.equal(SmartShapeManager.shapes.length,0,"Should destroy the shape and all children");
    });
  });
  it("fromJSON compact", () => {
    cy.visit('http://localhost:5173/tests/empty.html').then(() => {
      SmartShapeManager.clear();
      const app = Cypress.$("#app").toArray()[0];
      app.style.height = "800px";
      const shape = new SmartShape();
      let triggered = false;
      shape.eventListener = new SmartShapeEventListener(shape);
      shape.addEventListener(ShapeEvents.SHAPE_CREATE, (event) => {
        triggered = true;
        assert.equal(event.target, shape, "Should send correct object to event");
      })
      const jsonString = `{"options":{"id":"shape1","name":"Shape 1","maxPoints":15,"fillGradient":{"type":"linear","steps":[{"offset":"30%","stopColor":"#ffaa00","stopOpacity":"1"},{"offset":"63%","stopColor":"#ff0000","stopOpacity":"0.5"},{"offset":"100%","stopColor":"#ffaa00","stopOpacity":"1"}]},"fillImage":{"href":"../assets/demo.jpg","width":200,"height":133},"filters":{"feDropShadow":{"dx":0.2,"dy":0.4,"stdDeviation":0.5,"floodColor":"#555555","floodOpacity":0.9},"feGaussianBlur":{"in":"SourceGraphic","stdDeviation":3}},"canDragShape":true,"canAddPoints":true,"canScale":true,"canRotate":true,"offsetX":20,"offsetY":30,"classes":"newShape","style":{"fill":"none","fill-opacity":1,"stroke":"black","stroke-width":2,"stroke-opacity":1,"stroke-dasharray":0,"stroke-linecap":"square","border-color":"blue","border-width":"10px"},"pointOptions":{"width":20,"height":20,"id":"point1","classes":"newPoint","style":{"border-width":"2px","border-style":"solid","border-color":"green","background-color":"yellow","border-radius":"5px","cursor":"pointer"},"canDrag":true,"canDelete":true,"zIndex":500,"bounds":{"left":5,"right":200,"top":10,"bottom":300},"moveDirections":[1,2],"visible":true,"hidden":false,"forceDisplay":true},"zIndex":200,"bounds":{"left":20,"top":10,"right":300,"bottom":400},"visible":true,"displayMode":"default","managed":true,"minWidth":50,"minHeight":40,"maxWidth":200,"maxHeight":150,"hasContextMenu":true,"minPoints":3,"groupChildShapes":true,"moveToTop":true,"compactExport":false},"points":[[20,130],[120,30],[220,130]]}`;
      shape.fromJSON(app, jsonString);
      assert.equal(shape.root, app, "Should put loaded shape to correct container");
      assert.isTrue(triggered, 'Should trigger shape create event');
      assert.deepEqual(shape.options, shape1Options, "Should load shape options correctly");
      assert.equal(shape.points.length, 3, "Should load shape points correctly");
      assert.equal(shape.points[0].x, 20, "Should load shape point object correctly");
      shape.destroy();
    });
  })
})
