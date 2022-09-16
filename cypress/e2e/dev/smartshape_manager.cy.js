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
      cy.get("#shape1").trigger("click",{buttons:1,force:true}).then(() => {
        cy.get("#shape1").trigger("click",{buttons:1,force:true}).then(() => {
          assert.equal(SmartShapeManager.shapes.length, 2, "Should add resize box to shapes list");
          assert.isFalse(shape.resizeBox.shape.options.managed, "Resize box should be unmanaged")
          cy.get("#shape1").trigger("click", {buttons:1,force:true}).then(() => {
            assert.equal(SmartShapeManager.shapes.length, 3, "Should add rotate box to shapes list");
            assert.isFalse(shape.rotateBox.shape.options.managed, "Rotate box should be unmanaged")
          });
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
})
