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

The full code of this demo is available [here](https://github.com/AndreyGermanov/smart_shape/blob/main/tests/prod/demo.html).

You can create many shapes and each of them can be much more complex. Then you can add them to the same or to different containers. See the demo [here](https://code.germanov.dev/smart_shape/tests/prod/index.html)

`SmartShape` object contains the shape itself and array of points, each of them is an object of `SmartPoint` class.
After `SmartShape` object created, you can add new points, change various options and read various properties of the shape and points using properties and methods of public API.

[Read API docs](https://github.com/AndreyGermanov/smart_shape/blob/main/docs/API.md).

# Examples

Examples below show how you can use SmartShape and it's derivatives in basic mode and also how they can be customized and integrated in real world applications.

## SmartShape


| Description                | Source                                                                                    | Live                                                                    |
| -------------------------- |-------------------------------------------------------------------------------------------|-------------------------------------------------------------------------|
| Basic example              | [link](https://github.com/AndreyGermanov/smart_shape/blob/main/tests/prod/demo.html)      | [link](https://code.germanov.dev/smart_shape/tests/prod/demo.html)      |
| Extended example: multiple shapes with different options| [link](https://github.com/AndreyGermanov/smart_shape/blob/main/tests/prod/index.html)     | [link](https://code.germanov.dev/smart_shape/tests/prod/index.html)     |
| Cut image using SmartShape | [link](https://github.com/AndreyGermanov/smart_shape/blob/main/tests/prod/cut_image.html) | [link](https://code.germanov.dev/smart_shape/tests/prod/cut_image.html) |

This is how **Cut image using SmartShape** looks:

![cut](https://code.germanov.dev/smart_shape/assets/cut.gif)

### SmartShape in production

This video shows how SmartShape used inside online text recognition tool to select an image region for perspective correction. Then, after region selected, application uses `getPointsArray()` method of SmartShape to get array of coordinates of points and send them to backend for further processing.

Watch on YouTube: https://youtu.be/4ee-HYCtgJ4 .

## Resize Box


| Description                           | Source                                                                                       | Live                                                                       |
| ------------------------------------- | -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| Basic example                         | [link](https://github.com/AndreyGermanov/smart_shape/blob/main/tests/prod/resize_box.html)   | [link](https://code.germanov.dev/smart_shape/tests/prod/resize_box.html)   |
| Resize and move image using ResizeBox | [link](https://github.com/AndreyGermanov/smart_shape/blob/main/tests/prod/resize_image.html) | [link](https://code.germanov.dev/smart_shape/tests/prod/resize_image.html) |

# Plans and Contribution

This is a new component on early stage of development. A lot of new features to come. Follow this repository to get updates as soon as I push them. Also, this project is open source, so you can clone SmartShape GitHub repository and modify source code to add any features, that still does not exist here.

As an early stage software, be careful by using it in real world projects. Test all features of shapes that you use properly, before pushing to production. If you modify the code by adding new features to these shapes, I will be more than happy if you share your code with my GitHub repository.

If you find bugs or have some great ideas to add here, feel free to post a message on `Disussions` tab of GitHub repository of SmartShape project. Perhaps I will include it to development plan.

The development plan is public and available here: https://github.com/users/AndreyGermanov/projects/1/views/1 .
