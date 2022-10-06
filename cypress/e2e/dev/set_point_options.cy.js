import SmartShape from "../../../src/SmartShape/SmartShape.js";
describe('Point options', () => {

    const pointOptions = {
        width:20,
        height:20,
        canDrag: true,
        canDelete: true,
        classes: 'newPoint',
        forceDisplay:true,
        style: {
            backgroundColor:"rgb(255, 128, 0)",
            borderWidth:'3px',
        }
    }

    it('should correctly merge default point options with point options, passed from SmartShape.init constructor for all points', () => {
        cy.visit('http://localhost:5173/tests/empty.html').then(()=>{
            const app = Cypress.$("#app").toArray()[0]
            const shape = new SmartShape().init(app,{
                pointOptions:pointOptions
            },[[0,100],[100,0],[200,100]])
            const point1 = shape.findPoint(100,0);
            point1.element.id = "point1";
            cy.get("#point1").should("have.class","newPoint")
            cy.get("#point1").should("have.css","background-color","rgb(255, 128, 0)")
            cy.get("#point1").should("have.css","width","20px");
            cy.get("#point1").should("have.css","height","20px");
            cy.get("#point1").should("have.css","borderWidth","3px");
            cy.get("#point1").should("have.css","borderStyle","solid");
        })
    })

    it("test options override for specified point", () => {
        cy.visit('http://localhost:5173/tests/empty.html').then(() => {
            const app = Cypress.$("#app").toArray()[0]
            const shape = new SmartShape().init(app, {
                pointOptions: pointOptions
            }, [[0, 100], [100, 0], [200, 100]])
            const point1 = shape.findPoint(100, 0)
            point1.element.id = "point1";
            point1.setOptions({
                classes: "uniquePoint",
                width: 50,
                height: 50,
                style: {
                    backgroundColor: "rgb(0, 255, 0)",
                }
            })
            point1.redraw();
            cy.get("#point1").should("have.class", "uniquePoint").then(() => {
                cy.get("#point1").should("have.css", "width", "50px").then(() => {
                    cy.get("#point1").should("have.css", "height", "50px").then(()=> {
                        cy.get("#point1").should("have.css", "background-color", "rgb(0, 255, 0)").then(()=> {
                            const point2 = shape.findPoint(200, 100)
                            point2.element.id = "point2";
                            cy.get("#point2").should("have.class", "newPoint").then(()=> {
                                cy.get("#point2").should("have.css", "width", "20px").then(() => {
                                    cy.get("#point2").should("have.css", "height", "20px").then(()=> {
                                        cy.get("#point2").should("have.css", "background-color", "rgb(255, 128, 0)")
                                    });
                                });
                            });
                        })
                    });
                });
            })
        })
    })

    it("should not drag or delete point if this feature is disabled", () => {
        cy.visit('http://localhost:5173/tests/empty.html').then(() => {
            const app = Cypress.$("#app").toArray()[0]
            const shape = new SmartShape().init(app, {
                pointOptions: pointOptions
            }, [[0, 100], [100, 0], [200, 100]])
            shape.switchDisplayMode("selected")
            const point1 = shape.findPoint(100, 0)
            point1.element.id = "point1";
            point1.setOptions({
                canDrag: false,
                canDelete: false,
            })
            cy.get("#point1").trigger("mousedown",{buttons:1,force:true}).then(() => {
                point1.element.style.display = '';
                cy.get("#app").trigger("mousemove",{buttons:1,clientX:120,clientY:20,force:true}).then(() => {
                    assert.equal(point1.x, 100);
                    assert.equal(point1.y, 0)
                    cy.get("#point1").trigger("mouseup",{button:2}).then( () => {
                        assert.isNotNull(shape.findPoint(100,0))
                        point1.setOptions({
                            canDrag: true,
                            canDelete: true
                        })
                        cy.get("#point1").trigger("mousedown",{buttons:1}).then(() => {
                            cy.get("#app").trigger("mousemove", {buttons: 1, clientX: 120, clientY: 20}).then(() => {
                                assert.equal(point1.x, 102);
                                assert.equal(point1.y, 2)
                                cy.get("#point1").trigger("mouseup", {button: 2}).then(() => {
                                    assert.isNull(shape.findPoint(100, 0))
                                })
                            })
                        })
                    })
                })
            })
        })
    })
})
