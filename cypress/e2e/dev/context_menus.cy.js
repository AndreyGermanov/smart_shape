import {SmartShapeManager} from "../../../src/index.js";

describe('SmartShape Context Menus tests', () => {
  it('Should create and destroy context menu based on "hasContextMenu" option', () => {
    cy.visit('http://localhost:5173/tests/empty.html').then(() => {
      const app = Cypress.$("#app").toArray()[0];
      const shape = SmartShapeManager.createShape(app,{},[[0,100],[100,0],[200,100]]);
      shape.shapeMenu.updateContextMenu();
      assert.isDefined(shape.contextMenu,"contextMenu should be defined");
      assert.isNotNull(shape.contextMenu,"Context menu should be enabled by default");
      shape.setOptions({hasContextMenu:false});
      shape.shapeMenu.updateContextMenu();
      assert.isNull(shape.contextMenu,"contextMenu should be null after disable");
      shape.setOptions({hasContextMenu:true});
      assert.isNotNull(shape.contextMenu,"Context menu should be enabled after set option");
    })
  })
  it("Menu should contain correct commands based on shape options setup", () => {
    cy.visit('http://localhost:5173/tests/empty.html').then(() => {
      const app = Cypress.$("#app").toArray()[0];
      const shape = SmartShapeManager.createShape(app, {hasContextMenu: true}, [[0, 100], [100, 0], [200, 100]]);
      shape.shapeMenu.updateContextMenu();
      assert.isDefined(shape.contextMenu.items.find(item => item.id === "i" + shape.guid + "_clone"), "Should have 'Clone' command");
      assert.isDefined(shape.contextMenu.items.find(item => item.id === "i" + shape.guid + "_export_json", "Should have 'Export to JSON' command"));
      assert.isDefined(shape.contextMenu.items.find(item => item.id === "i" + shape.guid + "_export_svg", "Should have 'Export to SVG' command"));
      assert.isDefined(shape.contextMenu.items.find(item => item.id === "i" + shape.guid + "_export_png", "Should have 'Export to PNG' command"));
      assert.isUndefined(shape.contextMenu.items.find(item => item.id === "i" + shape.guid + "_add_point"),
          "Should not have add point option if 'canAddPoints' not defined");
      shape.setOptions({canAddPoints: true});
      assert.isDefined(shape.contextMenu.items.find(item => item.id === "i" + shape.guid + "_add_point"),
          "Should have an option to add point if 'canAddPoints' is defined");
    })
  })
  it("Should show context menu for point only if 'canDelete' option enabled", () => {
    cy.visit('http://localhost:5173/tests/empty.html').then(() => {
      const app = Cypress.$("#app").toArray()[0];
      const shape = SmartShapeManager.createShape(app,{},[[0,100],[100,0],[200,100]]);
      const point = shape.findPoint(0,100);
      assert.isDefined(point.contextMenu,"Context menu should be defined");
      assert.isNull(point.contextMenu,"Context menu should be null");
    })
  })
  it("Should correctly add Group/Ungroup menu items", () => {
    cy.visit('http://localhost:5173/tests/empty.html').then(() => {
      const app = Cypress.$("#app").toArray()[0];
      const shape1 = SmartShapeManager.createShape(app,{},[[0,100],[100,0],[200,100]]);
      shape1.shapeMenu.updateContextMenu();
      shape1.contextMenu.show();
      assert.isUndefined(shape1.contextMenu.items.find(item=>item.id === "i" + shape1.guid+"_ungroup"),
          "Should not contain 'Group' item if no children");
      shape1.contextMenu.hide();
      const shape2 = SmartShapeManager.createShape(app, {}, [[20,40],[40,20],[60,40]]);
      shape1.addChild(shape2);
      shape1.contextMenu.show();
      assert.isDefined(shape1.contextMenu.items.find(item=>item.id === "i" + shape1.guid+"_ungroup"),
          "Should contain 'Group' item if shape has children");
      shape1.contextMenu.hide();
      shape2.destroy();
      shape1.contextMenu.show();
      assert.isUndefined(shape1.contextMenu.items.find(item=>item.id === "i" + shape1.guid+"_ungroup"),
          "Should not contain 'Group' item if all children removed");
    })
  })
  it("Should correctly destroy parent in group of shapes, depending on 'groupChildShapes' option", () => {
    cy.visit('http://localhost:5173/tests/empty.html').then(() => {
      SmartShapeManager.clear();
      const app = Cypress.$("#app").toArray()[0];
      let shape1 = SmartShapeManager.createShape(app, {}, [[0, 100], [100, 0], [200, 100]]);
      let shape2 = SmartShapeManager.createShape(app, {}, [[0, 50], [50, 0], [100, 50]]);
      shape1.addChild(shape2);
      let shape3 = SmartShapeManager.createShape(app, {}, [[50, 50], [100, 0], [150, 50]]);
      shape1.addChild(shape3);
      shape2.shapeMenu.onDestroyClick();
      assert.equal(SmartShapeManager.length(), 0,
          "Should destroy all shapes if 'groupChildShapes' option enabled on parent");
      shape1 = SmartShapeManager.createShape(app, {}, [[0, 100], [100, 0], [200, 100]]);
      shape2 = SmartShapeManager.createShape(app, {}, [[0, 50], [50, 0], [100, 50]]);
      shape1.addChild(shape2);
      shape3 = SmartShapeManager.createShape(app, {}, [[50, 50], [100, 0], [150, 50]]);
      shape1.addChild(shape3);
      shape1.setOptions({groupChildShapes: false})
      shape1.shapeMenu.onDestroyClick();
      assert.equal(SmartShapeManager.length(), 2,
          "Should destroy only one shape if 'groupChildShapes' option disabled on parent");
    });
  })
  it("Should correctly insert new point between two other points", () => {
    cy.visit('http://localhost:5173/tests/empty.html').then(() => {
      SmartShapeManager.clear();
      const app = Cypress.$("#app").toArray()[0];
      const shape = SmartShapeManager.createShape(app, {canAddPoints: true},
          [], true
      );
      shape.shapeMenu.onAddPointClick({cursorX: 308, cursorY: 308});
      assert.deepEqual(shape.getPointsArray(), [[300,300]],
          "Should correctly add point"
      );
      shape.deleteAllPoints();
      shape.redraw();
      shape.addPoints([[0, 100], [100, 0], [200, 100], [100, 200]]);
      shape.redraw();
      shape.shapeMenu.onAddPointClick({cursorX: 38, cursorY: 38});
      assert.deepEqual(shape.getPointsArray(), [[0, 100], [30, 30], [100, 0], [200, 100], [100, 200]],
          "Should correctly insert point between two closest points");
    });
  })
})
