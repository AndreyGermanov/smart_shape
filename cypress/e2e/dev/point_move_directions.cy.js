import SmartPoint, {PointEvents, PointMoveDirections} from "../../../src/smart_point.js";
import {getOffset} from "../../../src/utils.js";
describe('Point move directions tests (according to options.moveDirections setting', () => {
  const setup = () => {
    const app = Cypress.$("#app").toArray()[0];
    const point = new SmartPoint().init(100,100,{id:"point1",bounds:{left:0,right:1000,top:0,bottom:1000,canDrag:true}});
    app.appendChild(point.element);
    app.addEventListener("mousemove", (event) => {
      point.mousemove(event);
    })
    return [app,point]
  }
  it('By default should allow to move to any directions', () => {
    cy.visit('http://localhost:5173/tests/empty.html').then(() => {
      const [app,point] = setup();
      const offset = getOffset(app,true)
      cy.get("#point1").trigger("mousedown",{buttons:1}).then(() => {
        cy.get("#app").trigger("mousemove",{buttons:1,clientX:120,clientY:120}).then(() => {
          assert.equal(point.x,120 - point.options.width/2 - offset.left,"Should move to the right");
          assert.equal(point.y,120 - point.options.height/2 - offset.top,"Should move to the bottom");
          cy.get("#point1").trigger("mousemove",{buttons:1,clientX:90,clientY:90}).then(() => {
            assert.equal(point.x,90 - point.options.width/2 - offset.left,"Should move to the left");
            assert.equal(point.y,90 - point.options.height/2 - offset.top,"Should move to the top");
          })
        });
      })
    })
  })
  it("Should not move if restrictions applied", () => {
    cy.visit('http://localhost:5173/tests/empty.html').then(() => {
      const [app, point] = setup();
      const offset = getOffset(app,true)
      point.setOptions({moveDirections: [PointMoveDirections.TOP, PointMoveDirections.LEFT, PointMoveDirections.RIGHT]});
      cy.get("#point1").trigger("mousedown", {buttons:1}).then(() => {
        cy.get("#app").trigger("mousemove",{buttons:1,clientX:120,clientY:120}).then(() => {
          assert.equal(point.x,120 - point.options.width/2 - offset.left,"Should move to the right");
          assert.equal(point.y, 100, "Should restrict moving to the bottom");
          point.x = 100;
          point.y = 100;
          point.setOptions({moveDirections: [PointMoveDirections.TOP, PointMoveDirections.LEFT]});
          point.redraw();
          cy.get("#point1").trigger("mousedown", {buttons:1}).then(() => {
            cy.get("#app").trigger("mousemove",{buttons:1,clientX:120,clientY:120}).then(() => {
              assert.equal(point.x, 100, "Should restrict moving to the right");
              assert.equal(point.y, 100, "Should restrict moving to the bottom");
              point.x = 100;
              point.y = 100;
              point.setOptions({moveDirections: [PointMoveDirections.TOP]});
              point.redraw();
              cy.get("#point1").trigger("mousedown", {buttons:1}).then(() => {
                cy.get("#app").trigger("mousemove",{buttons:1,clientX:80,clientY:80}).then(() => {
                  assert.equal(point.x, 100, "Should restrict moving to the left");
                  assert.equal(point.y,80 - point.options.height/2 - offset.top,"Should move to the top");
                  point.x = 100;
                  point.y = 100;
                  point.setOptions({moveDirections: []});
                  point.redraw();
                  cy.get("#point1").trigger("mousedown", {buttons:1}).then(() => {
                    cy.get("#app").trigger("mousemove", {buttons: 1, clientX: 80, clientY: 80}).then(() => {
                      assert.equal(point.x, 100, "Should restrict moving to the left");
                      assert.equal(point.y, 100, "Should restrict moving to the top");
                    });
                  });
                });
              })
            });
          });
        })
      })
    });

  })
})
