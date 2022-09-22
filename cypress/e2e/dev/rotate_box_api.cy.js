import SmartShape,{SmartShapeDisplayMode} from "../../../src/SmartShape/SmartShape.js";
import RotateBox from "../../../src/RotateBox/RotateBox.js";
import EventsManager from "../../../src/events/EventsManager.js";
import {ShapeEvents} from "../../../src/SmartShape/SmartShapeEventListener.js";
import {RotateBoxEvents} from "../../../src/RotateBox/RotateBoxEventListener.js";
import {PointEvents} from "../../../src/SmartPoint/SmartPoint.js";

function setup() {
  const app = Cypress.$("#app").toArray()[0];
  app.style.height = "800px";
  const box = new RotateBox().init(app,10,10, 90, 90, {id:"box1"});
  return [app,box];
}

const initShape = () => {
  const app = Cypress.$("#app").toArray()[0];
  app.style.height = "800px";
  const shape = new SmartShape().init(app,{id:"shape1",canRotate:true,displayMode:SmartShapeDisplayMode.ROTATE},
      [[0,200],[100,100],[200,200]]);
  return [app,shape];
}

const getPoints = (box) => {
  const box_id = box.shape.guid;
  const left_top = box.shape.findPointById(box_id+"_left_top");
  const right_top = box.shape.findPointById(box_id+"_right_top");
  const left_bottom = box.shape.findPointById(box_id+"_left_bottom");
  const right_bottom = box.shape.findPointById(box_id+"_right_bottom");
  return [left_top,right_top,left_bottom,right_bottom];
}
const checkAndGetPoints = (box) => {
  const [left_top,right_top,left_bottom,right_bottom] = getPoints(box);
  assert.isNotNull(left_top);
  assert.isNotNull(right_top);
  assert.isNotNull(left_bottom);
  assert.isNotNull(right_bottom);
  assert.equal(left_top.x,box.left,"Check x coordinate of top left marker");
  assert.equal(left_top.y,box.top, "Check y coordinate of top left marker");
  assert.equal(right_top.x,box.right, "Check x coordinate of top right marker");
  assert.equal(right_top.y,box.top, "Check y coordinate of top right marker");
  assert.equal(right_bottom.x,box.right,"Check x coordinate of bottom right marker");
  assert.equal(right_bottom.y,box.bottom, "Check y coordinate of bottom right marker");
  assert.equal(left_bottom.x, box.left, "Check x coordinate of bottom left marker");
  assert.equal(left_bottom.y, box.bottom, "Check y coordinate of bottom left marker");
  return [left_top,right_top,left_bottom,right_bottom];
}

describe('RotateBox Tests', () => {
  it("should correctly setup new RotateBox object based on passed params", () => {
    cy.visit('http://localhost:5173/tests/empty.html').then(() => {
      const [app, box] = setup();
      assert.isNotNull(box.shape,"Should contain internal shape object");
      assert.equal(box.shape.root, app,"Should set coorect container for internal shape object");
      assert.equal(box.left,10,"Should set left coordinate");
      assert.equal(box.top,10,"Should set top coordinate");
      assert.equal(box.width,90,"Should set width");
      assert.equal(box.height,90,"Should set height");
      assert.equal(box.right, 100, "Should calculate and set right coordinate");
      assert.equal(box.bottom, 100, "Should calculate and set bottom coordinate");
      assert.equal(box.shape.left, box.left, "Should send correct left coordinate to shape");
      assert.equal(box.shape.top, box.top, "Should send correct top coordinate to shape");
      assert.equal(box.shape.width, box.width, "Should send correct width to shape");
      assert.equal(box.shape.height, box.height, "Should send correct height to shape");
      assert.equal(box.shape.right, box.right, "Should send correct right coordinate to shape");
      assert.equal(box.shape.bottom, box.bottom, "Should send correct bottom coordinate to shape");
      assert.equal(box.shape.options.id,"box1","Should set ID of internal shape correctly");
      assert.equal(Cypress.$("#box1").toArray().length,1, "Should create HTML element for shape with correct id");
      assert.equal(box.shape.points.length,4,"Should create 8 points as resize markers");
      assert.isFalse(box.shape.options.canAddPoints,"Adding points should not be allowed");
      assert.isFalse(box.shape.options.canDeletePoints,"Removing points should not be allowed");
      assert.isObject(box.options.shapeOptions,"Options for shape should exist");
      assert.isObject(box.options.shapeOptions.pointOptions,"Default point options for internal shape should exist");
      assert.equal(box.options.shapeOptions.id,"box1","Correct ID should be inside options for shape");
      checkAndGetPoints(box);
    })
  })

  it("addEventListener", () => {
    cy.visit('http://localhost:5173/tests/empty.html').then(() => {
      const [app, box] = setup();
      let createTriggered = false;
      const box2 = new RotateBox()
      EventsManager.subscribe(ShapeEvents.SHAPE_CREATE,(event) => {
        if (event.target.guid === box2.guid) {
          createTriggered = true;
        }
      });
    })
  })

  it("removeEventListener", () => {
    cy.visit('http://localhost:5173/tests/empty.html').then(() => {
      const [app,box] = setup();
      let handlerTriggered = false;
      const listener = box.addEventListener(RotateBoxEvents.ROTATE_BOX_ROTATE,(event) => {
        handlerTriggered = true;
      });
      cy.get("#"+box.shape.guid+"_right_bottom").trigger("mousedown",{buttons:1}).then(() => {
        cy.get("#app").trigger("mousemove",{buttons:1, clientX:130,clientY:130}).then(() => {
          assert.isTrue(handlerTriggered,"Should trigger event handler");
          assert.equal(box.eventListener.subscriptions[RotateBoxEvents.ROTATE_BOX_ROTATE].length,1,"Should add event handler to local object queue");
          assert.equal(EventsManager.subscriptions[RotateBoxEvents.ROTATE_BOX_ROTATE].length,1,"Should add event handler to global EventsManager queue");
          box.removeEventListener(RotateBoxEvents.ROTATE_BOX_ROTATE,listener);
          assert.equal(box.eventListener.subscriptions[RotateBoxEvents.ROTATE_BOX_ROTATE].length,0,"Should remove event handler from local object queue");
          assert.equal(EventsManager.subscriptions[RotateBoxEvents.ROTATE_BOX_ROTATE].length,0,"Should remove event handler from global EventsManager queue");
        });
      });
    });
  })

  it("redraw", () => {
    cy.visit('http://localhost:5173/tests/empty.html').then(() => {
      const [app,box] = setup();
      box.left = 100;
      box.top = 50;
      box.width = 150;
      box.height = 130;
      box.redraw();
      const [left_top,right_top,left_bottom,right_bottom] = checkAndGetPoints(box);
      assert.equal(box.right,250,"Should correctly recalculate right corner of resize box");
      assert.equal(box.bottom,180,"Should correctly recalculate bottom corner of resize box");
      assert.equal(left_top.x,100,"Should correctly recalculate x coordinate of left top marker");
      assert.equal(left_top.y,50,"Should correctly recalculate y coordinate of left top marker");
      assert.equal(left_bottom.x,100,"Should correctly recalculate x coordinate of left top marker");
      assert.equal(left_bottom.y,180,"Should correctly recalculate y coordinate of left top marker");
      assert.equal(right_top.x,250,"Should correctly recalculate x coordinate of left top marker");
      assert.equal(right_top.y,50,"Should correctly recalculate y coordinate of left top marker");
      assert.equal(right_bottom.x,250,"Should correctly recalculate x coordinate of left top marker");
      assert.equal(right_bottom.y,180,"Should correctly recalculate y coordinate of left top marker");
    });
  });

  it("show/hide", () => {
    cy.visit('http://localhost:5173/tests/empty.html').then(() => {
      const app = Cypress.$("#app").toArray()[0];
      const box = new RotateBox();
      box.init(app,0,0,100,100,{shapeOptions:{visible:false}},);
      assert.equal(box.shape.svg.style.display,'none',"Should create invisible shape");
      for (let point of box.shape.points) {
        assert.equal(point.element.style.display,'none',"Point must be invisible");
      }
      box.show();
      assert.notEqual(box.shape.svg.style.display,'none',"Should show visible shape");
      for (let point of box.shape.points) {
        assert.notEqual(point.element.style.display,'none',"Point must be visible");
      }
      box.hide();
      assert.equal(box.shape.svg.style.display,'none',"Should hide shape");
      for (let point of box.shape.points) {
        assert.equal(point.element.style.display,'none',"Point must be invisible");
      }
      box.show();
    });
  });

  it("setOptions",() => {
    cy.visit('http://localhost:5173/tests/empty.html').then(() => {
      const [app,box] = setup();
      box.setOptions({
        zIndex:1010,
        shapeOptions:{
          stroke: "#aaaaaa",
          strokeWidth:1,
          strokeDasharray: "10",
          pointOptions:{
            style: {
              borderWidth: "1px",
              borderColor: "rgb(204, 204, 204)",
              borderRadius: "0px",
              backgroundColor: "rgb(255, 255, 255)"
            }
          }
        }
      })
      box.redraw();
      cy.get("#box1 > polygon").should("have.attr","stroke-width","1").then(() => {
        cy.get("#box1 > polygon").should("have.attr","stroke-dasharray","10").then(() => {
          cy.get("#box1 > polygon").should("have.attr","stroke","#aaaaaa").then(() => {
            cy.get("#box1").should("have.css","z-index","1010").then(() => {
              cy.get("#"+box.shape.guid+"_left_top").should("have.css","border-width","1px").then(() => {
                cy.get("#"+box.shape.guid+"_left_top").should("have.css","border-color","rgb(204, 204, 204)").then(() => {
                  cy.get("#"+box.shape.guid+"_left_top").should("have.css","border-radius","0px").then(() => {
                    cy.get("#"+box.shape.guid+"_left_top").should("have.css","z-index","1012").then(() => {
                      cy.get("#"+box.shape.guid+"_left_top").should("have.css", "background-color", "rgb(255, 255, 255)").then(() => {
                        assert.equal(box.options.zIndex, 1010);
                      });
                    });
                  })
                });
              })
            })
          })
        })
      })
    })
  })

  it("destroy", () => {
    cy.visit('http://localhost:5173/tests/empty.html').then(() => {
      EventsManager.clear();
      const [app, box] = setup();
      box.addEventListener(RotateBoxEvents.ROTATE_BOX_ROTATE,()=> {
        console.log("Triggered");
      });
      box.addEventListener(ShapeEvents.SHAPE_CREATE,() => {});
      box.addEventListener(ShapeEvents.SHAPE_MOUSE_ENTER, () => {});
      box.addEventListener(ShapeEvents.SHAPE_MOUSE_MOVE, () => {});
      box.addEventListener(ShapeEvents.SHAPE_MOVE_START, () => {});
      box.addEventListener(ShapeEvents.SHAPE_MOVE, () => {});
      box.addEventListener(ShapeEvents.SHAPE_MOVE_END, () => {});
      box.addEventListener(ShapeEvents.SHAPE_DESTROY, () => {});
      assert.equal(box.eventListener.subscriptions[RotateBoxEvents.ROTATE_BOX_ROTATE].length,1,"Should contain registered resize event handler in local queue");
      assert.equal(EventsManager.subscriptions[RotateBoxEvents.ROTATE_BOX_ROTATE].length,1,"Should contain registered resize event handler in global queue");
      assert.equal(EventsManager.subscriptions[PointEvents.POINT_DRAG_MOVE].length,1,"Should contain point drag move event handlers for all points in global queue");
      assert.equal(EventsManager.subscriptions[PointEvents.POINT_DRAG_END].length,4,"Should contain point drag end event handlers for all points in global queue");
      assert.equal(box.eventListener.subscriptions[ShapeEvents.SHAPE_CREATE].length,1,
          "Should register SHAPE_CREATE event in local queue");
      assert.equal(box.eventListener.subscriptions[ShapeEvents.SHAPE_MOUSE_ENTER].length,1,
          "Should register SHAPE_MOUSE_ENTER event in local queue");
      assert.equal(box.eventListener.subscriptions[ShapeEvents.SHAPE_MOUSE_MOVE].length,1,
          "Should register SHAPE_MOUSE_MOVE event in local queue");
      assert.equal(box.eventListener.subscriptions[ShapeEvents.SHAPE_MOVE_START].length,1,
          "Should register SHAPE_MOVE_START event in local queue");
      assert.equal(box.eventListener.subscriptions[ShapeEvents.SHAPE_MOVE].length,1,
          "Should register SHAPE_MOVE event in local queue");
      assert.equal(box.eventListener.subscriptions[ShapeEvents.SHAPE_MOVE_END].length,1,
          "Should register SHAPE_MOVE_END event in local queue");
      assert.equal(box.eventListener.subscriptions[ShapeEvents.SHAPE_DESTROY].length,1,
          "Should register SHAPE_DESTROY event in local queue");

      assert.equal(EventsManager.subscriptions[ShapeEvents.SHAPE_CREATE].length,2,
          "Should register SHAPE_CREATE in global EventsManager"
      );
      assert.equal(EventsManager.subscriptions[ShapeEvents.SHAPE_MOUSE_ENTER].length,2,
          "Should register SHAPE_MOUSE_ENTER in global EventsManager"
      );
      assert.equal(EventsManager.subscriptions[ShapeEvents.SHAPE_MOUSE_MOVE].length,2,
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

      box.destroy();
      assert.equal(box.eventListener.subscriptions[RotateBoxEvents.ROTATE_BOX_ROTATE].length,0,"Should not contain registered resize event handler in local queue after destroy");
      assert.equal(box.eventListener.subscriptions[ShapeEvents.SHAPE_CREATE].length,0,
          "Should register SHAPE_CREATE event in local queue");
      assert.equal(box.eventListener.subscriptions[ShapeEvents.SHAPE_MOUSE_ENTER].length,0,
          "Should register SHAPE_MOUSE_ENTER event in local queue");
      assert.equal(box.eventListener.subscriptions[ShapeEvents.SHAPE_MOUSE_ENTER].length,0,
          "Should register SHAPE_MOUSE_ENTER event in local queue");
      assert.equal(box.eventListener.subscriptions[ShapeEvents.SHAPE_MOUSE_MOVE].length,0,
          "Should register SHAPE_MOUSE_MOVE event in local queue");
      assert.equal(box.eventListener.subscriptions[ShapeEvents.SHAPE_MOVE_START].length,0,
          "Should register SHAPE_MOVE_START event in local queue");
      assert.equal(box.eventListener.subscriptions[ShapeEvents.SHAPE_MOVE].length,0,
          "Should register SHAPE_MOVE event in local queue");
      assert.equal(box.eventListener.subscriptions[ShapeEvents.SHAPE_MOVE_END].length,0,
          "Should register SHAPE_MOVE_END event in local queue");
      assert.equal(box.eventListener.subscriptions[ShapeEvents.SHAPE_DESTROY].length,0,
          "Should register SHAPE_DESTROY event in local queue");
    });
  });

  it("Should correctly enable scale feature on SmartShape instance", () => {
    cy.visit('http://localhost:5173/tests/empty.html').then(() => {
      const [app, shape] = initShape();
      const [pointWidth,pointHeight] = shape.getMaxPointSize();
      assert.isNotNull(shape.rotateBox,"Resize box should be created if not null");
      assert.equal(shape.rotateBox.left,shape.left-pointWidth,
          "Should correctly setup left corner of ResizeBox around shape");
      assert.equal(shape.rotateBox.top,shape.top-pointHeight,
          "Should correctly setup top corner of ResizeBox around shape");
      assert.equal(shape.rotateBox.width,shape.width+(pointWidth)*2,
          "Should correctly setup width of resize box");
      assert.equal(shape.rotateBox.height, shape.height+(pointHeight)*2,
          "Should correctly setup height of resize box"
      );
      assert.equal(shape.rotateBox.right,shape.right+pointWidth,
          "Should correctly setup right corner of resize box around shape"
      );
      assert.equal(shape.rotateBox.bottom,shape.bottom+pointHeight,
          "Should correctly setup bottom corner of resize box around shape"
      );
      assert.equal(shape.rotateBox.eventListener.subscriptions[RotateBoxEvents.ROTATE_BOX_ROTATE].length,1,
          "Shape should add event listener for resize event of ResizeBox");
      assert.equal(shape.rotateBox.shape.root,app,
          "Should correctly bind internal shape to specified HTML container element");
    });
  });
})
