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
  });

  it("show/hide", () => {
    cy.visit('http://localhost:5173/tests/empty.html').then(() => {
      const app = Cypress.$("#app").toArray()[0];
      const shape = new SmartShape();
      shape.init(app,{canScale:false,visible:false,id:"shape1"},[[0,100],[100,0],[200,100]]);
      const point = shape.findPoint(100,0);
      assert.equal(point.element.style.display,'none',"Should create invisible point");
      point.show();
      assert.notEqual(point.element.style.display,'none',"Should show the point");
      point.hide();
      assert.equal(point.element.style.display,'none',"Should hide the point");
    });
  });

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
          const shape = new SmartShape().init(app,{},[[5,5]]);
          let createListenerTriggered = false;
          EventsManager.subscribe(PointEvents.POINT_ADDED,(event) => {
            createListenerTriggered = true;
          })
          const point = shape.addPoint(40,40,{id:"point3"});
          let mouseMoveListenerTriggered = false;
          point.addEventListener(PointEvents.POINT_MOUSE_MOVE, (event) => {
            mouseMoveListenerTriggered = true;
          })
          let dragStartListenerTriggered = false;
          point.addEventListener(PointEvents.POINT_DRAG_START, (event) => {
            dragStartListenerTriggered = true;
          });
          let dragMoveListenerTriggered = false;
          point.addEventListener(PointEvents.POINT_DRAG_MOVE, (event) => {
            dragMoveListenerTriggered = true;
          })
          let dragEndListenerTriggered = false;
          point.addEventListener(PointEvents.POINT_DRAG_END, (event) => {
            dragEndListenerTriggered = true;
          })
          let destroyedListenerTriggered = false;
          point.addEventListener(PointEvents.POINT_DESTROYED, (event) => {
            destroyedListenerTriggered = true;
          });
          cy.get("#point3").trigger("mousedown",{buttons:1}).then(() => {
            cy.get("#app").trigger("mousemove",{buttons:1,clientX:40,clientY:40}).then(() => {
              cy.get("#app").trigger("mouseup",{buttons:1}).then(() => {
                assert.isTrue(createListenerTriggered,"Should trigger create event listener");
                assert.isTrue(mouseMoveListenerTriggered,"Should trigger mouse move event listener");
                assert.isTrue(dragStartListenerTriggered,"Should trigger drag start event listener");
                assert.isTrue(dragMoveListenerTriggered,"Should trigger drag move event listener");
                assert.isTrue(dragEndListenerTriggered,"Should trigger drag end event listener");
                point.destroy();
                assert.isTrue(destroyedListenerTriggered,"Should trigger destroy event listener");
              })
            })
          })
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

  it("destroy", () => {
    cy.visit('http://localhost:5173/tests/empty.html').then(() => {
      EventsManager.clear();
      const [app,shape] = initShape()
      const point1 = shape.putPoint(100,100,{id:"point1"});
      cy.get("#point1").should("exist").then(() => {
        point1.destroy();
        cy.get("#point1").should("not.exist").then(() => {
          assert.equal(shape.points.length,0)
          const point2 = shape.putPoint(100,100, {id:"point1"});
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
          assert.equal(EventsManager.subscriptions[PointEvents.POINT_DRAG_START].length,2,
              "Should add point drag start event to global EventsManager");
          assert.equal(EventsManager.subscriptions[PointEvents.POINT_DRAG_MOVE].length,2,
              "Should add point drag move event to global EventsManager");
          assert.equal(EventsManager.subscriptions[PointEvents.POINT_DRAG_END].length,2,
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
          assert.equal(EventsManager.subscriptions[PointEvents.POINT_DRAG_START].length,1,
              "Should remove point drag start event from global EventsManager");
          assert.equal(EventsManager.subscriptions[PointEvents.POINT_DRAG_MOVE].length,1,
              "Should remove point drag move event from global EventsManager");
          assert.equal(EventsManager.subscriptions[PointEvents.POINT_DRAG_END].length,1,
              "Should remove point drag end event from global EventsManager");
          assert.equal(EventsManager.subscriptions[PointEvents.POINT_DESTROYED].length,1,
              "Should remove point destroy event from global EventsManager");
        });
      });
    });
  })

})
