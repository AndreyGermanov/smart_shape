import {SmartShape} from "../../../src/index.js";

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
})
