import {RotateBox} from "../../../src/smart_shape.js";

function setup() {
  const app = Cypress.$("#app").toArray()[0];
  app.style.height = "800px";
  const box = new RotateBox().init(app,10,10, 90, 90, {id:"box1"});
  return [app,box];
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
      assert.equal(box.shape.options.id,"box1_shape","Should set ID of internal shape correctly");
      assert.equal(Cypress.$("#box1_shape").toArray().length,1, "Should create HTML element for shape with correct id");
      assert.equal(box.shape.points.length,4,"Should create 8 points as resize markers");
      assert.isFalse(box.shape.options.canAddPoints,"Adding points should not be allowed");
      assert.isFalse(box.shape.options.canDeletePoints,"Removing points should not be allowed");
      assert.isObject(box.options.shapeOptions,"Options for shape should exist");
      assert.isObject(box.options.shapeOptions.pointOptions,"Default point options for internal shape should exist");
      assert.equal(box.options.shapeOptions.id,"box1_shape","Correct ID should be inside options for shape");
      checkAndGetPoints(box);
    })
  })
})
