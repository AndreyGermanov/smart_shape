import {SmartShape} from "../../../src/index.js";
import SmartShapeManager from "../../../src/SmartShapeManager/SmartShapeManager.js";

describe('SmartShape properties tests', () => {
  it('minWidth,minHeight,maxWidth,maxHeight', () => {
    cy.visit('http://localhost:5173/tests/empty.html').then(() => {
      const app = Cypress.$("#app").toArray()[0];
      app.style.height = "500px";
      const shape = new SmartShape().init(app,{id:"shape1",canScale:true,minWidth:50,minHeight:50,maxWidth:300,maxHeight:400},
          [[10,210],[10,10],[210,10],[210,210]]);
      shape.scaleTo(30,40);
      shape.calcPosition();
      let pos = shape.getPosition();
      assert.equal(pos.width,50,"Should not scale below minimum width");
      assert.equal(pos.height,50,"Should not scale below minimum height");
      shape.scaleTo(1000,1000);
      shape.calcPosition();
      pos = shape.getPosition();
      assert.equal(pos.width,300,"Should not scale above maximum width");
      assert.equal(pos.height,400,"Should not scale above maximum height");
    });
  })
  it("groupShapes", () => {
    cy.visit('http://localhost:5173/tests/empty.html').then(() => {
      SmartShapeManager.clear();
      const app = Cypress.$("#app").toArray()[0];
      app.style.height = "500px";
      const shape1 = new SmartShape().init(app,
          {id:"shape1",canScale:true,canRotate:true,minWidth:50,minHeight:50,maxWidth:300,maxHeight:400},
          [[10,210],[10,10],[210,10],[210,210]]);
      const shape2 = new SmartShape().init(app,
          {id:"shape2", canScale:true, canRotate:true},[[20,20],[40,20],[40,40],[20,40]]);
      const shape3 = new SmartShape().init(app,
          {id:"shape3", canScale:true, canRotate:true},[[60,20],[80,20],[80,40],[60,40]]);
      const shape4 = new SmartShape().init(app,
          {id:"shape4", canScale:true, canRotate:true},[[60,40],[80,40],[80,60],[60,60]]);
      shape1.setOptions({groupChildShapes:false})
      shape1.addChild(shape2);
      shape1.addChild(shape3);
      shape2.addChild(shape4);
      shape1.destroy();
      assert.equal(SmartShapeManager.shapes.length, 3,
          "Only parent should be destroyed if 'groupChildShapes' disabled");
    });
  })
})
