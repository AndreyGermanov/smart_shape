import {SmartShape} from "../../../src/smart_shape.js";

describe('Shadow SVG filter tests', () => {
  const setup = () => {
    const app = Cypress.$("#app").toArray()[0];
    app.style.height = "1000px";
    const shape = new SmartShape().init(app,{id:"shape1",fill:"yellow"},[[0,100],[100,0],[200,100]]);
    return [app,shape];
  }
  it('Should create all tags in SVG tag of shape to implement drop shadow', () => {
    cy.visit('http://localhost:5173/tests/empty.html').then(() => {
      const [app,shape] = setup();
      shape.setOptions({filters:{
          feDropShadow: {
            dx:2,
            dy:2,
            stdDeviation:0.5,
            "flood-color":"#555555",
            "flood-opacity":0.9
          }
        }});
      shape.redraw();
      const defs = shape.svg.querySelector("defs");
      assert.isNotNull(defs,"Should contain 'defs' tag inside svg container");
      const filters = defs.querySelectorAll("filter");
      assert(filters.length>0,"Should contain filter tags inside defs");
      assert.equal(filters[0].getAttribute("id"),shape.guid+"_filter")
      const dropShadow = filters[0].querySelector("feDropShadow");
      assert.isNotNull(dropShadow,"Should contain drop shadow filter inside filters")
      assert.equal(dropShadow.getAttribute("dx"),2,"Should contain dx attribute");
      assert.equal(dropShadow.getAttribute("dy"),2,"Should contain dy attribute");
      assert.equal(dropShadow.getAttribute("stdDeviation"),0.5,"Should contain stdDeviation attribute");
      assert.equal(dropShadow.getAttribute("flood-color"),"#555555","Should contain floodColor attribute");
      assert.equal(dropShadow.getAttribute("flood-opacity"),0.9,"Should contain floodColor attribute");
      const polygon = shape.svg.querySelector("polygon");
      assert.equal(polygon.style.filter,'url("#'+shape.guid+'_filter")',"Should apply filter to polygon");
    });
  })
})
