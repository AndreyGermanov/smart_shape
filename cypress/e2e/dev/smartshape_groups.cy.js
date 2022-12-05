import {SmartShape} from "../../../src/index.js";
import SmartShapeManager from "../../../src/SmartShapeManager/SmartShapeManager.js";
import {SmartShapeDisplayMode} from "../../../src/SmartShape/SmartShape.js";

function setup() {
  const app = Cypress.$("#app").toArray()[0];
  app.style.width = '800px';
  app.style.height = '800px';
  const shape = new SmartShape().init(app,{id:"shape1",canAddPoints:true,pointOptions:{canDelete:true}},
      [[0,200],[0,0],[200,0],[200,200]]);
  return [app,shape];
}

describe('SmartShape groups tests', () => {
  it('addChild', () => {
    cy.visit('http://localhost:5173/tests/empty.html').then(() => {
      const [app,shape] = setup();
      const child = new SmartShape().init(app, {id:"shape2"},[[50,100],[100,50],[150,100]])
      shape.addChild(child);
      assert.equal(shape.getChildren().length,1, "Should add child to shape");
      shape.addChild(child);
      assert.equal(shape.getChildren().length, 1, "Should not add the same child twice");
      shape.addChild(shape);
      assert.equal(shape.getChildren().length, 1, "Shape should not add itself to children");
      child.addChild(shape);
      assert.equal(child.getChildren().length, 0, "Shapes should not add its parent as child");
      const child2 = new SmartShape().init(app, {id:"shape3"}, [[50,110],[100,160],[150,110]]);
      child.addChild(child2);
      assert.equal(child.getChildren().length, 1, "Should add new child to child");
      child2.addChild(shape);
      assert.equal(child2.getChildren().length, 0, "Should not add grand parent to child");
      const shape2 = new SmartShape().init(app, {id:"shape4"},[]);
      shape2.addChild(child2);
      assert.equal(shape2.getChildren().length, 0 , "Each child should have only single parent");
    })
  });

  it('removeChild', () => {
    cy.visit('http://localhost:5173/tests/empty.html').then(() => {
      const [app,shape] = setup();
      const child = new SmartShape().init(app, {id:"shape2"},[[50,100],[100,50],[150,100]])
      shape.addChild(child);
      assert.equal(shape.getChildren().length,1, "Should add child");
      child.removeChild(child);
      assert.equal(child.getChildren().length,0, "Should do nothing");
      shape.removeChild(child);
      assert.equal(shape.getChildren().length,0, "Should remove child");
    })
  });

  it('getChildren', () => {
    cy.visit('http://localhost:5173/tests/empty.html').then(() => {
      const [app,shape] = setup();
      const child = new SmartShape().init(app, {id:"shape2"},[[50,100],[100,50],[150,100]])
      const child2 = new SmartShape().init(app, {id:"shape3"},[[50,100],[100,50],[150,100]])
      shape.addChild(child);
      shape.addChild(child2);
      const child3 = new SmartShape().init(app, {id:"shape4"},[[50,100],[100,50],[150,100]])
      child.addChild(child3);
      const child4 = new SmartShape().init(app, {id:"shape4"},[[50,100],[100,50],[150,100]])
      child3.addChild(child4);
      assert.equal(shape.getChildren().length,2, "Should return only direct children");
      assert.equal(shape.getChildren(true).length,4, "Should return all children hierarchically");
      assert.equal(child.getChildren(true).length,2, "Should return all children hierarchically");
    })
  });

  it('getParent', () => {
    cy.visit('http://localhost:5173/tests/empty.html').then(() => {
      const [app,shape] = setup();
      const child = new SmartShape().init(app, {id:"shape2"},[[50,100],[100,50],[150,100]])
      const child2 = new SmartShape().init(app, {id:"shape3"},[[50,100],[100,50],[150,100]])
      shape.addChild(child);
      child.addChild(child2);
      assert.equal(child.getParent(),shape,"Should return correct parent for first child");
      assert.equal(child2.getParent(),child,"Should return correct parent for second child");
    })
  });

  it('getRootParent', () => {
    cy.visit('http://localhost:5173/tests/empty.html').then(() => {
      const [app,shape] = setup();
      const child = new SmartShape().init(app, {id:"shape2"},[[50,100],[100,50],[150,100]])
      const child2 = new SmartShape().init(app, {id:"shape3"},[[50,100],[100,50],[150,100]])
      shape.addChild(child);
      child.addChild(child2);
      assert.equal(child.getRootParent(),shape,"Should return correct root parent for first child");
      assert.equal(child2.getRootParent(),shape,"Should return correct root parent for second child");
      assert.isNull(shape.getRootParent(),"Should return null as a parent of root shape");
    })
  });

  it('getPosition', () => {
    cy.visit('http://localhost:5173/tests/empty.html').then(() => {
      const [app, shape] = setup();
      shape.moveTo(150, 80);
      shape.redraw()
      const child = new SmartShape().init(app, {id: "shape2"}, [[150, 300], [400, 250], [500, 100]])
      const child2 = new SmartShape().init(app, {id: "shape3"}, [[50, 100], [100, 50], [150, 100]])
      shape.addChild(child);
      child.addChild(child2);
      let pos = shape.getPosition();
      assert.equal(pos.left, 150, "Should return correct left for single shape");
      assert.equal(pos.top, 80, "Should return correct top for single shape");
      assert.equal(pos.right, 350, "Should return correct right for single shape");
      assert.equal(pos.bottom, 280, "Should return correct bottom for single shape");
      assert.equal(pos.width, 200, "Should return correct width for single shape");
      assert.equal(pos.height, 200, "Should return correct height for single shape");
      pos = shape.getPosition(true);
      assert.equal(pos.left, 50, "Should return correct left for group of shapes");
      assert.equal(pos.top, 50, "Should return correct top for group of shapes");
      assert.equal(pos.right, 500, "Should return correct right for group of shapes");
      assert.equal(pos.bottom, 300, "Should return correct bottom for group of shapes");
      assert.equal(pos.width, 450, "Should return correct width for group of shapes");
      assert.equal(pos.height, 250, "Should return correct height for group of shapes");
    });
  })

  it('When mouse down on child, should activate root parent for dragging', () => {
    cy.visit('http://localhost:5173/tests/empty.html').then(() => {
      const [app, shape] = setup();
      shape.moveTo(150, 80);
      shape.redraw()
      const child = new SmartShape().init(app, {id: "shape2"}, [[150, 300], [400, 250], [500, 100]])
      const child2 = new SmartShape().init(app, {id: "shape3"}, [[50, 100], [100, 50], [150, 100]])
      shape.addChild(child);
      child.addChild(child2);
      SmartShapeManager.shapeOnCursor = child2;
      cy.get("#shape3").trigger("mousedown",{buttons:1,force:true}).then(() => {
        assert.equal(SmartShapeManager.draggedShape,shape,"Should activate parent for dragging")
      })
    });
  });

  it('Resize box and rotate box should surround whole group', () => {
    cy.visit('http://localhost:5173/tests/empty.html').then(() => {
      const [app, shape] = setup();
      shape.moveTo(150, 80);
      shape.redraw()
      const child = new SmartShape().init(app, {id: "shape2"}, [[150, 300], [400, 250], [500, 100]])
      const child2 = new SmartShape().init(app, {id: "shape3"}, [[50, 100], [100, 50], [150, 100]])
      shape.addChild(child);
      child.addChild(child2);
      shape.setOptions({canScale:true,canRotate:true});
      shape.switchDisplayMode(SmartShapeDisplayMode.SCALE);
      const [pointWidth,pointHeight] = shape.transformer.getMaxPointSize();
      cy.wait(10).then(() => {
        assert.equal(shape.resizeBox.shape.left,50-pointWidth,"Should set correct left of resize box");
        assert.equal(shape.resizeBox.shape.top,50-pointHeight,"Should set correct top of resize box");
        assert.equal(shape.resizeBox.shape.bottom,300+pointHeight,"Should set correct bottom of resize box");
        assert.equal(shape.resizeBox.shape.right,500+pointWidth,"Should set correct right of resize box");
        assert.equal(shape.resizeBox.shape.width,450+pointWidth*2,"Should set correct width of resize box");
        assert.equal(shape.resizeBox.shape.height,250+pointHeight*2,"Should set correct height of resize box");
        shape.switchDisplayMode(SmartShapeDisplayMode.ROTATE);
        cy.wait(10).then(() => {
          assert.equal(shape.rotateBox.shape.left,50-pointWidth,"Should set correct left of rotate box");
          assert.equal(shape.rotateBox.shape.top,50-pointHeight,"Should set correct top of rotate box");
          assert.equal(shape.rotateBox.shape.bottom,300+pointHeight,"Should set correct bottom of rotate box");
          assert.equal(shape.rotateBox.shape.right,500+pointWidth,"Should set correct right of rotate box");
          assert.equal(shape.rotateBox.shape.width,450+pointWidth*2,"Should set correct width of rotate box");
          assert.equal(shape.rotateBox.shape.height,250+pointHeight*2,"Should set correct height of rotate box");
        })
      })
    });
  });

})
