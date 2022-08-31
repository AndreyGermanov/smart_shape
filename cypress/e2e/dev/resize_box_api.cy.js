import ResizeBox, {ResizeBoxEvents} from "../../../src/resizebox/ResizeBox.js";
import {PointEvents, PointMoveDirections} from "../../../src/smart_point.js";
import EventsManager from "../../../src/events/EventsManager.js";
describe('ResizeBox tests', () => {
  const setup = () => {
    const app = Cypress.$("#app").toArray()[0];
    app.style.height = "800px";
    const box = new ResizeBox().init(app,10,10,90,90,{id:"box1"});
    return [app,box];
  }
  const getPoints = (box) => {
    const box_id = box.options.id;
    const left_top = box.shape.findPointById(box_id+"_left_top");
    const center_top = box.shape.findPointById(box_id+"_center_top");
    const right_top = box.shape.findPointById(box_id+"_right_top");
    const left_bottom = box.shape.findPointById(box_id+"_left_bottom");
    const center_bottom = box.shape.findPointById(box_id+"_center_bottom");
    const right_bottom = box.shape.findPointById(box_id+"_right_bottom");
    const left_center = box.shape.findPointById(box_id+"_left_center");
    const right_center = box.shape.findPointById(box_id+"_right_center");
    return [left_top,center_top,right_top,left_bottom,center_bottom,right_bottom,left_center,right_center];
  }
  const checkAndGetPoints = (box) => {
    const [left_top,center_top,right_top,left_bottom,center_bottom,right_bottom,left_center,right_center] = getPoints(box);
    assert.isNotNull(left_top);
    assert.isNotNull(center_top);
    assert.isNotNull(right_top);
    assert.isNotNull(left_bottom);
    assert.isNotNull(center_bottom);
    assert.isNotNull(right_bottom);
    assert.isNotNull(left_center);
    assert.isNotNull(right_center);
    assert.equal(left_top.x,box.left,"Check x coordinate of top left marker");
    assert.equal(left_top.y,box.top, "Check y coordinate of top left marker");
    assert.equal(center_top.x,box.left+box.width/2,"Check x coordinate of center top marker");
    assert.equal(center_top.y,box.top,"Check y coordinate of center top marker");
    assert.equal(right_top.x,box.right, "Check x coordinate of top right marker");
    assert.equal(right_top.y,box.top, "Check y coordinate of top right marker");
    assert.equal(right_center.x,box.right, "Check x coordinate of right center marker");
    assert.equal(right_center.y,box.top+box.height/2,"Check y coordinate of right center marker");
    assert.equal(right_bottom.x,box.right,"Check x coordinate of bottom right marker");
    assert.equal(right_bottom.y,box.bottom, "Check y coordinate of bottom right marker");
    assert.equal(center_bottom.x, box.left + box.width/2, "Check x coordinate of center bottom marker");
    assert.equal(center_bottom.y, box.bottom, "Check y coordinate of center bottom marker");
    assert.equal(left_bottom.x, box.left, "Check x coordinate of bottom left marker");
    assert.equal(left_bottom.y, box.bottom, "Check y coordinate of bottom left marker");
    assert.equal(left_center.x,box.left, "Check x coordinate of left center marker");
    assert.equal(left_center.y,box.top + box.height/2,"Check y coordinate of left center marker");
    assert.isTrue(center_top.options.moveDirections.indexOf(PointMoveDirections.LEFT) === -1 &&
        center_top.options.moveDirections.indexOf(PointMoveDirections.RIGHT) === -1, "Center top point should move only up and down"
    );
    assert.isTrue(center_bottom.options.moveDirections.indexOf(PointMoveDirections.LEFT) === -1 &&
        center_bottom.options.moveDirections.indexOf(PointMoveDirections.RIGHT) === -1, "Center bottom point should move only up and down"
    );
    assert.isTrue(left_center.options.moveDirections.indexOf(PointMoveDirections.TOP) === -1 &&
        left_center.options.moveDirections.indexOf(PointMoveDirections.BOTTOM) === -1, "Center bottom point should move only left and right"
    );
    assert.isTrue(right_center.options.moveDirections.indexOf(PointMoveDirections.TOP) === -1 &&
        right_center.options.moveDirections.indexOf(PointMoveDirections.BOTTOM) === -1, "Center bottom point should move only left and right"
    );
    assert.equal(left_top.options.bounds.bottom,left_bottom.y-left_bottom.options.height-left_center.options.height,
        "Should setup correct bottom movement boundary for left top marker");
    assert.equal(left_top.options.bounds.right,right_top.x-right_top.options.width-center_top.options.width,
        "Should setup correct right movement boundary for left top marker");
    assert.equal(center_top.options.bounds.bottom,left_bottom.y-left_bottom.options.height-left_center.options.height,
        "Should setup correct bottom movement boundary for center top marker");
    assert.equal(right_top.options.bounds.bottom,left_bottom.y-left_bottom.options.height-left_center.options.height,
        "Should setup correct bottom movement boundary for right top marker");
    assert.equal(right_top.options.bounds.left,left_top.x+right_top.options.width+center_top.options.width,
        "Should setup correct left movement boundary for right top marker");
    assert.equal(right_center.options.bounds.left,left_top.x+right_center.options.width+center_top.options.width,
        "Should setup correct left movement boundary for right center marker");
    assert.equal(right_bottom.options.bounds.left,left_top.x+right_bottom.options.width+center_bottom.options.width,
        "Should setup correct left movement boundary for right center marker");
    assert.equal(right_bottom.options.bounds.top,right_top.y+right_top.options.height+right_center.options.height,
        "Should setup correct top movement boundary for right bottom marker");
    assert.equal(center_bottom.options.bounds.top,center_top.y+center_top.options.height+right_center.options.height,
        "Should setup correct top movement boundary for center bottom marker");
    assert.equal(left_bottom.options.bounds.right,right_bottom.x-right_bottom.options.width-center_bottom.options.width,
        "Should setup correct right movement boundary for left bottom marker");
    assert.equal(left_bottom.options.bounds.top,left_top.x+left_top.options.height+left_center.options.height,
        "Should setup correct top movement boundary for left bottom marker");
    assert.equal(left_center.options.bounds.right,right_center.x-right_center.options.width-center_top.options.width,
        "Should setup correct right movement boundary for left center marker");
    return [left_top,center_top,right_top,left_bottom,center_bottom,right_bottom,left_center,right_center];
  }
  it('should correctly setup new ResizeBox object based on passed params', () => {
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
      assert.equal(box.shape.options.id,"box1_shape","Should set ID of internal shape correctly");
      assert.equal(Cypress.$("#box1_shape").toArray().length,1, "Should create HTML element for shape with correct id");
      assert.equal(box.shape.points.length,8,"Should create 8 points as resize markers");
      assert.isFalse(box.shape.options.canAddPoints,"Adding points should not be allowed");
      assert.isFalse(box.shape.options.canDeletePoints,"Removing points should not be allowed");
      assert.isObject(box.options.shapeOptions,"Options for shape should exist");
      assert.isObject(box.options.shapeOptions.pointOptions,"Default point options for internal shape should exist");
      assert.equal(box.options.shapeOptions.id,"box1_shape","Correct ID should be inside options for shape");
      checkAndGetPoints(box);
    });
  })
  it("Should correctly resize box when move markers", () => {
    cy.visit('http://localhost:5173/tests/empty.html').then(() => {
      const [app, box] = setup();
      const [left_top,center_top,right_top,left_bottom,center_bottom,right_bottom,left_center,right_center] = checkAndGetPoints(box);
      const box_id = box.options.id;
      cy.get("#"+box_id+"_right_top").trigger("mousedown",{buttons:1}).then(() => {
        cy.get("#app").trigger("mousemove",{buttons:1,clientX:120,clientY:20}).then(() => {
          assert.equal(right_center.x,right_top.x);
          assert.equal(right_bottom.x,right_top.x);
          assert.equal(center_top.y,right_top.y);
          assert.equal(left_top.y,right_top.y);
          assert.equal(center_top.x,parseInt((left_top.x+(right_top.x-left_top.x)/2)));
          assert.equal(center_bottom.x,parseInt((left_top.x+(right_top.x-left_top.x)/2)));
          assert.equal(left_center.y,parseInt((left_top.y+(left_bottom.y-left_top.y)/2)));
          assert.equal(right_center.y,parseInt((right_top.y+(right_bottom.y-right_top.y)/2)));
          cy.get("#app").trigger("mouseup", {buttons:1}).then(() => {
            cy.get("#"+box_id+"_right_center").trigger("mousedown",{buttons:1}).then( () => {
              cy.get("#app").trigger("mousemove", {buttons:1, clientX: 150, clientY: right_center.y}).then(() => {
                assert.equal(right_top.x,right_center.x);
                assert.equal(right_bottom.x,right_center.x);
                assert.equal(center_top.x,parseInt((left_top.x+(right_top.x-left_top.x)/2)));
                assert.equal(center_bottom.x,parseInt((left_top.x+(right_top.x-left_top.x)/2)));
                cy.get("#app").trigger("mouseup", {buttons:1}).then(() => {
                  cy.get("#"+box_id+"_right_bottom").trigger("mousedown",{buttons:1}).then(() => {
                    cy.get("#app").trigger("mousemove",{buttons:1,clientX:170,clientY:120}).then(() => {
                      assert.equal(right_top.x,right_bottom.x);
                      assert.equal(right_center.x,right_bottom.x);
                      assert.equal(center_bottom.y,right_bottom.y);
                      assert.equal(left_bottom.y,right_bottom.y);
                      assert.equal(center_top.x,parseInt((left_top.x+(right_top.x-left_top.x)/2)));
                      assert.equal(center_bottom.x,parseInt((left_top.x+(right_top.x-left_top.x)/2)));
                      assert.equal(left_center.y,parseInt((left_top.y+(left_bottom.y-left_top.y)/2)));
                      assert.equal(right_center.y,parseInt((right_top.y+(right_bottom.y-right_top.y)/2)));
                      cy.get("#app").trigger("mouseup", {buttons:1}).then(() => {
                        cy.get("#"+box_id+"_center_bottom").trigger("mousedown",{buttons:1}).then(() => {
                          cy.get("#app").trigger("mousemove",{buttons:1,clientX:center_bottom.x,clientY:140}).then(() => {
                            assert.equal(left_bottom.y,center_bottom.y);
                            assert.equal(right_bottom.y,center_bottom.y);
                            assert.equal(left_center.y,parseInt((left_top.y+(left_bottom.y-left_top.y)/2)));
                            assert.equal(right_center.y,parseInt((right_top.y+(right_bottom.y-right_top.y)/2)));
                            cy.get("#app").trigger("mouseup", {buttons:1}).then(() => {
                              cy.get("#"+box_id+"_left_bottom").trigger("mousedown",{buttons:1}).then(() => {
                                cy.get("#app").trigger("mousemove",{buttons:1,clientX:10,clientY:160}).then(() => {
                                  assert.equal(center_bottom.y,left_bottom.y);
                                  assert.equal(right_bottom.y,left_bottom.y);
                                  assert.equal(left_center.x,left_bottom.x);
                                  assert.equal(left_top.x,left_bottom.x);
                                  assert.equal(center_top.x,parseInt((left_top.x+(right_top.x-left_top.x)/2)));
                                  assert.equal(center_bottom.x,parseInt((left_top.x+(right_top.x-left_top.x)/2)));
                                  assert.equal(left_center.y,parseInt((left_top.y+(left_bottom.y-left_top.y)/2)));
                                  assert.equal(right_center.y,parseInt((right_top.y+(right_bottom.y-right_top.y)/2)));
                                  cy.get("#app").trigger("mouseup", {buttons:1}).then(() => {
                                    cy.get("#"+box_id+"_left_center").trigger("mousedown",{buttons:1}).then(() => {
                                      cy.get("#app").trigger("mousemove",{buttons:1,clientX:20,clientY:left_center.y}).trigger(() => {
                                        assert.equal(left_top.x,left_center.x);
                                        assert.equal(left_bottom.x,left_center.x);
                                        assert.equal(center_top.x,parseInt((left_top.x+(right_top.x-left_top.x)/2)));
                                        assert.equal(center_bottom.x,parseInt((left_top.x+(right_top.x-left_top.x)/2)));
                                        cy.get("#app").trigger("mouseup", {buttons:1}).then(() => {
                                          cy.get("#"+box_id+"_left_top").trigger("mousedown",{buttons:1}).then(() => {
                                            cy.get("#app").trigger("mousemove",{buttons:1,clientX:40,clientY:40}).then(() => {
                                              assert.equal(left_center.x,left_top.x);
                                              assert.equal(left_bottom.x,left_top.x)
                                              assert.equal(center_top.y,left_top.y);
                                              assert.equal(right_top.y,left_top.y);
                                              assert.equal(center_top.x,parseInt((left_top.x+(right_top.x-left_top.x)/2)));
                                              assert.equal(center_bottom.x,parseInt((left_top.x+(right_top.x-left_top.x)/2)));
                                              assert.equal(left_center.y,parseInt((left_top.y+(left_bottom.y-left_top.y)/2)));
                                              assert.equal(right_center.y,parseInt((right_top.y+(right_bottom.y-right_top.y)/2)));
                                              cy.get("#app").trigger("mouseup", {buttons:1}).then(() => {
                                                cy.get("#"+box_id+"_center_top").trigger("mousedown",{buttons:1}).then(() => {
                                                  cy.get("#app").trigger("mousemove",{buttons:1,clientX:center_top.x,clientY:60}).then(() => {
                                                    assert.equal(left_top.y,center_top.y);
                                                    assert.equal(right_top.y,center_top.y);
                                                    assert.equal(left_center.y,parseInt((left_top.y+(left_bottom.y-left_top.y)/2)));
                                                    assert.equal(right_center.y,parseInt((right_top.y+(right_bottom.y-right_top.y)/2)));
                                                  });
                                                });
                                              });
                                            });
                                          })
                                        });
                                      });
                                    });
                                  });
                                });
                              });
                            });
                          });
                        });
                      });
                    })
                  });
                });
              });
            });
          });
        });
      });
    });
  });
  it("Should recalculate ResizeBox position and dimensions after move markers", () => {
    cy.visit('http://localhost:5173/tests/empty.html').then(() => {
      const [app, box] = setup();
      const box_id = box.options.id;
      cy.get("#"+box_id+"_left_top").trigger("mousedown",{buttons:1}).then(() => {
        cy.get("#app").trigger("mousemove",{buttons:1,clientX:5,clientY:5}).then(() => {
          cy.get("#"+box_id+"_center_top").trigger("mousedown",{buttons:1}).then(() => {
            cy.get("#app").trigger("mousemove",{buttons:1,clientX:5,clientY:3}).then(() => {
              cy.get("#"+box_id+"_right_center").trigger("mousedown",{buttons:1}).then(() => {
                cy.get("#app").trigger("mousemove", {buttons:1,clientX:110,clientY:3}).then(() => {
                  cy.get("#"+box_id+"_right_bottom").trigger("mousedown", {buttons:1}).then(() => {
                    cy.get("#app").trigger("mousemove",{buttons:1,clientX:115,clientY:120}).then(() => {
                      assert.equal(box.left,0,"Should correctly recalculate left coordinate");
                      assert.equal(box.right,102,"Should correctly recalculate right coordinate");
                      assert.equal(box.top,0,"Should correctly recalculate top coordinate");
                      assert.equal(box.bottom,107,"Should correctly recalculate bottom coordinate");
                      assert.equal(box.width,102,"Should correctly recalculate width");
                      assert.equal(box.height,107,"Should correctly recalculate height");
                    })
                  })
                })
              })
            })
          })
        })
      })
    });
  })
  it("addEventListener", () => {
    cy.visit('http://localhost:5173/tests/empty.html').then(() => {
      const [app, box] = setup();
      const box_id = box.options.id;
      let handlerTriggered = false;
      let handler = (event) => {
        handlerTriggered = true;
        assert.equal(event.oldDims.left, 10, "Should return correct old left coordinate");
        assert.equal(event.oldDims.right, 100, "Should return correct old right coordinate");
        assert.equal(event.oldDims.top, 10, "Should return correct old top coordinate");
        assert.equal(event.oldDims.bottom, 100, "Should return correct old bottom coordinate");
        assert.equal(event.oldDims.width, 90, "Should return correct old width");
        assert.equal(event.oldDims.height, 90, "Should return correct old height");
        assert.equal(event.newDims.left, 10, "Should return correct new left coordinate");
        assert.equal(event.newDims.right, 107, "Should return correct new right coordinate");
        assert.equal(event.newDims.top, 10, "Should return correct new top coordinate");
        assert.equal(event.newDims.bottom, 107, "Should return correct new bottom coordinate");
        assert.equal(event.newDims.width, 97, "Should return correct new width");
        assert.equal(event.newDims.height, 97, "Should return correct new height");
      }
      const listener = box.addEventListener(ResizeBoxEvents.RESIZE_BOX_RESIZE, handler);
      cy.get("#" + box_id + "_right_bottom").trigger("mousedown", {buttons: 1}).then(() => {
        cy.get("#app").trigger("mousemove", {buttons: 1, clientX: 120, clientY: 120}).then(() => {
          assert.isTrue(handlerTriggered, "Should trigger event handler");
          box.removeEventListener(ResizeBoxEvents.RESIZE_BOX_RESIZE, listener);
        })
      })
    })
  });
  it("removeEventListener", () => {
    cy.visit('http://localhost:5173/tests/empty.html').then(() => {
      const [app,box] = setup();
      let handlerTriggered = false;
      const listener = box.addEventListener(ResizeBoxEvents.RESIZE_BOX_RESIZE,(event) => {
        handlerTriggered = true;
      });
      cy.get("#"+box.options.id+"_right_bottom").trigger("mousedown",{buttons:1}).then(() => {
        cy.get("#app").trigger("mousemove",{buttons:1, clientX:130,clientY:130}).then(() => {
          assert.isTrue(handlerTriggered,"Should trigger event handler");
          assert.equal(box.subscriptions[ResizeBoxEvents.RESIZE_BOX_RESIZE].length,1,"Should add event handler to local object queue");
          assert.equal(EventsManager.subscriptions[ResizeBoxEvents.RESIZE_BOX_RESIZE].length,1,"Should add event handler to global EventsManager queue");
          box.removeEventListener(ResizeBoxEvents.RESIZE_BOX_RESIZE,listener);
          assert.equal(box.subscriptions[ResizeBoxEvents.RESIZE_BOX_RESIZE].length,0,"Should remove event handler from local object queue");
          assert.equal(EventsManager.subscriptions[ResizeBoxEvents.RESIZE_BOX_RESIZE].length,0,"Should remove event handler from global EventsManager queue");
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
      const [left_top,center_top,right_top,left_bottom,center_bottom,right_bottom,left_center,right_center] = checkAndGetPoints(box);
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
      assert.equal(center_top.x,175,"Should correctly recalculate x coordinate of center top marker");
      assert.equal(center_top.y,50,"Should correctly recalculate y coordinate of center top marker");
      assert.equal(center_bottom.x,175,"Should correctly recalculate x coordinate of center bottom marker");
      assert.equal(center_bottom.y,180,"Should correctly recalculate y coordinate of center bottom marker");
      assert.equal(left_center.x,100,"Should correctly recalculate x coordinate of left center marker");
      assert.equal(left_center.y,115,"Should correctly recalculate y coordinate of left center marker");
      assert.equal(right_center.x,250,"Should correctly recalculate x coordinate of right center marker");
      assert.equal(right_center.y,115,"Should correctly recalculate y coordinate of right center marker");
    });
  })
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
      cy.get("#box1_shape > polygon").should("have.attr","stroke-width","1").then(() => {
        cy.get("#box1_shape > polygon").should("have.attr","stroke-dasharray","10").then(() => {
          cy.get("#box1_shape > polygon").should("have.attr","stroke","#aaaaaa").then(() => {
            cy.get("#box1_shape").should("have.css","z-index","1010").then(() => {
              cy.get("#box1_left_top").should("have.css","border-width","1px").then(() => {
                cy.get("#box1_left_top").should("have.css","border-color","rgb(204, 204, 204)").then(() => {
                  cy.get("#box1_left_top").should("have.css","border-radius","0px").then(() => {
                    cy.get("#box1_left_top").should("have.css","z-index","1011").then(() => {
                      cy.get("#box1_left_top").should("have.css", "background-color", "rgb(255, 255, 255)").then(() => {
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
      box.addEventListener(ResizeBoxEvents.RESIZE_BOX_RESIZE,()=> {
        console.log("Triggered");
      });
      assert.equal(box.subscriptions[ResizeBoxEvents.RESIZE_BOX_RESIZE].length,1,"Should contain registered resize event handler in local queue");
      assert.equal(EventsManager.subscriptions[ResizeBoxEvents.RESIZE_BOX_RESIZE].length,1,"Should contain registered resize event handler in global queue");
      assert.equal(EventsManager.subscriptions[PointEvents.POINT_DRAG_MOVE].length,2,"Should contain point drag move event handlers for all points in global queue");
      assert.equal(EventsManager.subscriptions[PointEvents.POINT_DRAG_END].length,2,"Should contain point drag end event handlers for all points in global queue");
      box.destroy();
      assert.equal(box.subscriptions[ResizeBoxEvents.RESIZE_BOX_RESIZE].length,0,"Should not contain registered resize event handler in local queue after destroy");
      assert.equal(EventsManager.subscriptions[ResizeBoxEvents.RESIZE_BOX_RESIZE].length,0,"Should not contain registered resize event handler in global queue after destroy");
      assert.equal(EventsManager.subscriptions[PointEvents.POINT_DRAG_MOVE].length,0,"Should not contain point drag move event handlers for all points in global queue after destroy");
      assert.equal(EventsManager.subscriptions[PointEvents.POINT_DRAG_END].length,0,"Should not contain point drag end event handlers for all points in global queue after destroy");
    });
  })
});