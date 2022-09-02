import SmartPoint, {PointEvents} from "../../../src/smart_point.js";
import SmartShape from "../../../src/smart_shape.js";
import EventsManager from "../../../src/events/EventsManager.js";
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
        assert.isTrue(shape.isShapePoint(point2))
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
      point1.redraw();
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

  it("addEventListener", () => {
    cy.visit('http://localhost:5173/tests/empty.html').then(() => {
      const app = Cypress.$("#app").toArray()[0];
      const point1 = new SmartPoint().init(5,5, {id:"point1"});
      const point2 = new SmartPoint().init(25,25, {id:"point2"});
      app.appendChild(point1.element);
      app.appendChild(point2.element);
      let listener1Triggered = false;
      let listener2Triggered = false;
      point1.addEventListener(PointEvents.POINT_DRAG_START, (event) => {
        listener1Triggered = true;
      })
      point2.addEventListener(PointEvents.POINT_DRAG_START, (event) => {
        listener2Triggered = true;
      })
      assert.equal(point1.subscriptions[PointEvents.POINT_DRAG_START].length,1,
          "Should add listener to first point");
      assert.equal(point2.subscriptions[PointEvents.POINT_DRAG_START].length,1,
          "Should add listener to second point");
      cy.get("#point1").trigger("mousedown",{buttons:1}).then(() => {
        assert.equal(listener1Triggered,true,"Should trigger first listener");
        cy.get("#point2").trigger("mousedown",{buttons:1}).then(() => {
          assert.equal(listener1Triggered,true,"Should trigger second listener");
        })
      })
    });
  });

  it("removeEventListener", () => {
    cy.visit('http://localhost:5173/tests/empty.html').then(() => {
      EventsManager.clear();
      const app = Cypress.$("#app").toArray()[0];
      const point1 = new SmartPoint().init(5,5, {id:"point1"});
      const point2 = new SmartPoint().init(25,25, {id:"point2"});
      app.appendChild(point1.element);
      app.appendChild(point2.element);
      let listener1Triggered = false;
      let listener2Triggered = false;
      const listener1 = point1.addEventListener(PointEvents.POINT_DRAG_START, (event) => {
        listener1Triggered = true;
      })
      const listener2 = point2.addEventListener(PointEvents.POINT_DRAG_START, (event) => {
        listener2Triggered = true;
      })
      assert.equal(point1.subscriptions[PointEvents.POINT_DRAG_START].length,1,
          "Should add listener to first point");
      assert.equal(point2.subscriptions[PointEvents.POINT_DRAG_START].length,1,
          "Should add listener to second point");
      cy.get("#point1").trigger("mousedown",{buttons:1}).then(() => {
        assert.equal(listener1Triggered,true,"Should trigger first listener");
        cy.get("#point2").trigger("mousedown",{buttons:1}).then(() => {
          assert.equal(listener1Triggered,true,"Should trigger second listener");
          point1.removeEventListener(PointEvents.POINT_DRAG_START,listener1);
          point2.removeEventListener(PointEvents.POINT_DRAG_START,listener2);
          assert.equal(point1.subscriptions[PointEvents.POINT_DRAG_START].length,0,
              "Should remove listener from first point");
          assert.equal(point2.subscriptions[PointEvents.POINT_DRAG_START].length,0,
              "Should remove listener from second point");
          assert.equal(EventsManager.subscriptions[PointEvents.POINT_DRAG_START].length,0,
              "Should remove listeners from global EventsManager queue");
        })
      })
    });
  });

})
