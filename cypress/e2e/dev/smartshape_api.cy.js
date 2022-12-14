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
          shape.setOptions({minPoints:3});
          shape.deletePoint(100, 0)
          const point1 = shape.findPoint(100, 0);
          assert.isNotNull(point1,"Should not allow to delete point if number goes beyond default value");
          assert.equal(shape.points.length, 3,"Should not allow to delete point if number goes beyond default value");
          const point = shape.addPoint(200, 200, {id: "point1",canDelete:true,forceDisplay:true});
          assert.isNotNull(point)
          assert.equal(shape.points.length, 4);
          shape.deletePoint(200, 200);
          assert.equal(shape.points.length, 3,"Should delete the point");
      })
  })

  it("deleteAllPoints", () => {
    cy.visit('http://localhost:5173/tests/empty.html').then(() => {
      const app = Cypress.$("#app").toArray()[0];
      const shape = new SmartShape();
      shape.init(app,{},[[0,100],[100,0],[200,100]]);
      shape.switchDisplayMode(SmartShapeDisplayMode.SELECTED);
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
    cy.visit('http://localhost:5173/tests/empty.html').then(async() => {
      const app = Cypress.$("#app").toArray()[0];
      const shape = new SmartShape();
      shape.init(app,{visible:false,canScale:true,id:"shape1"},[[0,100],[100,0],[200,100]]);
      shape.setOptions({canScale:true,canRotate:true,displayMode:SmartShapeDisplayMode.SCALE});
      shape.redraw();
      cy.wait(1).then(async() => {
        assert.equal(shape.svg.style.display,'none',"Should create invisible shape");
        assert.equal(shape.resizeBox.shape.svg.style.display, 'none', "Resize box should be also invisible")
        for (let point of shape.resizeBox.shape.points) {
          assert.equal(point.element.style.display,'none',"Resize box point must be invisible");
        }
        await shape.show();
        cy.wait(1).then(async() => {
          assert.notEqual(shape.svg.style.display,'none',"Should show visible shape");
          assert.notEqual(shape.resizeBox.shape.svg.style.display, 'none', "Resize box should be also visible")
          for (let point of shape.resizeBox.shape.points) {
            assert.notEqual(point.element.style.display,'none',"Resize box point must be visible");
          }
          await shape.hide();
          cy.wait(1).then(() => {
            assert.equal(shape.svg.style.display,'none',"Should hide shape");
            assert.equal(shape.resizeBox.shape.svg.style.display, 'none', "Resize box should be also invisible")
            for (let point of shape.points) {
              assert.equal(point.element.style.display,'none',"Point must be invisible");
            }
            for (let point of shape.resizeBox.shape.points) {
              assert.equal(point.element.style.display,'none',"Resize box point must be invisible");
            }
          })
        })
      })
    });
  })

  it("switchDisplayMode", () => {
    cy.visit('http://localhost:5173/tests/empty.html').then(async() => {
      const [app,shape] = setup();
      shape.setOptions({pointOptions:{forceDisplay:false}});
      await shape.redraw();
      assert.equal(shape.options.displayMode, SmartShapeDisplayMode.DEFAULT,"Should be in DEFAULT mode by default");
      assert.isNull(shape.resizeBox,"Resize box by default is null");
      assert.isNull(shape.rotateBox,"Rotate box by default is null");
      assert.isNull(shape.points[0].element,"Points should be hidden in DEFAULT display mode")
      await shape.switchDisplayMode();
      assert.equal(shape.options.displayMode, SmartShapeDisplayMode.SELECTED,"Should switch to SELECTED mode");
      assert.equal(shape.points[0].element.style.display,'',"Points should be displayed in DEFAULT display mode");
      assert.isNull(shape.resizeBox,"Resize box in selected mode is null");
      assert.isNull(shape.rotateBox,"Rotate box in selected mode is null");
      assert.equal(shape.options.displayMode,SmartShapeDisplayMode.SELECTED,"Should not switch to SCALE because canScale option disabled");
      shape.setOptions({canScale:true});
      await shape.switchDisplayMode();
      assert.equal(shape.options.displayMode,SmartShapeDisplayMode.SCALE,"Should switch from DEFAULT to SCALE");
      assert.isNotNull(shape.resizeBox,"Should create Resize box");
      assert.isNotNull(shape.resizeBox.shape.svg,"Should display shape for Resize box");
      assert.equal(shape.resizeBox.shape.svg.style.display,'',"Should show resize box");
      await shape.switchDisplayMode();
      assert.equal(shape.options.displayMode,SmartShapeDisplayMode.DEFAULT,"Should not switch to ROTATE because canRotate option disabled");
      shape.setOptions({canRotate:true});
      await shape.switchDisplayMode();
      await shape.switchDisplayMode();
      await shape.switchDisplayMode();
      assert.equal(shape.options.displayMode,SmartShapeDisplayMode.ROTATE,"Should switch from SCALE to ROTATE");
      assert.isNotNull(shape.rotateBox,"Should create Rotate box");
      assert.isNotNull(shape.rotateBox.shape.svg,"Should display shape for Rotate box");
      assert.equal(shape.rotateBox.shape.svg.style.display,'',"Should show rotate box");
      await shape.switchDisplayMode();
      cy.wait(10).then(async() => {
        assert.equal(shape.options.displayMode,SmartShapeDisplayMode.DEFAULT,"Should switch from ROTATE to default");
        assert.equal(shape.resizeBox.shape.svg.style.display,'none',"Should hide resize box");
        assert.equal(shape.rotateBox.shape.svg.style.display,'none',"Should hide rotate box");
        await shape.switchDisplayMode(SmartShapeDisplayMode.ROTATE);
        cy.wait(10).then(async() => {
          assert.equal(shape.options.displayMode,SmartShapeDisplayMode.ROTATE,"Should switch DIRECTLY to ROTATE");
          assert.equal(shape.rotateBox.shape.svg.style.display,'',"Should display rotate box");
          shape.setOptions({canScale:false});
          await shape.switchDisplayMode(SmartShapeDisplayMode.SCALE);
          cy.wait(10).then(async() => {
            assert.equal(shape.options.displayMode,SmartShapeDisplayMode.DEFAULT,"Should switch to DEFAULT if SCALE is disabled");
            await shape.switchDisplayMode(SmartShapeDisplayMode.DEFAULT);
            shape.setOptions({canRotate:false});
            await shape.switchDisplayMode(SmartShapeDisplayMode.DEFAULT);
            cy.wait(10).then(async() => {
              assert.equal(shape.options.displayMode,SmartShapeDisplayMode.DEFAULT,"Should switch to DEFAULT if ROTATE is disabled");
              shape.setOptions({canScale:true,canRotate:true,pointOptions:{canDrag:false}});
              shape.points.forEach(point=>point.setOptions({canDrag:false}));
              await shape.redraw();
              await shape.switchDisplayMode(SmartShapeDisplayMode.ROTATE);
              await shape.switchDisplayMode(SmartShapeDisplayMode.SELECTED);
              cy.wait(10).then(() => {
                assert.equal(shape.options.displayMode, SmartShapeDisplayMode.DEFAULT,
                    "Should not switch to SELECTED because it's not allowed to drag points"
                );
                shape.switchDisplayMode();
                cy.wait(10).then(() => {
                  assert.equal(shape.options.displayMode, SmartShapeDisplayMode.SCALE,
                      "Should skip selected and switch directly to SCALED, because it's not allowed to drag points"
                  );
                })
              })
            })
          })
        })
      })
    });
  });

  it("setOptions", () => {
    cy.visit('http://localhost:5173/tests/empty.html').then(() => {
      const [app, shape] = setup();
      cy.get("#shape1").should("exist").then(() => {
        shape.setOptions({
          id: "shape2",
          name: "Cool shape",
          maxPoints: 6,
          pointOptions: {
            style: {
              borderColor: "rgb(0, 255, 0)"
            }
          },
          classes: "myShape",
          style: {
            "stroke-opacity": 0.0,
            fill: "rgb(0, 255, 0)",
            "fill-opacity": "0.5",
            stroke: "rgb(150, 150, 150)",
            "stroke-width": 5,
            "stroke-dasharray": "10,20,10",
            "stroke-linecap": "round",
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
            cy.get("#shape2 > path").should("have.css", "fill", "rgb(0, 255, 0)").then(() => {
              cy.get("#shape2 > path").should("have.css", "stroke", "rgb(150, 150, 150)").then(() => {
                cy.get("#shape2 > path").should("have.css", "stroke-width", "5px").then(() => {
                  cy.get("#shape2 > path").should("have.css", "stroke-dasharray", "10px, 20px, 10px").then(() => {
                    cy.get("#shape2 > path").should("have.css", "stroke-linecap", "round").then(() => {
                      cy.get("#shape2 > path").should("have.class", "myShape").then(() => {
                        cy.get("#shape2 > path").should("have.css", "stroke-opacity", "0").then(() => {
                          cy.get("#shape2").should("have.css","z-index","1010").then(() => {
                            cy.get("#shape2 > path").should("have.css", "z-index", "1010").then(() => {
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
      assert.isTrue(shape.belongsToShape(8,108, false),"Point on border should belong to shape");
      assert.isTrue(shape.belongsToShape(15,90, false),"Point inside shape should belong to shape");
      assert.isFalse(shape.belongsToShape(5,40, false),"Point above border should not belong to shape");
      assert.isFalse(shape.belongsToShape(195,60, false),"Point above border on the right side should not belong to shape");
    });
  })

  it("toSvg", () => {
    cy.visit('http://localhost:5173/tests/empty.html').then(async() => {
      const app = Cypress.$("#app").toArray()[0];
      const shape1 = new SmartShape().init(app,{style:{fill:"#gradient"},fillGradient:{
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
      await shape1.redraw();
      await shape2.redraw();
      const svgString = await shape1.toSvg();
      const div = document.createElement("div");
      div.innerHTML = svgString;
      const svg = div.querySelector("svg");
      assert.isNotNull(svg,"Should contain SVG element as a root");
      let defs = svg.querySelectorAll("defs")
      assert.equal(defs.length,1,"Should be single 'defs' tag inside");
      defs = defs[0];
      assert.equal(defs.children.length,2, "Should be 2 defs inside");
      const polygons = svg.querySelectorAll("path");
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
      await shapes["w"].redraw();
      shapes["e"].scaleTo(null,30);
      await shapes["e"].moveTo(35,0);
      shapes["w"].addChild(shapes["e"]);
      shapes["e2"].scaleTo(null,30);
      await shapes["e2"].moveTo(65,0);
      shapes["w"].addChild(shapes["e2"]);
      shapes["k"].scaleTo(null,30);
      await shapes["k"].moveTo(95,0);
      shapes["w"].addChild(shapes["k"]);
      shapes["e3"].scaleTo(null,30);
      await shapes["e3"].moveTo(125,0);
      shapes["w"].addChild(shapes["e3"]);
      shapes["n"].scaleTo(null,30);
      await shapes["n"].moveTo(155,0);
      shapes["w"].addChild(shapes["n"]);
      shapes["d"].scaleTo(null,30);
      await shapes["d"].moveTo(185,0);
      shapes["w"].addChild(shapes["d"]);
      shapes["excl"].scaleTo(null,30);
      await shapes["excl"].moveTo(215,0);
      shapes["w"].addChild(shapes["excl"]);
      const blob = await shapes["w"].toPng("blob",500);
      //assert.equal(blob.size,8438,"Should return correct BLOB");
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
      let event_triggered = false;
      EventsManager.subscribe(ShapeEvents.SHAPE_CREATE,(event) => {
        if (event.target.options.id === "shape1_2") {
          if (event.parent && event.parent.guid === shape1.guid) {
            event_triggered = true;
          }
        }
      })
      const shape3 = shape1.clone();
      cy.wait(500).then(() => {
        assert.equal(SmartShapeManager.getShapes().length,4,"Should add 2 more shapes to Shapes manager");
        assert.deepEqual(shape3.getPointsArray(),shape1.getPointsArray(),"Should correctly copy points");
        assert.deepEqual(shape3.getChildren()[0].getPointsArray(),shape2.getPointsArray(),"Should correctly copy points");
        assert.equal(shape3.options.id,"shape1_2","Should set id of clone by adding '_clone' suffix");
        assert.equal(shape3.options.name,"Shape 1 2","Should set id of clone by adding ' Clone' suffix");
        assert.equal(shape3.getChildren()[0].options.id,
            "shape2_3_4","Should set id of clone's child by adding '_clone' suffix");
        assert.equal(shape3.getChildren()[0].options.name,
            "Shape 2 3 4","Should set id of clone's child by adding ' Clone' suffix");
        assert.isTrue(event_triggered, "Added shape1 as a parent of shape3 when emit SHAPE_CREATE event");
      })
    });
  })

  it('flip', () => {
    cy.visit('http://localhost:5173/tests/empty.html').then(() => {
      const app = Cypress.$("#app").toArray()[0];
      const shape = SmartShapeManager.createShape(app,{},[[10,20],[40,0],[80,70],[30,80]]);
      shape.flip(false,true);
      assert.deepEqual(shape.getPointsArray(),[[10,60],[40,80],[80,10],[30,0]],"Should flip vertically correctly");
      shape.flip(true,false);
      assert.deepEqual(shape.getPointsArray(),[[80,60],[50,80],[10,10],[60,0]],"Should flip vertically correctly");
      shape.flip(true,true);
      assert.deepEqual(shape.getPointsArray(),[[10,20],[40,0],[80,70],[30,80]],"Should flip vertically correctly");
    })
  })

  it("insertPoint", () => {
    cy.visit('http://localhost:5173/tests/empty.html').then(() => {
      SmartShapeManager.clear();
      const app = Cypress.$("#app").toArray()[0];
      const shape = SmartShapeManager.createShape(app,{canAddPoints:true},[[0,100],[100,0],[200,100],[100,200]],true);
      shape.insertPoint(150,50,[200,100]);
      assert.deepEqual(shape.getPointsArray(),[[0,100],[100,0],[150,50],[200,100],[100,200]],
          "Should correctly insert point if 'before' specified as [x,y] array"
      )
      let point = shape.findPoint(100,0);
      shape.insertPoint(50,50,point);
      assert.deepEqual(shape.getPointsArray(), [[0,100],[50,50],[100,0],[150,50],[200,100],[100,200]],
          "Should correctly insert point if 'before' specified as SmartPoint object"
      )
      shape.insertPoint(80,80,[110,210]);
      assert.deepEqual(shape.getPointsArray(), [[0,100],[50,50],[100,0],[150,50],[200,100],[100,200]],
          "Should not insert point if 'before' does not exist"
      );
      shape.insertPoint(80,80,[0,100]);
      assert.deepEqual(shape.getPointsArray(), [[80,80],[0,100],[50,50],[100,0],[150,50],[200,100],[100,200]],
          "Should insert point if 'before' is a first item"
      );
      const shape2 = SmartShapeManager.createShape(app,{canAddPoints:true},[[0,100],[100,0],[200,100]],true);
      point = shape2.findPoint(0,100);
      shape.insertPoint(60,60,point);
      assert.deepEqual(shape.getPointsArray(), [[80,80],[0,100],[50,50],[100,0],[150,50],[200,100],[100,200]],
          "Should not insert point if before specified as a point object from other shape"
      );
    });
  })
  it("getClosestPoint", () => {
    cy.visit('http://localhost:5173/tests/empty.html').then(() => {
      SmartShapeManager.clear();
      const app = Cypress.$("#app").toArray()[0];
      const shape = SmartShapeManager.createShape(app,{canAddPoints:true},[],true);
      let point = shape.getClosestPoint(30,30);
      assert.isNull(point,"Should not return closest point if no points");
      shape.addPoints([[0,100],[100,0],[200,100],[100,200]]);
      point = shape.getClosestPoint(30,30);
      let p = [point.x,point.y]
      assert.deepEqual([point.x,point.y],[100,0],"Should correctly return closest point");
      const points = shape.getPointsArray();
      points.splice(1,1);
      point = shape.getClosestPoint(30,30,points);
      assert.deepEqual([point.x,point.y], [0,100], "Should correctly return second closest point");
      point = shape.getClosestPoint(30,30,[["boo","woo"],["goo","doo"]]);
      assert.isNull(point,"Should not return point if coordinates are incorrect")
      point = shape.getClosestPoint(30,30,[["boo","woo"]]);
      assert.isNull(point,"Should not return point if single coordinate is incorrect")
    });
  })

  it("changeZIndex", () => {
    cy.visit('http://localhost:5173/tests/empty.html').then(() => {
      const app = Cypress.$("#app").toArray()[0];
      const shape = new SmartShape().init(app,{zIndex:1000},[[0,100],[100,0],[200,100]]);
      shape.show();
      shape.changeZIndex(1001);
      shape.switchDisplayMode(SmartShapeDisplayMode.SELECTED);
      cy.wait(3).then(() => {
        assert.equal(shape.options.zIndex,1001, "Should change zIndex option");
        assert.equal(shape.svg.style.zIndex, 1001, "Should change z-index CSS style");
        assert.equal(shape.points[0].element.style.zIndex,1003,"Should change z-index CSS style of points");
        shape.changeZIndex(1000);
        cy.wait(1).then(() => {
          assert.equal(shape.options.zIndex,1000, "Should change zIndex option");
          assert.equal(shape.svg.style.zIndex, 1000, "Should change z-index CSS style");
          assert.equal(shape.points[0].element.style.zIndex,1002,"Should change z-index CSS style of points");
          const shape2 = new SmartShape().init(app, {zIndex:1001}, [[10,20],[20,10],[30,20]]);
          shape.addChild(shape2);
          shape2.show();
          const shape3 = new SmartShape().init(app, {zIndex:1004}, [[40,20],[50,10],[60,20]]);
          shape2.addChild(shape3);
          shape3.show();
          shape.changeZIndex(1001);
          cy.wait(3).then(() => {
            assert.equal(shape.options.zIndex,1001, "Should change zIndex option");
            assert.equal(shape.svg.style.zIndex, 1001, "Should change z-index CSS style");
            assert.equal(shape.points[0].element.style.zIndex,1003,"Should change z-index CSS style of points");
            assert.equal(shape2.options.zIndex,1002, "Should change zIndex option");
            assert.equal(shape.svg.querySelector("#p"+shape2.guid+"_polygon").style.zIndex, 1002, "Should change z-index CSS style");
            assert.equal(shape2.points[0].element.style.zIndex,1004,"Should change z-index CSS style of points");
            assert.equal(shape3.options.zIndex,1005, "Should change zIndex option");
            assert.equal(shape.svg.querySelector("#p"+shape3.guid+"_polygon").style.zIndex, 1005, "Should change z-index CSS style");
            assert.equal(shape3.points[0].element.style.zIndex,1007,"Should change z-index CSS style of points");
          })
        })
      })
    });
  });

  it("moveToTop", () => {
    cy.visit('http://localhost:5173/tests/empty.html').then(() => {
      const app = Cypress.$("#app").toArray()[0];
      const shape = new SmartShape().init(app,{zIndex:1000},[[0,100],[100,0],[200,100]]);
      shape.show();
      shape.moveToTop();
      shape.switchDisplayMode(SmartShapeDisplayMode.SELECTED);
      cy.wait(1).then(() => {
        assert.equal(shape.options.zIndex,1000, "Should not move shape to top if it already on top");
        assert.equal(shape.svg.style.zIndex, 1000,
            "Should not change shape CSS style because it already on top"
        );
        assert.equal(shape.points[0].element.style.zIndex,1002,
            "Should not change point CSS styles because shape is already on top"
        );
        const shape2 = new SmartShape().init(app, {zIndex:1001}, [[10,20],[20,10],[30,20]]);
        shape2.show();
        const shape3 = new SmartShape().init(app, {zIndex:1004}, [[40,20],[50,10],[60,20]]);
        shape3.show();
        shape.moveToTop();
        cy.wait(1).then(() => {
          assert.equal(shape.options.zIndex,1005, "Should move shape to top");
          assert.equal(shape.svg.style.zIndex, 1005,
              "Should change shape CSS style to top one"
          );
          assert.equal(shape.points[0].element.style.zIndex,1007,
              "Should change point CSS styles to top ones"
          );
        })
      })
    });
  });

  it("moveToBottom", () => {
    cy.visit('http://localhost:5173/tests/empty.html').then(() => {
      const app = Cypress.$("#app").toArray()[0];
      const shape = new SmartShape().init(app,{zIndex:1000},[[0,100],[100,0],[200,100]]);
      shape.show();
      shape.moveToTop();
      shape.switchDisplayMode(SmartShapeDisplayMode.SELECTED);
      cy.wait(1).then(() => {
        assert.equal(shape.options.zIndex,1000, "Should not move shape to bottom if it already on top");
        assert.equal(shape.svg.style.zIndex, 1000,
            "Should not change shape CSS style because it already on bottom"
        );
        assert.equal(shape.points[0].element.style.zIndex,1002,
            "Should not change point CSS styles because shape is already on bottom"
        );
        const shape2 = new SmartShape().init(app, {zIndex:1001}, [[10,20],[20,10],[30,20]]);
        shape2.show();
        const shape3 = new SmartShape().init(app, {zIndex:1004}, [[40,20],[50,10],[60,20]]);
        shape3.show();
        shape3.switchDisplayMode(SmartShapeDisplayMode.SELECTED);
        shape3.moveToBottom();
        cy.wait(1).then(() => {
          assert.equal(shape3.options.zIndex,999, "Should move shape to bottom");
          assert.equal(shape3.svg.style.zIndex, 999,
              "Should change shape CSS style to bottom one"
          );
          assert.equal(shape3.points[0].element.style.zIndex,1001,
              "Should change point CSS styles to bottom ones"
          );
        })
      })
    });
  });

  it("mapCurrentPointToOriginal", () => {
    cy.visit('http://localhost:5173/tests/empty.html').then(() => {
      SmartShapeManager.clear();
      const app = Cypress.$("#app").toArray()[0];
      app.style.width = "1000px";
      app.style.height = "1000px";
      const shape = new SmartShape().init(app,{zIndex:1000,id:"shape"},[[0,100],[100,0],[150,50],[200,0],[200,100]]);
      const point = shape.findPoint(150,50);
      [shape.options.centerX,shape.options.centerY] = shape.getCenter(shape.options.groupChildShapes);
      shape.moveBy(140,130);
      shape.scaleTo(500,400);
      shape.scaleTo(100,30);
      shape.flip(true,true,true);
      shape.show();
      let [x,y] = shape.mapCurrentPointToOriginal(point.x,point.y);
      assert.equal(parseInt(x),150,"Should correctly map X coordinate");
      assert.equal(parseInt(y),50,"Should correctly map Y coordinate");
    });
  });

  it("mapOriginalPointToCurrent", () => {
    cy.visit('http://localhost:5173/tests/empty.html').then(() => {
      SmartShapeManager.clear();
      const app = Cypress.$("#app").toArray()[0];
      app.style.width = "1000px";
      app.style.height = "1000px";
      const shape = new SmartShape().init(app,{zIndex:1000,id:"shape"},[[0,100],[100,0],[150,50],[200,0],[200,100]]);
      const point = shape.findPoint(150,50);
      [shape.options.centerX,shape.options.centerY] = shape.getCenter(shape.options.groupChildShapes);
      shape.moveBy(140,130);
      shape.scaleTo(500,400);
      shape.flip(true,true,true);
      shape.scaleTo(100,30);
      shape.show();
      let [x,y] = shape.mapOriginalPointToCurrent(150,50);
      assert.equal(parseInt(x),point.x,"Should correctly map X coordinate");
      assert.equal(parseInt(y),point.y,"Should correctly map Y coordinate");
    });
  });

  it("zoomBy", () => {
    cy.visit('http://localhost:5173/tests/empty.html').then(async() => {
      const app = Cypress.$("#app").toArray()[0];
      app.style.height = "800px";
      const shape = new SmartShape().init(app, {hasContextMenu:true},[[0, 100], [100, 0], [200, 100]]);
      const point1 = shape.findPoint(0,100);
      const point2 = shape.findPoint(100,0);
      const point3 = shape.findPoint(200,100);
      shape.scaleBy(2,3);
      assert.equal(shape.options.scaleFactorX, 2, "Should correctly scale shape by X");
      assert.equal(shape.options.scaleFactorY, 3, "Should correctly scale shape by Y");
      assert.equal(point1.x, 0, "Should correctly scale point 1 by X");
      assert.equal(point1.y, 300, "Should correctly scale point 1 by Y");
      assert.equal(point2.x, 200, "Should correctly scale point 2 by X");
      assert.equal(point2.y, 0, "Should correctly scale point 2 by Y");
      assert.equal(point3.x, 400, "Should correctly scale point 3 by X");
      assert.equal(point3.y, 300, "Should correctly scale point 3 by Y");
      shape.zoomBy(2)
      assert.equal(shape.options.zoomLevel, 2, "Should set zoom level");
      assert.equal(shape.options.scaleFactorX, 4, "Should correctly scale shape by X");
      assert.equal(shape.options.scaleFactorY, 6, "Should correctly scale shape by Y");
      assert.equal(point1.x, 0, "Should correctly scale point 1 by X");
      assert.equal(point1.y, 600, "Should correctly scale point 1 by Y");
      assert.equal(point2.x, 400, "Should correctly scale point 2 by X");
      assert.equal(point2.y, 0, "Should correctly scale point 2 by Y");
      assert.equal(point3.x, 800, "Should correctly scale point 3 by X");
      assert.equal(point3.y, 600, "Should correctly scale point 3 by Y");
      assert.equal(shape.width, 800, "Should recalculate shape position according to zoom level");
      assert.equal(shape.height, 600, "Should recalculate shape position according to zoom level");
      shape.redraw();
    })
  });
})
