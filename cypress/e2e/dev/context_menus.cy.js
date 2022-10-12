import {SmartShapeManager} from "../../../src/index.js";

describe('SmartShape Context Menus tests', () => {
  it('Should create and destroy context menu based on "hasContextMenu" option', () => {
    cy.visit('http://localhost:5173/tests/empty.html').then(() => {
      const app = Cypress.$("#app").toArray()[0];
      const shape = SmartShapeManager.createShape(app,{},[[0,100],[100,0],[200,100]]);
      assert.isDefined(shape.contextMenu,"contextMenu should be defined");
      assert.isNotNull(shape.contextMenu,"Context menu should be enabled by default");
      shape.setOptions({hasContextMenu:false});
      assert.isNull(shape.contextMenu,"contextMenu should be null after disable");
      shape.setOptions({hasContextMenu:true});
      assert.isNotNull(shape.contextMenu,"Context menu should be enabled after set option");
    })
  })
  it("Menu should contain correct commands based on shape options setup", () => {
    const app = Cypress.$("#app").toArray()[0];
    const shape = SmartShapeManager.createShape(app,{hasContextMenu:true},[[0,100],[100,0],[200,100]]);
    assert.isDefined(shape.contextMenu.items.find(item=>item.id === "i"+shape.guid+"_clone"),"Should have 'Clone' command");
    assert.isDefined(shape.contextMenu.items.find(item=>item.id === "i"+shape.guid+"_export_json","Should have 'Export to JSON' command"));
    assert.isDefined(shape.contextMenu.items.find(item=>item.id === "i"+shape.guid+"_export_svg","Should have 'Export to SVG' command"));
    assert.isDefined(shape.contextMenu.items.find(item=>item.id === "i"+shape.guid+"_export_png","Should have 'Export to PNG' command"));
    assert.isUndefined(shape.contextMenu.items.find(item=>item.id === "i"+shape.guid+"_add_point"),
        "Should not have add point option if 'canAddPoints' not defined");
    shape.setOptions({canAddPoints:true});
    assert.isDefined(shape.contextMenu.items.find(item=>item.id === "i"+shape.guid+"_add_point"),
        "Should have an option to add point if 'canAddPoints' is defined");
  })
  it("Should show context menu for point only if 'canDelete' option enabled", () => {
    const app = Cypress.$("#app").toArray()[0];
    const shape = SmartShapeManager.createShape(app,{},[[0,100],[100,0],[200,100]]);
    const point = shape.findPoint(0,100);
    assert.isDefined(point.contextMenu,"Context menu should be defined");
    assert.isNull(point.contextMenu,"Context menu should be null");
  })
  it("Should correctly add Group/Ungroup menu items", () => {
    cy.visit('http://localhost:5173/tests/empty.html').then(() => {
      const app = Cypress.$("#app").toArray()[0];
      const shape1 = SmartShapeManager.createShape(app,{},[[0,100],[100,0],[200,100]]);
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
})
