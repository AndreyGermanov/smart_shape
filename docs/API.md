## Classes

<dl>
<dt><a href="#SmartPoint">SmartPoint</a></dt>
<dd></dd>
<dt><a href="#SmartShape">SmartShape</a></dt>
<dd></dd>
</dl>

<a name="SmartPoint"></a>

## SmartPoint
**Kind**: global class  

* [SmartPoint](#SmartPoint)
    * [new SmartPoint(shape)](#new_SmartPoint_new)
    * [.shape](#SmartPoint+shape) : [<code>SmartShape</code>](#SmartShape)
    * [.options](#SmartPoint+options) : <code>Object</code>
    * [.x](#SmartPoint+x) : <code>number</code>
    * [.y](#SmartPoint+y) : <code>number</code>
    * [.element](#SmartPoint+element) : <code>HTMLElement</code>
    * [.init(x, y, options)](#SmartPoint+init) ⇒ <code>object</code>
    * [.setOptions(options)](#SmartPoint+setOptions)
    * [.redraw()](#SmartPoint+redraw)
    * [.destroy()](#SmartPoint+destroy)

<a name="new_SmartPoint_new"></a>

### new SmartPoint(shape)
Class that represents a single point of SmartShape. Usually points constructed not directly,
but using `addPoint`, `addPoints` methods of [SmartShape](#SmartShape) class or interactively when
user double-clicks on shape's container.

**Returns**: <code>object</code> - SmartPoint object that should be initialized by `init` method.  

| Param | Description |
| --- | --- |
| shape | [SmartShape](#SmartShape) object to which this point belongs |

<a name="SmartPoint+shape"></a>

### smartPoint.shape : [<code>SmartShape</code>](#SmartShape)
[SmartShape](#SmartShape) object, to which this point belongs

**Kind**: instance property of [<code>SmartPoint</code>](#SmartPoint)  
<a name="SmartPoint+options"></a>

### smartPoint.options : <code>Object</code>
Point HTML element options. Defines look and behavior of point. Has the following parameters.

**Kind**: instance property of [<code>SmartPoint</code>](#SmartPoint)  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | Id of point HTML element. Default empty. |
| width | <code>number</code> | Width of point in pixels. Default: `10`. |
| height | <code>number</code> | Height of point in pixels. Default `10`. |
| classes | <code>string</code> | CSS class or classes of point, delimited by comma. Default empty. |
| style | <code>object</code> | CSS styles, that override classes. Must be provided as an object. Default see in code. (The same as ["style" HTML attribute](https://www.w3schools.com/jsref/prop_html_style.asp)) |
| canDrag | <code>boolean</code> | Is it allowed to drag this point by mouse to change it positions. Default `true` |
| canDelete | <code>boolean</code> | Is it allowed to delete this point by right mouse click. Default `true`. (If [options.canDeletePoints](#SmartShape+options) option is set to `false`, then all points can not be removed regardless of this setting) |

<a name="SmartPoint+x"></a>

### smartPoint.x : <code>number</code>
X coordinate of point, relative to a corner of shape's container

**Kind**: instance property of [<code>SmartPoint</code>](#SmartPoint)  
<a name="SmartPoint+y"></a>

### smartPoint.y : <code>number</code>
Y coordinate of point, relative to a corner of shape's container

**Kind**: instance property of [<code>SmartPoint</code>](#SmartPoint)  
<a name="SmartPoint+element"></a>

### smartPoint.element : <code>HTMLElement</code>
HTML DOM node of element, which used to display the point. This is styled DIV element.

**Kind**: instance property of [<code>SmartPoint</code>](#SmartPoint)  
<a name="SmartPoint+init"></a>

### smartPoint.init(x, y, options) ⇒ <code>object</code>
Initializes new point and displays it on the screen.

**Kind**: instance method of [<code>SmartPoint</code>](#SmartPoint)  
**Returns**: <code>object</code> - constructed SmartPoint object  

| Param | Type | Description |
| --- | --- | --- |
| x | <code>number</code> | X coordinate of point relative to shape's container left |
| y | <code>number</code> | Y coordinate of point relative to shape's container top |
| options | <code>object</code> | Point options, described [above](#SmartPoint+options). If not specified, then [SmartShape.options.pointOptions](#SmartShape+options) used or global default options for point. |

<a name="SmartPoint+setOptions"></a>

### smartPoint.setOptions(options)
Method used to set specified options to point and redraw it with new options.

**Kind**: instance method of [<code>SmartPoint</code>](#SmartPoint)  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> | Point options object, described [above](#SmartPoint+options). |

<a name="SmartPoint+redraw"></a>

### smartPoint.redraw()
Method used to redraw the point. Usually used after change point position on the screen.

**Kind**: instance method of [<code>SmartPoint</code>](#SmartPoint)  
<a name="SmartPoint+destroy"></a>

### smartPoint.destroy()
Method used to destroy the point. Removes event listeners from point element and
raises the `point_destroyed` event. This event then intercepted by owner shape. Then owner shape
removes this point from shape's points array.

**Kind**: instance method of [<code>SmartPoint</code>](#SmartPoint)  
<a name="SmartShape"></a>

## SmartShape
**Kind**: global class  

* [SmartShape](#SmartShape)
    * [new SmartShape()](#new_SmartShape_new)
    * [.root](#SmartShape+root) : <code>object</code>
    * [.points](#SmartShape+points) : <code>array</code>
    * [.svg](#SmartShape+svg) : <code>object</code>
    * [.options](#SmartShape+options) : <code>Object</code>
    * [.left](#SmartShape+left) : <code>number</code>
    * [.top](#SmartShape+top) : <code>number</code>
    * [.right](#SmartShape+right) : <code>number</code>
    * [.bottom](#SmartShape+bottom) : <code>number</code>
    * [.width](#SmartShape+width) : <code>number</code>
    * [.height](#SmartShape+height) : <code>number</code>
    * [.init(root, options, points)](#SmartShape+init) ⇒ <code>object</code>
    * [.setOptions(options)](#SmartShape+setOptions)
    * [.addPoint(x, y, pointOptions)](#SmartShape+addPoint) ⇒ <code>object</code>
    * [.addPoints(points, pointOptions)](#SmartShape+addPoints)
    * [.deletePoint(x, y)](#SmartShape+deletePoint)
    * [.findPoint(x, y)](#SmartShape+findPoint) ⇒ <code>null</code> \| <code>object</code>
    * [.redraw()](#SmartShape+redraw)
    * [.destroy()](#SmartShape+destroy)
    * [.getPointsArray()](#SmartShape+getPointsArray) ⇒ <code>array</code>

<a name="new_SmartShape_new"></a>

### new SmartShape()
SmartShape class. Used to construct shapes.

**Returns**: SmartShape object that should be initialised using `init` method.  
<a name="SmartShape+root"></a>

### smartShape.root : <code>object</code>
The HTML container element to which the shape will be injected. This can be any block element,
that can have children (div,span etc.)

**Kind**: instance property of [<code>SmartShape</code>](#SmartShape)  
<a name="SmartShape+points"></a>

### smartShape.points : <code>array</code>
2D array of points of shape polygon. Each item of array is [SmartPoint](#SmartPoint) object.

**Kind**: instance property of [<code>SmartShape</code>](#SmartShape)  
<a name="SmartShape+svg"></a>

### smartShape.svg : <code>object</code>
[SVG element](https://developer.mozilla.org/en-US/docs/Web/SVG/Element), which used as a backend for shape.
SmartShape constructs SVG element based on provided point coordinates and options.

**Kind**: instance property of [<code>SmartShape</code>](#SmartShape)  
<a name="SmartShape+options"></a>

### smartShape.options : <code>Object</code>
Options of shape as an object. Can have the following parameters.

**Kind**: instance property of [<code>SmartShape</code>](#SmartShape)  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | Unique ID of shape's SVG HTML element. By default empty. |
| name | <code>string</code> | Name of shape. By default, `Unnamed shape` |
| maxPoints | <code>number</code> | Number of points, which possible to add to the shape interactively. By default `-1`, which means Unlimited |
| stroke | <code>string</code> | Color of shape lines. Accepts the same values as [SVG stroke](https://www.w3schools.com/graphics/svg_stroking.asp) property accepts. Default -  `rgb(0,0,0)` |
| strokeWidth | <code>string</code> | Thickness of shape lines. Accepts the same values as [SVG stroke-width](https://www.w3schools.com/graphics/svg_stroking.asp) property. Default - `2` |
| strokeLinecap | <code>string</code> | Type of endings of shape lines. Accepts the same values as [SVG stroke-linecap](https://www.w3schools.com/graphics/svg_stroking.asp) property. |
| strokeDasharray | <code>string</code> | Used to create dashed shape lines. Accepts the same values as [SVG stroke-dasharray](https://www.w3schools.com/graphics/svg_stroking.asp) property. |
| fill | <code>string</code> | Fill color of shape polygon. Accepts the same values as [SVG fill](https://www.geeksforgeeks.org/svg-fill-attribute/) property. Default: `none` . |
| fillOpacity | <code>string</code> | Fill opacity level of shape polygon. Accepts the same values as [SVG fill-opacity](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/fill-opacity) property.Default `1`. |
| classes | <code>string</code> | CSS class names, that will be applied to underlying polygon SVG element. |
| style | <code>object</code> | CSS styles, that will be applied to underlying polygon SVG element. Using CSS styles and classes is an alternative way to specify options of SVG elements: https://jenkov.com/tutorials/svg/svg-and-css.html, https://css-tricks.com/svg-properties-and-css/ |
| offsetX | <code>number</code> | Number of pixels to add to X coordinate of each point to move entire shape to the right. Helps to move entire figure without need to change coordinates of each point. Default: `0`. |
| offsetY | <code>number</code> | Number of pixels to add to Y coordinate of each point to move entire shape to the bottom. Helps to move entire figure without need to change coordinates of each point. Default: `0` |
| canDragShape | <code>boolean</code> | Is it allowed to drag shape. Default `true`. |
| canDragPoints | <code>boolean</code> | Is it allowed to drag points of shape. Default `true`. |
| canAddPoints | <code>boolean</code> | Is it allowed to add points to the shape interactively, by mouse double-click on the screen. Default `false`. |
| canDeletePoints | <code>boolean</code> | Is it allowed to delete points from the shape interactively, by right mouse click on points. Default `false`. |
| pointOptions | <code>object</code> | Default options for created points. See  [options](#SmartPoint+options) property of `SmartPoint` object. |

<a name="SmartShape+left"></a>

### smartShape.left : <code>number</code>
Left position of the shape relative to container top left.
(Read-only, calculated automatically based on points coordinates)

**Kind**: instance property of [<code>SmartShape</code>](#SmartShape)  
<a name="SmartShape+top"></a>

### smartShape.top : <code>number</code>
Top position of the shape relative to container top left.
(Read-only, calculated automatically based on points coordinates)

**Kind**: instance property of [<code>SmartShape</code>](#SmartShape)  
<a name="SmartShape+right"></a>

### smartShape.right : <code>number</code>
Right position of the shape relative to container top left.
(Read-only, calculated automatically based on points coordinates)

**Kind**: instance property of [<code>SmartShape</code>](#SmartShape)  
<a name="SmartShape+bottom"></a>

### smartShape.bottom : <code>number</code>
Bottom position of the shape relative to container top left.
(Read-only, calculated automatically based on points coordinates)

**Kind**: instance property of [<code>SmartShape</code>](#SmartShape)  
<a name="SmartShape+width"></a>

### smartShape.width : <code>number</code>
Width of shape
(Read-only, calculated automatically based on points coordinates)

**Kind**: instance property of [<code>SmartShape</code>](#SmartShape)  
<a name="SmartShape+height"></a>

### smartShape.height : <code>number</code>
Height of shape
(Read-only, calculated automatically based on points coordinates)

**Kind**: instance property of [<code>SmartShape</code>](#SmartShape)  
<a name="SmartShape+init"></a>

### smartShape.init(root, options, points) ⇒ <code>object</code>
Method used to construct SmartShape object with specified from specified `points` and
with specified `options`.
Then it binds this object to specified `root` HTML node and displays it

**Kind**: instance method of [<code>SmartShape</code>](#SmartShape)  
**Returns**: <code>object</code> - constructed SmartShape object  

| Param | Type | Description |
| --- | --- | --- |
| root | <code>HTMLElement</code> | HTML DOM node af a container element |
| options | <code>object</code> | Options object to construct this shape ([see above](#SmartShape+options)) |
| points | <code>array</code> | 2D Array of points for shape polygon. Each element is [x,y] coordinate array |

<a name="SmartShape+setOptions"></a>

### smartShape.setOptions(options)
Set specified options to the shape

**Kind**: instance method of [<code>SmartShape</code>](#SmartShape)  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> | Options object, [described above](#SmartShape+options) |

<a name="SmartShape+addPoint"></a>

### smartShape.addPoint(x, y, pointOptions) ⇒ <code>object</code>
Add point to shape.

**Kind**: instance method of [<code>SmartShape</code>](#SmartShape)  
**Returns**: <code>object</code> - [SmartPoint](#SmartPoint) object of added point  

| Param | Type | Description |
| --- | --- | --- |
| x | <code>number</code> | X coordinate relative to container left corner |
| y | <code>number</code> | Y coordinate relative to container top corner |
| pointOptions | <code>object</code> | Array of point options. Described in [SmartPoint.options](#SmartPoint+options). Can be empty, in this case default `SmartShape.options.pointOptions` will be used, or default options of SmartPoint class itself. |

<a name="SmartShape+addPoints"></a>

### smartShape.addPoints(points, pointOptions)
Adds specified points to shape.

**Kind**: instance method of [<code>SmartShape</code>](#SmartShape)  

| Param | Type | Description |
| --- | --- | --- |
| points | <code>array</code> | 2D array of points to add. Each point is array of [x,y] coordinates |
| pointOptions | <code>object</code> | Array of points options. Described in [SmartPoint.options](#SmartPoint+options). Can be empty, in this case default `SmartShape.options.pointOptions` will be used, or default options of SmartPoint class itself. |

<a name="SmartShape+deletePoint"></a>

### smartShape.deletePoint(x, y)
Method used to delete point with specified coordinates.
If point with specified coordinates not found than just
do nothing

**Kind**: instance method of [<code>SmartShape</code>](#SmartShape)  

| Param | Type | Description |
| --- | --- | --- |
| x | <code>number</code> | X coordinate of point |
| y | <code>number</code> | Y coordinate of point |

<a name="SmartShape+findPoint"></a>

### smartShape.findPoint(x, y) ⇒ <code>null</code> \| <code>object</code>
Method returns SmartPoint object of point with specified coordinates or null, if point not found

**Kind**: instance method of [<code>SmartShape</code>](#SmartShape)  
**Returns**: <code>null</code> \| <code>object</code> - [SmartPoint](#SmartPoint) object instance of point,
or null if point does not exist  

| Param | Type | Description |
| --- | --- | --- |
| x | <code>number</code> | X coordinate of point |
| y | <code>number</code> | Y coordinate of point |

<a name="SmartShape+redraw"></a>

### smartShape.redraw()
Method used to redraw shape polygon. Used automatically when add/remove points or change their properties.

**Kind**: instance method of [<code>SmartShape</code>](#SmartShape)  
<a name="SmartShape+destroy"></a>

### smartShape.destroy()
Destroys the shape. Destroys all points, removes event listeners and removes the shape from screen.
But variable continue existing. To completely remove the shape,
set variable to 'null' after calling this method.

**Kind**: instance method of [<code>SmartShape</code>](#SmartShape)  
<a name="SmartShape+getPointsArray"></a>

### smartShape.getPointsArray() ⇒ <code>array</code>
Returns 2D array of points coordinates in format [ [x,y], [x,y], [x,y] ... ].

**Kind**: instance method of [<code>SmartShape</code>](#SmartShape)  
**Returns**: <code>array</code> - 2D array of points in format [ [x,y], [x,y], [x,y] ... ]  
