# SmartShape

Interactive vector shapes for the Web.

Smart shape is a polygon (array of connected points) which can be attached to any HTML node and displayed on top of it. These figures are interactive and user can move them inside specified HTML container element or edit them by moving points to change a shape of figure.

<p align="center">
  <img src="https://code.germanov.dev/smart_shape/assets/smart_shape.jpg" alt="Logo"/>
</p>

[Install](#Install)<br/>
&nbsp;&nbsp;&nbsp;&nbsp;[As a module](#Install_Module)<br/>
&nbsp;&nbsp;&nbsp;&nbsp;[On a Web Page](#Install_Web)<br/>
[Use](#Use)<br/>
&nbsp;&nbsp;&nbsp;&nbsp;[SmartShape](#Use_SmartShape)<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[Import/Export](#Import_Export)<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[Collections](#Collections)<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[SmartShape Studio](#Studio)<br/>
&nbsp;&nbsp;&nbsp;&nbsp;[ResizeBox](#Use_ResizeBox)<br/>
[Examples](#Examples)<br/>
&nbsp;&nbsp;&nbsp;&nbsp;[SmartShape](#Examples_SmartShape)<br/>
&nbsp;&nbsp;&nbsp;&nbsp;[ResizeBox](#Examples_ResizeBox)<br/>
[Contribution](#Plans)

<a name="Install"></a>

# Install

<a name="Install_Module"></a>

## As a module

You can install and use SmartShape from NPM as a module in any web framework:

```bash
npm install smart_shape
```

Then, you can import SmartShape class to your project:

```javascript
import {SmartShape} from "smart_shape";
```

<a name="Install_Web"></a>

## On a Web page

If you do not use a framework with module support, then you can find compiled SmartShape javascript file `smart_shape.umd.cjs` in the root folder of this package and include it to an HTML page:

```html
<script src="<path-to-file>/smart_shape.umd.cjs"></script>
```

That's all. It's self-contained and does not have any other dependencies.

This will add `SmartShape` object to a global namespace automatically, and you can start using it to create interactive shapes.

<a name="Use"></a>

# Use

The main class is obviously `SmartShape`, but there are other helper classes exist as well, that either used by SmartShape, or can be instantiated independently for different tasks. Their specifications you can find in [API docs](https://github.com/AndreyGermanov/smart_shape/blob/main/docs/API.md).

<a name="Use_SmartShape"></a>

## SmartShape

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
* `options` - Javascript object with options, that defines look and behavior of shape. For example, {fill:'#00ff00'} means that shape must be filled with light green color. All shape and points options described in [API docs](https://github.com/AndreyGermanov/smart_shape/blob/main/docs/API.md#SmartShape+options).
* `array_of_points` - array of points of polygon where each point is a subarray of coordinates [x,y].

After running HTML page with code above, you should see this:

![demo1](https://code.germanov.dev/smart_shape/assets/demo_1.png)

You can not only see this shape, but use mouse to drag and drop it to any place inside container. Also, the points of a shape marked by red circles and you can drag these circles to change a shape of figure. For example, like this:

![demo2](https://code.germanov.dev/smart_shape/assets/demo2.png)

The full code of this demo is available in [Examples](#Examples_SmartShape).

After create the shape with default options, you can change them, using `setOptions` method. For example, this will change background color to yellow:

```javascript
shape.setOptions({fill:"#ffff00"});
```

After changing the options, it's required to redraw the shape to see the results by using `shape.redraw()` method.

After create the shape, you can communicate with it, using various methods of [SmartShape API](https://github.com/AndreyGermanov/smart_shape/blob/main/docs/API.md#SmartShape). For example, you can add and delete points on shape by using `addPoint` and `deletePoint` methods. You can get any point by using `findPoint` and `findPointById` methods. The point of shape is [SmartPoint](https://github.com/AndreyGermanov/smart_shape/blob/main/docs/API.md#SmartPoint) object, which has its own options and methods, so you can customize point look and behavior by `setOptions` method of SmartPoint object. Also, any SmartShape and SmartPoint objects generates events for all actions which user is doing with them: clicking. moving, resizing, dragging, creating, destroying and so on. Your application can react on these events by attaching event listeners to these objects. Standard `addEventListener` method used for this:

```javascript
shape.addEventListener("move",(event) => {
    console.log(event.oldPos);
    console.log(event.newPos);
})
```

In this example, event listener will run every time when user moves the shape on the screen. `event` object contains old position of the shape and new position (left,right,top,bottom,width and height).

Using the options, the event listeners and the API methods of SmartShape objects, developer can create highly customized types of shapes for specific tasks and integrate them to their applications. Look [Examples](#Examples_SmartShape) section to see source code and live applications, that use the SmartShape.

Full API that available for customization is in [API docs](https://github.com/AndreyGermanov/smart_shape/blob/main/docs/API.md).

One of these customized shapes that already created is `ResizeBox`, which described below. This component is a special SmartShape with custom properties, with predefined set of points and with customized reactions on events. This shape can be used as a widget to resize something on your application screen, or select rectangular area on it.

<a name="Import_Export"></a>

### Import/Export

After create and configure the shape using points and options, provided in `init()` method and using API, you can export it as a JSON to use this shape in other projects. The `.toJSON()` method added to SmartShape API since v. 1.0.7.

```javascript
const shape = new SmartShape();
shape.init(div,{fill:"#00ff00"},[ [0,100],[100,0],[200,100],[100,200] ]);

const jsonString = shape.toJSON();
```

After shape saved to `jsonString`, you can save it to a file and then, reuse this shape later in other projects. For example, let's assume that `jsonString` then saved to `shape.json` file. To load this data to other shape in other project, you can do the following:

```javascript
import jsonData from "./shape.json";

const shape = new SmartShape();
shape.fromJSON(div,jsonData);
```

As you see here, first we need to load jsonData from somewhere (either from file, or you can just copy/paste JSON data from file as a value of jsonData variable). Then, we construct the shape object and then, instead of `init`, we call `fromJSON` method. The first argument is an HTML container to put the shape in and second argument is `jsonData`, which contains points and options, previously saved by `toJSON` method.

<a name="Collections"></a>

### Collections

SmartShape library contains internal `SmartShapeManager` object, that used under the hood to control all created and destroyed shapes. Every time when you create a shape, it automatically appears in the `shapes` field of this object. You can import this object and use it API to access all shapes, created in the project.

```javascript

import {SmartShapeManager} from "smart_shape";

// Receiving a list of all shapes
const shapes = SmartShapeManager.getShapes();

// Obtaining a shape by ID.
const shape = SmartShapeManager.findShapeById("shape1")
```

All API description of this object you can find in [API Docs](#SmartShapeManager).

One feature that is important to explain here is ability to export collections of shapes to a JSON and import them later.

SmartShapeManager has `toJSON()` method to export all shapes to a JSON string and `fromJSON()` method to import all shapes from JSON.

**Export**

```javascript
import {SmartShapeManager} from "smart_shape";

// Create and configure shapes ...

// Save all shapes as a string serialized JSON array
const jsonString = SmartShapeManager.toJSON()
```

**Import**

Then, you can save this `jsonString` to some file and load to other projects. For example, let's assume that this `jsonString` saved to `collection.json` file. To add this collection of shapes to other project, you can do this:

```javascript
import {SmartShapeManager} from "smart_shape";

// Import shapes collection data
import jsonData from "./collection.json";

// Add all shapes from collection to specified `div` HTML container
SmartShapeManager.fromJSON(div,jsonData);

// Get all imported shapes as an array
const shapes = SmartShapeManager.getShapes()

// or get specified shape by ID
const shape = SmartShapeManager.getShapeById("shape1")
```

<a name="Studio"/>

### SmartShape Studio

To make your work with collections of shapes more comfortable, I have created the **SmarShape Studio** tool, which is available on https://shapes.germanov.dev .

<p align="center">

![Studio](https://shapes.germanov.dev/preview.png)

</p>

Using this tool you can create collections of shapes and save them as a JSON files. Then you can load these files to your project the same way, as you did use `SmartShapeManager`, explained above.

When design shapes using the `Studio`, do not forget to set unique `ID` to each of them on an `Options` panel to be able to get each of these shapes by ID later after load them to your project. So, if you created a collection of shapes in the `Studio` and saved them to `collections.json` file, you can load and use them in your project this way:

```javascript
import {SmartShapeManager} from "smart_shape";

// Import shapes collection data
import jsonData from "./collection.json";

// Add all shapes from collection to specified `div` HTML container
SmartShapeManager.fromJSON(div,jsonData);

// Get all imported shapes as an array
const shapes = SmartShapeManager.getShapes()

// or get specified shape by ID
const shape = SmartShapeManager.getShapeById("shape1")
```

<a name="Use_ResizeBox"></a>

## ResizeBox

ResizeBox is a special component, created on top of the `SmartShape`, by customizing its properties and attaching event listeners which extend behavior of standard SmartShape for a special case - give an ability to resize a squared area. On the one hand it used by SmartShape internally to resize shapes, if `canScale` options enabled, on the other hand this component can be imported and used independently for big range of UI tasks to give the user an interface to resize or move something on the screen.

```html
<div id="surface" style="width:100%;height:400px"></div>
```

```javascript
import {ResizeBox} from 'smart_shape';
const div = document.getElementById("surface");
const resizeBox = new ResizeBox();
resizeBox.init(div,0,0,100,100,{id:"box1"});
```

This code will display the shape like this:

![resizebox](https://code.germanov.dev/smart_shape/assets/rbox.jpg)

This is a shape with predefined points, displayed on (0,0) coordinate with width=100 and height=100. It's connected to specified `div` HTML node and has HTML id="box1". Developer can drag it as any shape, and also drag it points. But each point programmed to move only in predefined directions, using event listeners.

Developer can make the app to react to movement and resize events of ResizeBox by attaching listeners to them using `addEventListener` methods:

```javascript
resizeBox.addEventListener("resize",(event) => {
    console.log(event.oldPos);
    console.log(event.newPos);
    // Do something
})

resizeBox.addEventListener("move",(event) => {
    console.log(event.oldPos);
    console.log(event.newPos);
    // Do something
})
```
In this example, these event handlers intercept `resize` and `move` events of ResizeBox and developers can do something in their applications in the moment of these events using information about previous and new positions of the ResizeBox.

ResizeBox class created on top of SmartShape, however it doesn't use class inheritance for that. Instead, it uses `object composition` and contains a link to this SmartShape in `resizeBox.shape` property. ResizeBox class decorates this shape by applying specific properties, methods and event listeners to it. At the same time, you can use all properties and methods of original shape by calling them from `resizeBox.shape` object directly.

See examples of using ResizeBox in [Examples](#Examples_ResizeBox) section.

Full API and properties of ResizeBox available in [API docs](https://github.com/AndreyGermanov/smart_shape/blob/main/docs/API.md#ResizeBox).

<a name="Examples"></a>

# Examples

Examples below show how you can use SmartShape and it's derivatives in basic mode and also how they can be customized and integrated in real world applications.

<a name="Examples_SmartShape"></a>

## SmartShape


| Description                                              | Source                                                                                    | Live                                                                    |
|----------------------------------------------------------|-------------------------------------------------------------------------------------------|-------------------------------------------------------------------------|
| Basic example                                            | [link](https://github.com/AndreyGermanov/smart_shape/blob/main/tests/prod/demo.html)      | [link](https://code.germanov.dev/smart_shape/tests/prod/demo.html)      |
| Extended example: multiple shapes with different options | [link](https://github.com/AndreyGermanov/smart_shape/blob/main/tests/prod/index.html)     | [link](https://code.germanov.dev/smart_shape/tests/prod/index.html)     |
| Cut image using SmartShape                               | [link](https://github.com/AndreyGermanov/smart_shape/blob/main/tests/prod/cut_image.html) | [link](https://code.germanov.dev/smart_shape/tests/prod/cut_image.html) |
| Interactive clock                                        | [link](https://github.com/AndreyGermanov/smart_shape/blob/main/tests/prod/clock.html)     | [link](https://code.germanov.dev/smart_shape/tests/prod/clock.html)     |
| Country shapes collection                             | [link](https://github.com/AndreyGermanov/smart_shape/blob/main/tests/prod/countries.html) | [link](https://code.germanov.dev/smart_shape/tests/prod/countries.html) |

**Cut image using SmartShape** demo:

![cut](https://code.germanov.dev/smart_shape/assets/cut.gif)

### SmartShape in production

The next video shows how SmartShape used inside online text recognition tool to select an image region for perspective correction. Then, after region selected, application uses `getPointsArray()` method of SmartShape to get an array of coordinates and send them to the backend for further processing.

Watch on YouTube: https://youtu.be/4ee-HYCtgJ4 .

<a name="Examples_ResizeBox"></a>

## Resize Box


| Description                           | Source                                                                                       | Live                                                                       |
| ------------------------------------- | -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| Basic example                         | [link](https://github.com/AndreyGermanov/smart_shape/blob/main/tests/prod/resize_box.html)   | [link](https://code.germanov.dev/smart_shape/tests/prod/resize_box.html)   |
| Resize and move image using ResizeBox | [link](https://github.com/AndreyGermanov/smart_shape/blob/main/tests/prod/resize_image.html) | [link](https://code.germanov.dev/smart_shape/tests/prod/resize_image.html) |

<a name="Plans"></a>

# Contribution

This is a new component on early stage of development. A lot of new features to come. Follow this repository to get updates as soon as I push them. Also, this project is open source, so you can clone SmartShape GitHub repository and modify source code to add any features, that still does not exist here.

As an early stage software, be careful by using it in real world projects. Test all features of shapes that you use properly, before pushing to production. If you modify the code by adding new features to these shapes, I will be more than happy if you share your code with my GitHub repository.

If you find bugs or have some great ideas to add here, feel free to post a message on `Disussions` tab of GitHub repository of SmartShape project. Perhaps I will include it to development plan.

The development plan is public and available here: https://github.com/users/AndreyGermanov/projects/1/views/1 .
