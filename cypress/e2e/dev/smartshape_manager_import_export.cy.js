import SmartShapeManager from "../../../src/SmartShapeManager/SmartShapeManager.js";
import {readJSON} from "../../../src/utils/index.js";
import geoJSON from "../../../tests/assets/geocountries.json";

describe('SmartShapeManager import/export', () => {
  it('toJSON', () => {
    cy.visit('http://localhost:5173/tests/empty.html').then(() => {
      const app = Cypress.$("#app").toArray()[0];
      app.style.height = "800px";
      const shape1 = SmartShapeManager.createShape(app,{id:"shape1",name:"Shape 1"},[[0,100],[100,0],[200,100]]);
      const shape2 = SmartShapeManager.createShape(app, {id:"shape2",name:"Shape 2"}, [[10, 10], [20, 20], [30, 10]]);
      const shape3 = SmartShapeManager.createShape(app, {id:"shape3",name:"Shape 3"}, [[50, 50], [60, 40], [70, 50]]);
      const shape4 = SmartShapeManager.createShape(app,{id:"shape4",name:"Shape 4"}, [[20, 80], [30, 70], [40, 80]]);
      shape1.addChild(shape2);
      shape3.addChild(shape4);
      let jsonString = SmartShapeManager.toJSON();
      let jsonObj = readJSON(jsonString);
      assert.isNotNull(jsonObj,"Should read JSON object correctly");
      assert.equal(jsonObj.length,2,"Should include only root shapes from manager to exported string");
      assert.equal(jsonObj[0].children.length,1,"Should export children of first shape");
      assert.equal(jsonObj[1].children.length,1,"Should export children of second shape");
      assert.equal(jsonObj[0].children[0].options.id,"shape2",
          "Should export options of children of first shape correctly"
      );
      assert.equal(jsonObj[1].children[0].options.name,"Shape 4",
          "Should export options of children of second shape correctly"
      );
      jsonString = SmartShapeManager.toJSON([shape1,shape2]);
      jsonObj = readJSON(jsonString);
      assert.isNotNull(jsonObj,"Should read JSON object correctly");
      assert.equal(jsonObj.length,1,"Should include only root shapes from manager to exported string");
      assert.equal(jsonObj[0].children.length,1,"Should export children of first shape");
      assert.equal(jsonObj[0].children[0].options.id,"shape2",
          "Should export options of children of first shape correctly"
      );
      SmartShapeManager.clear();
      assert.equal(SmartShapeManager.length(),0,"Should not contain any shapes after clear the manager")
    })
  })
  it('fromJSON', () => {
    cy.visit('http://localhost:5173/tests/empty.html').then(() => {
      const app = Cypress.$("#app").toArray()[0];
      app.style.height = "800px";
      let jsonString = `[{"options":{"id":"shape1","name":"Shape 1","maxPoints":-1,"stroke":"rgb(0,0,0)","strokeWidth":"2","strokeLinecap":"","strokeDasharray":"","fill":"none","fillGradient":null,"fillImage":null,"fillOpacity":"1","filters":{},"canDragShape":true,"canAddPoints":false,"canScale":false,"canRotate":false,"offsetX":0,"offsetY":0,"classes":"","style":{},"pointOptions":{},"zIndex":1000,"bounds":{"left":-1,"top":-1,"right":-1,"bottom":-1},"visible":true,"displayMode":"default","managed":true,"minWidth":-1,"minHeight":-1,"maxWidth":-1,"maxHeight":-1},"points":[{"x":0,"y":100,"options":{"id":"","width":10,"height":10,"classes":"","style":{"border-width":"1px","border-style":"solid","border-color":"black","border-radius":"25px","cursor":"pointer","background-color":"red"},"canDrag":true,"canDelete":false,"zIndex":1001,"bounds":{"left":0,"top":0,"right":969,"bottom":800},"moveDirections":[1,0,2,3],"visible":true,"hidden":false,"forceDisplay":false}},{"x":100,"y":0,"options":{"id":"","width":10,"height":10,"classes":"","style":{"border-width":"1px","border-style":"solid","border-color":"black","border-radius":"25px","cursor":"pointer","background-color":"red"},"canDrag":true,"canDelete":false,"zIndex":1001,"bounds":{"left":0,"top":0,"right":969,"bottom":800},"moveDirections":[1,0,2,3],"visible":true,"hidden":false,"forceDisplay":false}},{"x":200,"y":100,"options":{"id":"","width":10,"height":10,"classes":"","style":{"border-width":"1px","border-style":"solid","border-color":"black","border-radius":"25px","cursor":"pointer","background-color":"red"},"canDrag":true,"canDelete":false,"zIndex":1001,"bounds":{"left":0,"top":0,"right":969,"bottom":800},"moveDirections":[1,0,2,3],"visible":true,"hidden":false,"forceDisplay":false}}],"children":[{"options":{"id":"shape2","name":"Shape 2","maxPoints":-1,"stroke":"rgb(0,0,0)","strokeWidth":"2","strokeLinecap":"","strokeDasharray":"","fill":"none","fillGradient":null,"fillImage":null,"fillOpacity":"1","filters":{},"canDragShape":true,"canAddPoints":false,"canScale":false,"canRotate":false,"offsetX":0,"offsetY":0,"classes":"","style":{},"pointOptions":{},"zIndex":1000,"bounds":{"left":-1,"top":-1,"right":-1,"bottom":-1},"visible":true,"displayMode":"default","managed":true,"minWidth":-1,"minHeight":-1,"maxWidth":-1,"maxHeight":-1},"points":[{"x":10,"y":10,"options":{"id":"","width":10,"height":10,"classes":"","style":{"border-width":"1px","border-style":"solid","border-color":"black","border-radius":"25px","cursor":"pointer","background-color":"red"},"canDrag":true,"canDelete":false,"zIndex":1001,"bounds":{"left":0,"top":0,"right":969,"bottom":800},"moveDirections":[1,0,2,3],"visible":true,"hidden":false,"forceDisplay":false}},{"x":20,"y":20,"options":{"id":"","width":10,"height":10,"classes":"","style":{"border-width":"1px","border-style":"solid","border-color":"black","border-radius":"25px","cursor":"pointer","background-color":"red"},"canDrag":true,"canDelete":false,"zIndex":1001,"bounds":{"left":0,"top":0,"right":969,"bottom":800},"moveDirections":[1,0,2,3],"visible":true,"hidden":false,"forceDisplay":false}},{"x":30,"y":10,"options":{"id":"","width":10,"height":10,"classes":"","style":{"border-width":"1px","border-style":"solid","border-color":"black","border-radius":"25px","cursor":"pointer","background-color":"red"},"canDrag":true,"canDelete":false,"zIndex":1001,"bounds":{"left":0,"top":0,"right":969,"bottom":800},"moveDirections":[1,0,2,3],"visible":true,"hidden":false,"forceDisplay":false}}]}]},{"options":{"id":"shape3","name":"Shape 3","maxPoints":-1,"stroke":"rgb(0,0,0)","strokeWidth":"2","strokeLinecap":"","strokeDasharray":"","fill":"none","fillGradient":null,"fillImage":null,"fillOpacity":"1","filters":{},"canDragShape":true,"canAddPoints":false,"canScale":false,"canRotate":false,"offsetX":0,"offsetY":0,"classes":"","style":{},"pointOptions":{},"zIndex":1000,"bounds":{"left":-1,"top":-1,"right":-1,"bottom":-1},"visible":true,"displayMode":"default","managed":true,"minWidth":-1,"minHeight":-1,"maxWidth":-1,"maxHeight":-1},"points":[{"x":50,"y":50,"options":{"id":"","width":10,"height":10,"classes":"","style":{"border-width":"1px","border-style":"solid","border-color":"black","border-radius":"25px","cursor":"pointer","background-color":"red"},"canDrag":true,"canDelete":false,"zIndex":1001,"bounds":{"left":0,"top":0,"right":969,"bottom":800},"moveDirections":[1,0,2,3],"visible":true,"hidden":false,"forceDisplay":false}},{"x":60,"y":40,"options":{"id":"","width":10,"height":10,"classes":"","style":{"border-width":"1px","border-style":"solid","border-color":"black","border-radius":"25px","cursor":"pointer","background-color":"red"},"canDrag":true,"canDelete":false,"zIndex":1001,"bounds":{"left":0,"top":0,"right":969,"bottom":800},"moveDirections":[1,0,2,3],"visible":true,"hidden":false,"forceDisplay":false}},{"x":70,"y":50,"options":{"id":"","width":10,"height":10,"classes":"","style":{"border-width":"1px","border-style":"solid","border-color":"black","border-radius":"25px","cursor":"pointer","background-color":"red"},"canDrag":true,"canDelete":false,"zIndex":1001,"bounds":{"left":0,"top":0,"right":969,"bottom":800},"moveDirections":[1,0,2,3],"visible":true,"hidden":false,"forceDisplay":false}}],"children":[{"options":{"id":"shape4","name":"Shape 4","maxPoints":-1,"stroke":"rgb(0,0,0)","strokeWidth":"2","strokeLinecap":"","strokeDasharray":"","fill":"none","fillGradient":null,"fillImage":null,"fillOpacity":"1","filters":{},"canDragShape":true,"canAddPoints":false,"canScale":false,"canRotate":false,"offsetX":0,"offsetY":0,"classes":"","style":{},"pointOptions":{},"zIndex":1000,"bounds":{"left":-1,"top":-1,"right":-1,"bottom":-1},"visible":true,"displayMode":"default","managed":true,"minWidth":-1,"minHeight":-1,"maxWidth":-1,"maxHeight":-1},"points":[{"x":20,"y":80,"options":{"id":"","width":10,"height":10,"classes":"","style":{"border-width":"1px","border-style":"solid","border-color":"black","border-radius":"25px","cursor":"pointer","background-color":"red"},"canDrag":true,"canDelete":false,"zIndex":1001,"bounds":{"left":0,"top":0,"right":969,"bottom":800},"moveDirections":[1,0,2,3],"visible":true,"hidden":false,"forceDisplay":false}},{"x":30,"y":70,"options":{"id":"","width":10,"height":10,"classes":"","style":{"border-width":"1px","border-style":"solid","border-color":"black","border-radius":"25px","cursor":"pointer","background-color":"red"},"canDrag":true,"canDelete":false,"zIndex":1001,"bounds":{"left":0,"top":0,"right":969,"bottom":800},"moveDirections":[1,0,2,3],"visible":true,"hidden":false,"forceDisplay":false}},{"x":40,"y":80,"options":{"id":"","width":10,"height":10,"classes":"","style":{"border-width":"1px","border-style":"solid","border-color":"black","border-radius":"25px","cursor":"pointer","background-color":"red"},"canDrag":true,"canDelete":false,"zIndex":1001,"bounds":{"left":0,"top":0,"right":969,"bottom":800},"moveDirections":[1,0,2,3],"visible":true,"hidden":false,"forceDisplay":false}}]}]}]`;
      let shapes = SmartShapeManager.fromJSON(app,jsonString);
      assert.isNotNull(shapes,'Should return shapes');
      assert.equal(shapes.length,2,"Should be only root shapes in the result");
      assert.equal(SmartShapeManager.length(),4,"Should be all shapes including children in the manager");
      let shape1 = SmartShapeManager.findShapeById("shape1");
      assert.isNotNull(shape1, "Should load shape1");
      assert.equal(shape1.getChildren().length,1,"Should load children of shape1");
      const shape3 = SmartShapeManager.findShapeById("shape3");
      assert.isNotNull(shape1, "Should load shape3");
      assert.equal(shape3.getChildren().length,1,"Should load children of shape3");
      SmartShapeManager.clear();
      assert.equal(SmartShapeManager.length(),0,"Should clear all shapes from manager");
      jsonString = `[{"options":{"id":"shape1","name":"Shape 1","maxPoints":-1,"stroke":"rgb(0,0,0)","strokeWidth":"2","strokeLinecap":"","strokeDasharray":"","fill":"none","fillGradient":null,"fillImage":null,"fillOpacity":"1","filters":{},"canDragShape":true,"canAddPoints":false,"canScale":false,"canRotate":false,"offsetX":0,"offsetY":0,"classes":"","style":{},"pointOptions":{},"zIndex":1000,"bounds":{"left":-1,"top":-1,"right":-1,"bottom":-1},"visible":true,"displayMode":"default","managed":true,"minWidth":-1,"minHeight":-1,"maxWidth":-1,"maxHeight":-1},"points":[{"x":0,"y":100,"options":{"id":"","width":10,"height":10,"classes":"","style":{"border-width":"1px","border-style":"solid","border-color":"black","border-radius":"25px","cursor":"pointer","background-color":"red"},"canDrag":true,"canDelete":false,"zIndex":1001,"bounds":{"left":0,"top":0,"right":969,"bottom":800},"moveDirections":[1,0,2,3],"visible":true,"hidden":false,"forceDisplay":false}},{"x":100,"y":0,"options":{"id":"","width":10,"height":10,"classes":"","style":{"border-width":"1px","border-style":"solid","border-color":"black","border-radius":"25px","cursor":"pointer","background-color":"red"},"canDrag":true,"canDelete":false,"zIndex":1001,"bounds":{"left":0,"top":0,"right":969,"bottom":800},"moveDirections":[1,0,2,3],"visible":true,"hidden":false,"forceDisplay":false}},{"x":200,"y":100,"options":{"id":"","width":10,"height":10,"classes":"","style":{"border-width":"1px","border-style":"solid","border-color":"black","border-radius":"25px","cursor":"pointer","background-color":"red"},"canDrag":true,"canDelete":false,"zIndex":1001,"bounds":{"left":0,"top":0,"right":969,"bottom":800},"moveDirections":[1,0,2,3],"visible":true,"hidden":false,"forceDisplay":false}}],"children":[{"options":{"id":"shape2","name":"Shape 2","maxPoints":-1,"stroke":"rgb(0,0,0)","strokeWidth":"2","strokeLinecap":"","strokeDasharray":"","fill":"none","fillGradient":null,"fillImage":null,"fillOpacity":"1","filters":{},"canDragShape":true,"canAddPoints":false,"canScale":false,"canRotate":false,"offsetX":0,"offsetY":0,"classes":"","style":{},"pointOptions":{},"zIndex":1000,"bounds":{"left":-1,"top":-1,"right":-1,"bottom":-1},"visible":true,"displayMode":"default","managed":true,"minWidth":-1,"minHeight":-1,"maxWidth":-1,"maxHeight":-1},"points":[{"x":10,"y":10,"options":{"id":"","width":10,"height":10,"classes":"","style":{"border-width":"1px","border-style":"solid","border-color":"black","border-radius":"25px","cursor":"pointer","background-color":"red"},"canDrag":true,"canDelete":false,"zIndex":1001,"bounds":{"left":0,"top":0,"right":969,"bottom":800},"moveDirections":[1,0,2,3],"visible":true,"hidden":false,"forceDisplay":false}},{"x":20,"y":20,"options":{"id":"","width":10,"height":10,"classes":"","style":{"border-width":"1px","border-style":"solid","border-color":"black","border-radius":"25px","cursor":"pointer","background-color":"red"},"canDrag":true,"canDelete":false,"zIndex":1001,"bounds":{"left":0,"top":0,"right":969,"bottom":800},"moveDirections":[1,0,2,3],"visible":true,"hidden":false,"forceDisplay":false}},{"x":30,"y":10,"options":{"id":"","width":10,"height":10,"classes":"","style":{"border-width":"1px","border-style":"solid","border-color":"black","border-radius":"25px","cursor":"pointer","background-color":"red"},"canDrag":true,"canDelete":false,"zIndex":1001,"bounds":{"left":0,"top":0,"right":969,"bottom":800},"moveDirections":[1,0,2,3],"visible":true,"hidden":false,"forceDisplay":false}}]}]}]`;
      shapes = SmartShapeManager.fromJSON(app,jsonString);
      assert.isNotNull(shapes,'Should return shapes');
      assert.equal(shapes.length,1,"Should be only root shapes in the result");
      assert.equal(SmartShapeManager.length(),2,"Should be all shapes including children in the manager");
      shape1 = SmartShapeManager.findShapeById("shape1");
      assert.isNotNull(shape1, "Should load shape1");
      assert.equal(shape1.getChildren().length,1,"Should load children of shape1");
      const shape2 = SmartShapeManager.findShapeById("shape2");
      assert.isNotNull(shape2, "Should load shape2");
      SmartShapeManager.clear();
      assert.equal(SmartShapeManager.length(),0,"Should clear all shapes from manager");
    });
  });
  it('fromGeoJson', () => {
    cy.visit('http://localhost:5173/tests/empty.html').then(() => {
      const app = Cypress.$("#app").toArray()[0];
      const shapes = SmartShapeManager.fromGeoJson(app,geoJSON,{nameField:"NAME",idField:"ADM0_A3",width:200});
      assert.equal(shapes.length,177,"Should import all shapes from collection");
      const shape = shapes[0];
      assert.equal(shape.options.name,"Fiji","Shape should have correct name");
      const pos = shape.getPosition(true);
      assert.equal(parseInt(pos.width),200,"Should scale shape properly")
    })
  })
})
