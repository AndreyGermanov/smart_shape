import SmartPoint from "../../../src/smart_point.js";
import SmartShape from "../../../src/smart_shape.js";
function initShape() {
  const app = Cypress.$("#app").toArray()[0]
  const shape = new SmartShape().init(app)
  return [app,shape]
}
describe('SmartPoint API tests', () => {
  it('create point and add it to shape', () => {
    cy.visit('http://localhost:5173/tests/empty.html').then(() => {
      const [app,shape] = initShape()
      const point1 = shape.putPoint(100,100,{id:"point1"});
      cy.get("#point1").should("exist").then(() => {
        const point2 = shape.findPoint(100,100)
        assert.isNotNull(point2);
        assert.equal(point2.shape,shape)
      });
    })
  })

  it("setOptions", () => {
    cy.visit('http://localhost:5173/tests/empty.html').then(() => {
      const [app,shape] = initShape()
      const point1 = shape.putPoint(100,100,{id:"point1"});
      point1.setOptions({
        id: "point2",
        width:100,
        height:200,
        classes: "newPoint",
        style: {
          backgroundColor: "rgb(0, 255, 0)",
          borderWidth : "5px",
          borderRadius: "0"
        },
        canDrag: false,
        canDelete: false,
        zIndex: 1001,
      })
      cy.get("#point2").should("have.class","newPoint").then(()=> {
        cy.get("#point2").should("have.css","width","100px").then(()=> {
          cy.get("#point2").should("have.css","height","200px").then(()=> {
            cy.get("#point2").should("have.css","background-color","rgb(0, 255, 0)").then(()=> {
              cy.get("#point2").should("have.css","border-width","5px").then(()=> {
                cy.get("#point2").should("have.css","border-radius","0px").then(()=> {
                  cy.get("#point2").should("have.css","z-index","1001").then(()=> {
                    assert.equal(point1.options.canDrag, false);
                    assert.equal(point1.options.canDelete, false);
                  });
                });
              })
            })
          })
        })
      })
    });
  })

  it("redraw", () => {
    cy.visit('http://localhost:5173/tests/empty.html').then(() => {
      const [app,shape] = initShape()
      const point1 = shape.putPoint(100,100,{id:"point1"});
      point1.element.id = "point2";
      cy.get("#point1").should("not.exist").then(() => {
        cy.get("#point2").should("exist").then(() => {
          point1.redraw();
          cy.get("#point2").should("not.exist").then(() => {
            cy.get("#point1").should("exist");
          })
        })
      })
    });
  })

  it("destroy", () => {
    cy.visit('http://localhost:5173/tests/empty.html').then(() => {
      const [app,shape] = initShape()
      const point1 = shape.putPoint(100,100,{id:"point1"});
      cy.get("#point1").should("exist").then(() => {
        point1.destroy();
        cy.get("#point1").should("not.exist").then(() => {
          assert.equal(shape.points.length,0)
        });
      });
    });
  })
})
