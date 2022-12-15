import SmartShapeManager from "../../../src/SmartShapeManager/SmartShapeManager.js";
import SmartShapeDrawHelper from "../../../src/SmartShape/SmartShapeDrawHelper.js";

describe("Load External SVG tests", () => {
    it("load single polygon", () => {
        cy.visit('http://localhost:5173/tests/empty.html').then(async() => {
            const app = Cypress.$("#app").toArray()[0];
            const shape = SmartShapeManager.createShape(app,{},[],false);
            shape.setOptions({svgLoadFunc:(shape) => {
                    const svg = document.createElementNS("http://www.w3.org/2000/svg","svg");
                    const path = document.createElementNS("http://www.w3.org/2000/svg","path");
                    const height = shape.height || 100;
                    const width = shape.width || 200;
                    path.setAttribute("d",`M0,${height} ${width/2},0 ${width},${height} Z`);
                    path.id = "path1";
                    svg.appendChild(path);
                    return svg;
                }})
            await shape.show();
            assert.equal(shape.width,200, "Should set correct initial width of the shape");
            assert.equal(shape.height,100, "Should set correct initial height of the shape");
            assert.equal(shape.svg.style.width,"200px","Should set correct initial width in style of the shape");
            assert.equal(shape.svg.style.height,"100px","Should set correct initial height in style of the shape");
            assert.equal(shape.svg.getAttribute("width"),"200px","Should set correct width in the SVG of the shape");
            assert.equal(shape.svg.getAttribute("height"),"100px","Should set correct height in the SVG of the shape");
            assert.equal(shape.polygon.getAttribute("path_id"),"path1","Should set path_id attribute correctly")
            let pos = getShapePosition(shape);
            assert.equal(pos.width, 200, "Shape polygon should have correct width");
            assert.equal(pos.height, 100, "Shape polygon should have correct height");
            shape.scaleTo(400,200);
            await shape.redraw();
            assert.equal(shape.width,400, "Should set correct initial width of the shape");
            assert.equal(shape.height,200, "Should set correct initial height of the shape");
            assert.equal(shape.svg.style.width,"400px","Should set correct initial width in style of the shape");
            assert.equal(shape.svg.style.height,"200px","Should set correct initial height in style of the shape");
            assert.equal(shape.svg.getAttribute("width"),"400px","Should set correct width in the SVG of the shape");
            assert.equal(shape.svg.getAttribute("height"),"200px","Should set correct height in the SVG of the shape");
            assert.equal(shape.polygon.getAttribute("path_id"),"path1","Should set path_id attribute correctly")
            pos = getShapePosition(shape);
            assert.equal(pos.width, 400, "Shape polygon should have correct width");
            assert.equal(pos.height, 200, "Shape polygon should have correct height");
            shape.setOptions({svgLoadFunc:(shape) => {
                    const svg = document.createElementNS("http://www.w3.org/2000/svg","svg");
                    const path = document.createElementNS("http://www.w3.org/2000/svg","path");
                    const height = shape.height || 100;
                    const width = shape.width || 200;
                    path.setAttribute("d",`M0,${height} ${width/2},0 ${width},${height} Z`);
                    path.id = "path2";
                    svg.appendChild(path);
                    return svg;
                }})
            await shape.redraw();
            const paths = Array.from(shape.svg.querySelectorAll("path"));
            assert.equal(paths.length,1,"Should remove previous paths");
            assert.equal(paths[0].getAttribute("path_id"),"path2", "Should leave correct polygon")
        });
    });

    it("load group of polygons", async() => {
        cy.visit('http://localhost:5173/tests/empty.html').then(async() => {
            const app = Cypress.$("#app").toArray()[0];
            app.style.width = "800px";
            app.style.height = "800px";
            const shape = SmartShapeManager.createShape(app, {}, [], false);
            shape.setOptions({
                svgLoadFunc: (shape) => {
                    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
                    const pos = shape.getPosition(true);
                    const height = pos.height || 100;
                    const width = pos.width || 200;
                    path.setAttribute("d", `M0,${height / 2} ${width / 4},0 ${width / 2},${height / 2} Z`);
                    path.id = "path1";
                    svg.appendChild(path);
                    const path2 = document.createElementNS("http://www.w3.org/2000/svg", "path");
                    path2.setAttribute("d", `M${width / 2},${height} ${width},${height / 2} ${width},${height} Z`);
                    path2.id = "path2";
                    svg.appendChild(path2);
                    return svg;
                }
            })
            await shape.show();
            let shapes = SmartShapeManager.getShapes();
            assert.equal(shapes.length, 2, "Should add child to the shapes list");
            let pos = shape.getPosition(true)
            assert.equal(pos.width,200, "Should set correct initial width of the shape 1");
            assert.equal(pos.height,100, "Should set correct initial height of the shape 1");
            assert.equal(shape.svg.style.width,"200px","Should set correct initial width in style of the shape 1");
            assert.equal(shape.svg.style.height,"100px","Should set correct initial height in style of the shape 1");
            assert.equal(shape.svg.getAttribute("width"),"200px","Should set correct width in the SVG of the shape 1");
            assert.equal(shape.svg.getAttribute("height"),"100px","Should set correct height in the SVG of the shape 1");
            assert.equal(shape.polygon.getAttribute("path_id"),"path1","Should set path_id attribute correctly 1")
            pos = getShapePosition(shape);
            assert.equal(pos.width, 200, "Shape polygon should have correct width 1");
            assert.equal(pos.height, 100, "Shape polygon should have correct height 1");
            shape.scaleTo(400,200);
            await shape.redraw();
            pos = shape.getPosition(true);
            assert.equal(pos.width,400, "Should set correct initial width of the shape");
            assert.equal(pos.height,200, "Should set correct initial height of the shape");
            assert.equal(shape.svg.style.width,"400px","Should set correct initial width in style of the shape");
            assert.equal(shape.svg.style.height,"200px","Should set correct initial height in style of the shape");
            assert.equal(shape.svg.getAttribute("width"),"400px","Should set correct width in the SVG of the shape");
            assert.equal(shape.svg.getAttribute("height"),"200px","Should set correct height in the SVG of the shape");
            assert.equal(shape.polygon.getAttribute("path_id"),"path1","Should set path_id attribute correctly")
            pos = getShapePosition(shape);
            assert.equal(pos.width, 400, "Shape polygon should have correct width");
            assert.equal(pos.height, 200, "Shape polygon should have correct height");
            shape.setOptions({
                svgLoadFunc: (shape) => {
                    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
                    const pos = shape.getPosition(true);
                    const height = pos.height || 100;
                    const width = pos.width || 200;
                    path.setAttribute("d", `M0,${height / 2} ${width / 4},0 ${width / 2},${height / 2} Z`);
                    path.id = "path1";
                    svg.appendChild(path);
                    return svg;
                }
            })
            await shape.show();
            shapes = SmartShapeManager.getShapes();
            assert.equal(shapes.length, 1, "Should remove unnecessary child from shapes list 1");
            assert.equal(shapes[0].polygon.getAttribute("path_id"),"path1","Should leave correct polygon");
            shape.setOptions({
                svgLoadFunc: (shape) => {
                    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
                    const pos = shape.getPosition(true);
                    const height = pos.height || 100;
                    const width = pos.width || 200;
                    path.setAttribute("d", `M0,${height / 2} ${width / 4},0 ${width / 2},${height / 2} Z`);
                    path.id = "path1";
                    svg.appendChild(path);
                    const path2 = document.createElementNS("http://www.w3.org/2000/svg", "path");
                    path2.setAttribute("d", `M${width / 2},${height} ${width},${height / 2} ${width},${height} Z`);
                    path2.id = "path2";
                    svg.appendChild(path2);
                    return svg;
                }
            })
            await shape.show();
            shapes = SmartShapeManager.getShapes();
            assert.equal(shapes.length, 2, "Should add child to the shapes list 2");
            shape.setOptions({
                svgLoadFunc: (shape) => {
                    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                    const pos = shape.getPosition(true);
                    const height = pos.height || 100;
                    const width = pos.width || 200;
                    const path2 = document.createElementNS("http://www.w3.org/2000/svg", "path");
                    path2.setAttribute("d", `M0,0 ${width},${height / 2} ${width},${height} Z`);
                    path2.id = "path2";
                    svg.appendChild(path2);
                    return svg;
                }
            })
            await shape.show();
            shapes = SmartShapeManager.getShapes();
            assert.equal(shapes.length, 1, "Should remove unnecessary child from shapes list 2");
            assert.equal(shapes[0].polygon.getAttribute("path_id"),"path2",
                "Should replace previous parent to new one");
        });
    })
})
function getShapePosition(shape) {
    let left = 9999999, right = -9999999, top = 9999999, bottom = -9999999;
    shape.svg.querySelectorAll("path").forEach(path => {
        const points = SmartShapeDrawHelper.getPointsFromPolygon(path);
        for (let point of points) {
            if (point[0] < left) {
                left = point[0];
            }
            if (point[0] > right) {
                right = point[0];
            }
            if (point[1] < top) {
                top = point[1];
            }
            if (point[1] > bottom) {
                bottom = point[1];
            }
        }
    });
    return {left,right,top,bottom,width:right-left,height:bottom-top}
}

