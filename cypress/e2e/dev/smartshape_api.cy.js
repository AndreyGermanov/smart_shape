import SmartShapeManager from "../../../src/SmartShapeManager/SmartShapeManager.js";
import SmartShape,{SmartShapeDisplayMode} from "../../../src/SmartShape/SmartShape.js";
import {ShapeEvents} from "../../../src/SmartShape/SmartShapeEventListener.js";
import {ContainerEvents} from "../../../src/SmartShapeManager/SmartShapeManager.js";
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
        const newPoint = shape.findPoint(492,100);
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
    //EventsManager.clear();
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
      shape.setOptions({pointOptions:{forceDisplay:false}});
      shape.redraw();
      assert.equal(shape.options.displayMode, SmartShapeDisplayMode.DEFAULT,"Should be in DEFAULT mode by default");
      assert.isNull(shape.resizeBox,"Resize box by default is null");
      assert.isNull(shape.rotateBox,"Rotate box by default is null");
      assert.equal(shape.points[0].element.style.display,'none',"Points should be hidden in DEFAULT display mode")
      shape.switchDisplayMode();
      assert.equal(shape.options.displayMode, SmartShapeDisplayMode.SELECTED,"Should switch to SELECTED mode");
      assert.equal(shape.points[0].element.style.display,'',"Points should be displayed in DEFAULT display mode");
      assert.isNull(shape.resizeBox,"Resize box in selected mode is null");
      assert.isNull(shape.rotateBox,"Rotate box in selected mode is null");
      assert.equal(shape.options.displayMode,SmartShapeDisplayMode.SELECTED,"Should not switch to SCALE because canScale option disabled");
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
      shape.setOptions({canScale:true,canRotate:true});
      shape.points.forEach(point=>point.setOptions({canDrag:false}));
      shape.redraw();
      shape.switchDisplayMode(SmartShapeDisplayMode.ROTATE);
      shape.switchDisplayMode(SmartShapeDisplayMode.SELECTED);
      assert.equal(shape.options.displayMode, SmartShapeDisplayMode.DEFAULT,
          "Should not switch to SELECTED because it's not allowed to drag points"
      );
      shape.switchDisplayMode();
      assert.equal(shape.options.displayMode, SmartShapeDisplayMode.SCALE,
          "Should skip selected and switch directly to SCALED, because it's not allowed to drag points"
      );
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
      shape.rotateBy(30,null,null,true);
      shape.redraw();
      assert.deepEqual(shape.getPointsArray().map((point) => [Math.round(point[0]),Math.round(point[1])]),[[0,0],[100,0],[100,100],[0,100]],"Should not rotate beyond left bound");
      shape.moveTo(50,280)
      shape.redraw();
      shape.rotateBy(30,null,null,true);
      shape.redraw();
      assert.deepEqual(shape.getPointsArray().map((point) => [Math.round(point[0]),Math.round(point[1])]),[[50,280],[150,280],[150,380],[50,380]],"Should not rotate beyond bottom bound");
      shape.moveTo(280,120);
      shape.redraw()
      shape.rotateBy(30,null,null,true)
      shape.redraw();
      assert.deepEqual(shape.getPointsArray().map((point) => [Math.round(point[0]),Math.round(point[1])]),[[280,120],[380,120],[380,220],[280,220]],"Should not rotate beyond right bound");
      shape.moveTo(100,20);
      shape.redraw();
      shape.rotateBy(30,null,null,true);
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
      SmartShapeManager.clear();
      const [app,shape] = setup();
      const body = Cypress.$("body").toArray()[0];
      const app2 = document.createElement("div");
      app2.id = "app2"
      app2.style.width = "700px";
      app2.style.height = "400px";
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
      shape.destroy();
      shape2.destroy();
    });
  })

  it("removeEventListener", () => {
    cy.visit('http://localhost:5173/tests/empty.html').then(() => {
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
    });
  });

  it("belongsToShape", () => {
    cy.visit('http://localhost:5173/tests/empty.html').then(() => {
      const [app, shape] = setup();
      assert.isTrue(shape.belongsToShape(0,100, false),"Point on border should belong to shape");
      assert.isTrue(shape.belongsToShape(15,90, false),"Point inside shape should belong to shape");
      assert.isFalse(shape.belongsToShape(5,40, false),"Point above border should not belong to shape");
      assert.isFalse(shape.belongsToShape(195,60, false),"Point above border on the right side should not belong to shape");
    });
  })

  it("toSvg", () => {
    cy.visit('http://localhost:5173/tests/empty.html').then(() => {
      const app = Cypress.$("#app").toArray()[0];
      const shape1 = new SmartShape().init(app,{fillGradient:{
          type:"linear",
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
        }},[[0,100],[100,0],[200,100]]);
      const shape2 = new SmartShape().init(app,{filters:{
          feDropShadow: {
            dx: 10, dy: 10, "flood-opacity": 0.5, stdDeviation: 3, "flood-color": "#000000"
          }}},[[400,100],[500,0],[600,100],[500,200]]);
      shape1.addChild(shape2);
      const svgString = shape1.toSvg();
      const div = document.createElement("div");
      div.innerHTML = svgString;
      const svg = div.querySelector("svg");
      assert.isNotNull(svg,"Should contain SVG element as a root");
      let defs = svg.querySelectorAll("defs")
      assert.equal(defs.length,1,"Should be single 'defs' tag inside");
      defs = defs[0];
      assert.equal(defs.children.length,2, "Should be 2 defs inside");
      const polygons = svg.querySelectorAll("polygon");
      assert.equal(polygons.length, 2, "Should be two 'polygons' inside svg");
    })
  });

  it("toPng", () => {
    cy.visit('http://localhost:5173/tests/empty.html').then(async() => {
      const div1 = Cypress.$("#app").toArray()[0];
      const gradient = {
        type: "linear",
        gradientTransform: "rotate(90)",
        steps: [
          {
            offset: "20%",
            stopColor: "#00ff00",
          },
          {
            offset: "60%",
            stopColor: "#006600",
          },
          {
            offset: "100%",
            stopColor: "#00ff00",
          },
        ]
      }
      const shapes = [];
      shapes["w"] = new SmartShape().init(div1, {fillGradient:gradient,strokeWidth:0},
          [[0, 0], [25, 0], [50, 100], [75, 50], [100, 100], [125, 0], [150, 0], [100, 150], [75, 90], [50, 150]])
      shapes["e"] = new SmartShape().init(div1, {fillGradient:gradient,strokeWidth:0},
          [[0, 0], [100, 0], [100, 25], [25, 25], [25, 60], [100, 60], [100, 85], [25, 85], [25, 120], [100, 120], [100, 150], [0, 150]])
      shapes["e2"] = new SmartShape().init(div1, {fillGradient:gradient,strokeWidth:0},
          [[0, 0], [100, 0], [100, 25], [25, 25], [25, 60], [100, 60], [100, 85], [25, 85], [25, 120], [100, 120], [100, 150], [0, 150]])
      shapes["k"] = new SmartShape().init(div1, {fillGradient:gradient,strokeWidth:0},
          [[0, 0], [25, 0], [25, 50], [75, 0], [100, 0], [40, 65], [100, 150], [75, 150], [25, 75], [25, 150], [0, 150]])
      shapes["e3"] = new SmartShape().init(div1, {fillGradient:gradient,strokeWidth:0},
          [[0, 0], [100, 0], [100, 25], [25, 25], [25, 60], [100, 60], [100, 85], [25, 85], [25, 120], [100, 120], [100, 150], [0, 150]])
      shapes["n"] = new SmartShape().init(div1, {fillGradient:gradient,strokeWidth:0},
          [[0, 150], [0, 0], [35, 0], [75, 125], [75, 0], [100, 0], [100, 150], [65, 150], [25, 25], [25, 150]])
      shapes["d"] = new SmartShape().init(div1, {fillGradient:gradient,strokeWidth:0},
          [[0, 0], [75, 0], [100, 25], [100, 125], [75, 150], [0, 150]])
      shapes["d_sub"] = new SmartShape().init(div1, {fill:"black",zIndex:1001},
          [[18, 13], [67, 13], [82, 26], [82, 125], [67, 137], [18, 137]])
      shapes["d"].addChild(shapes["d_sub"]);
      shapes["excl"] = new SmartShape().init(div1, {fillGradient:gradient,strokeWidth:0},
          [[0, 0], [25, 0], [25, 100], [0, 100]])
      shapes["excl_sub"] = new SmartShape().init(div1, {fillGradient:gradient,strokeWidth:0},
          [[0, 125], [25, 125], [25, 150], [0, 150]])
      shapes["excl"].addChild(shapes["excl_sub"]);

      shapes["w"].scaleTo(null,30);
      shapes["w"].redraw();
      shapes["e"].scaleTo(null,30);
      shapes["e"].moveTo(35,0);
      shapes["e"].redraw();
      shapes["w"].addChild(shapes["e"]);
      shapes["e2"].scaleTo(null,30);
      shapes["e2"].moveTo(65,0);
      shapes["e2"].redraw();
      shapes["w"].addChild(shapes["e2"]);
      shapes["k"].scaleTo(null,30);
      shapes["k"].moveTo(95,0);
      shapes["k"].redraw();
      shapes["w"].addChild(shapes["k"]);
      shapes["e3"].scaleTo(null,30);
      shapes["e3"].moveTo(125,0);
      shapes["e3"].redraw();
      shapes["w"].addChild(shapes["e3"]);
      shapes["n"].scaleTo(null,30);
      shapes["n"].moveTo(155,0);
      shapes["n"].redraw();
      shapes["w"].addChild(shapes["n"]);
      shapes["d"].scaleTo(null,30);
      shapes["d"].moveTo(185,0);
      shapes["d"].redraw();
      shapes["w"].addChild(shapes["d"]);
      shapes["excl"].scaleTo(null,30);
      shapes["excl"].moveTo(215,0);
      shapes["excl"].redraw();
      shapes["w"].addChild(shapes["excl"]);
      const blob = await shapes["w"].toPng("blob",500);
      assert.equal(blob.size,7628,"Should return correct BLOB");
    })
  });

  it('clone', () => {
    cy.visit('http://localhost:5173/tests/empty.html').then(() => {
      SmartShapeManager.clear();
      const app = Cypress.$("#app").toArray()[0];
      app.style.height = "500px";
      const shape1 = new SmartShape().init(app,{id:"shape1",name:"Shape 1",canScale:true,minWidth:50,minHeight:50,maxWidth:300,maxHeight:400},
          [[10,210],[10,10],[210,10],[210,210]]);
      const shape2 = new SmartShape().init(app,{id:"shape2",name:"Shape 2"},[[10,210],[10,10],[210,10],[210,210]]);
      shape1.addChild(shape2);
      const shape3 = shape1.clone();
      cy.wait(500).then(() => {
        assert.equal(SmartShapeManager.shapes.length,4,"Should add 2 more shapes to Shapes manager");
        assert.deepEqual(shape3.getPointsArray(),shape1.getPointsArray(),"Should correctly copy points");
        assert.deepEqual(shape3.getChildren()[0].getPointsArray(),shape2.getPointsArray(),"Should correctly copy points");
        assert.equal(shape3.options.id,"shape1_clone","Should set id of clone by adding '_clone' suffix");
        assert.equal(shape3.options.name,"Shape 1 Clone","Should set id of clone by adding ' Clone' suffix");
        assert.equal(shape3.getChildren()[0].options.id,"shape2_clone","Should set id of clone's child by adding '_clone' suffix");
        assert.equal(shape3.getChildren()[0].options.name,"Shape 2 Clone","Should set id of clone's child by adding ' Clone' suffix");
      })
    });
  })
})
