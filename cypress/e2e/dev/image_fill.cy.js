import {SmartShape} from "../../../src/smart_shape.js";
function initShape() {
  const app = Cypress.$("#app").toArray()[0];
  const shape = new SmartShape().init(app,{id:"shape1"},[[0,100],[100,0],[200,100]]);
  return [app,shape]
}
describe('Image fill tests', () => {
  it('Should add image fill correctly', () => {
    cy.visit('http://localhost:5173/tests/empty.html').then(() => {
      const [app,shape] = initShape();
      shape.setOptions({
        fill: "rgba(0,255,0,1)",
        fillImage: {
          href: "assets/demo.jpg",
          width: 200,
          height: 133
        }
      })
      shape.redraw();
      cy.get("#shape1 > defs").should("exist").then(() => {
        cy.get("#shape1 > defs > pattern").should("exist").then(() => {
          cy.get("#shape1 > defs > pattern").should("have.attr","id",shape.guid+"_pattern").then(() => {
            cy.get("#shape1 > defs > pattern").should("have.attr","width","200").then(() => {
              cy.get("#shape1 > defs > pattern").should("have.attr","height","133").then(() => {
                cy.get("#shape1 > defs > pattern > image").should("exist").then(() => {
                  cy.get("#shape1 > defs > pattern > image").should("have.attr","href","assets/demo.jpg").then(() => {
                    cy.get("#shape1 > defs > pattern > image").should("have.attr","width","200").then(() => {
                      cy.get("#shape1 > defs > pattern > image").should("have.attr","height","133").then(() => {

                      })
                    })
                  });
                });
              });
            })
          })
        })
      })
    })
  })
})
