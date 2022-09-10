import SmartShape,{SmartShapeDisplayMode} from "../../../src/SmartShape/SmartShape.js";
import {ContainerEvents, ShapeEvents} from "../../../src/SmartShape/SmartShapeEventListener.js";
import EventsManager from "../../../src/events/EventsManager.js";

function setup() {
  const app = Cypress.$("#app").toArray()[0];
  const shape = new SmartShape().init(app,{id:"shape1",canAddPoints:true,pointOptions:{canDelete:true,forceDisplay:true}},
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
      const point = shape.addPoint(200, 200, {id: "point1",canDelete:true,forceDisplay:true});
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

  it("deleteAllPoints", () => {
    cy.visit('http://localhost:5173/tests/empty.html').then(() => {
      const app = Cypress.$("#app").toArray()[0];
      const shape = new SmartShape();
      shape.init(app,{},[[0,100],[100,0],[200,100]]);
      const point1 = shape.findPoint(100,0)
      point1.element.id = "#point1";
      shape.deleteAllPoints();
      assert.equal(shape.points.length,0,"Should remove all points");
      assert.isNull(app.querySelector("#point1"),"Should remove HTML elements of points");
    });
  });

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
    EventsManager.clear();
    cy.visit('http://localhost:5173/tests/empty.html').then(() => {
      const [app, shape] = setup();
      cy.get("#shape1").should("exist").then(() => {
        const point1 = shape.findPoint(100, 0);
        point1.element.id = "point1";
        shape.addEventListener(ShapeEvents.SHAPE_CREATE,() => {});
        shape.addEventListener(ShapeEvents.SHAPE_MOUSE_ENTER, () => {});
        shape.addEventListener(ShapeEvents.SHAPE_MOUSE_MOVE, () => {});
        shape.addEventListener(ShapeEvents.SHAPE_MOVE_START, () => {});
        shape.addEventListener(ShapeEvents.SHAPE_MOVE, () => {});
        shape.addEventListener(ShapeEvents.SHAPE_MOVE_END, () => {});
        shape.addEventListener(ShapeEvents.SHAPE_DESTROY, () => {});
        assert.equal(shape.eventListener.subscriptions[ShapeEvents.SHAPE_CREATE].length,1,
            "Should register SHAPE_CREATE event in local queue");
        assert.equal(shape.eventListener.subscriptions[ShapeEvents.SHAPE_MOUSE_ENTER].length,1,
            "Should register SHAPE_MOUSE_ENTER event in local queue");
        assert.equal(shape.eventListener.subscriptions[ShapeEvents.SHAPE_MOUSE_ENTER].length,1,
            "Should register SHAPE_MOUSE_ENTER event in local queue");
        assert.equal(shape.eventListener.subscriptions[ShapeEvents.SHAPE_MOUSE_MOVE].length,1,
            "Should register SHAPE_MOUSE_MOVE event in local queue");
        assert.equal(shape.eventListener.subscriptions[ShapeEvents.SHAPE_MOVE_START].length,1,
            "Should register SHAPE_MOVE_START event in local queue");
        assert.equal(shape.eventListener.subscriptions[ShapeEvents.SHAPE_MOVE].length,1,
            "Should register SHAPE_MOVE event in local queue");
        assert.equal(shape.eventListener.subscriptions[ShapeEvents.SHAPE_MOVE_END].length,1,
            "Should register SHAPE_MOVE_END event in local queue");
        assert.equal(shape.eventListener.subscriptions[ShapeEvents.SHAPE_DESTROY].length,1,
            "Should register SHAPE_DESTROY event in local queue");

        assert.equal(EventsManager.subscriptions[ShapeEvents.SHAPE_CREATE].length,2,
            "Should register SHAPE_CREATE in global EventsManager"
        );
        assert.equal(EventsManager.subscriptions[ShapeEvents.SHAPE_MOUSE_ENTER].length,1,
            "Should register SHAPE_MOUSE_ENTER in global EventsManager"
        );
        assert.equal(EventsManager.subscriptions[ShapeEvents.SHAPE_MOUSE_MOVE].length,1,
            "Should register SHAPE_MOUSE_MOVE in global EventsManager"
        );
        assert.equal(EventsManager.subscriptions[ShapeEvents.SHAPE_MOVE_START].length,2,
            "Should register SHAPE_MOVE_START in global EventsManager"
        );
        assert.equal(EventsManager.subscriptions[ShapeEvents.SHAPE_MOVE].length,2,
            "Should register SHAPE_MOVE in global EventsManager"
        );
        assert.equal(EventsManager.subscriptions[ShapeEvents.SHAPE_MOVE_END].length,2,
            "Should register SHAPE_MOVE_END in global EventsManager"
        );
        assert.equal(EventsManager.subscriptions[ShapeEvents.SHAPE_DESTROY].length,2,
            "Should register SHAPE_DESTROY in global EventsManager"
        );

        shape.destroy();

        assert.equal(shape.eventListener.subscriptions[ShapeEvents.SHAPE_CREATE].length,0,
            "Should register SHAPE_CREATE event in local queue");
        assert.equal(shape.eventListener.subscriptions[ShapeEvents.SHAPE_MOUSE_ENTER].length,0,
            "Should register SHAPE_MOUSE_ENTER event in local queue");
        assert.equal(shape.eventListener.subscriptions[ShapeEvents.SHAPE_MOUSE_ENTER].length,0,
            "Should register SHAPE_MOUSE_ENTER event in local queue");
        assert.equal(shape.eventListener.subscriptions[ShapeEvents.SHAPE_MOUSE_MOVE].length,0,
            "Should register SHAPE_MOUSE_MOVE event in local queue");
        assert.equal(shape.eventListener.subscriptions[ShapeEvents.SHAPE_MOVE_START].length,0,
            "Should register SHAPE_MOVE_START event in local queue");
        assert.equal(shape.eventListener.subscriptions[ShapeEvents.SHAPE_MOVE].length,0,
            "Should register SHAPE_MOVE event in local queue");
        assert.equal(shape.eventListener.subscriptions[ShapeEvents.SHAPE_MOVE_END].length,0,
            "Should register SHAPE_MOVE_END event in local queue");
        assert.equal(shape.eventListener.subscriptions[ShapeEvents.SHAPE_DESTROY].length,0,
            "Should register SHAPE_DESTROY event in local queue");

        assert.equal(EventsManager.subscriptions[ShapeEvents.SHAPE_CREATE].length,0,
            "Should register SHAPE_CREATE in global EventsManager"
        );
        assert.equal(EventsManager.subscriptions[ShapeEvents.SHAPE_MOUSE_ENTER].length,0,
            "Should register SHAPE_MOUSE_ENTER in global EventsManager"
        );
        assert.equal(EventsManager.subscriptions[ShapeEvents.SHAPE_MOUSE_MOVE].length,0,
            "Should register SHAPE_MOUSE_MOVE in global EventsManager"
        );
        assert.equal(EventsManager.subscriptions[ShapeEvents.SHAPE_MOVE_START].length,0,
            "Should register SHAPE_MOVE_START in global EventsManager"
        );
        assert.equal(EventsManager.subscriptions[ShapeEvents.SHAPE_MOVE].length,0,
            "Should register SHAPE_MOVE in global EventsManager"
        );
        assert.equal(EventsManager.subscriptions[ShapeEvents.SHAPE_MOVE_END].length,0,
            "Should register SHAPE_MOVE_END in global EventsManager"
        );
        assert.equal(EventsManager.subscriptions[ShapeEvents.SHAPE_DESTROY].length,0,
            "Should register SHAPE_DESTROY in global EventsManager"
        );

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

  it("show/hide", () => {
    cy.visit('http://localhost:5173/tests/empty.html').then(() => {
      const app = Cypress.$("#app").toArray()[0];
      const shape = new SmartShape();
      shape.init(app,{visible:false,canScale:true,id:"shape1"},[[0,100],[100,0],[200,100]]);
      shape.setOptions({canScale:true,canRotate:true,displayMode:SmartShapeDisplayMode.SCALE});
      shape.redraw();
      assert.equal(shape.svg.style.display,'none',"Should create invisible shape");
      assert.equal(shape.resizeBox.shape.svg.style.display, 'none', "Resize box should be also invisible")
      for (let point of shape.points) {
        assert.equal(point.element.style.display,'none',"Point must be invisible");
      }
      for (let point of shape.resizeBox.shape.points) {
        assert.equal(point.element.style.display,'none',"Resize box point must be invisible");
      }
      shape.show();
      assert.notEqual(shape.svg.style.display,'none',"Should show visible shape");
      assert.notEqual(shape.resizeBox.shape.svg.style.display, 'none', "Resize box should be also visible")
      for (let point of shape.points) {
        assert.notEqual(point.element.style.display,'none',"Point must be visible");
      }
      for (let point of shape.resizeBox.shape.points) {
        assert.notEqual(point.element.style.display,'none',"Resize box point must be visible");
      }
      shape.hide();
      assert.equal(shape.svg.style.display,'none',"Should hide shape");
      assert.equal(shape.resizeBox.shape.svg.style.display, 'none', "Resize box should be also invisible")
      for (let point of shape.points) {
        assert.equal(point.element.style.display,'none',"Point must be invisible");
      }
      for (let point of shape.resizeBox.shape.points) {
        assert.equal(point.element.style.display,'none',"Resize box point must be invisible");
      }
    });
  })

  it("switchDisplayMode", () => {
    cy.visit('http://localhost:5173/tests/empty.html').then(() => {
      const [app,shape] = setup();
      assert.equal(shape.options.displayMode, SmartShapeDisplayMode.DEFAULT,"Should be in DEFAULT mode by default");
      assert.isNull(shape.resizeBox,"Resize box by default is null");
      assert.isNull(shape.rotateBox,"Rotate box by default is null");
      shape.switchDisplayMode();
      assert.equal(shape.options.displayMode,SmartShapeDisplayMode.DEFAULT,"Should not switch to SCALE because canScale option disabled");
      shape.setOptions({canScale:true});
      shape.switchDisplayMode();
      assert.equal(shape.options.displayMode,SmartShapeDisplayMode.SCALE,"Should switch from DEFAULT to SCALE");
      assert.isNotNull(shape.resizeBox,"Should create Resize box");
      assert.isNotNull(shape.resizeBox.shape.svg,"Should display shape for Resize box");
      assert.equal(shape.resizeBox.shape.svg.style.display,'',"Should show resize box");
      shape.switchDisplayMode();
      assert.equal(shape.options.displayMode,SmartShapeDisplayMode.DEFAULT,"Should not switch to ROTATE because canRotate option disabled");
      shape.setOptions({canRotate:true});
      shape.switchDisplayMode();
      shape.switchDisplayMode();
      assert.equal(shape.options.displayMode,SmartShapeDisplayMode.ROTATE,"Should switch from SCALE to ROTATE");
      assert.isNotNull(shape.rotateBox,"Should create Rotate box");
      assert.isNotNull(shape.rotateBox.shape.svg,"Should display shape for Rotate box");
      assert.equal(shape.rotateBox.shape.svg.style.display,'',"Should show rotate box");
      shape.switchDisplayMode();
      assert.equal(shape.options.displayMode,SmartShapeDisplayMode.DEFAULT,"Should switch from ROTATE to default");
      assert.equal(shape.resizeBox.shape.svg.style.display,'none',"Should hide resize box");
      assert.equal(shape.rotateBox.shape.svg.style.display,'none',"Should hide rotate box");
      shape.switchDisplayMode(SmartShapeDisplayMode.ROTATE);
      assert.equal(shape.options.displayMode,SmartShapeDisplayMode.ROTATE,"Should switch DIRECTLY to ROTATE");
      assert.equal(shape.rotateBox.shape.svg.style.display,'',"Should display rotate box");
      shape.setOptions({canScale:false});
      shape.switchDisplayMode(SmartShapeDisplayMode.SCALE);
      assert.equal(shape.options.displayMode,SmartShapeDisplayMode.DEFAULT,"Should switch to DEFAULT if SCALE is disabled");
      shape.switchDisplayMode(SmartShapeDisplayMode.DEFAULT);
      shape.setOptions({canRotate:false});
      shape.switchDisplayMode(SmartShapeDisplayMode.DEFAULT);
      assert.equal(shape.options.displayMode,SmartShapeDisplayMode.DEFAULT,"Should switch to DEFAULT if ROTATE is disabled");
    });
  });

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
          zIndex: 1010,
          bounds: {
            bottom: 2000
          }
        })
        const bounds = shape.getBounds();
        assert.equal(bounds.top,shape.root.clientTop);
        assert.equal(bounds.left,shape.root.clientLeft);
        assert.equal(bounds.right,shape.root.clientLeft+shape.root.clientWidth);
        assert.equal(bounds.bottom,2000);
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
                                cy.get("#point1").should("have.css", "z-index", "1012");
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

  it("rotateBy", () => {
    cy.visit('http://localhost:5173/tests/empty.html').then(() => {
      const app = Cypress.$("#app").toArray()[0];
      app.style.width="400px";
      app.style.height="400px";
      app.style.borderWidth = "1px";
      app.style.borderStyle = "solid";
      const shape = new SmartShape();
      shape.init(app,{},[[50,50],[150,50],[150,150],[50,150]]);
      shape.rotateBy(30);
      shape.redraw();
      assert.deepEqual(shape.getPointsArray().map((point) => [Math.round(point[0]),Math.round(point[1])]),[[82,32],[168,82],[118,168],[32,118]],"Should rotate shape correctly");
      shape.rotateBy(-30);
      shape.redraw();
      assert.deepEqual(shape.getPointsArray().map((point) => [Math.round(point[0]),Math.round(point[1])]),[[50,50],[150,50],[150,150],[50,150]],"Should rotate shape correctly");
      shape.moveTo(0,0)
      shape.redraw();
      shape.rotateBy(30);
      shape.redraw();
      assert.deepEqual(shape.getPointsArray().map((point) => [Math.round(point[0]),Math.round(point[1])]),[[0,0],[100,0],[100,100],[0,100]],"Should not rotate beyond left bound");
      shape.moveTo(50,280)
      shape.redraw();
      shape.rotateBy(30);
      shape.redraw();
      assert.deepEqual(shape.getPointsArray().map((point) => [Math.round(point[0]),Math.round(point[1])]),[[50,280],[150,280],[150,380],[50,380]],"Should not rotate beyond bottom bound");
      shape.moveTo(280,120);
      shape.redraw()
      shape.rotateBy(30)
      shape.redraw();
      assert.deepEqual(shape.getPointsArray().map((point) => [Math.round(point[0]),Math.round(point[1])]),[[280,120],[380,120],[380,220],[280,220]],"Should not rotate beyond right bound");
      shape.moveTo(100,20);
      shape.redraw();
      shape.rotateBy(30);
      shape.redraw();
      assert.deepEqual(shape.getPointsArray().map((point) => [Math.round(point[0]),Math.round(point[1])]),[[100,20],[200,20],[200,120],[100,120]],"Should not rotate beyond top bound");
      shape.moveTo(150,150);
      shape.redraw();
      shape.rotateBy(-60);
      shape.redraw()
      assert.deepEqual(shape.getPointsArray().map((point) => [Math.round(point[0]),Math.round(point[1])]),[[132,218],[182,132],[268,182],[218,268]],"Should rotate counterclock-wise");
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
      shape.destroy();
      shape2.destroy();
      let createTriggered = false;
      let destroyTriggered = false;
      let mouseMoveTriggered = false;
      let mouseEnterTriggered = false;
      let moveStartTriggered = false;
      let moveEndTriggered = false;
      let moveTriggered = false;
      let mouseOverTriggered = false;
      let mouseOutTriggered = false;
      let clickTriggered = false
      const shape3 = new SmartShape();
      EventsManager.subscribe(ShapeEvents.SHAPE_CREATE,(event) => {
        if (event.target.guid === shape3.guid) {
          createTriggered = true;
        }
      });
      shape3.init(app,{id:"shape3",canScale:true,canRotate:true},[[200,200],[250,150],[300,100],[400,50]]);
      shape3.addEventListener(ShapeEvents.SHAPE_MOUSE_MOVE,(event) => {
        mouseMoveTriggered = true;
      });
      shape3.addEventListener(ShapeEvents.SHAPE_MOUSE_ENTER, (event) => {
        mouseEnterTriggered = true;
      });
      shape3.addEventListener(ShapeEvents.SHAPE_MOVE, (event) => {
        moveTriggered = true;
      });
      shape3.addEventListener(ShapeEvents.SHAPE_MOVE_START, (event) => {
        moveStartTriggered = true;
      });
      shape3.addEventListener(ShapeEvents.SHAPE_MOVE_END, (event) => {
        moveEndTriggered = true;
      });
      shape3.addEventListener(ShapeEvents.SHAPE_MOUSE_OVER, (event) => {
        mouseOverTriggered = true;
      });
      shape3.addEventListener(ShapeEvents.SHAPE_MOUSE_OUT, (event) => {
        mouseOutTriggered = true;
      });
      shape3.addEventListener(ShapeEvents.SHAPE_MOUSE_CLICK, (event) => {
        clickTriggered = true;
      });
      shape3.addEventListener(ShapeEvents.SHAPE_DESTROY, (event) => {
        destroyTriggered = true;
      });

      cy.get("#shape3").trigger("mouseenter",{buttons:1,clientX:125,clientY:125}).then(() => {
        cy.get("#shape3").trigger("mousemove", {buttons: 1, clientX: 125, clientY: 125}).then(() => {
          cy.get("#shape3").trigger("mousedown", {buttons: 1}).then(() => {
            cy.get("#app").trigger("mousemove", {buttons: 1, movementX: 2, movementY: 0}).then(() => {
              cy.get("#app").trigger("mouseup", {buttons: 1}).then(() => {
                cy.get("#shape3").trigger("mouseover").then(() => {
                  cy.get("#shape3").trigger("mouseout").then(() => {
                    cy.get("#shape3").click({force: true}).then(() => {
                      assert.equal(shape3.options.displayMode,SmartShapeDisplayMode.SCALE,"Should switch to SCALE display mode on first click");
                      cy.get("#shape3").click({force: true}).then(() => {
                        assert.equal(shape3.options.displayMode, SmartShapeDisplayMode.ROTATE, "Should switch to ROTATE display mode on second click");
                        cy.get("#shape3").click({force: true}).then(() => {
                          assert.equal(shape3.options.displayMode, SmartShapeDisplayMode.DEFAULT, "Should switch to DEFAULT display mode on third click");
                          shape3.destroy();
                          assert.isTrue(createTriggered, "Should trigger shape create event");
                          assert.isTrue(mouseMoveTriggered, "Should trigger mouse move event");
                          assert.isTrue(mouseEnterTriggered, "Should trigger mouse enter event");
                          assert.isTrue(moveStartTriggered, "Should trigger shape move start event");
                          assert.isTrue(moveTriggered, "Should trigger shape move event");
                          assert.isTrue(mouseOverTriggered, "Should trigger shape mouse over event");
                          assert.isTrue(mouseOutTriggered, "Should trigger shape mouse out event");
                          assert.isTrue(clickTriggered, "Should trigger shape click event");
                          assert.isTrue(moveEndTriggered, "Should trigger shape move end event");
                          assert.isTrue(destroyTriggered, "Should trigger shape destroy event");
                        });
                      });
                    })
                  })
                })
              });
            });
          });
        });
      });
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
