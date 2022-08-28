import SmartShape from "../../../src/smart_shape.js";
describe('Test drag points', () => {
  it('Should not go beyond container element', async() => {
    cy.visit('http://localhost:5173/tests/empty.html').then(() => {
      const div = document.createElement("div");
      div.style.width = "500px";
      div.style.height = "400px";
      div.style.border = "1px;solid";
      div.id = "container";
      const app = Cypress.$("#app").toArray()[0]
      app.appendChild(div)
      const shape = new SmartShape().init(div,{stroke:"#000000",fill:"lightgreen",fillOpacity:'0.5'},[]);
      const point1 = shape.addPoint(0,100);
      point1.element.id = "point1"
      const point2 = shape.addPoint(100,0);
      point2.element.id = "point2"
      const point3 = shape.addPoint(200,100);
      point3.element.id = "point3"
      cy.get("#point1").trigger("mousedown",2,2,{buttons:1,bubbles:false}).then(() => {
        cy.get("#container").trigger("mousemove",{buttons:1,clientX:35,clientY:125}).then(()=> {
          assert.equal(point1.x,32)
          assert.equal(point1.y,122)
          cy.get("#container").trigger("mouseup",{buttons:1}).then(() => {
            cy.get("#container").trigger("mousemove",{buttons:1,clientX:35,clientY:125}).then(()=> {
              assert.equal(point1.x,32)
              assert.equal(point1.y,122)
              cy.get("#point2").trigger("mousedown",2,2,{buttons:1,bubbles:false}).then(()=>{
                cy.get("#container").trigger("mousemove",{buttons:1,clientX:60,clientY:350}).then(()=> {
                  assert.equal(point1.x,32)
                  assert.equal(point1.y,122)
                  assert.equal(point2.x,57)
                  assert.equal(point2.y,347)
                  cy.get("#container").trigger("mousemove",{buttons:1,clientX:57,clientY:60}).then(()=> {
                    assert.equal(point2.x,54)
                    assert.equal(point2.y,57)
                    cy.get("#container").trigger("mousemove",{buttons:1,clientX:550,clientY:60}).then(()=> {
                      assert.equal(point2.x,547)
                      assert.equal(point2.y,57)
                    })
                  })
                })
              })
            })
          })
        })
      })
    })
  })
})
