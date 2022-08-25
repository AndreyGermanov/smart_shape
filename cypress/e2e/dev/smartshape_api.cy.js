import SmartShape from "../../../src/smart_shape.js";

function initShape() {
  const app = Cypress.$("#app").toArray()[0];
  const shape = new SmartShape().init(app,{id:"shape1",canAddPoints:true,canDeletePoints:true},
      [[0,100],[100,0],[200,100]]);
  return [app,shape];
}

describe('SmartShape API tests', () => {
  it('addPoint', () => {
    cy.visit('http://localhost:5173/tests/empty.html').then(() => {
      const [app,shape] = initShape()
      const point = shape.addPoint(100,200,{id:"point1"})
      assert.isNotNull(point)
      cy.get("#point1").should("exist")
      assert.equal(shape.points.length,4)
      const point2 = shape.addPoint(100,200)
      assert.isNull(point2)
      assert.equal(shape.points.length,4)
      const point3 = shape.findPoint(100,200)
      assert.isNotNull(point3)
      cy.get("#app").trigger("dblclick",{button:1,buttons:1,clientX:150,clientY:150}).then(() => {
        const newPoint = shape.findPoint(150-app.offsetLeft,150-app.offsetTop);
        assert.isNotNull(newPoint);
      })
    })
  })

  it('addPoints', () => {
    cy.visit('http://localhost:5173/tests/empty.html').then(() => {
      const [app, shape] = initShape();
      shape.addPoints([[150, 150], [200, 200]], {style: {backgroundColor: 'rgb(144, 238, 144)'}})
      const point1 = shape.findPoint(150, 150);
      assert.isNotNull(point1)
      point1.element.id = "point1";
      cy.get("#point1").should("have.css", "background-color", 'rgb(144, 238, 144)').then(() => {
        const point2 = shape.findPoint(200, 200)
        point2.element.id = "point2";
        cy.get("#point2").should("have.css", "background-color", 'rgb(144, 238, 144)').then(() => {
          assert.equal(shape.points.length, 5)
          shape.addPoints([[200, 200], [300, 300]]);
          assert.equal(shape.points.length, 6)
          const point3 = shape.findPoint(300, 300);
          assert.isNotNull(point3)
          point3.element.id = "point3";
          cy.get("#point3").should("have.css", "background-color", "rgb(255, 0, 0)")
        });
      });
    })
  })

  it("deletePoint", () => {
    cy.visit('http://localhost:5173/tests/empty.html').then(() => {
      const [app, shape] = initShape()
      shape.deletePoint(100, 0)
      const point1 = shape.findPoint(100, 0);
      assert.isNull(point1);
      assert.equal(shape.points.length, 2);
      shape.deletePoint(200, 200);
      assert.equal(shape.points.length, 2);
      const point = shape.addPoint(200, 200, {id: "point1"});
      assert.isNotNull(point)
      assert.equal(shape.points.length, 3);
      cy.get("#point1").trigger("mousedown", {button: 2, buttons: 2}).then(() => {
        cy.get("#point1").trigger("mouseup", {button: 2, buttons: 2}).then(() => {
          cy.get("#point1").should("not.exist").then(() => {
            assert.equal(shape.points.length, 2);
          })
        })
      })
    })
  })

  it('findPoint', () => {
    cy.visit('http://localhost:5173/tests/empty.html').then(() => {
      const [root, shape] = initShape()
      const point1 = shape.findPoint(100, 0)
      assert.isNotNull(point1)
      const point2 = shape.findPoint(200, 200)
      assert.isNull(point2)
    })
  })

  it('destroy', () => {
    cy.visit('http://localhost:5173/tests/empty.html').then(() => {
      const [app, shape] = initShape();
      cy.get("#shape1").should("exist").then(() => {
        const point1 = shape.findPoint(100, 0);
        point1.element.id = "point1";
        shape.destroy();
        cy.get("#point1").should("not.exist").then(() => {
          assert.equal(shape.points.length, 0);
          cy.get("#shape1").should("not.exist");
        })
      })
    })
  })

  it("redraw", () => {
    cy.visit('http://localhost:5173/tests/empty.html').then(() => {
      const [app, shape] = initShape();
      cy.get("#shape1").should("exist").then(() => {
        shape.svg.id = "shape2";
        cy.get("#shape1").should("not.exist").then(() => {
          cy.get("#shape2").should("exist").then(() => {
            shape.redraw();
            cy.get("#shape2").should("not.exist").then(() => {
              cy.get("#shape1").should("exist")
            })
          })
        })
      })
    })
  })

  it("setOptions", () => {
    cy.visit('http://localhost:5173/tests/empty.html').then(() => {
      const [app, shape] = initShape();
      cy.get("#shape1").should("exist").then(() => {
        shape.setOptions({
          id: "shape2",
          name: "Cool shape",
          fill: "rgb(0, 255, 0)",
          fillOpacity: "0.5",
          maxPoints: 6,
          stroke: "rgb(150, 150, 150)",
          strokeWidth: 5,
          strokeDasharray: "10,20,10",
          strokeLinecap: "round",
          pointOptions: {
            style: {
              borderColor: "rgb(0, 255, 0)"
            }
          }
        })
        shape.redraw();
        cy.get("#shape1").should("not.exist").then(() => {
          cy.get("#shape2").should("exist").then(() => {
            cy.get("#shape2 > polygon").should("have.attr", "fill", "rgb(0, 255, 0)").then(() => {
              cy.get("#shape2 > polygon").should("have.attr", "stroke", "rgb(150, 150, 150)").then(() => {
                cy.get("#shape2 > polygon").should("have.attr", "stroke-width", "5").then(() => {
                  cy.get("#shape2 > polygon").should("have.attr", "stroke-dasharray", "10,20,10").then(() => {
                    cy.get("#shape2 > polygon").should("have.attr", "stroke-linecap", "round").then(() => {
                      const point1 = shape.findPoint(100,0)
                      point1.element.id = "point1";
                      assert.equal(shape.options.name,"Cool shape");
                      cy.get("#point1").should("have.css","border-color","rgb(0, 255, 0)");
                    })
                  });
                })
              })
            })
          })
        })
      });
    })
  })

})
