import SmartShape,{SmartShapeDisplayMode} from "../../../src/SmartShape/SmartShape.js";
import SmartPoint, {PointEvents} from "../../../src/SmartPoint/SmartPoint.js";
import EventsManager from "../../../src/events/EventsManager.js";
function initShape() {
  const app = Cypress.$("#app").toArray()[0]
  const shape = new SmartShape().init(app,{pointOptions:{forceDisplay:true}})
  return [app,shape]
}
describe('SmartPoint API tests', () => {
  it('create point and add it to shape', () => {
    cy.visit('http://localhost:5173/tests/empty.html').then(() => {
      const [app,shape] = initShape()
      const point1 = shape.addPoint(100,100,{id:"point1"});
      point1.redraw();
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
      const point1 = shape.addPoint(100,100,{id:"point1"});
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
                  cy.get("#point2").should("have.css","z-index","1002").then(()=> {
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
      const point1 = shape.addPoint(100,100,{id:"point1"});
      cy.wait(10).then(() => {
        point1.element.id = "point2";
        cy.get("#point1").should("not.exist").then(() => {
          cy.get("#point2").should("exist").then(() => {
            point1.redraw();
            cy.get("#point2").should("not.exist").then(() => {
              cy.get("#point1").should("exist");
            })
          })
        })
      })
    });
  });

  it("show/hide", () => {
    cy.visit('http://localhost:5173/tests/empty.html').then(() => {
      const app = Cypress.$("#app").toArray()[0];
      const shape = new SmartShape();
      shape.init(app,{canScale:false,visible:false,id:"shape1",pointOptions:{createDOMElement:true}},[[0,100],[100,0],[200,100]]);
      shape.switchDisplayMode(SmartShapeDisplayMode.SELECTED);
      const point = shape.findPoint(100,0);
      cy.wait(1).then(() => {
        assert.equal(point.element.style.display,'none',"Should create invisible point");
        point.show();
        cy.wait(1).then(() => {
          assert.notEqual(point.element.style.display,'none',"Should show the point");
          point.hide();
          cy.wait(1).then(() => {
            assert.equal(point.element.style.display,'none',"Should hide the point");
          })
        })
      })
    });
  });

  it("removeEventListener", () => {
    cy.visit('http://localhost:5173/tests/empty.html').then(() => {
      EventsManager.clear();
      const app = Cypress.$("#app").toArray()[0];
      const point1 = new SmartPoint().init(5,5, {id:"point1",createDOMElement:true});
      const point2 = new SmartPoint().init(25,25, {id:"point2",createDOMElement:true});
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

  it("rotateBy", () => {
    cy.visit('http://localhost:5173/tests/empty.html').then(() => {
      const point = new SmartPoint()
      point.init(50,50,{});
      point.rotateBy(30,0,0);
      assert.equal(Math.round(point.x),18,"Should correctly rotate X coordinate");
      assert.equal(Math.round(point.y), 68, "Should correctly rotate Y coordinate");
    })
  })

  it("destroy", () => {
    cy.visit('http://localhost:5173/tests/empty.html').then(() => {
      EventsManager.clear();
      const [app,shape] = initShape()
      const point1 = shape.addPoint(100,100,{id:"point1"});
      cy.get("#point1").should("exist").then(() => {
        point1.destroy();
        cy.get("#point1").should("not.exist").then(() => {
          assert.equal(shape.points.length,0)
          const point2 = shape.addPoint(100,100, {id:"point1"});
          point2.addEventListener(PointEvents.POINT_ADDED,()=> {});
          point2.addEventListener(PointEvents.POINT_MOUSE_MOVE,()=> {});
          point2.addEventListener(PointEvents.POINT_DRAG_START,()=> {});
          point2.addEventListener(PointEvents.POINT_DRAG_MOVE,()=> {});
          point2.addEventListener(PointEvents.POINT_DRAG_END,()=> {});
          point2.addEventListener(PointEvents.POINT_DESTROYED,()=> {});
          assert.equal(point2.subscriptions[PointEvents.POINT_ADDED].length,1,
              "Should add point create event listener");
          assert.equal(point2.subscriptions[PointEvents.POINT_MOUSE_MOVE].length,1,
              "Should add point mouse move event listener");
          assert.equal(point2.subscriptions[PointEvents.POINT_DRAG_START].length,1,
              "Should add point drag start event listener");
          assert.equal(point2.subscriptions[PointEvents.POINT_DRAG_MOVE].length,1,
              "Should add point drag move event listener");
          assert.equal(point2.subscriptions[PointEvents.POINT_DRAG_END].length,1,
              "Should add point drag end event listener");
          assert.equal(point2.subscriptions[PointEvents.POINT_DESTROYED].length,1,
              "Should add point destroyed event listener");
          assert.equal(EventsManager.subscriptions[PointEvents.POINT_ADDED].length,2,
              "Should add point added event to global EventsManager");
          assert.equal(EventsManager.subscriptions[PointEvents.POINT_MOUSE_MOVE].length,1,
              "Should add point mouse move event to global EventsManager");
          assert.equal(EventsManager.subscriptions[PointEvents.POINT_DRAG_START].length,1,
              "Should add point drag start event to global EventsManager");
          assert.equal(EventsManager.subscriptions[PointEvents.POINT_DRAG_MOVE].length,2,
              "Should add point drag move event to global EventsManager");
          assert.equal(EventsManager.subscriptions[PointEvents.POINT_DRAG_END].length,1,
              "Should add point drag end event to global EventsManager");
          assert.equal(EventsManager.subscriptions[PointEvents.POINT_DESTROYED].length,2,
              "Should add point destroy event to global EventsManager");
          point2.destroy();
          assert.equal(point2.subscriptions[PointEvents.POINT_ADDED].length,0,
              "Should remove point create event listener");
          assert.equal(point2.subscriptions[PointEvents.POINT_MOUSE_MOVE].length,0,
              "Should remove point mouse move event listener");
          assert.equal(point2.subscriptions[PointEvents.POINT_DRAG_START].length,0,
              "Should remove point drag start event listener");
          assert.equal(point2.subscriptions[PointEvents.POINT_DRAG_MOVE].length,0,
              "Should remove point drag move event listener");
          assert.equal(point2.subscriptions[PointEvents.POINT_DRAG_END].length,0,
              "Should remove point drag end event listener");
          assert.equal(point2.subscriptions[PointEvents.POINT_DESTROYED].length,0,
              "Should remove point destroyed event listener");
          assert.equal(EventsManager.subscriptions[PointEvents.POINT_ADDED].length,1,
              "Should remove point added event from global EventsManager");
          assert.equal(EventsManager.subscriptions[PointEvents.POINT_MOUSE_MOVE].length,0,
              "Should remove point mouse move event from global EventsManager");
          assert.equal(EventsManager.subscriptions[PointEvents.POINT_DRAG_START].length,0,
              "Should remove point drag start event from global EventsManager");
          assert.equal(EventsManager.subscriptions[PointEvents.POINT_DRAG_MOVE].length,1,
              "Should remove point drag move event from global EventsManager");
          assert.equal(EventsManager.subscriptions[PointEvents.POINT_DRAG_END].length,0,
              "Should remove point drag end event from global EventsManager");
          assert.equal(EventsManager.subscriptions[PointEvents.POINT_DESTROYED].length,1,
              "Should remove point destroy event from global EventsManager");
        });
      });
    });
  })
})
