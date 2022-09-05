## Classes

<dl>
<dt><a href="#EventsManager">EventsManager</a></dt>
<dd></dd>
<dt><a href="#ResizeBox">ResizeBox</a></dt>
<dd></dd>
<dt><a href="#ResizeBoxEventListener">ResizeBoxEventListener</a></dt>
<dd></dd>
<dt><a href="#SmartPoint">SmartPoint</a></dt>
<dd></dd>
<dt><a href="#SmartShape">SmartShape</a></dt>
<dd></dd>
<dt><a href="#SmartShapeDrawHelper">SmartShapeDrawHelper</a></dt>
<dd></dd>
<dt><a href="#SmartShapeEventListener">SmartShapeEventListener</a></dt>
<dd></dd>
</dl>

<a name="EventsManager"></a>

## EventsManager
**Kind**: global class  

* [EventsManager](#EventsManager)
    * [new EventsManager()](#new_EventsManager_new)
    * [.subscriptions](#EventsManager+subscriptions) : <code>object</code>
    * [.subscribe(eventName, handler)](#EventsManager+subscribe) ⇒ <code>function</code>
    * [.emit(eventName, target, params)](#EventsManager+emit) ⇒ <code>boolean</code>
    * [.unsubscribe(eventName, handler)](#EventsManager+unsubscribe) ⇒ <code>boolean</code>
    * [.clear()](#EventsManager+clear)

<a name="new_EventsManager_new"></a>

### new EventsManager()
Used as a singleton object to emit events and subscribe to these events.
One object can subscribe to events of specified type, other object can emit events of this type.
Each time when object emits event, all subscribed event handlers triggered.

<a name="EventsManager+subscriptions"></a>

### eventsManager.subscriptions : <code>object</code>
Hashmap of all registered event subscriptions.
Keys are event names as strings. Values are arrays of functions.
Several handlers can subscribe to each event by providing function that should be triggered.
this.subscriptions[event_name] = [handler_func,handler_func ...]

**Kind**: instance property of [<code>EventsManager</code>](#EventsManager)  
<a name="EventsManager+subscribe"></a>

### eventsManager.subscribe(eventName, handler) ⇒ <code>function</code>
Add subscription to event of specified type

**Kind**: instance method of [<code>EventsManager</code>](#EventsManager)  
**Returns**: <code>function</code> - Pointer to handling function, that will be added  

| Param | Type | Description |
| --- | --- | --- |
| eventName | <code>string</code> | Event name to subscribe to |
| handler | <code>function</code> | Handling function, which will be called each time when event of this type emitted. Each time, when handling function triggered, it receives a single argument - `event` {object} which contains the following fields: `type` - type of event (`eventType`), `target` - pointer to object, which emitted this event, and also any custom params, that emitter sent with this event by using `emit` method. |

<a name="EventsManager+emit"></a>

### eventsManager.emit(eventName, target, params) ⇒ <code>boolean</code>
Emits event of specified name. Based on specified arguments, it constructs `event` object, that contains
the following fields: `type` - eventName, `target` - object that emitted this event and any other fields
that received from `params` argument. Then, all subscribers will receive this `event` object to their handling
functions.

**Kind**: instance method of [<code>EventsManager</code>](#EventsManager)  
**Returns**: <code>boolean</code> - True if this event triggered at least of one handler, or false if it does not.  

| Param | Type | Description |
| --- | --- | --- |
| eventName | <code>string</code> | Name of event to emit. |
| target | <code>object</code> | Which object emitted this event. |
| params | <code>object</code> | Event specific params. Can be any number of params. |

<a name="EventsManager+unsubscribe"></a>

### eventsManager.unsubscribe(eventName, handler) ⇒ <code>boolean</code>
Removes specified handler from event with specified name.

**Kind**: instance method of [<code>EventsManager</code>](#EventsManager)  
**Returns**: <code>boolean</code> - True if really removed the handler or false if you could not remove because it does not exist  

| Param | Type | Description |
| --- | --- | --- |
| eventName | <code>string</code> | Name of event |
| handler | <code>function</code> | Pointer to a function to remove. (This pointer returned from `subscribe` method and can be used here to unsubscribe |

<a name="EventsManager+clear"></a>

### eventsManager.clear()
Method removes all subscriptions to events.

**Kind**: instance method of [<code>EventsManager</code>](#EventsManager)  
<a name="ResizeBox"></a>

## ResizeBox
**Kind**: global class  

* [ResizeBox](#ResizeBox)
    * [new ResizeBox()](#new_ResizeBox_new)
    * [.left](#ResizeBox+left) : <code>number</code>
    * [.top](#ResizeBox+top) : <code>number</code>
    * [.right](#ResizeBox+right) : <code>number</code>
    * [.bottom](#ResizeBox+bottom) : <code>number</code>
    * [.width](#ResizeBox+width) : <code>number</code>
    * [.height](#ResizeBox+height) : <code>number</code>
    * [.shape](#ResizeBox+shape) : [<code>SmartShape</code>](#SmartShape)
    * [.guid](#ResizeBox+guid) : <code>string</code>
    * [.options](#ResizeBox+options) : <code>object</code>
    * [.eventListener](#ResizeBox+eventListener) : [<code>ResizeBoxEventListener</code>](#ResizeBoxEventListener)
    * [.left_top](#ResizeBox+left_top) : [<code>SmartPoint</code>](#SmartPoint)
    * [.left_center](#ResizeBox+left_center) : [<code>SmartPoint</code>](#SmartPoint)
    * [.left_bottom](#ResizeBox+left_bottom) : [<code>SmartPoint</code>](#SmartPoint)
    * [.center_top](#ResizeBox+center_top) : [<code>SmartPoint</code>](#SmartPoint)
    * [.center_bottom](#ResizeBox+center_bottom) : [<code>SmartPoint</code>](#SmartPoint)
    * [.right_top](#ResizeBox+right_top) : [<code>SmartPoint</code>](#SmartPoint)
    * [.right_center](#ResizeBox+right_center) : [<code>SmartPoint</code>](#SmartPoint)
    * [.right_bottom](#ResizeBox+right_bottom) : [<code>SmartPoint</code>](#SmartPoint)
    * [.init(root, left, top, width, height, options)](#ResizeBox+init) ⇒ [<code>ResizeBox</code>](#ResizeBox)
    * [.setOptions(options)](#ResizeBox+setOptions)
    * [.getPosition()](#ResizeBox+getPosition) ⇒ <code>object</code>
    * [.redraw()](#ResizeBox+redraw)
    * [.destroy()](#ResizeBox+destroy)
    * [.addEventListener(eventName, handler)](#ResizeBox+addEventListener) ⇒ <code>function</code>
    * [.removeEventListener(eventName, listener)](#ResizeBox+removeEventListener)

<a name="new_ResizeBox_new"></a>

### new ResizeBox()
Class represents a special type of shape, that shows the rectangle with markers on
it corners, used to resize it. [See demo](https://code.germanov.dev/smart_shape/tests/prod/resize_box.html).
Mostly used to resize [SmartShape](#SmartShape) object, but also can be used as an independent shape
for tasks like resizing objects on a web page or select rectangular regions.

<a name="ResizeBox+left"></a>

### resizeBox.left : <code>number</code>
Left corner of resize box

**Kind**: instance property of [<code>ResizeBox</code>](#ResizeBox)  
<a name="ResizeBox+top"></a>

### resizeBox.top : <code>number</code>
Top corner of resize box

**Kind**: instance property of [<code>ResizeBox</code>](#ResizeBox)  
<a name="ResizeBox+right"></a>

### resizeBox.right : <code>number</code>
Right corner of resize box

**Kind**: instance property of [<code>ResizeBox</code>](#ResizeBox)  
<a name="ResizeBox+bottom"></a>

### resizeBox.bottom : <code>number</code>
Bottom corner of resize box

**Kind**: instance property of [<code>ResizeBox</code>](#ResizeBox)  
<a name="ResizeBox+width"></a>

### resizeBox.width : <code>number</code>
Width of resize box

**Kind**: instance property of [<code>ResizeBox</code>](#ResizeBox)  
<a name="ResizeBox+height"></a>

### resizeBox.height : <code>number</code>
Height of resize box

**Kind**: instance property of [<code>ResizeBox</code>](#ResizeBox)  
<a name="ResizeBox+shape"></a>

### resizeBox.shape : [<code>SmartShape</code>](#SmartShape)
Underlying shape, that used to service this resize box
(draw, point event handling and so on)

**Kind**: instance property of [<code>ResizeBox</code>](#ResizeBox)  
<a name="ResizeBox+guid"></a>

### resizeBox.guid : <code>string</code>
Global unique identifier of this object.
Generated automatically

**Kind**: instance property of [<code>ResizeBox</code>](#ResizeBox)  
<a name="ResizeBox+options"></a>

### resizeBox.options : <code>object</code>
Options of resize box

**Kind**: instance property of [<code>ResizeBox</code>](#ResizeBox)  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | Unique ID or resize box. If instantiated by [SmartShape](#SmartShape), then setup automatically |
| shapeOptions | <code>object</code> | Options of underlying shape, that used to draw and manage this ResizeBox. See [SmartShape.options](#SmartShape+options) |
| zIndex | <code>number</code> | Order of element in a stack of HTML elements (https://www.w3schools.com/cssref/pr_pos_z-index.asp). Elements if higher z-index value placed on top. |

<a name="ResizeBox+eventListener"></a>

### resizeBox.eventListener : [<code>ResizeBoxEventListener</code>](#ResizeBoxEventListener)
Event listener that handles event listening logic for this resize box.
Instance of [ResizeBoxEventListener](#ResizeBoxEventListener) class.

**Kind**: instance property of [<code>ResizeBox</code>](#ResizeBox)  
<a name="ResizeBox+left_top"></a>

### resizeBox.left\_top : [<code>SmartPoint</code>](#SmartPoint)
Left top marker point

**Kind**: instance property of [<code>ResizeBox</code>](#ResizeBox)  
<a name="ResizeBox+left_center"></a>

### resizeBox.left\_center : [<code>SmartPoint</code>](#SmartPoint)
Left center marker point

**Kind**: instance property of [<code>ResizeBox</code>](#ResizeBox)  
<a name="ResizeBox+left_bottom"></a>

### resizeBox.left\_bottom : [<code>SmartPoint</code>](#SmartPoint)
Left bottom marker point

**Kind**: instance property of [<code>ResizeBox</code>](#ResizeBox)  
<a name="ResizeBox+center_top"></a>

### resizeBox.center\_top : [<code>SmartPoint</code>](#SmartPoint)
Center top marker point

**Kind**: instance property of [<code>ResizeBox</code>](#ResizeBox)  
<a name="ResizeBox+center_bottom"></a>

### resizeBox.center\_bottom : [<code>SmartPoint</code>](#SmartPoint)
Center bottom marker point

**Kind**: instance property of [<code>ResizeBox</code>](#ResizeBox)  
<a name="ResizeBox+right_top"></a>

### resizeBox.right\_top : [<code>SmartPoint</code>](#SmartPoint)
Right top marker point

**Kind**: instance property of [<code>ResizeBox</code>](#ResizeBox)  
<a name="ResizeBox+right_center"></a>

### resizeBox.right\_center : [<code>SmartPoint</code>](#SmartPoint)
Right center marker point

**Kind**: instance property of [<code>ResizeBox</code>](#ResizeBox)  
<a name="ResizeBox+right_bottom"></a>

### resizeBox.right\_bottom : [<code>SmartPoint</code>](#SmartPoint)
Right bottom marker point

**Kind**: instance property of [<code>ResizeBox</code>](#ResizeBox)  
<a name="ResizeBox+init"></a>

### resizeBox.init(root, left, top, width, height, options) ⇒ [<code>ResizeBox</code>](#ResizeBox)
Method used to construct ResizeBox object with specified coordinates and
size, with specified `options`. Then it binds this object to specified `root`
HTML node and displays it

**Kind**: instance method of [<code>ResizeBox</code>](#ResizeBox)  
**Returns**: [<code>ResizeBox</code>](#ResizeBox) - constucted ResizeBox object  

| Param | Type | Description |
| --- | --- | --- |
| root | <code>HTMLElement</code> | HTML element that used as a container for this ResizeBox |
| left | <code>number</code> | Left corner of shape relative to container top left |
| top | <code>number</code> | Top corner of shape relative to container top left |
| width | <code>number</code> | Width of shape |
| height | <code>number</code> | Height of shape |
| options | <code>object</code> | Options used to setup ResizeBox. See [here](#ResizeBox+options). |

<a name="ResizeBox+setOptions"></a>

### resizeBox.setOptions(options)
Method used to change options of ResizeBox.

**Kind**: instance method of [<code>ResizeBox</code>](#ResizeBox)  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> | Options object. See [here](#ResizeBox+options). |

<a name="ResizeBox+getPosition"></a>

### resizeBox.getPosition() ⇒ <code>object</code>
Method used to get current position of Resize Box

**Kind**: instance method of [<code>ResizeBox</code>](#ResizeBox)  
**Returns**: <code>object</code> - Position with fields:
`top`,`left`,`right`,`bottom`,`width`,`height`  
<a name="ResizeBox+redraw"></a>

### resizeBox.redraw()
Method used to redraw resize box

**Kind**: instance method of [<code>ResizeBox</code>](#ResizeBox)  
<a name="ResizeBox+destroy"></a>

### resizeBox.destroy()
Destroys the ResizeBox. Destroys all points, removes event listeners and removes the shape from screen.
But variable continue existing. To completely remove the shape,
set the variable to 'null' after calling this method.

**Kind**: instance method of [<code>ResizeBox</code>](#ResizeBox)  
<a name="ResizeBox+addEventListener"></a>

### resizeBox.addEventListener(eventName, handler) ⇒ <code>function</code>
Uniform method that used to add event handler of specified type to this object.

**Kind**: instance method of [<code>ResizeBox</code>](#ResizeBox)  
**Returns**: <code>function</code> - - Pointer to added event handler. Should be used to remove event listener later.  

| Param | Type | Description |
| --- | --- | --- |
| eventName | <code>string</code> | Name of event |
| handler | <code>function</code> | Function that used as an event handler |

<a name="ResizeBox+removeEventListener"></a>

### resizeBox.removeEventListener(eventName, listener)
Uniform method that used to remove event handler, that previously added
to this object.

**Kind**: instance method of [<code>ResizeBox</code>](#ResizeBox)  

| Param | Type | Description |
| --- | --- | --- |
| eventName | [<code>ResizeBoxEvents</code>](#ResizeBoxEvents) \| <code>string</code> | Name of event to remove listener from |
| listener | <code>function</code> | Pointer to event listener, that added previously. It was returned from [addEventListener](#ResizeBox+addEventListener) method. |

<a name="ResizeBoxEventListener"></a>

## ResizeBoxEventListener
**Kind**: global class  
<a name="new_ResizeBoxEventListener_new"></a>

### new ResizeBoxEventListener(resizeBox)
Internal helper class, that contains all event listening logic for the ResizeBox.
This class should not be used directly. Each ResizeBox creates an instance of
this class automatically during init process


| Param | Type | Description |
| --- | --- | --- |
| resizeBox | [<code>ResizeBox</code>](#ResizeBox) | Link to owner Shape instance |

<a name="SmartPoint"></a>

## SmartPoint
**Kind**: global class  

* [SmartPoint](#SmartPoint)
    * [new SmartPoint()](#new_SmartPoint_new)
    * [.options](#SmartPoint+options) : <code>Object</code>
    * [.x](#SmartPoint+x) : <code>number</code>
    * [.y](#SmartPoint+y) : <code>number</code>
    * [.element](#SmartPoint+element) : <code>HTMLElement</code>
    * [.guid](#SmartPoint+guid) : <code>string</code>
    * [.init(x, y, options)](#SmartPoint+init) ⇒ <code>object</code>
    * [.setOptions(options)](#SmartPoint+setOptions)
    * [.redraw()](#SmartPoint+redraw)
    * [.show()](#SmartPoint+show)
    * [.hide()](#SmartPoint+hide)
    * [.destroy()](#SmartPoint+destroy)
    * [.addEventListener(eventName, handler)](#SmartPoint+addEventListener) ⇒ <code>function</code>
    * [.removeEventListener(eventName, listener)](#SmartPoint+removeEventListener)

<a name="new_SmartPoint_new"></a>

### new SmartPoint()
Class that represents a single point on the screen.
Can be created directly using class constructor, but more often they added by using `addPoint`, `addPoints`
methods of [SmartShape](#SmartShape) class or interactively when
user double-clicks on shape's container.

**Returns**: <code>object</code> - SmartPoint object that should be initialized by `init` method.  
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
| canDelete | <code>boolean</code> | Is it allowed to delete this point by right mouse click. Default `true`. |
| zIndex | <code>number</code> | Order of element in a stack of HTML elements (https://www.w3schools.com/cssref/pr_pos_z-index.asp). Elements if higher z-index value placed on top. |
| bounds | <code>object</code> | Bounds for point movement. If setup, then it's impossible to drag point beyond bounds. It must be an object of the following format: `{left:number,top:number,right:number,bottom:number}`. If created using `SmartShape`, then it automatically set this object to the dimensions of shape's container. |
| moveDirections | <code>array</code> | . Defines in which directions point can move. Can contain values from [PointMoveDirections](#PointMoveDirections) enumeration. By default, all directions allowed. Default value is: `[PointMoveDirections.LEFT,PointMoveDirections.TOP,PointMoveDirections.RIGHT, PointMoveDirections.BOTTOM]`. To restrict movement in any direction, need to remove some directions from this array. |
| visible | <code>boolean</code> | Point is visible or not. By default, `true`. |

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
<a name="SmartPoint+guid"></a>

### smartPoint.guid : <code>string</code>
Internal global unique identifier of point. Generated automatically.

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
Method used to set specified options to point.

**Kind**: instance method of [<code>SmartPoint</code>](#SmartPoint)  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> | Point options object, described [above](#SmartPoint+options). |

<a name="SmartPoint+redraw"></a>

### smartPoint.redraw()
Method used to redraw the point. Usually used after change point position on the screen.

**Kind**: instance method of [<code>SmartPoint</code>](#SmartPoint)  
<a name="SmartPoint+show"></a>

### smartPoint.show()
Method used to display point if it has hidden

**Kind**: instance method of [<code>SmartPoint</code>](#SmartPoint)  
<a name="SmartPoint+hide"></a>

### smartPoint.hide()
Method used to hide point

**Kind**: instance method of [<code>SmartPoint</code>](#SmartPoint)  
<a name="SmartPoint+destroy"></a>

### smartPoint.destroy()
Method used to destroy the point. Removes event listeners from point element and
raises the `point_destroyed` event. This event then intercepted by owner shape. Then owner shape
removes this point from shape's points array.

**Kind**: instance method of [<code>SmartPoint</code>](#SmartPoint)  
<a name="SmartPoint+addEventListener"></a>

### smartPoint.addEventListener(eventName, handler) ⇒ <code>function</code>
Uniform method that used to add event handler of specified type to this object.

**Kind**: instance method of [<code>SmartPoint</code>](#SmartPoint)  
**Returns**: <code>function</code> - - Pointer to added event handler. Should be used to remove event listener later.  

| Param | Type | Description |
| --- | --- | --- |
| eventName | <code>string</code> | Name of event |
| handler | <code>function</code> | Function that used as an event handler |

<a name="SmartPoint+removeEventListener"></a>

### smartPoint.removeEventListener(eventName, listener)
Uniform method that used to remove event handler, that previously added
to this object.

**Kind**: instance method of [<code>SmartPoint</code>](#SmartPoint)  

| Param | Type | Description |
| --- | --- | --- |
| eventName | <code>string</code> | Name of event to remove listener from |
| listener | <code>function</code> | Pointer to event listener, that added previously. It was returned from [addEventListener](#ResizeBox+addEventListener) method. |

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
    * [.guid](#SmartShape+guid) : <code>string</code>
    * [.resizeBox](#SmartShape+resizeBox) : [<code>ResizeBox</code>](#ResizeBox)
    * [.init(root, options, points)](#SmartShape+init) ⇒ <code>object</code>
    * [.setOptions(options)](#SmartShape+setOptions)
    * [.addPoint(x, y, pointOptions)](#SmartShape+addPoint) ⇒ <code>object</code>
    * [.addPoints(points, pointOptions)](#SmartShape+addPoints)
    * [.deletePoint(x, y)](#SmartShape+deletePoint)
    * [.findPoint(x, y)](#SmartShape+findPoint) ⇒ <code>null</code> \| <code>object</code>
    * [.findPointById(id)](#SmartShape+findPointById) ⇒ <code>null</code> \| <code>object</code>
    * [.getPointsArray()](#SmartShape+getPointsArray) ⇒ <code>array</code>
    * [.moveTo(x, y)](#SmartShape+moveTo)
    * [.scaleTo(width, height)](#SmartShape+scaleTo)
    * [.redraw()](#SmartShape+redraw)
    * [.getPosition()](#SmartShape+getPosition) ⇒ <code>object</code>
    * [.getBounds()](#SmartShape+getBounds) ⇒ <code>object</code>
    * [.isShapePoint(point)](#SmartShape+isShapePoint) ⇒ <code>boolean</code>
    * [.addEventListener(eventName, handler)](#SmartShape+addEventListener) ⇒ <code>function</code>
    * [.removeEventListener(eventName, listener)](#SmartShape+removeEventListener)
    * [.show()](#SmartShape+show)
    * [.hide()](#SmartShape+hide)
    * [.destroy()](#SmartShape+destroy)

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
Array of points of shape polygon. Each item of array is [SmartPoint](#SmartPoint) object.

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
| id | <code>string</code> | Unique ID of shape's SVG HTML element. By default, empty. |
| name | <code>string</code> | Name of shape. By default, `Unnamed shape` |
| maxPoints | <code>number</code> | Number of points, which possible to add to the shape interactively. By default `-1`, which means Unlimited |
| stroke | <code>string</code> | Color of shape lines. Accepts the same values as [SVG stroke](https://www.w3schools.com/graphics/svg_stroking.asp) property accepts. Default -  `rgb(0,0,0)` |
| strokeWidth | <code>string</code> | Thickness of shape lines. Accepts the same values as [SVG stroke-width](https://www.w3schools.com/graphics/svg_stroking.asp) property. Default - `2` |
| strokeLinecap | <code>string</code> | Type of endings of shape lines. Accepts the same values as [SVG stroke-linecap](https://www.w3schools.com/graphics/svg_stroking.asp) property. |
| strokeDasharray | <code>string</code> | Used to create dashed shape lines. Accepts the same values as [SVG stroke-dasharray](https://www.w3schools.com/graphics/svg_stroking.asp) property. |
| fill | <code>string</code> | Fill color of shape polygon. Accepts the same values as [SVG fill](https://www.geeksforgeeks.org/svg-fill-attribute/) property. Default: `none` . |
| fillOpacity | <code>string</code> | Fill opacity level of shape polygon. Accepts the same values as [SVG fill-opacity](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/fill-opacity) property.Default `1`. |
| fillGradient | <code>object</code> | Defines gradient object, that should be used to fill the shape. This could be either linear gradient or radial gradient. Overrides `fill` property. See demo [here](https://github.com/AndreyGermanov/smart_shape/blob/main/tests/dev/gradient.html). |
| fillImage | <code>object</code> | Defines image fill object to fill the shape with image. Should contain following fields: `url` - URL to image, `width` - width of image, `height` - height of image See demo [here](https://github.com/AndreyGermanov/smart_shape/blob/main/tests/dev/fillimage.html). |
| filters | <code>object</code> | Object, that defines a set of SVG filters, that will be applied to this shape. Keys are names of filters, for example `feDropShadow` for drop-shadow filter. Values are objects with attributes for each filter. All attributes, that supported by each particular SVG filter are supported. See more about SVG filters [here](#https://developer.mozilla.org/en-US/docs/Web/SVG/Element/filter). The demo of applying feDropShadow filter see [here](https://github.com/AndreyGermanov/smart_shape/blob/main/tests/dev/svgfilters.html) |
| classes | <code>string</code> | CSS class names, that will be applied to underlying polygon SVG element. |
| style | <code>object</code> | CSS styles, that will be applied to underlying polygon SVG element. Using CSS styles and classes is an alternative way to specify options of SVG elements: https://jenkov.com/tutorials/svg/svg-and-css.html, https://css-tricks.com/svg-properties-and-css/ |
| offsetX | <code>number</code> | Number of pixels to add to X coordinate of each point to move entire shape to the right. Helps to move entire figure without need to change coordinates of each point. Default: `0`. |
| offsetY | <code>number</code> | Number of pixels to add to Y coordinate of each point to move entire shape to the bottom. Helps to move entire figure without need to change coordinates of each point. Default: `0` |
| canDragShape | <code>boolean</code> | Is it allowed to drag shape. Default `true`. |
| canAddPoints | <code>boolean</code> | Is it allowed to add points to the shape interactively, by mouse double-click on the screen. Default `false`. |
| canScale | <code>boolean</code> | Is it allowed to scale this shape. If true, then [ResizeBox](#ResizeBox) appears around shape and user can drag in to resize shape in different directions |
| pointOptions | <code>object</code> | Default options for created points. See  [options](#SmartPoint+options) property of `SmartPoint` object. |
| zIndex | <code>number</code> | Order of element in a stack of HTML elements (https://www.w3schools.com/cssref/pr_pos_z-index.asp). Elements if higher z-index value placed on top. |
| bounds | <code>object</code> | Bounds for shape movement and points dragging. This is an object with `left`, `top`, `right` and `bottom` values. By default, all values are equal -1, which means that bounds not specified. If bounds not specified, then left, top, right and bottom of container element will be used for this |
| visible | <code>boolean</code> | Shape is visible or not. By default, `true`. |

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
<a name="SmartShape+guid"></a>

### smartShape.guid : <code>string</code>
Internal global unique identifier of shape. Generated automatically.

**Kind**: instance property of [<code>SmartShape</code>](#SmartShape)  
<a name="SmartShape+resizeBox"></a>

### smartShape.resizeBox : [<code>ResizeBox</code>](#ResizeBox)
[ResizeBox](#ResizeBox) component, used to scale shape if
`canScale` option enabled

**Kind**: instance property of [<code>SmartShape</code>](#SmartShape)  
<a name="SmartShape+init"></a>

### smartShape.init(root, options, points) ⇒ <code>object</code>
Method used to construct SmartShape object with specified `points` and
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
Set specified options to the shape. You may not set all options, that exist, but only what you want to change.
Options that you set by this method will be merged with already active options.

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
| pointOptions | <code>object</code> | Points options. Described in [SmartPoint.options](#SmartPoint+options). Can be empty, in this case default `SmartShape.options.pointOptions` will be used, or default options of SmartPoint class itself. |

<a name="SmartShape+deletePoint"></a>

### smartShape.deletePoint(x, y)
Method used to delete point with specified coordinates.
If point with specified coordinates not found then just
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

<a name="SmartShape+findPointById"></a>

### smartShape.findPointById(id) ⇒ <code>null</code> \| <code>object</code>
Method returns SmartPoint object for point with specified ID or null, if point not found

**Kind**: instance method of [<code>SmartShape</code>](#SmartShape)  
**Returns**: <code>null</code> \| <code>object</code> - [SmartPoint](#SmartPoint) object instance of point,
or null if point does not exist  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | ID of point, provided to it as an options |

<a name="SmartShape+getPointsArray"></a>

### smartShape.getPointsArray() ⇒ <code>array</code>
Returns 2D array of points coordinates in format [ [x,y], [x,y], [x,y] ... ].

**Kind**: instance method of [<code>SmartShape</code>](#SmartShape)  
**Returns**: <code>array</code> - 2D array of points in format [ [x,y], [x,y], [x,y] ... ]  
<a name="SmartShape+moveTo"></a>

### smartShape.moveTo(x, y)
Moves shape to specific position. It only changes coordinates of points, but do not
redraws the shape on new position. So, you need to call `redraw` yourself after move.

**Kind**: instance method of [<code>SmartShape</code>](#SmartShape)  

| Param | Type | Description |
| --- | --- | --- |
| x | <code>number</code> | new X coordinate |
| y | <code>number</code> | new Y coordinate |

<a name="SmartShape+scaleTo"></a>

### smartShape.scaleTo(width, height)
Scales image to fit specified `width` and `height`. It only changes coordinates of points, but do not
redraws the shape on new position. So, you need to call `redraw` yourself after scale.

**Kind**: instance method of [<code>SmartShape</code>](#SmartShape)  

| Param | Type | Description |
| --- | --- | --- |
| width | <code>number</code> | new width |
| height | <code>number</code> | new height |

<a name="SmartShape+redraw"></a>

### smartShape.redraw()
Method used to redraw shape polygon. Runs automatically when add/remove points or change their properties.

**Kind**: instance method of [<code>SmartShape</code>](#SmartShape)  
<a name="SmartShape+getPosition"></a>

### smartShape.getPosition() ⇒ <code>object</code>
Method used to get current position of shape

**Kind**: instance method of [<code>SmartShape</code>](#SmartShape)  
**Returns**: <code>object</code> - Position with fields:
`top`,`left`,`right`,`bottom`,`width`,`height`  
<a name="SmartShape+getBounds"></a>

### smartShape.getBounds() ⇒ <code>object</code>
Method returns the bounds of this shape, e.g. inside which square it's allowed to drag it.
By default, if [options.bounds](#SmartShape+options) not specified, the bounds of shape are equal to
the bounds of shape's container element (clientLeft, clientTop, clientLeft+clientWidth, clientTop+clientHeight)

**Kind**: instance method of [<code>SmartShape</code>](#SmartShape)  
**Returns**: <code>object</code> - Object with `left`, `top`, `right` and `bottom` fields.  
<a name="SmartShape+isShapePoint"></a>

### smartShape.isShapePoint(point) ⇒ <code>boolean</code>
Method returns true if specified point exists in the array of this shape or false if not.

**Kind**: instance method of [<code>SmartShape</code>](#SmartShape)  
**Returns**: <code>boolean</code> - True if this point exists and false if not  

| Param | Description |
| --- | --- |
| point | [SmartPoint](#SmartPoint) object of point to search |

<a name="SmartShape+addEventListener"></a>

### smartShape.addEventListener(eventName, handler) ⇒ <code>function</code>
Uniform method that used to add event handler of specified type to this object.

**Kind**: instance method of [<code>SmartShape</code>](#SmartShape)  
**Returns**: <code>function</code> - - Pointer to added event handler. Should be used to remove event listener later.  

| Param | Type | Description |
| --- | --- | --- |
| eventName | <code>string</code> | Name of event |
| handler | <code>function</code> | Function that used as an event handler |

<a name="SmartShape+removeEventListener"></a>

### smartShape.removeEventListener(eventName, listener)
Uniform method that used to remove event handler, that previously added
to this object.

**Kind**: instance method of [<code>SmartShape</code>](#SmartShape)  

| Param | Type | Description |
| --- | --- | --- |
| eventName | <code>string</code> | Name of event to remove listener from |
| listener | <code>function</code> | Pointer to event listener, that added previously. It was returned from [addEventListener](#ResizeBox+addEventListener) method. |

<a name="SmartShape+show"></a>

### smartShape.show()
Method used to show shape if it has hidden

**Kind**: instance method of [<code>SmartShape</code>](#SmartShape)  
<a name="SmartShape+hide"></a>

### smartShape.hide()
Method used to hide the shape

**Kind**: instance method of [<code>SmartShape</code>](#SmartShape)  
<a name="SmartShape+destroy"></a>

### smartShape.destroy()
Destroys the shape. Destroys all points, removes event listeners and removes the shape from screen.
But variable continue existing. To completely remove the shape,
set the variable to 'null' after calling this method.

**Kind**: instance method of [<code>SmartShape</code>](#SmartShape)  
<a name="SmartShapeDrawHelper"></a>

## SmartShapeDrawHelper
**Kind**: global class  
<a name="new_SmartShapeDrawHelper_new"></a>

### new SmartShapeDrawHelper()
Internal helper class that used to draw shape.
Should not be used directly. SmartShape objects execute methods
of this object when need to draw shapes.

<a name="SmartShapeEventListener"></a>

## SmartShapeEventListener
**Kind**: global class  
<a name="new_SmartShapeEventListener_new"></a>

### new SmartShapeEventListener(shape)
Internal helper class, that contains all event listening logic for the shape.
This class should not be used directly. Each shape creates an instance of
this class automatically during init process


| Param | Type | Description |
| --- | --- | --- |
| shape | [<code>SmartShape</code>](#SmartShape) | Link to owner Shape instance |

<a name="ResizeBoxEvents"></a>

## ResizeBoxEvents : <code>enum</code>
Enumeration that defines events, that ResizeBox can emit.

**Kind**: global enum  

| Param | Description |
| --- | --- |
| RESIZE_BOX_RESIZE | Emitted when user resized the shape by dragging one of marker points. |

<a name="PointEvents"></a>

## PointEvents : <code>enum</code>
Enumeration of event names, that can be emitted by [SmartPoint](#SmartPoint) object.

**Kind**: global enum  

| Param | Description |
| --- | --- |
| POINT_ADDED | Emitted when point created |
| POINT_DRAG_START | Emitted when user press mouse button on point before start dragging it |
| POINT_DRAG_MOVE | Emitted when user drags point by a mouse. As an arguments to event passed `oldX` and `oldY` coordinates, which was before event start. |
| POINT_DRAG_END | Emitted when user releases mouse button after pressing it |
| POINT_DESTROYED | Emitted when point destroyed point (by pressing right mouse button on it or programmatically using `destroy` method) |

<a name="PointMoveDirections"></a>

## PointMoveDirections : <code>enum</code>
Enumeration that defines point move directions. Values from this enumeration should be used
in point option `moveDirections` to specify in which directions point can be moved.
Members of enumeration: `LEFT`, `TOP`, `RIGHT`, `BOTTOM`

**Kind**: global enum  
<a name="ContainerEvents"></a>

## ContainerEvents : <code>enum</code>
Enumeration of event names, that can be emitted by [SmartShape](#SmartShape) object.

**Kind**: global enum  

| Param | Description |
| --- | --- |
| CONTAINER_BOUNDS_CHANGED | by shape when dimensions of container changed, e.g. browser  window resized. Sends the event with the following fields: `bounds` -an object with the following fields:  left:number,top:number,right:number,bottom:number, `points` - array of points ([SmartPoint](#SmartPoint) objects)  with array of all points of this shape, which could be affected by this bounds change. |

