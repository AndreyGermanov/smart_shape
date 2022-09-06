# SmartShape

Interactive vector shapes for the Web.

Smart shape is a polygon (array of connected points) which can be attached to any HTML node and displayed on top of it. These figures are interactive and user can move them inside specified HTML container element or edit them by moving points to change a shape of figure.

[Install](#Install)<br/>
&nbsp;&nbsp;&nbsp;&nbsp;[As a module](#Install+Module)<br/>
&nbsp;&nbsp;&nbsp;&nbsp;[On a Web Page](#Install+Web)<br/>
[Use](#Use)<br/>
&nbsp;&nbsp;&nbsp;&nbsp;[SmartShape](#Use+SmartShape)<br/>
&nbsp;&nbsp;&nbsp;&nbsp;[ResizeBox](#Use+ResizeBox)<br/>
[Examples](#Examples)<br/>
&nbsp;&nbsp;&nbsp;&nbsp;[SmartShape](#Examples+SmartShape)<br/>
&nbsp;&nbsp;&nbsp;&nbsp;[ResizeBox](#Examples+ResizeBox)<br/>
[Plans and Contribution](#Plans)

<a name="Install"></a>

# Install

<a name="Install+Module"></a>

## As a module

You can install and use SmartShape from NPM as a module in any web framework:

```bash
npm install smart_shape
```

Then, you can import SmartShape class to your project:

```javascript
import SmartShape from "smart_shape";
```

<a name="Install+Web"></a>

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

<a name="Use+SmartShape"></a>

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

![demo1](https://code.germanov.dev/smart_shape/assets/demo1.png)

You can not only see this shape, but use mouse to drag and drop it to any place inside container. Also, the points of a shape marked by red circles and you can drag these circles to change a shape of figure. For example, like this:

![demo2](https://code.germanov.dev/smart_shape/assets/demo2.png)

The full code of this demo is available in [Examples](#Examples+SmartShape).

After create the shape with default options, you can change them, using `setOptions` method. For example, this will change background color to yellow:

```javascript
shape.setOptions({fill:"#ffff00"});
```

After changing the options, it's required to redraw the shape to see the results by using `shape.redraw()` method.

After create the shape, you can communicate with it, using various methods of [SmartShape API](https://github.com/AndreyGermanov/smart_shape/blob/main/docs/API.md#SmartShape). For example, you can add and delete points on shape by using `addPoint` and `deletePoint` methods. You can get any point by using `findPoint` and `findPointById` methods. The point of shape is [SmartPoint](https://github.com/AndreyGermanov/smart_shape/blob/main/docs/API.md#SmartPoint) object, which has its own options and methods, so you can customize point look and behavior by `setOptions` method of SmartPoint object. Also, any SmartShape and SmartPoint objects generates events for all actions which user is doing with them: cliclomg. moving, resizing, dragging, creating, destroying and so on. Your application can react on these events by attaching event listeners to these objects. Standard `addEventListener` method used for this:

```javascript
shape.addEventListener("move",(event) => {
    console.love(event.oldPos);
    console.log(event.newPos);
})
```

In this example, event listener will run every time when user moves the shape on the screen. `event` object contains old position of the shape and new position (left,right,top,bottom,width and height).

Using the options, the event listeners and the API methods of SmartShape objects, developer can create highly customized types of shapes for specific tasks and integrate them to their applications. Look [Examples][#Examples+SmartShape] section to see source code and live applications, that use the SmartShape.

Full API that available for customization is in [API docs](https://github.com/AndreyGermanov/smart_shape/blob/main/docs/API.md).

One of these customized shapes that already created is `ResizeBox`, which described below. This component is a special SmartShape with custom properties, with predefined set of points and with customized reactions on events. This shape can be used as a widget to resize something on your application screen, or select rectangular area on it.

<a name="Use+ResizeBox"></a>

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

![resizebox](https://code.germanov.dev/smart_shape/assets/resizebox.jpg)

This is a shape with predefined points, displayed on (0,0) coordinate with width=100 and height=100. It's connected to specified `div` HTML node and has HTML id="box1". Developer can drag it as any shape, and also drag it points. But each point programmed to move only in predefined directions, using event listeners.

Developer can make the app to react to movement and resize events of ResizeBox by attaching listeners to them using `addEventListener` methods:

```javascript
resizeBox.addEventListener("resize",(event) => {
    console.love(event.oldPos);
    console.log(event.newPos);
    // Do something
})

resizeBox.addEventListener("move",(event) => {
    console.love(event.oldPos);
    console.log(event.newPos);
    // Do something
})
```
In this example, these event handlers intercept `resize` and `move` events of ResizeBox and developers can do something in their applications in the moment of these events using information about previous and new positions of the ResizeBox.

ResizeBox class created on top of SmartShape, however it doesn't use class inheritance for that. Instead, it uses `object composition` and contains a link to this SmartShape in `resizeBox.shape` property. ResizeBox class decorates this shape by applying specific properties, methods and event listeners to it. At the same time, you can use all properties and methods of original shape by calling them from `resizeBox.shape` object directly.

See examples of using ResizeBox in [Examples](#Examples+ResizeBox) section.

Full API and properties of ResizeBox available in [API docs](https://github.com/AndreyGermanov/smart_shape/blob/main/docs/API.md+ResizeBox).

<a name="Examples"></a>

# Examples

Examples below show how you can use SmartShape and it's derivatives in basic mode and also how they can be customized and integrated in real world applications.

<a name="Examples+SmartShape"></a>

## SmartShape


| Description                                              | Source                                                                                    | Live                                                                   |
| -------------------------------------------------------- | ----------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| Basic example                                            | [link](https://github.com/AndreyGermanov/smart_shape/blob/main/tests/prod/demo.html)      | [link](https://code.germanov.dev/smart_shape/tests/prod/demo.html      |
| Extended example: multiple shapes with different options | [link](https://github.com/AndreyGermanov/smart_shape/blob/main/tests/prod/index.html)     | [link](https://code.germanov.dev/smart_shape/tests/prod/index.html)    |
| Cut image using SmartShape                               | [link](https://github.com/AndreyGermanov/smart_shape/blob/main/tests/prod/cut_image.html) | [link](https://code.germanov.dev/smart_shape/tests/prod/cut_image.html) |

**Cut image using SmartShape** demo:

![cut](https://code.germanov.dev/smart_shape/assets/cut.gif)

### SmartShape in production

This video shows how SmartShape used inside online text recognition tool to select an image region for perspective correction. Then, after region selected, application uses `getPointsArray()` method of SmartShape to get array of coordinates of points and send them to backend for further processing.

Watch on YouTube: https://youtu.be/4ee-HYCtgJ4 .

<a name="Examples+ResizeBox"></a>

## Resize Box


| Description                           | Source                                                                                       | Live                                                                       |
| ------------------------------------- | -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| Basic example                         | [link](https://github.com/AndreyGermanov/smart_shape/blob/main/tests/prod/resize_box.html)   | [link](https://code.germanov.dev/smart_shape/tests/prod/resize_box.html)   |
| Resize and move image using ResizeBox | [link](https://github.com/AndreyGermanov/smart_shape/blob/main/tests/prod/resize_image.html) | [link](https://code.germanov.dev/smart_shape/tests/prod/resize_image.html) |

<a name="Plans"></a>

# Plans and Contribution

This is a new component on early stage of development. A lot of new features to come. Follow this repository to get updates as soon as I push them. Also, this project is open source, so you can clone SmartShape GitHub repository and modify source code to add any features, that still does not exist here.

As an early stage software, be careful by using it in real world projects. Test all features of shapes that you use properly, before pushing to production. If you modify the code by adding new features to these shapes, I will be more than happy if you share your code with my GitHub repository.

If you find bugs or have some great ideas to add here, feel free to post a message on `Disussions` tab of GitHub repository of SmartShape project. Perhaps I will include it to development plan.

The development plan is public and available here: https://github.com/users/AndreyGermanov/projects/1/views/1 .
