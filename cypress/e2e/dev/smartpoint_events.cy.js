import {SmartShape} from "../../../src/smart_shape.js";
import {PointEvents} from "../../../src/smart_point.js";
import EventsManager from "../../../src/events/EventsManager.js";
function getShape() {
  const app = Cypress.$("#app").toArray()[0];
  const shape = new SmartShape().init(app,{},[]);
  return [app,shape]
}
describe('SmartPoint events tests', () => {
  it('POINT_DRAG_MOVE event', () => {
    cy.visit('http://localhost:5173/tests/empty.html').then(() => {
      const [app,shape] = getShape();
      const left_top = shape.addPoint(0,0,{id:"left_top",forceDisplay:true});
      const left_center = shape.addPoint(0,50,{id:"left_center",forceDisplay:true});
      const left_bottom = shape.addPoint(0,100,{id:"left_bottom",forceDisplay:true});
      const bottom_center = shape.addPoint(50,100,{id:"bottom_center",forceDisplay:true});
      const right_bottom = shape.addPoint(100,100,{id:"right_bottom",forceDisplay:true});
      const right_center = shape.addPoint(100,50,{id:"right_center",forceDisplay:true});
      const right_top = shape.addPoint(100,0,{id:"right_top",forceDisplay:true});
      const top_center = shape.addPoint(50,0,{id:"top_center",forceDisplay:true});

      const leftTopListener = (event) => {
        if (event.target.options.id !== "left_top") {
          return
        }
        left_center.x = event.target.x;
        left_bottom.x = event.target.x;
        top_center.y = event.target.y;
        right_top.y = event.target.y;
        adjustCenters();
      }
      const topCenterListener = (event) => {
        if (event.target.options.id !== "top_center") {
          return
        }
        left_top.y = event.target.y;
        right_top.y = event.target.y;
        adjustCenters();
      }
      const rightTopListener = (event) => {
        if (event.target.options.id !== "right_top") {
          return
        }
        left_top.y = event.target.y;
        top_center.y = event.target.y;
        right_center.x = event.target.x;
        right_bottom.x = event.target.x;
        adjustCenters();
      }
      const rightCenterListener = (event) => {
        if (event.target.options.id !== "right_center") {
          return
        }
        right_top.x = event.target.x;
        right_bottom.x = event.target.x;
        adjustCenters();
      }
      const rightBottomListener = (event) => {
        if (event.target.options.id !== "right_bottom") {
          return
        }
        right_top.x = event.target.x;
        right_center.x = event.target.x;
        left_bottom.y = event.target.y;
        bottom_center.y = event.target.y;
        adjustCenters();
      }
      const bottomCenterListener = (event) => {
        if (event.target.options.id !== "bottom_center") {
          return
        }
        left_bottom.y = event.target.y;
        right_bottom.y = event.target.y;
        adjustCenters();
      }
      const leftBottomListener = (event) => {
        if (event.target.options.id !== "left_bottom") {
          return
        }
        bottom_center.y = event.target.y;
        right_bottom.y = event.target.y;
        left_center.x = event.target.x;
        left_top.x = event.target.x;
        adjustCenters();
      }
      const leftCenterListener = (event) => {
        if (event.target.options.id !== "left_center") {
          return
        }
        left_bottom.x = event.target.x;
        left_top.x = event.target.x;
        adjustCenters();
      }

      const adjustCenters = () => {
        top_center.x = parseInt((left_top.x+(right_top.x-left_top.x)/2));
        bottom_center.x = parseInt((left_top.x+(right_top.x-left_top.x)/2));
        left_center.y = parseInt((left_top.y+(left_bottom.y-left_top.y)/2));
        right_center.y = parseInt((right_top.y+(right_bottom.y-right_top.y)/2));
      }

      EventsManager.subscribe(PointEvents.POINT_DRAG_MOVE,leftTopListener);
      EventsManager.subscribe(PointEvents.POINT_DRAG_MOVE,topCenterListener);
      EventsManager.subscribe(PointEvents.POINT_DRAG_MOVE,rightTopListener);
      EventsManager.subscribe(PointEvents.POINT_DRAG_MOVE,rightCenterListener);
      EventsManager.subscribe(PointEvents.POINT_DRAG_MOVE,rightBottomListener);
      EventsManager.subscribe(PointEvents.POINT_DRAG_MOVE,bottomCenterListener);
      EventsManager.subscribe(PointEvents.POINT_DRAG_MOVE,leftBottomListener);
      EventsManager.subscribe(PointEvents.POINT_DRAG_MOVE,leftCenterListener);

      cy.get("#right_top").trigger("mousedown",{buttons:1}).then(() => {
        cy.get("#app").trigger("mousemove",{buttons:1,clientX:120,clientY:20}).then(() => {
          assert.equal(right_center.x,right_top.x);
          assert.equal(right_bottom.x,right_top.x);
          assert.equal(top_center.y,right_top.y);
          assert.equal(left_top.y,right_top.y);
          assert.equal(top_center.x,parseInt((left_top.x+(right_top.x-left_top.x)/2)));
          assert.equal(bottom_center.x,parseInt((left_top.x+(right_top.x-left_top.x)/2)));
          assert.equal(left_center.y,parseInt((left_top.y+(left_bottom.y-left_top.y)/2)));
          assert.equal(right_center.y,parseInt((right_top.y+(right_bottom.y-right_top.y)/2)));
          cy.get("#app").trigger("mouseup", {buttons:1}).then(() => {
            cy.get("#right_center").trigger("mousedown",{buttons:1}).then( () => {
              cy.get("#app").trigger("mousemove", {buttons:1, clientX: 150, clientY: right_center.y}).then(() => {
                assert.equal(right_top.x,right_center.x);
                assert.equal(right_bottom.x,right_center.x);
                assert.equal(top_center.x,parseInt((left_top.x+(right_top.x-left_top.x)/2)));
                assert.equal(bottom_center.x,parseInt((left_top.x+(right_top.x-left_top.x)/2)));
                cy.get("#app").trigger("mouseup", {buttons:1}).then(() => {
                  cy.get("#right_bottom").trigger("mousedown",{buttons:1}).then(() => {
                    cy.get("#app").trigger("mousemove",{buttons:1,clientX:170,clientY:120}).then(() => {
                      assert.equal(right_top.x,right_bottom.x);
                      assert.equal(right_center.x,right_bottom.x);
                      assert.equal(bottom_center.y,right_bottom.y);
                      assert.equal(left_bottom.y,right_bottom.y);
                      assert.equal(top_center.x,parseInt((left_top.x+(right_top.x-left_top.x)/2)));
                      assert.equal(bottom_center.x,parseInt((left_top.x+(right_top.x-left_top.x)/2)));
                      assert.equal(left_center.y,parseInt((left_top.y+(left_bottom.y-left_top.y)/2)));
                      assert.equal(right_center.y,parseInt((right_top.y+(right_bottom.y-right_top.y)/2)));
                      cy.get("#app").trigger("mouseup", {buttons:1}).then(() => {
                        cy.get("#bottom_center").trigger("mousedown",{buttons:1}).then(() => {
                          cy.get("#app").trigger("mousemove",{buttons:1,clientX:bottom_center.x,clientY:140}).then(() => {
                            assert.equal(left_bottom.y,bottom_center.y);
                            assert.equal(right_bottom.y,bottom_center.y);
                            assert.equal(left_center.y,parseInt((left_top.y+(left_bottom.y-left_top.y)/2)));
                            assert.equal(right_center.y,parseInt((right_top.y+(right_bottom.y-right_top.y)/2)));
                            cy.get("#app").trigger("mouseup", {buttons:1}).then(() => {
                              cy.get("#left_bottom").trigger("mousedown",{buttons:1}).then(() => {
                                cy.get("#app").trigger("mousemove",{buttons:1,clientX:10,clientY:160}).then(() => {
                                  assert.equal(bottom_center.y,left_bottom.y);
                                  assert.equal(right_bottom.y,left_bottom.y);
                                  assert.equal(left_center.x,left_bottom.x);
                                  assert.equal(left_top.x,left_bottom.x);
                                  assert.equal(top_center.x,parseInt((left_top.x+(right_top.x-left_top.x)/2)));
                                  assert.equal(bottom_center.x,parseInt((left_top.x+(right_top.x-left_top.x)/2)));
                                  assert.equal(left_center.y,parseInt((left_top.y+(left_bottom.y-left_top.y)/2)));
                                  assert.equal(right_center.y,parseInt((right_top.y+(right_bottom.y-right_top.y)/2)));
                                  cy.get("#app").trigger("mouseup", {buttons:1}).then(() => {
                                    cy.get("#left_center").trigger("mousedown",{buttons:1}).then(() => {
                                      cy.get("#app").trigger("mousemove",{buttons:1,clientX:20,clientY:left_center.y}).trigger(() => {
                                        assert.equal(left_top.x,left_center.x);
                                        assert.equal(left_bottom.x,left_center.x);
                                        assert.equal(top_center.x,parseInt((left_top.x+(right_top.x-left_top.x)/2)));
                                        assert.equal(bottom_center.x,parseInt((left_top.x+(right_top.x-left_top.x)/2)));
                                        cy.get("#app").trigger("mouseup", {buttons:1}).then(() => {
                                          cy.get("#left_top").trigger("mousedown",{buttons:1}).then(() => {
                                            cy.get("#app").trigger("mousemove",{buttons:1,clientX:40,clientY:40}).then(() => {
                                              assert.equal(left_center.x,left_top.x);
                                              assert.equal(left_bottom.x,left_top.x)
                                              assert.equal(top_center.y,left_top.y);
                                              assert.equal(right_top.y,left_top.y);
                                              assert.equal(top_center.x,parseInt((left_top.x+(right_top.x-left_top.x)/2)));
                                              assert.equal(bottom_center.x,parseInt((left_top.x+(right_top.x-left_top.x)/2)));
                                              assert.equal(left_center.y,parseInt((left_top.y+(left_bottom.y-left_top.y)/2)));
                                              assert.equal(right_center.y,parseInt((right_top.y+(right_bottom.y-right_top.y)/2)));
                                              cy.get("#app").trigger("mouseup", {buttons:1}).then(() => {
                                                cy.get("#top_center").trigger("mousedown",{buttons:1}).then(() => {
                                                  cy.get("#app").trigger("mousemove",{buttons:1,clientX:top_center.x,clientY:60}).then(() => {
                                                    assert.equal(left_top.y,top_center.y);
                                                    assert.equal(right_top.y,top_center.y);
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
});
