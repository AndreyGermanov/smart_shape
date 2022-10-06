import SmartShapeManager from "../../../src/SmartShapeManager/SmartShapeManager.js";
import EventsManager from "../../../src/events/EventsManager.js";
import {ShapeEvents} from "../../../src/SmartShape/SmartShapeEventListener.js";
import ResizeBox from "../../../src/ResizeBox/ResizeBox.js";

describe('ResizeBox events', () => {

  it('ResizeBox mousedown', () => {
    cy.visit('http://localhost:5173/tests/empty.html').then(() => {
      const app = Cypress.$("#app").toArray()[0];
      const shape = new ResizeBox().init(app,0,0,100,100,{id:"shape1"},);
      let triggered = false;
      shape.addEventListener("mousedown",(event) => {
        triggered = true;
        assert.equal(event.target,shape,"Should have correct event target");
      })
      cy.get("#app").trigger("mousemove",{clientX:67,clientY:80}).then(() => {
        cy.get("#shape1").trigger("mousedown",{buttons:1}).then(() => {
          cy.wait(200).then(() => {
            assert.isTrue(triggered, "Should trigger mousedown event");
            shape.destroy();
          })
        });
      });
    });
  })

  it('ResizeBox mouseup', () => {
    cy.visit('http://localhost:5173/tests/empty.html').then(() => {
      const app = Cypress.$("#app").toArray()[0];
      const shape = new ResizeBox().init(app,0,0,100,100,{id:"shape1"});
      let triggered = false;
      shape.addEventListener("mouseup",(event) => {
        triggered = true;
        assert.equal(event.target,shape,"Should have correct event target");
      })
      cy.get("#app").trigger("mousemove",{clientX:67,clientY:80}).then(() => {
        cy.get("#shape1").trigger("mousedown",{buttons:1}).then(() => {
          cy.get("#shape1").trigger("mouseup", {buttons: 1}).then(() => {
            cy.wait(200).then(() => {
              assert.isTrue(triggered, "Should trigger mouseup event");
              shape.destroy();
            })
          });
        })
      });
    });
  })

  it('ResizeBox click', () => {
    cy.visit('http://localhost:5173/tests/empty.html').then(() => {
      const app = Cypress.$("#app").toArray()[0];
      const shape = new ResizeBox().init(app,0,0,100,100,{id:"shape1"});
      let triggered = false;
      shape.addEventListener("click",(event) => {
        triggered = true;
        assert.equal(event.target,shape,"Should have correct event target");
      })
      cy.get("#app").trigger("mousemove",{clientX:67,clientY:80}).then(() => {
        cy.get("#shape1").trigger("click", {buttons: 1}).then(() => {
          cy.wait(200).then(() => {
            assert.isTrue(triggered, "Should trigger click event");
            shape.destroy();
          });
        });
      })
    });
  })

  it('ResizeBox mouseover/mouseout', () => {
    cy.visit('http://localhost:5173/tests/empty.html').then(() => {
      const app = Cypress.$("#app").toArray()[0];
      const shape = new ResizeBox().init(app,0,0,100,100,{id:"shape1"});
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
          cy.wait(200).then(() => {
            assert.isTrue(triggeredOver, "Should trigger mouseover event");
            cy.get("#shape1").trigger("mouseout", {}).then(() => {
              cy.wait(200).then(() => {
                assert.isTrue(triggeredOut, "Should trigger mouseout event");
                shape.destroy();
              })
            });
          })
        });
      })
    });
  })

  it('ResizeBox mousemove', () => {
    cy.visit('http://localhost:5173/tests/empty.html').then(() => {
      const app = Cypress.$("#app").toArray()[0];
      const shape = new ResizeBox().init(app,0,0,100,100,{id:"shape1"});
      let triggered = false;
      shape.addEventListener("mousemove",(event) => {
        triggered = true;
        assert.equal(event.target,shape,"Should have correct event target");
      })
      cy.get("#app").trigger("mousemove",{clientX:67,clientY:80}).then(() => {
        cy.wait(200).then(() => {
          assert.isTrue(triggered, "Should trigger click event");
          shape.destroy();
        });
      });
    });
  })

  it('ResizeBox dblclick', () => {
    cy.visit('http://localhost:5173/tests/empty.html').then(() => {
      const app = Cypress.$("#app").toArray()[0];
      const shape = new ResizeBox().init(app,0,0,100,100,{id:"shape1"});
      let triggered = false;
      shape.addEventListener("dblclick",(event) => {
        triggered = true;
        assert.equal(event.target,shape,"Should have correct event target");
      })
      cy.get("#app").trigger("mousemove",{clientX:67,clientY:80}).then(() => {
        cy.get("#shape1").trigger("dblclick", {buttons: 1}).then(() => {
          cy.wait(200).then(() => {
            assert.isTrue(triggered, "Should trigger click event");
            shape.destroy();
          });
        });
      })
    });
  })

  it('ResizeBox move_start', () => {
    cy.visit('http://localhost:5173/tests/empty.html').then(() => {
      const app = Cypress.$("#app").toArray()[0];
      const shape = new ResizeBox().init(app,0,0,100,100,{id:"shape1"});
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

  it('ResizeBox move', () => {
    cy.visit('http://localhost:5173/tests/empty.html').then(() => {
      const app = Cypress.$("#app").toArray()[0];
      const shape = new ResizeBox().init(app,0,0,100,100,{id:"shape1"});
      let triggered = false;
      shape.addEventListener("move",(event) => {
        triggered = true;
        assert.equal(event.target,shape,"Should have correct event target");
      })
      cy.get("#app").trigger("mousemove",{clientX:67,clientY:80}).then(() => {
        cy.get("#shape1").trigger("mousedown", {buttons: 1}).then(() => {
          cy.wait(200).then(() => {
            cy.get("#app").trigger("mousemove",{buttons:1,movementX:100,movementY:10}).then(() => {
              cy.wait(200).then(() => {
                assert.isTrue(triggered, "Should trigger move event");
                shape.destroy();
              });
            });
          })
        });
      })
    });
  })

  it('ResizeBox move_end', () => {
    cy.visit('http://localhost:5173/tests/empty.html').then(() => {
      const app = Cypress.$("#app").toArray()[0];
      const shape = new ResizeBox().init(app,0,0,100,100,{id:"shape1"});
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
                cy.wait(200).then(() => {
                  assert.isTrue(triggered, "Should trigger move_end event");
                  shape.destroy();
                });
              });
            });
          })
        });
      })
    });
  })

  it('ResizeBox resize', () => {
    cy.visit('http://localhost:5173/tests/empty.html').then(() => {
      const app = Cypress.$("#app").toArray()[0];
      const shape = new ResizeBox().init(app,0,0,100,100,{id:"shape1"});
      let triggered = false;
      shape.addEventListener("resize",(event) => {
        triggered = true;
        assert.equal(event.target,shape,"Should have correct event target");
      })
      cy.get("#"+shape.shape.guid+"_right_center").trigger("mousedown", {buttons: 1}).then(() => {
        cy.wait(200).then(() => {
          cy.get("#"+shape.shape.guid+"_right_center").trigger("mousemove",{buttons:1,movementX:100,movementY:10}).then(() => {
            assert.isTrue(triggered, "Should trigger resize event");
            shape.destroy();
          });
        });
      })
    });
  })

  it('ResizeBox point_drag_start', () => {
    cy.visit('http://localhost:5173/tests/empty.html').then(() => {
      const app = Cypress.$("#app").toArray()[0];
      const shape = new ResizeBox().init(app,0,0,100,100,{id:"shape1"});
      let triggered = false;
      shape.addEventListener("point_drag_start",(event) => {
        triggered = true;
        assert.equal(event.target,shape,"Should have correct event target");
        assert.equal(event.point,shape.shape.points[0],"Should have correct event target");
      })
      cy.get("#"+shape.shape.points[0].element.id).trigger("mousedown", {buttons: 1}).then(() => {
        cy.wait(200).then(() => {
          assert.isTrue(triggered, "Should trigger point_drag_start event");
          shape.destroy();
        });
      });
    })
  })


  it('ResizeBox point_drag_move', () => {
    cy.visit('http://localhost:5173/tests/empty.html').then(() => {
      const app = Cypress.$("#app").toArray()[0];
      const shape = new ResizeBox().init(app,0,0,100,100,{id:"shape1"});
      let triggered = false;
      shape.addEventListener("point_drag_move",(event) => {
        triggered = true;
        assert.equal(event.target,shape,"Should have correct event target");
        assert.equal(event.point,shape.shape.points[0],"Should have correct event target");
      })
      cy.get("#"+shape.shape.points[0].element.id).trigger("mousedown", {buttons: 1}).then(() => {
        cy.get("#"+shape.shape.points[0].element.id).trigger("mousemove", {buttons: 1}).then(() => {
          cy.wait(200).then(() => {
            assert.isTrue(triggered, "Should trigger point_drag_move event");
            shape.destroy();
          });
        });
      });
    })
  })

  it('ResizeBox point_drag_end', () => {
    cy.visit('http://localhost:5173/tests/empty.html').then(() => {
      const app = Cypress.$("#app").toArray()[0];
      const shape = new ResizeBox().init(app,0,0,100,100,{id:"shape1"});
      let triggered = false;
      shape.addEventListener("point_drag_end",(event) => {
        triggered = true;
        assert.equal(event.target,shape,"Should have correct event target");
        assert.equal(event.point,shape.shape.points[0],"Should have correct event target");
      })
      cy.get("#"+shape.shape.guid+"_left_top").trigger("mousedown", {buttons: 1}).then(() => {
        cy.get("#"+shape.shape.guid+"_left_top").trigger("mousemove", {buttons: 1}).then(() => {
          cy.get("#"+shape.shape.guid+"_left_top").trigger("mouseup", {buttons: 1}).then(() => {
            cy.wait(200).then(() => {
              assert.isTrue(triggered, "Should trigger point_drag_end event");
              shape.destroy();
            });
          });
        });
      });
    })
  })

  it('ResizeBox create', () => {
    cy.visit('http://localhost:5173/tests/empty.html').then(() => {
      const app = Cypress.$("#app").toArray()[0];
      let triggered = false;
      EventsManager.subscribe(ShapeEvents.SHAPE_CREATE,(event) => {
        triggered = true;
      });
      const shape = new ResizeBox().init(app,0,0,100,100,{id:"shape1"});
      assert.isTrue(triggered,"Should trigger create event")
      shape.destroy();
      EventsManager.clear();
    });
  })

  it('ResizeBox destroy', () => {
    cy.visit('http://localhost:5173/tests/empty.html').then(() => {
      const app = Cypress.$("#app").toArray()[0];
      let triggered = false;
      const shape = new ResizeBox().init(app,0,0,100,100,{id:"shape1"});
      shape.addEventListener("destroy", () => {
        triggered = true;
      })
      shape.destroy();
      assert.isTrue(triggered,"Should trigger destroy event")
    });
  })


})
