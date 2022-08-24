# SmartShape

Interactive vector shapes for the Web.

Smart shape is a polygon (array of connected points) which can be attached to any HTML node and displayed on top of it. These figures are interactive and user can move them inside specified HTML container element or edit them by moving points to change a shape of figure.

# Install

## As a module

You can install and use SmartShape from NPM as a module in any web framework:

```bash
npm install smart_shape
```

Then, you can import SmartShape class to your project:

```javascript
import SmartShape from "smart_shape";
```

## On a Web page

If you do not use a framework with module support, then you can find compiled SmartShape javascript file `smart_shape.umd.cjs` in the root folder of this package and include it to an HTML page:

```html
<script src="<path-to-file>/smart_shape.umd.cjs"></script>
```

That's all. It's self-contained and does not have any other dependencies.

This will add `SmartShape` object to a global namespace automatically, and you can start using it to create interactive shapes.

# Use

When the script is loaded, you have the `SmartShape` class, that is ready to be used. However, smart shapes can be added only inside a container. Container is any html element, that should exist on a web page.

```html
<div id="surface" style="width:100%;height:400px"></div>
```

Then you can construct your first shape and add it to the existing container:

```javascript
const div = document.getElementById("surface");
const shape = new SmartShape();
shape.init(div,{fill:"#00ff00"},[ [0,100],[100,0],[200,100],[100,200] ]);
```

This code creates new `shape` object and initializes it by `init` method, which has the following signature:

```javascript
SmartShape.init(container_node,options,array_of_points);
```

* `container_node` - HTML DOM element to inject figure into
* `options` - Javascript object with options, that defines look and behavior of shape. For example, {fill:'#00ff00'} means that shape must be filled with light green color
* `array_of_points` - array of points of polygon where each point is a subarray of coordinates [x,y].

After running HTML page with code above, you should see this:

![demo1](https://code.germanov.dev/smart_shape/assets/demo1.png)

You can not only see this shape, but use mouse to drag and drop it to any place inside container. Also, the points of a shape marked by red circles and you can drag these circles to change a shape of figure. For example, like this:

![demo2](https://code.germanov.dev/smart_shape/assets/demo2.png)

The full code of this demo is available [here](https://github.com/AndreyGermanov/smart_shape/blob/main/tests/prod/demo.html).

You can create many shapes and each of them can be much more complex. Then you can add them to the same or to different containers. See the demo [here](https://code.germanov.dev/smart_shape/tests/prod/index.html)

# Options

There are different options can be provided in a second parameter of `init` function to change look and behavior of the shape. This is a list of options, which is available to use now.


| Option          | Description                                                                            | Default         |
|-----------------|----------------------------------------------------------------------------------------|-----------------|
| name            | Name of shape                                                                          | `Unnamed shape` |
| fill            | Background color of shape                                                              | `none`          |
| stroke          | Border color of shape                                                                  | `rgb(0,0,0)`    |
| strokeWidth     | Line thickness of shape border                                                         | 2               |
| offsetX         | Number of pixels added to X coordinate of each point to move whole shape to the right  | 0               |
| offsetY         | Number of pixels added to Y coordinate of each point to move whole shape to the bottom | 0               |
| maxPoints       | Maximum number of points that can be visually added to the shape                       | -1 (unlimited)  |
| canDragShape    | Is it allowed to drag shape                                                            | true            |
| canDragPoints   | Is it allowed to drag each point to change the shape                                   | true            |
| canAddPoints    | Is it allowed to add new points to the shape by double mouse click                     | false           |
| canDeletePoints | Is it allowed to delete points from the shape by right mouse click                     | false           |
| pointOptions    | An object, that defines default options for shape point (see below)                    | see below       |

## Point options

Here is a list of options for look and behavior of each point. You can use `pointOptions` of SmartShape `init` constructor to define default options for all points. Then, you can use API to define unique options for each point individually.

| Option    | Description                                                                                                                                                 | Default                                                                                                                                                         |
|-----------|-------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------|
| width     | Width of a point(pixels)                                                                                                                                    | 10                                                                                                                                                              |
| height    | Height of a point(pixels)                                                                                                                                   | 10                                                                                                                                                              |
| classes   | String of CSS classes to apply to the point (The same as a "class" HTML attribute)                                                                          |                                                                                                                                                                 |
| style     | CSS styles, that override classes. Must be provided as an object (The same as "style" HTML attribute, https://www.w3schools.com/jsref/prop_html_style.asp). | { borderWidth:"1px", borderStyle:"solid", borderColor:"black", borderRadius:"25px", position:'absolute', zIndex:1000, cursor:'pointer', backgroundColor: "red"} |
| canDrag   | Is it allowed to drag the point                                                                                                                             | true                                                                                                                                                            |
| canDelete | Is it allowed to delete the point using right mouse click                                                                                                   | true                                                                                                                                                            |

All these default options for all points can be overrided for any point by using `SmartPoint.setOptions` method.

# Plans and Contribution

This is a new component on early stage of development. A lot of new features to come. Follow this repository to get updates as soon as I push them. Also, this project is open source, so you can clone SmartShape GitHub repository and modify source code to add any features, that still does not exist here.

As an early stage software, be careful by using it in real world projects. Test all features of shapes that you use properly, before pushing to production. If you modify the code by adding new features to these shapes, I will be more than happy if you share your code with my GitHub repository.

If you find bugs or have some great ideas to add here, feel free to post a message on `Disussions` tab of GitHub repository of SmartShape project. Perhaps I will include it to development plan.

The development plan is public and available here: https://github.com/users/AndreyGermanov/projects/1/views/1 .
