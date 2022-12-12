import SmartShapeManager from "../../../src/SmartShapeManager/SmartShapeManager.js";
import SmartShape, {SmartShapeDisplayMode} from "../../../src/SmartShape/SmartShape.js";
import EventsManager from "../../../src/events/EventsManager.js";
import {ShapeEvents} from "../../../src/SmartShape/SmartShapeEventListener.js";
import SmartPoint, {PointEvents} from "../../../src/SmartPoint/SmartPoint.js";
import ResizeBox from "../../../src/ResizeBox/ResizeBox.js";

describe('SmartShape and SmartPoint events', () => {

  it('SmartShape mousedown', () => {
    cy.visit('http://localhost:5173/tests/empty.html').then(() => {
      const app = Cypress.$("#app").toArray()[0];
      const shape = new SmartShape().init(app,{id:"shape1"},[[0,100],[100,0],[200,100]]);
      let triggered = false;
      shape.addEventListener("mousedown",(event) => {
        triggered = true;
        assert.equal(event.target,shape,"Should have correct event target");
      })
      cy.get("#app").trigger("mousemove",{clientX:67,clientY:80}).then(() => {
        cy.get("#shape1").trigger("mousedown",{buttons:1}).then(() => {
          assert.isTrue(triggered, "Should trigger mousedown event");
          shape.destroy();
        });
      });
    });
  })

  it('SmartShape mouseup', () => {
    cy.visit('http://localhost:5173/tests/empty.html').then(() => {
      const app = Cypress.$("#app").toArray()[0];
      const shape = new SmartShape().init(app,{id:"shape1"},[[0,100],[100,0],[200,100]]);
      let triggered = false;
      shape.addEventListener("mouseup",(event) => {
        triggered = true;
        assert.equal(event.target,shape,"Should have correct event target");
      })
      cy.get("#app").trigger("mousemove",{clientX:67,clientY:80}).then(() => {
        cy.get("#shape1").trigger("mousedown",{buttons:1}).then(() => {
          cy.get("#shape1").trigger("mouseup", {buttons: 1}).then(() => {
            assert.isTrue(triggered, "Should trigger mouseup event");
            shape.destroy();
          });
        })
      });
    });
  })

  it('SmartShape click', () => {
    cy.visit('http://localhost:5173/tests/empty.html').then(() => {
      const app = Cypress.$("#app").toArray()[0];
      const shape = new SmartShape().init(app,{id:"shape1"},[[0,100],[100,0],[200,100]]);
      let triggered = false;
      shape.addEventListener("click",(event) => {
        triggered = true;
        assert.equal(event.target,shape,"Should have correct event target");
      })
      cy.get("#app").trigger("mousemove",{clientX:67,clientY:80}).then(() => {
        cy.get("#shape1").trigger("click", {buttons: 1}).then(() => {
          assert.isTrue(triggered, "Should trigger click event");
          shape.destroy();
        });
      })
    });
  })

  it('SmartShape mouseover/mouseout', () => {
    cy.visit('http://localhost:5173/tests/empty.html').then(() => {
      const app = Cypress.$("#app").toArray()[0];
      const shape = new SmartShape().init(app,{id:"shape1"},[[0,100],[100,0],[200,100]]);
      let triggeredOver = false;
      let triggeredOut = false;
      shape.addEventListener("mouseover",(event) => {
        triggeredOver = true;
        assert.equal(event.target,shape,"Should have correct event target");
      })
      shape.addEventListener("mouseout",(event) => {
        triggeredOut = true;
        assert.equal(event.target,shape,"Should have correct event target");
      })
      cy.get("#app").trigger("mousemove",{clientX:67,clientY:80}).then(() => {
        cy.get("#shape1").trigger("mouseover",{}).then(() => {
          assert.isTrue(triggeredOver, "Should trigger mouseover event");
          cy.get("#shape1").trigger("mouseout",{}).then(() => {
            assert.isTrue(triggeredOut, "Should trigger mouseout event");
            shape.destroy();
          });
        });
      })
    });
  })

  it('SmartShape mousemove', () => {
    cy.visit('http://localhost:5173/tests/empty.html').then(() => {
      const app = Cypress.$("#app").toArray()[0];
      const shape = new SmartShape().init(app,{id:"shape1"},[[0,100],[100,0],[200,100]]);
      let triggered = false;
      shape.addEventListener("mousemove",(event) => {
        triggered = true;
        assert.equal(event.target,shape,"Should have correct event target");
      })
      cy.get("#app").trigger("mousemove",{clientX:67,clientY:80}).then(() => {
        assert.isTrue(triggered, "Should trigger click event");
        shape.destroy();
      });
    });
  })

  it('SmartShape dblclick', () => {
    cy.visit('http://localhost:5173/tests/empty.html').then(() => {
      const app = Cypress.$("#app").toArray()[0];
      const shape = new SmartShape().init(app,{id:"shape1"},[[0,100],[100,0],[200,100]]);
      let triggered = false;
      shape.addEventListener("dblclick",(event) => {
        triggered = true;
        assert.equal(event.target,shape,"Should have correct event target");
      })
      cy.get("#app").trigger("mousemove",{clientX:67,clientY:80}).then(() => {
        cy.get("#shape1").trigger("dblclick", {buttons: 1}).then(() => {
          assert.isTrue(triggered, "Should trigger click event");
          shape.destroy();
        });
      })
    });
  })

  it('SmartShape move_start', () => {
    cy.visit('http://localhost:5173/tests/empty.html').then(() => {
      const app = Cypress.$("#app").toArray()[0];
      const shape = new SmartShape().init(app,{id:"shape1"},[[0,100],[100,0],[200,100]]);
      let triggered = false;
      shape.addEventListener("move_start",(event) => {
        triggered = true;
        assert.equal(event.target,shape,"Should have correct event target");
      })
      cy.get("#app").trigger("mousemove",{clientX:67,clientY:80}).then(() => {
        cy.get("#shape1").trigger("mousedown", {buttons: 1}).then(() => {
          cy.wait(200).then(() => {
            assert.isTrue(triggered, "Should trigger move_start event");
            shape.destroy();
          })
        });
      })
    });
  })

  it('SmartShape move', () => {
    cy.visit('http://localhost:5173/tests/empty.html').then(() => {
      const app = Cypress.$("#app").toArray()[0];
      const shape = new SmartShape().init(app,{id:"shape1"},[[0,100],[100,0],[200,100]]);
      let triggered = false;
      shape.addEventListener("move",(event) => {
        triggered = true;
        assert.equal(event.target,shape,"Should have correct event target");
      })
      cy.get("#app").trigger("mousemove",{clientX:67,clientY:80}).then(() => {
        cy.get("#shape1").trigger("mousedown", {buttons: 1}).then(() => {
          cy.wait(200).then(() => {
            cy.get("#app").trigger("mousemove",{buttons:1,movementX:100,movementY:10}).then(() => {
              assert.isTrue(triggered, "Should trigger move event");
              shape.destroy();
            });
          })
        });
      })
    });
  })

  it('SmartShape move_end', () => {
    cy.visit('http://localhost:5173/tests/empty.html').then(() => {
      const app = Cypress.$("#app").toArray()[0];
      const shape = new SmartShape().init(app,{id:"shape1"},[[0,100],[100,0],[200,100]]);
      let triggered = false;
      shape.addEventListener("move_end",(event) => {
        triggered = true;
        assert.equal(event.target,shape,"Should have correct event target");
      })
      cy.get("#app").trigger("mousemove",{clientX:67,clientY:80}).then(() => {
        cy.get("#shape1").trigger("mousedown", {buttons: 1}).then(() => {
          cy.wait(200).then(() => {
            cy.get("#app").trigger("mousemove",{buttons:1,movementX:100,movementY:10}).then(() => {
              cy.get("#shape1").trigger("mouseup", {buttons: 1}).then(() => {
                assert.isTrue(triggered, "Should trigger move_end event");
                shape.destroy();
              });
            });
          })
        });
      })
    });
  })

  it('SmartShape resize', () => {
    cy.visit('http://localhost:5173/tests/empty.html').then(() => {
      const app = Cypress.$("#app").toArray()[0];
      const shape = new SmartShape().init(app,{id:"shape1",canScale:true},[[0,100],[100,0],[200,100]]);
      shape.switchDisplayMode(SmartShapeDisplayMode.SCALE);
      let triggered = false;
      shape.addEventListener("resize",(event) => {
        triggered = true;
        assert.equal(event.target,shape,"Should have correct event target");
      })
      cy.wait(10).then(() => {
        cy.get("#"+shape.resizeBox.shape.guid+"_right_center").trigger("mousedown", {buttons: 1}).then(() => {
          cy.wait(200).then(() => {
            cy.get("#"+shape.resizeBox.shape.guid+"_right_center").trigger("mousemove",{buttons:1,movementX:100,movementY:10}).then(() => {
              cy.get("#"+shape.resizeBox.shape.guid+"_right_center").trigger("mouseup",{buttons:0}).then(() => {
                assert.isTrue(triggered, "Should trigger resize event");
                shape.destroy();
              })
            });
          });
        })
      })
    });
  })

  it('SmartShape rotate', () => {
    cy.visit('http://localhost:5173/tests/empty.html').then(() => {
      const app = Cypress.$("#app").toArray()[0];
      const shape = new SmartShape().init(app,{id:"shape1",canRotate:true},[[0,100],[100,0],[200,100]]);
      shape.switchDisplayMode(SmartShapeDisplayMode.ROTATE);
      let triggered = false;
      shape.addEventListener("rotate",(event) => {
        triggered = true;
        assert.equal(event.target,shape,"Should have correct event target");
      })
      cy.wait(10).then(() => {
        cy.get("#"+shape.rotateBox.shape.guid+"_right_bottom").trigger("mousedown", {buttons: 1}).then(() => {
          cy.wait(200).then(() => {
            cy.get("#"+shape.rotateBox.shape.guid+"_right_bottom").trigger("mousemove",{buttons:1,movementX:100,movementY:10}).then(() => {
              assert.isTrue(triggered, "Should trigger rotate event");
              shape.destroy();
            });
          });
        })
      })
    });
  })

  it('SmartShape point_drag_start', () => {
    cy.visit('http://localhost:5173/tests/empty.html').then(() => {
      const app = Cypress.$("#app").toArray()[0];
      const shape = new SmartShape().init(app,{id:"shape1"},[[0,100],[100,0],[200,100]]);
      shape.switchDisplayMode(SmartShapeDisplayMode.SELECTED);
      shape.points[0].element.id = "point1";
      let triggered = false;
      shape.addEventListener("point_drag_start",(event) => {
        triggered = true;
        assert.equal(event.target,shape,"Should have correct event target");
        assert.equal(event.point,shape.points[0],"Should have correct event target");
      })
      cy.get("#point1").trigger("mousedown", {buttons: 1}).then(() => {
        assert.isTrue(triggered, "Should trigger point_drag_start event");
        shape.destroy();
      });
    })
  })

  it('SmartShape point_drag_move', () => {
    cy.visit('http://localhost:5173/tests/empty.html').then(() => {
      const app = Cypress.$("#app").toArray()[0];
      const shape = new SmartShape().init(app,{id:"shape1"},[[0,100],[100,0],[200,100]]);
      shape.switchDisplayMode(SmartShapeDisplayMode.SELECTED);
      shape.points[0].element.id = "point1";
      let triggered = false;
      shape.addEventListener("point_drag_move",(event) => {
        triggered = true;
        assert.equal(event.target,shape,"Should have correct event target");
        assert.equal(event.point,shape.points[0],"Should have correct event target");
      })
      cy.get("#point1").trigger("mousedown", {buttons: 1}).then(() => {
        cy.get("#point1").trigger("mousemove", {buttons: 1}).then(() => {
          assert.isTrue(triggered, "Should trigger point_drag_move event");
          shape.destroy();
        });
      });
    })
  })

  it('SmartShape point_drag_end', () => {
    cy.visit('http://localhost:5173/tests/empty.html').then(() => {
      const app = Cypress.$("#app").toArray()[0];
      const shape = new SmartShape().init(app,{id:"shape1"},[[0,100],[100,0],[200,100]]);
      shape.switchDisplayMode(SmartShapeDisplayMode.SELECTED);
      shape.points[0].element.id = "point1";
      let triggered = false;
      shape.addEventListener("point_drag_end",(event) => {
        triggered = true;
        assert.equal(event.target,shape,"Should have correct event target");
        assert.equal(event.point,shape.points[0],"Should have correct event target");
      })
      cy.get("#point1").trigger("mousedown", {buttons: 1}).then(() => {
        cy.get("#point1").trigger("mousemove", {buttons: 1}).then(() => {
          cy.get("#app").trigger("mouseup", {buttons: 1}).then(() => {
            assert.isTrue(triggered, "Should trigger point_drag_end event");
            shape.destroy();
          });
        });
      });
    })
  })

  it('SmartShape create', () => {
    cy.visit('http://localhost:5173/tests/empty.html').then(() => {
      const app = Cypress.$("#app").toArray()[0];
      let triggered = false;
      EventsManager.subscribe(ShapeEvents.SHAPE_CREATE,(event) => {
        triggered = true;
      });
      const shape = new SmartShape().init(app,{id:"shape1"},[[0,100],[100,0],[200,100]]);
      assert.isTrue(triggered,"Should trigger create event")
      shape.destroy();
      EventsManager.clear();
    });
  })

  it('SmartShape destroy', () => {
    cy.visit('http://localhost:5173/tests/empty.html').then(() => {
      const app = Cypress.$("#app").toArray()[0];
      let triggered = false;
      const shape = new SmartShape().init(app,{id:"shape1"},[[0,100],[100,0],[200,100]]);
      shape.addEventListener("destroy", () => {
        triggered = true;
      })
      shape.destroy();
      assert.isTrue(triggered,"Should trigger destroy event")
    });
  })

  it('SmartPoint create', () => {
    cy.visit('http://localhost:5173/tests/empty.html').then(() => {
      const app = Cypress.$("#app").toArray()[0];
      let triggered = false;
      EventsManager.subscribe(PointEvents.POINT_ADDED, () => {
        triggered = true;
      })
      const point = new SmartPoint().init(10,10,{});
      assert.isTrue(triggered, "Should trigger create event");
      point.destroy();
    })
  })

  it('SmartPoint destroy', () => {
    cy.visit('http://localhost:5173/tests/empty.html').then(() => {
      const app = Cypress.$("#app").toArray()[0];
      let triggered = false;
      const point = new SmartPoint().init(10,10,{});
      point.addEventListener("destroy", (event) => {
        triggered = true;
        assert.equal(event.target,point,"Should have correct event target")
      });
      point.destroy();
      assert.isTrue(triggered, "Should trigger destroy event");
    })
  })

  it('SmartPoint mousedown', () => {
    cy.visit('http://localhost:5173/tests/empty.html').then(() => {
      const app = Cypress.$("#app").toArray()[0];
      let triggered = false;
      const shape = new SmartShape().init(app,{},[[0,100],[100,0],[200,100]]);
      shape.switchDisplayMode(SmartShapeDisplayMode.SELECTED);
      shape.points[0].element.id = "point1";
      shape.points[0].addEventListener("mousedown", (event) => {
        triggered = true;
        assert.equal(event.target,shape.points[0],"Should have correct event target")
      });
      cy.get("#point1").trigger("mousedown",{buttons:1}).then(() => {
        assert.isTrue(triggered, "Should trigger mousedown event");
        shape.destroy();
      })
    })
  })

  it('SmartPoint mouseup', () => {
    cy.visit('http://localhost:5173/tests/empty.html').then(() => {
      const app = Cypress.$("#app").toArray()[0];
      let triggered = false;
      const shape = new SmartShape().init(app,{},[[0,100],[100,0],[200,100]]);
      shape.switchDisplayMode(SmartShapeDisplayMode.SELECTED);
      shape.points[0].element.id = "point1";
      shape.points[0].addEventListener("mouseup", (event) => {
        triggered = true;
        assert.equal(event.target,shape.points[0],"Should have correct event target")
      });
      cy.get("#point1").trigger("mouseup",{buttons:1}).then(() => {
        assert.isTrue(triggered, "Should trigger mouseup event");
        shape.destroy();
      })
    })
  })

  it('SmartPoint click', () => {
    cy.visit('http://localhost:5173/tests/empty.html').then(() => {
      const app = Cypress.$("#app").toArray()[0];
      let triggered = false;
      const shape = new SmartShape().init(app,{},[[0,100],[100,0],[200,100]]);
      shape.switchDisplayMode(SmartShapeDisplayMode.SELECTED);
      shape.points[0].element.id = "point1";
      shape.points[0].addEventListener("click", (event) => {
        triggered = true;
        assert.equal(event.target,shape.points[0],"Should have correct event target")
      });
      cy.get("#point1").trigger("click",{buttons:1}).then(() => {
        assert.isTrue(triggered, "Should trigger click event");
        shape.destroy();
      })
    })
  })

  it('SmartPoint dblclick', () => {
    cy.visit('http://localhost:5173/tests/empty.html').then(() => {
      const app = Cypress.$("#app").toArray()[0];
      let triggered = false;
      const shape = new SmartShape().init(app,{},[[0,100],[100,0],[200,100]]);
      shape.switchDisplayMode(SmartShapeDisplayMode.SELECTED);
      shape.points[0].element.id = "point1";
      shape.points[0].addEventListener("dblclick", (event) => {
        triggered = true;
        assert.equal(event.target,shape.points[0],"Should have correct event target")
      });
      cy.get("#point1").trigger("dblclick",{buttons:1}).then(() => {
        assert.isTrue(triggered, "Should trigger dblclick event");
        shape.destroy();
      })
    })
  })

  it('SmartPoint mouseover/mouseout', () => {
    cy.visit('http://localhost:5173/tests/empty.html').then(() => {
      const app = Cypress.$("#app").toArray()[0];
      let triggeredOver = false;
      let triggeredOut = false;
      const shape = new SmartShape().init(app,{},[[0,100],[100,0],[200,100]]);
      shape.switchDisplayMode(SmartShapeDisplayMode.SELECTED);
      shape.points[0].element.id = "point1";
      shape.points[0].addEventListener("mouseover", (event) => {
        triggeredOver = true;
        assert.equal(event.target,shape.points[0],"Should have correct event target")
      });
      shape.points[0].addEventListener("mouseout", (event) => {
        triggeredOut = true;
        assert.equal(event.target,shape.points[0],"Should have correct event target")
      });
      cy.get("#point1").trigger("mouseover").then(() => {
        assert.isTrue(triggeredOver, "Should trigger over event");
        cy.get("#point1").trigger("mouseout").then(() => {
          assert.isTrue(triggeredOut, "Should trigger out event");
          shape.destroy();
        });

      })
    })
  })

  it('SmartPoint move_start', () => {
    cy.visit('http://localhost:5173/tests/empty.html').then(() => {
      const app = Cypress.$("#app").toArray()[0];
      let triggered = false;
      const shape = new SmartShape().init(app,{},[[0,100],[100,0],[200,100]]);
      shape.switchDisplayMode(SmartShapeDisplayMode.SELECTED);
      shape.points[0].element.id = "point1";
      shape.points[0].addEventListener("move_start", (event) => {
        triggered = true;
        assert.equal(event.target,shape.points[0],"Should have correct event target")
      });
      cy.get("#point1").trigger("mousedown",{buttons:1}).then(() => {
        assert.isTrue(triggered, "Should trigger move_start event");
        shape.destroy();
      })
    })
  })

  it('SmartPoint move', () => {
    cy.visit('http://localhost:5173/tests/empty.html').then(() => {
      const app = Cypress.$("#app").toArray()[0];
      let triggered = false;
      const shape = new SmartShape().init(app,{},[[0,100],[100,0],[200,100]]);
      shape.switchDisplayMode(SmartShapeDisplayMode.SELECTED);
      shape.points[0].element.id = "point1";
      shape.points[0].addEventListener("move", (event) => {
        triggered = true;
        assert.equal(event.target,shape.points[0],"Should have correct event target")
      });
      cy.get("#point1").trigger("mousedown",{buttons:1}).then(() => {
        SmartShapeManager.draggedShape = shape;
        SmartShapeManager.draggedShape.draggedPoint = shape.points[0];
        cy.get("#point1").trigger("mousemove", {buttons: 1}).then(() => {
          assert.isTrue(triggered, "Should trigger move event");
          shape.destroy();
        })
      })
    })
  })

  it('SmartPoint move_end', () => {
    cy.visit('http://localhost:5173/tests/empty.html').then(() => {
      const app = Cypress.$("#app").toArray()[0];
      let triggered = false;
      const shape = new SmartShape().init(app,{},[[0,100],[100,0],[200,100]]);
      shape.switchDisplayMode(SmartShapeDisplayMode.SELECTED);
      shape.points[0].element.id = "point1";
      shape.points[0].addEventListener("move_end", (event) => {
        triggered = true;
        assert.equal(event.target,shape.points[0],"Should have correct event target")
      });
      cy.get("#point1").trigger("mousedown",{buttons:1}).then(() => {
        SmartShapeManager.draggedShape = shape;
        SmartShapeManager.draggedShape.draggedPoint = shape.points[0];
        cy.get("#point1").trigger("mousemove", {buttons: 1}).then(() => {
          cy.get("#point1").trigger("mouseup", {button: 1}).then(() => {
            assert.isTrue(triggered, "Should trigger move_end event");
            shape.destroy();
          });
        })
      })
    })
  })

  it('SmartShape point_added', () => {
    cy.visit('http://localhost:5173/tests/empty.html').then(() => {
      const app = Cypress.$("#app").toArray()[0];
      let triggered = false;
      const shape = new SmartShape().init(app,{},[[0,100],[100,0],[200,100]]);
      shape.switchDisplayMode(SmartShapeDisplayMode.SELECTED);
      EventsManager.subscribe(ShapeEvents.POINT_ADDED,(event) => {
        triggered = true;
      })
      shape.addPoint(150,150)
      assert.isTrue(triggered, "Should trigger point_added event");
      shape.destroy();
    })
  })

  it('SmartShape point_destroyed', () => {
    cy.visit('http://localhost:5173/tests/empty.html').then(() => {
      const app = Cypress.$("#app").toArray()[0];
      let triggered = false;
      const shape = new SmartShape().init(app,{},[[0,100],[100,0],[200,100]]);
      shape.switchDisplayMode(SmartShapeDisplayMode.SELECTED);
      const point = shape.addPoint(150,150)
      shape.addEventListener(ShapeEvents.POINT_DESTROYED,(event) => {
        triggered = true;
      })
      point.destroy();
      assert.isTrue(triggered, "Should trigger point_added event");
      shape.destroy();
    })
  })
})
