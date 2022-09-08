import {SmartShape} from "../../../src/smart_shape.js";
function initShape() {
  const app = Cypress.$("#app").toArray()[0];
  const shape = new SmartShape().init(app,{id:"shape1"},[[0,100],[100,0],[200,100]]);
  return [app,shape]
}
describe('Gradient fill tests', () => {
  it('Should add gradient fill correctly', () => {
    cy.visit('http://localhost:5173/tests/empty.html').then(() => {
      const [app,shape] = initShape();
      const gradientOptions = {
        type: "linear",
        gradientTransform: "rotate(90)",
        steps: [
          {
            offset: "30%",
            stopColor: "#ffaa00",
            stopOpacity: "1"
          },
          {
            offset: "60%",
            stopColor: "#ff0000",
            stopOpacity: "0.5"
          },
          {
            offset: "100%",
            stopColor: "#ffaa00",
            stopOpacity: "1"
          }
        ],
      }
      shape.setOptions({
        fill: "rgba(0,255,0,1)",
        fillGradient: gradientOptions
      })
      shape.redraw();
      cy.get("#shape1 > defs").should("exist").then(() => {
        cy.get("#shape1 > defs > linearGradient").should("exist").then(() => {
          cy.get("#shape1 > defs > linearGradient").should("have.attr","id",shape.guid+"_gradient").then(() => {
            cy.get("#shape1 > defs > linearGradient").should("have.attr","gradientTransform","rotate(90)").then(() => {
              const steps = Cypress.$("#shape1 > defs > linearGradient > stop").toArray();
              assert.equal(steps.length,3);
              assert.equal(steps[0].getAttribute("offset"),"30%");
              assert.equal(steps[0].getAttribute("stop-color"),"#ffaa00");
              assert.equal(steps[0].getAttribute("stop-opacity"),"1");
              assert.equal(steps[1].getAttribute("offset"),"60%");
              assert.equal(steps[1].getAttribute("stop-color"),"#ff0000");
              assert.equal(steps[1].getAttribute("stop-opacity"),"0.5");
              assert.equal(steps[2].getAttribute("offset"),"100%");
              assert.equal(steps[2].getAttribute("stop-color"),"#ffaa00");
              assert.equal(steps[2].getAttribute("stop-opacity"),"1");
              gradientOptions.type = "radial";
              gradientOptions.gradientTransform = "";
              shape.setOptions(gradientOptions);
              shape.redraw();
              cy.get("#shape1 > defs > linearGradient").should("not.exist").then(() => {
                cy.get("#shape1 > defs > radialGradient").should("exist").then(() => {
                  const steps = Cypress.$("#shape1 > defs > radialGradient > stop").toArray();
                  assert.equal(steps.length,3);
                  assert.equal(steps[0].getAttribute("offset"),"30%");
                  assert.equal(steps[0].getAttribute("stop-color"),"#ffaa00");
                  assert.equal(steps[0].getAttribute("stop-opacity"),"1");
                  assert.equal(steps[1].getAttribute("offset"),"60%");
                  assert.equal(steps[1].getAttribute("stop-color"),"#ff0000");
                  assert.equal(steps[1].getAttribute("stop-opacity"),"0.5");
                  assert.equal(steps[2].getAttribute("offset"),"100%");
                  assert.equal(steps[2].getAttribute("stop-color"),"#ffaa00");
                  assert.equal(steps[2].getAttribute("stop-opacity"),"1");
                });
              });
            })
          })
        })
      })
    })
  })
})
