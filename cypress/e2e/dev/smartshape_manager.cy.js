import {SmartShape,SmartShapeManager} from "../../../src/index.js";
import EventsManager from "../../../src/events/EventsManager.js";
import {SmartShapeManagerEvents} from "../../../src/SmartShapeManager/SmartShapeManager.js";
import {SmartShapeDisplayMode} from "../../../src/SmartShape/SmartShape.js";

describe('SmartShape Manager tests', () => {
  beforeEach(() => {
    SmartShapeManager.clear();
    SmartShapeManager.shapes = [];
  })
  it('should add created shape to manager', () => {
    cy.visit('http://localhost:5173/tests/empty.html').then(() => {
      SmartShapeManager.clear();
      const app = Cypress.$("#app").toArray()[0];
      const shape = new SmartShape();
      shape.init(app,{id:"shape1"},[[0,100],[100,0],[200,100]]);
      assert.equal(SmartShapeManager.shapes.length,1,"Should add created shape to the array");
      shape.init(app,{id:"shape1"},[[0,100],[100,0],[200,100]]);
      assert.equal(SmartShapeManager.shapes.length,1,"Should not add the same shape twice");
    })
  })

  it('getShapesByContainer', () => {
    cy.visit('http://localhost:5173/tests/empty.html').then(() => {
      SmartShapeManager.clear();
      const app = Cypress.$("#app").toArray()[0];
      assert.equal(SmartShapeManager.getShapesByContainer(app).length, 0, "Should return empty array")
      const shape = new SmartShape();
      shape.init(app, {id: "shape1"}, [[0, 100], [100, 0], [200, 100]]);
      const shape2 = new SmartShape();
      shape2.init(app, {id: "shape2"}, [[300, 100], [400, 0], [500, 100]]);
      assert.equal(SmartShapeManager.getShapesByContainer(app).length, 2, "Should return array of added shapes");
      const div = document.createElement("div");
      div.style.top = "400px";
      div.style.width = "800px";
      div.style.height = "300px";
      app.appendChild(div);
      const shape3 = new SmartShape();
      shape3.init(div, {id: "shape3"}, [[0, 100], [100, 0], [200, 100]]);
      assert.equal(SmartShapeManager.getShapesByContainer(app).length, 2, "Should return array of added shapes to the first container");
      assert.equal(SmartShapeManager.getShapesByContainer(div).length, 1, "Should return array of added shapes to the second container");
    });
  })

  it("should add resize box and rotate box as a shapes with unmanaged state", () => {
    cy.visit('http://localhost:5173/tests/empty.html').then(() => {
      SmartShapeManager.clear();
      const app = Cypress.$("#app").toArray()[0];
      assert.equal(SmartShapeManager.shapes.length, 0, "Should return empty array");
      const shape = new SmartShape();
      shape.init(app, {id: "shape1", canScale: true, canRotate: true}, [[0, 100], [100, 0], [200, 100]]);
      assert.equal(SmartShapeManager.shapes.length, 1, "Should return list with shapes");
      SmartShapeManager.shapeOnCursor = shape;
      cy.get("#shape1").trigger("mousedown",{buttons:1,force:true}).then(() => {
        cy.wait(200).then(() => {
          cy.get("#shape1").trigger("mousedown",{buttons:1,force:true}).then(() => {
            cy.wait(200).then(() => {
              assert.equal(SmartShapeManager.shapes.length, 2, "Should add resize box to shapes list");
              assert.isFalse(shape.resizeBox.shape.options.managed, "Resize box should be unmanaged")
              cy.get("#shape1").trigger("mousedown", {buttons:1,force:true}).then(() => {
                cy.wait(200).then(() => {
                  assert.equal(SmartShapeManager.shapes.length, 3, "Should add rotate box to shapes list");
                  assert.isFalse(shape.rotateBox.shape.options.managed, "Rotate box should be unmanaged")
                })
              });
            })
          })
        })
      })
    });
  });

  it("should correctly setup container events when add first shape to it", () => {
    cy.visit('http://localhost:5173/tests/empty.html').then(() => {
      SmartShapeManager.clear();
      const app = Cypress.$("#app").toArray()[0];
      const div = document.createElement("div");
      div.style.top = "300px";
      div.style.width = "800px";
      div.style.height = "200px";
      app.appendChild(div);
      let appCallsCount = 0;
      let divCallsCount = 0;
      EventsManager.subscribe(SmartShapeManagerEvents.MANAGER_ADD_CONTAINER_EVENT_LISTENERS, (event) => {
        if (event.target === app) {
          appCallsCount += 1;
        } else if (event.target === div) {
          divCallsCount +=1
        }
      })
      const shape1 = new SmartShape();
      shape1.init(app, {id: "shape1", canScale:true, canRotate:true},[[0,100],[100,0],[200,100]]);
      const shape2 = new SmartShape();
      shape2.init(app, {id: "shape2", canScale:true, canRotate:true},[[300,100],[400,0],[500,100]]);
      const shape3 = new SmartShape();
      shape3.init(div, {id: "shape3", canScale:true, canRotate:true},[[0,100],[100,0],[200,100]]);
      const shape4 = new SmartShape();
      shape4.init(div, {id: "shape4", canScale:true, canRotate:true},[[300,100],[400,0],[500,100]]);
      assert.equal(appCallsCount,1,"Should add events to 'app' container only once");
      assert.equal(divCallsCount, 1, "Should add events to 'div' container only once");
      assert.equal(SmartShapeManager.containerEventListeners.length,6,"Should add container listeners to global array");
    });
  });

  it("should remove shape from registry on destroy", () => {
    cy.visit('http://localhost:5173/tests/empty.html').then(() => {
      SmartShapeManager.clear();
      const app = Cypress.$("#app").toArray()[0];
      const div = document.createElement("div");
      div.style.top = "300px";
      div.style.width = "800px";
      div.style.height = "200px";
      app.appendChild(div);
      const shape1 = new SmartShape();
      shape1.init(app, {id: "shape1", canScale:true, canRotate:true,pointOptions:{canDelete:true}},[[0,100],[100,0],[200,100]]);
      shape1.switchDisplayMode(SmartShapeDisplayMode.SCALE);
      shape1.switchDisplayMode(SmartShapeDisplayMode.ROTATE);
      const shape2 = new SmartShape();
      shape2.init(app, {id: "shape2", canScale:true, canRotate:true,pointOptions:{canDelete:true}},[[300,100],[400,0],[500,100]]);
      shape2.switchDisplayMode(SmartShapeDisplayMode.SCALE);
      shape2.switchDisplayMode(SmartShapeDisplayMode.ROTATE);
      const shape3 = new SmartShape();
      shape3.init(div, {id: "shape3", canScale:true, canRotate:true,pointOptions:{canDelete:true}},[[0,100],[100,0],[200,100]]);
      shape3.switchDisplayMode(SmartShapeDisplayMode.SCALE);
      shape3.switchDisplayMode(SmartShapeDisplayMode.ROTATE);
      const shape4 = new SmartShape();
      shape4.init(div, {id: "shape4", canScale:true, canRotate:true,pointOptions:{canDelete:true}},[[300,100],[400,0],[500,100]]);
      shape4.switchDisplayMode(SmartShapeDisplayMode.SCALE);
      shape4.switchDisplayMode(SmartShapeDisplayMode.ROTATE);
      assert.equal(SmartShapeManager.shapes.length,12,"Should add shapes and their boxes")
      assert.equal(SmartShapeManager.containerEventListeners.length,8, "Should add global event listeners to containers");
      shape1.destroy();
      shape2.destroy();
      shape3.destroy();
      shape4.destroy();
      assert.equal(SmartShapeManager.shapes.length,0,"Should remove all shapes and their boxes");
      assert.equal(SmartShapeManager.containerEventListeners.length,0, "Should remove all event listeners");
    });
  });

  it('getMaxZIndex', () => {
    cy.visit('http://localhost:5173/tests/empty.html').then(() => {
      const app = Cypress.$("#app").toArray()[0];
      app.style.height = "500px";
      const shape1 = new SmartShape();
      shape1.init(app,{zIndex:1002},[[0,100],[100,0],[200,100]]);
      const shape2 = new SmartShape();
      shape2.init(app, {zIndex:1005}, [[0,400],[100,300],[200,400]]);
      const shape3 = new SmartShape();
      shape3.init(app, {zIndex:1005}, [[300,100],[400,0],[500,100]]);
      assert.equal(SmartShapeManager.getMaxZIndex(),1005,"Should return correct global zIndex");
      assert.equal(SmartShapeManager.getMaxZIndex(app),1005,
          "Should return correct zIndex of shapes inside specified container");
    });
  })

  it('activateShape', () => {
    cy.visit('http://localhost:5173/tests/empty.html').then(() => {
      SmartShapeManager.clear();
      const app = Cypress.$("#app").toArray()[0];
      app.style.height = "500px";
      const shape1 = new SmartShape();
      shape1.init(app,{zIndex:1002,id:"shape1"},[[0,100],[100,0],[200,100]]);
      const shape2 = new SmartShape();
      shape2.init(app, {zIndex:1003,id:"shape2"}, [[0,400],[100,300],[200,400]]);
      const shape3 = new SmartShape();
      shape3.init(app, {zIndex:1005,id:"shape3"}, [[300,100],[400,0],[500,100]]);
      shape2.addChild(shape3);
      SmartShapeManager.shapeOnCursor = shape1
      cy.get("#shape1").trigger("mousedown",{buttons:1}).then(() => {
        cy.wait(200).then(() => {
          assert.equal(SmartShapeManager.activeShape,shape1,"Should activate correct shape");
          assert.equal(SmartShapeManager.activeShape.svg.style.zIndex,1006, "Should move active shape to the top");
          SmartShapeManager.shapeOnCursor = shape2
          cy.get("#shape2").trigger("mousedown", {buttons:1}).then(() => {
            cy.wait(200).then(() => {
              assert.equal(SmartShapeManager.activeShape,shape2,"Should activate correct shape");
              assert.equal(SmartShapeManager.activeShape.svg.style.zIndex,1007, "Should move active shape to the top");
              assert.equal(shape1.svg.style.zIndex,1006, "Should return back previous zIndex to previous shape");
              assert.equal(shape3.svg.style.zIndex,1009,
                  "Should increase zIndex of active shape's children proportionally to selected shape"
              );
              SmartShapeManager.shapeOnCursor = shape1;
              cy.get("#shape1").trigger("mousedown", {buttons:1}).then(() => {
                cy.wait(200).then(() => {
                  assert.equal(SmartShapeManager.activeShape,shape1,"Should activate correct shape");
                  assert.equal(SmartShapeManager.activeShape.svg.style.zIndex,1010, "Should move active shape to the top");
                  assert.equal(shape2.svg.style.zIndex,1007, "Should return back previous zIndex to previous shape");
                  assert.equal(shape3.svg.style.zIndex,1009,
                      "Should increase zIndex of active shape's children proportionally to selected shape"
                  );
                  SmartShapeManager.shapeOnCursor = shape3
                  cy.get("#shape3").trigger("mousedown", {buttons:1}).then(() => {
                    cy.wait(200).then(() => {
                      assert.equal(SmartShapeManager.activeShape,shape2,"Should activate parent shape if click on child shape");
                      assert.equal(SmartShapeManager.activeShape.svg.style.zIndex,1011, "Should move active shape to the top");
                      assert.equal(shape1.svg.style.zIndex,1010, "Should return back previous zIndex to previous shape");
                      assert.equal(shape3.svg.style.zIndex,1013,
                          "Should increase zIndex of active shape's children proportionally to selected shape"
                      );
                    })
                  });
                })
              });
            })
          });
        })
      });
    });
  })

  it('getShapes', () => {
    SmartShapeManager.clear();
    cy.visit('http://localhost:5173/tests/empty.html').then(() => {
      const app = Cypress.$("#app").toArray()[0];
      app.style.height = "500px";
      const shape1 = new SmartShape().init(app,{id:"shape1",name:"Shape 1",canScale:true,minWidth:50,minHeight:50,maxWidth:300,maxHeight:400},
          [[10,210],[10,10],[210,10],[210,210]]);
      const shape2 = new SmartShape().init(app,{id:"shape2",name:"Shape 2",forceCreateEvent:true});
      const shape3 = new SmartShape().init(app,{id:"shape3",name:"Shape 3",forceCreateEvent:true});
      const shape4 = new SmartShape().init(app,{id:"shape4",name:"Shape 4",forceCreateEvent:true});
      shape2.switchDisplayMode(SmartShapeDisplayMode.SCALE);
      shape3.switchDisplayMode(SmartShapeDisplayMode.ROTATE);
      const shapes = SmartShapeManager.getShapes();
      assert.equal(shapes.length,4,"Should return all shapes excluding resize and rotate boxes");
    });
  })
})
