import SmartShape from "../../../src/smart_shape.js";
import {ContainerEvents} from "../../../src/smart_shape_event_listener.js";
import EventsManager from "../../../src/events/EventsManager.js";

function setup() {
  const app = Cypress.$("#app").toArray()[0];
  const shape = new SmartShape().init(app,{id:"shape1",canAddPoints:true,canDeletePoints:true},
      [[0,100],[100,0],[200,100]]);
  return [app,shape];
}

describe('SmartShape API tests', () => {
  it('addPoint', () => {
    cy.visit('http://localhost:5173/tests/empty.html').then(() => {
      const [app,shape] = setup()
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
      const [app, shape] = setup();
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
      const [app, shape] = setup()
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
      const [root, shape] = setup()
      const point1 = shape.findPoint(100, 0)
      assert.isNotNull(point1)
      const point2 = shape.findPoint(200, 200)
      assert.isNull(point2)
    })
  })

  it('destroy', () => {
    cy.visit('http://localhost:5173/tests/empty.html').then(() => {
      const [app, shape] = setup();
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
      const [app, shape] = setup();
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
      const [app, shape] = setup();
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
          },
          classes: "myShape",
          style: {
            strokeOpacity: 0.0,
          },
          zIndex: 1010
        })
        shape.redraw();
        cy.get("#shape1").should("not.exist").then(() => {
          cy.get("#shape2").should("exist").then(() => {
            cy.get("#shape2 > polygon").should("have.attr", "fill", "rgb(0, 255, 0)").then(() => {
              cy.get("#shape2 > polygon").should("have.attr", "stroke", "rgb(150, 150, 150)").then(() => {
                cy.get("#shape2 > polygon").should("have.attr", "stroke-width", "5").then(() => {
                  cy.get("#shape2 > polygon").should("have.attr", "stroke-dasharray", "10,20,10").then(() => {
                    cy.get("#shape2 > polygon").should("have.attr", "stroke-linecap", "round").then(() => {
                      cy.get("#shape2 > polygon").should("have.class", "myShape").then(() => {
                        cy.get("#shape2 > polygon").should("have.css", "stroke-opacity", "0").then(() => {
                          cy.get("#shape2").should("have.css","z-index","1010").then(() => {
                            cy.get("#shape2 > polygon").should("have.css", "z-index", "1010").then(() => {
                              const point1 = shape.findPoint(100, 0)
                              point1.element.id = "point1";
                              assert.equal(shape.options.name, "Cool shape");
                              cy.get("#point1").should("have.css", "border-color", "rgb(0, 255, 0)").then(() => {
                                cy.get("#point1").should("have.css", "z-index", "1011");
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
          })
        })
      });
    })
  })

  it("getPointsArray", () => {
    cy.visit('http://localhost:5173/tests/empty.html').then(() => {
      const [app, shape] = setup();
      let cords = shape.getPointsArray();
      assert.deepEqual(cords, [[0, 100], [100, 0], [200, 100]]);
      shape.addPoint(200, 200);
      shape.addPoint(300, 300);
      cords = shape.getPointsArray();
      assert.deepEqual(cords, [[0, 100], [100, 0], [200, 100], [200, 200], [300, 300]]);
      shape.deletePoint(100, 0);
      cords = shape.getPointsArray();
      assert.deepEqual(cords, [[0, 100], [200, 100], [200, 200], [300, 300]]);
    })
  })

  it("moveTo", () => {
    cy.visit('http://localhost:5173/tests/empty.html').then(() => {
      const [app, shape] = setup();
      const point1 = shape.findPoint(0,100);
      const point2 = shape.findPoint(100, 0);
      const point3 = shape.findPoint(200,100);
      shape.moveTo(300,50);
      shape.redraw();
      assert.equal(point1.x,300,"Should correctly move point");
      assert.equal(point1.y,150,"Should correctly move point");
      assert.equal(point2.x,400,"Should correctly move point");
      assert.equal(point2.y,50,"Should correctly move point");
      assert.equal(point3.x,500,"Should correctly move point");
      assert.equal(point3.y,150,"Should correctly move point");
      shape.moveTo(400,270);
      shape.redraw();
      assert.equal(point1.x,400,"Should correctly move point when out of bounds");
      assert.equal(point1.y,200,"Should correctly move point when out of bounds");
      assert.equal(point2.x,500,"Should correctly move point when out of bounds");
      assert.equal(point2.y,100,"Should correctly move point when out of bounds");
      assert.equal(point3.x,600,"Should correctly move point when out of bounds");
      assert.equal(point3.y,200,"Should correctly move point when out of bounds");
    })
  });

  it("scaleTo", () => {
    cy.visit('http://localhost:5173/tests/empty.html').then(() => {
      const [app, shape] = setup();
      const point1 = shape.findPoint(0,100);
      const point2 = shape.findPoint(100, 0);
      const point3 = shape.findPoint(200,100);
      shape.scaleTo(300,200);
      shape.redraw();
      assert.equal(point1.x,0,"Should correctly scale point");
      assert.equal(point1.y,200,"Should correctly scale point");
      assert.equal(point2.x,150,"Should correctly scale point");
      assert.equal(point2.y,0,"Should correctly scale point");
      assert.equal(point3.x,300,"Should correctly scale point");
      assert.equal(point3.y,200,"Should correctly scale point");
      shape.scaleTo(200,100);
      shape.redraw();
      assert.equal(point1.x,0,"Should correctly scale point");
      assert.equal(point1.y,100,"Should correctly scale point");
      assert.equal(point2.x,100,"Should correctly scale point");
      assert.equal(point2.y,0,"Should correctly scale point");
      assert.equal(point3.x,200,"Should correctly scale point");
      assert.equal(point3.y,100,"Should correctly scale point");
      shape.moveTo(10,10);
      shape.redraw();
      assert.equal(point1.x,10,"Should correctly scale point");
      assert.equal(point1.y,110,"Should correctly scale point");
      assert.equal(point2.x,110,"Should correctly scale point");
      assert.equal(point2.y,10,"Should correctly scale point");
      assert.equal(point3.x,210,"Should correctly scale point");
      assert.equal(point3.y,110,"Should correctly scale point");
      shape.scaleTo(500,300);
      shape.redraw();
      assert.equal(point1.x,10,"Should correctly scale point when out of bounds");
      assert.equal(point1.y,200,"Should correctly scale point when out of bounds");
      assert.equal(point2.x,260,"Should correctly scale point when out of bounds");
      assert.equal(point2.y,10,"Should correctly scale point when out of bounds");
      assert.equal(point3.x,510,"Should correctly scale point when out of bounds");
      assert.equal(point3.y,200,"Should correctly scale point when out of bounds");
    });
  });
  it("addEventListener", () => {
    cy.visit('http://localhost:5173/tests/empty.html').then(() => {
      const [app, shape] = setup();
      const body = Cypress.$("body").toArray()[0];
      const app2 = document.createElement("div");
      app2.style.width = "700px";
      app2.style.height = "800px";
      body.appendChild(app2);
      const shape2 = new SmartShape().init(app2, {id: "shape2"}, [[0, 50], [50, 0], [100, 50], [50, 100]]);
      let listener1Triggered = false;
      let listener2Triggered = false;
      shape.addEventListener(ContainerEvents.CONTAINER_BOUNDS_CHANGED, (event) => {
        listener1Triggered = true;
      })
      shape2.addEventListener(ContainerEvents.CONTAINER_BOUNDS_CHANGED, (event) => {
        listener2Triggered = true;
      })
      assert.equal(shape.eventListener.subscriptions[ContainerEvents.CONTAINER_BOUNDS_CHANGED].length, 1,
          "Should register subscription to event of first shape");
      assert.equal(shape2.eventListener.subscriptions[ContainerEvents.CONTAINER_BOUNDS_CHANGED].length, 1,
          "Should register subscription to event of second shape");
      window.dispatchEvent(new Event('resize'));
      assert.equal(listener1Triggered, true, "Should trigger first listener");
      assert.equal(listener2Triggered, true, "Should trigger second listener");
    });
  })
  it("removeEventListener", () => {
    cy.visit('http://localhost:5173/tests/empty.html').then(() => {
      EventsManager.clear();
      const [app,shape] = setup();
      const body = Cypress.$("body").toArray()[0];
      const app2 = document.createElement("div");
      app2.style.width = "700px";
      app2.style.height = "800px";
      body.appendChild(app2);
      const shape2 = new SmartShape().init(app2, {id:"shape2"},[[0,50],[50,0],[100,50],[50,100]]);
      let listener1Triggered = false;
      let listener2Triggered = false;
      const listener1 = shape.addEventListener(ContainerEvents.CONTAINER_BOUNDS_CHANGED,(event) => {
        listener1Triggered = true;
      })
      const listener2 = shape2.addEventListener(ContainerEvents.CONTAINER_BOUNDS_CHANGED,(event) => {
        listener2Triggered = true;
      })
      assert.equal(shape.eventListener.subscriptions[ContainerEvents.CONTAINER_BOUNDS_CHANGED].length,1,
          "Should register subscription to event of first shape");
      assert.equal(shape2.eventListener.subscriptions[ContainerEvents.CONTAINER_BOUNDS_CHANGED].length,1,
          "Should register subscription to event of second shape");
      window.dispatchEvent(new Event('resize'));
      assert.equal(listener1Triggered,true,"Should trigger first listener");
      assert.equal(listener2Triggered,true,"Should trigger second listener");
      shape.removeEventListener(ContainerEvents.CONTAINER_BOUNDS_CHANGED,listener1);
      shape2.removeEventListener(ContainerEvents.CONTAINER_BOUNDS_CHANGED,listener2);
      assert.equal(shape.eventListener.subscriptions[ContainerEvents.CONTAINER_BOUNDS_CHANGED].length,0,
          "Should remove subscription from first shape");
      assert.equal(shape2.eventListener.subscriptions[ContainerEvents.CONTAINER_BOUNDS_CHANGED].length,0,
          "Should remove subscription from second shape");
      assert.equal(EventsManager.subscriptions[ContainerEvents.CONTAINER_BOUNDS_CHANGED].length,7,
          "Should remove listener from global EventsManager queue");
    });
  });
})
