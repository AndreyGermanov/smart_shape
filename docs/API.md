## Classes

<dl>
<dt><a href="#ResizeBox">ResizeBox</a></dt>
<dd></dd>
<dt><a href="#ResizeBoxEventListener">ResizeBoxEventListener</a></dt>
<dd></dd>
<dt><a href="#RotateBox">RotateBox</a></dt>
<dd></dd>
<dt><a href="#RotateBoxEventListener">RotateBoxEventListener</a></dt>
<dd></dd>
<dt><a href="#SmartPoint">SmartPoint</a></dt>
<dd></dd>
<dt><a href="#SmartShape">SmartShape</a></dt>
<dd></dd>
<dt><a href="#SmartShapeDrawHelper">SmartShapeDrawHelper</a></dt>
<dd></dd>
<dt><a href="#SmartShapeEventListener">SmartShapeEventListener</a></dt>
<dd></dd>
<dt><a href="#SmartShapeGroupHelper">SmartShapeGroupHelper</a></dt>
<dd></dd>
<dt><a href="#SmartShapeManager">SmartShapeManager</a></dt>
<dd></dd>
<dt><a href="#EventsManager">EventsManager</a></dt>
<dd></dd>
</dl>

## Members

<dl>
<dt><a href="#point">point</a> : <code><a href="#SmartPoint">SmartPoint</a></code></dt>
<dd><p>The point object to manage menu for</p>
</dd>
</dl>

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
    * [.show()](#ResizeBox+show)
    * [.hide()](#ResizeBox+hide)
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
<a name="ResizeBox+show"></a>

### resizeBox.show()
Method used to show Resize Box if it has hidden

**Kind**: instance method of [<code>ResizeBox</code>](#ResizeBox)  
<a name="ResizeBox+hide"></a>

### resizeBox.hide()
Method used to hide Resize Box

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
ResizeBox can emit events, defined in [ResizeBoxEvents](#ResizeBoxEvents) enumeration. So, you can
listen any of these events.

**Kind**: instance method of [<code>ResizeBox</code>](#ResizeBox)  
**Returns**: <code>function</code> - - Pointer to added event handler. Should be used to remove event listener later.  

| Param | Type | Description |
| --- | --- | --- |
| eventName | <code>string</code> | Name of event. Use one of names, defined in [ResizeBoxEvents](#ResizeBoxEvents) |
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

<a name="RotateBox"></a>

## RotateBox
**Kind**: global class  

* [RotateBox](#RotateBox)
    * [new RotateBox()](#new_RotateBox_new)
    * [.left](#RotateBox+left) : <code>number</code>
    * [.top](#RotateBox+top) : <code>number</code>
    * [.right](#RotateBox+right) : <code>number</code>
    * [.bottom](#RotateBox+bottom) : <code>number</code>
    * [.width](#RotateBox+width) : <code>number</code>
    * [.height](#RotateBox+height) : <code>number</code>
    * [.shape](#RotateBox+shape) : [<code>SmartShape</code>](#SmartShape)
    * [.guid](#RotateBox+guid) : <code>string</code>
    * [.options](#RotateBox+options) : <code>object</code>
    * [.eventListener](#RotateBox+eventListener) : [<code>RotateBoxEventListener</code>](#RotateBoxEventListener)
    * [.left_top](#RotateBox+left_top) : [<code>SmartPoint</code>](#SmartPoint)
    * [.left_bottom](#RotateBox+left_bottom) : [<code>SmartPoint</code>](#SmartPoint)
    * [.right_top](#RotateBox+right_top) : [<code>SmartPoint</code>](#SmartPoint)
    * [.right_bottom](#RotateBox+right_bottom) : [<code>SmartPoint</code>](#SmartPoint)
    * [.init(root, left, top, width, height, options)](#RotateBox+init) ⇒ [<code>RotateBox</code>](#RotateBox)
    * [.setOptions(options)](#RotateBox+setOptions)
    * [.getPosition()](#RotateBox+getPosition) ⇒ <code>object</code>
    * [.redraw()](#RotateBox+redraw)
    * [.show()](#RotateBox+show)
    * [.hide()](#RotateBox+hide)
    * [.destroy()](#RotateBox+destroy)
    * [.addEventListener(eventName, handler)](#RotateBox+addEventListener) ⇒ <code>function</code>
    * [.removeEventListener(eventName, listener)](#RotateBox+removeEventListener)

<a name="new_RotateBox_new"></a>

### new RotateBox()
Class represents a special type of shape, that shows the rectangle with markers on
it corners, used to rotate it. [See demo](https://code.germanov.dev/smart_shape/tests/prod/rotate_box.html).
Mostly used to rotate [SmartShape](#SmartShape) object, but also can be used as an independent shape
for tasks like rotating objects on a web page or select rectangular regions.

<a name="RotateBox+left"></a>

### rotateBox.left : <code>number</code>
Left corner of rotate box

**Kind**: instance property of [<code>RotateBox</code>](#RotateBox)  
<a name="RotateBox+top"></a>

### rotateBox.top : <code>number</code>
Top corner of rotate box

**Kind**: instance property of [<code>RotateBox</code>](#RotateBox)  
<a name="RotateBox+right"></a>

### rotateBox.right : <code>number</code>
Right corner of rotate box

**Kind**: instance property of [<code>RotateBox</code>](#RotateBox)  
<a name="RotateBox+bottom"></a>

### rotateBox.bottom : <code>number</code>
Bottom corner of rotate box

**Kind**: instance property of [<code>RotateBox</code>](#RotateBox)  
<a name="RotateBox+width"></a>

### rotateBox.width : <code>number</code>
Width of rotate box

**Kind**: instance property of [<code>RotateBox</code>](#RotateBox)  
<a name="RotateBox+height"></a>

### rotateBox.height : <code>number</code>
Height of rotate box

**Kind**: instance property of [<code>RotateBox</code>](#RotateBox)  
<a name="RotateBox+shape"></a>

### rotateBox.shape : [<code>SmartShape</code>](#SmartShape)
Underlying shape, that used to service this rotate box
(draw, point event handling and so on)

**Kind**: instance property of [<code>RotateBox</code>](#RotateBox)  
<a name="RotateBox+guid"></a>

### rotateBox.guid : <code>string</code>
Global unique identifier of this object.
Generated automatically

**Kind**: instance property of [<code>RotateBox</code>](#RotateBox)  
<a name="RotateBox+options"></a>

### rotateBox.options : <code>object</code>
Options of rotate box

**Kind**: instance property of [<code>RotateBox</code>](#RotateBox)  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | Unique ID or rotate box. If instantiated by [SmartShape](#SmartShape), then setup automatically |
| shapeOptions | <code>object</code> | Options of underlying shape, that used to draw and manage this RotateBox. See [SmartShape.options](#SmartShape+options) |
| zIndex | <code>number</code> | Order of element in a stack of HTML elements (https://www.w3schools.com/cssref/pr_pos_z-index.asp). Elements if higher z-index value placed on top. |

<a name="RotateBox+eventListener"></a>

### rotateBox.eventListener : [<code>RotateBoxEventListener</code>](#RotateBoxEventListener)
Event listener that handles event listening logic for this rotate box.
Instance of [ResizeBoxEventListener](#ResizeBoxEventListener) class.

**Kind**: instance property of [<code>RotateBox</code>](#RotateBox)  
<a name="RotateBox+left_top"></a>

### rotateBox.left\_top : [<code>SmartPoint</code>](#SmartPoint)
Left top marker point

**Kind**: instance property of [<code>RotateBox</code>](#RotateBox)  
<a name="RotateBox+left_bottom"></a>

### rotateBox.left\_bottom : [<code>SmartPoint</code>](#SmartPoint)
Left bottom marker point

**Kind**: instance property of [<code>RotateBox</code>](#RotateBox)  
<a name="RotateBox+right_top"></a>

### rotateBox.right\_top : [<code>SmartPoint</code>](#SmartPoint)
Right top marker point

**Kind**: instance property of [<code>RotateBox</code>](#RotateBox)  
<a name="RotateBox+right_bottom"></a>

### rotateBox.right\_bottom : [<code>SmartPoint</code>](#SmartPoint)
Right bottom marker point

**Kind**: instance property of [<code>RotateBox</code>](#RotateBox)  
<a name="RotateBox+init"></a>

### rotateBox.init(root, left, top, width, height, options) ⇒ [<code>RotateBox</code>](#RotateBox)
Method used to construct RotateBox object with specified coordinates and
size, with specified `options`. Then it binds this object to specified `root`
HTML node and displays it

**Kind**: instance method of [<code>RotateBox</code>](#RotateBox)  
**Returns**: [<code>RotateBox</code>](#RotateBox) - constucted RotateBox object  

| Param | Type | Description |
| --- | --- | --- |
| root | <code>HTMLElement</code> | HTML element that used as a container for this RotateBox |
| left | <code>number</code> | Left corner of shape relative to container top left |
| top | <code>number</code> | Top corner of shape relative to container top left |
| width | <code>number</code> | Width of shape |
| height | <code>number</code> | Height of shape |
| options | <code>object</code> | Options used to setup RotateBox. See [here](#RotateBox+options). |

<a name="RotateBox+setOptions"></a>

### rotateBox.setOptions(options)
Method used to change options of RotateBox.

**Kind**: instance method of [<code>RotateBox</code>](#RotateBox)  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> | Options object. See [here](#RotateBox+options). |

<a name="RotateBox+getPosition"></a>

### rotateBox.getPosition() ⇒ <code>object</code>
Method used to get current position of Rotate Box

**Kind**: instance method of [<code>RotateBox</code>](#RotateBox)  
**Returns**: <code>object</code> - Position with fields:
`top`,`left`,`right`,`bottom`,`width`,`height`  
<a name="RotateBox+redraw"></a>

### rotateBox.redraw()
Method used to redraw rotate box

**Kind**: instance method of [<code>RotateBox</code>](#RotateBox)  
<a name="RotateBox+show"></a>

### rotateBox.show()
Method used to show Rotate Box if it has hidden

**Kind**: instance method of [<code>RotateBox</code>](#RotateBox)  
<a name="RotateBox+hide"></a>

### rotateBox.hide()
Method used to hide Rotate Box

**Kind**: instance method of [<code>RotateBox</code>](#RotateBox)  
<a name="RotateBox+destroy"></a>

### rotateBox.destroy()
Destroys the RotateBox. Destroys all points, removes event listeners and removes the shape from screen.
But variable continue existing. To completely remove the shape,
set the variable to 'null' after calling this method.

**Kind**: instance method of [<code>RotateBox</code>](#RotateBox)  
<a name="RotateBox+addEventListener"></a>

### rotateBox.addEventListener(eventName, handler) ⇒ <code>function</code>
Uniform method that used to add event handler of specified type to this object.
RotateBox can emit events, defined in [RotateBoxEvents](#RotateBoxEvents) enumeration. So, you can
listen any of these events.

**Kind**: instance method of [<code>RotateBox</code>](#RotateBox)  
**Returns**: <code>function</code> - - Pointer to added event handler. Should be used to remove event listener later.  

| Param | Type | Description |
| --- | --- | --- |
| eventName | <code>string</code> | Name of event. Use one of name, defined in [RotateBoxEvents](#RotateBoxEvents) |
| handler | <code>function</code> | Function that used as an event handler |

<a name="RotateBox+removeEventListener"></a>

### rotateBox.removeEventListener(eventName, listener)
Uniform method that used to remove event handler, that previously added
to this object.

**Kind**: instance method of [<code>RotateBox</code>](#RotateBox)  

| Param | Type | Description |
| --- | --- | --- |
| eventName | [<code>RotateBoxEvents</code>](#RotateBoxEvents) \| <code>string</code> | Name of event to remove listener from |
| listener | <code>function</code> | Pointer to event listener, that added previously. It was returned from [addEventListener](#RotateBox+addEventListener) method. |

<a name="RotateBoxEventListener"></a>

## RotateBoxEventListener
**Kind**: global class  
<a name="new_RotateBoxEventListener_new"></a>

### new RotateBoxEventListener(rotateBox)
Internal helper class, that contains all event listening logic for the RotateBox.
This class should not be used directly. Each RotateBox creates an instance of
this class automatically during init process


| Param | Type | Description |
| --- | --- | --- |
| rotateBox | [<code>RotateBox</code>](#RotateBox) | Link to owner Shape instance |

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
    * [.toJSON()](#SmartPoint+toJSON) ⇒ <code>string</code>
    * [.fromJSON(json)](#SmartPoint+fromJSON) ⇒ [<code>SmartPoint</code>](#SmartPoint)
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
| forceDisplay | <code>boolean</code> | If this option enabled, than this point displayed all the time, even if shape is not in SCALE or ROTATE mode. By default, if the shape is in DEFAULT mode, then points not displayed on it. |

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
<a name="SmartPoint+toJSON"></a>

### smartPoint.toJSON() ⇒ <code>string</code>
Method used to serialize point to JSON string

**Kind**: instance method of [<code>SmartPoint</code>](#SmartPoint)  
**Returns**: <code>string</code> - JSON string with serialized point object  
<a name="SmartPoint+fromJSON"></a>

### smartPoint.fromJSON(json) ⇒ [<code>SmartPoint</code>](#SmartPoint)
Method used to construct point object from JSON string representation,
received by using `toJSON()` method.

**Kind**: instance method of [<code>SmartPoint</code>](#SmartPoint)  
**Returns**: [<code>SmartPoint</code>](#SmartPoint) - constructed point or null in case of error  

| Param | Type | Description |
| --- | --- | --- |
| json | <code>string</code> | JSON-serialized point object as an object or as a string |

<a name="SmartPoint+destroy"></a>

### smartPoint.destroy()
Method used to destroy the point. Removes event listeners from point element and
raises the `point_destroyed` event. This event then intercepted by owner shape. Then owner shape
removes this point from shape's points array.

**Kind**: instance method of [<code>SmartPoint</code>](#SmartPoint)  
<a name="SmartPoint+addEventListener"></a>

### smartPoint.addEventListener(eventName, handler) ⇒ <code>function</code>
Uniform method that used to add event handler of specified type to this object.
SmartPoint can emit events, defined in [PointEvents](#PointEvents) enumeration. So, you can
listen any of these events.

**Kind**: instance method of [<code>SmartPoint</code>](#SmartPoint)  
**Returns**: <code>function</code> - - Pointer to added event handler. Should be used to remove event listener later.  

| Param | Type | Description |
| --- | --- | --- |
| eventName | <code>string</code> | Name of event. Use one of names, defined in [PointEvents](#PointEvents) |
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
    * [.root](#SmartShape+root) : <code>HTMLElement</code>
    * [.points](#SmartShape+points) : <code>array</code>
    * [.svg](#SmartShape+svg) : <code>HTMLOrSVGElement</code>
    * [.groupHelper](#SmartShape+groupHelper) : [<code>SmartShapeGroupHelper</code>](#SmartShapeGroupHelper)
    * [.options](#SmartShape+options) : <code>object</code>
    * [.left](#SmartShape+left) : <code>number</code>
    * [.top](#SmartShape+top) : <code>number</code>
    * [.right](#SmartShape+right) : <code>number</code>
    * [.bottom](#SmartShape+bottom) : <code>number</code>
    * [.width](#SmartShape+width) : <code>number</code>
    * [.height](#SmartShape+height) : <code>number</code>
    * [.guid](#SmartShape+guid) : <code>string</code>
    * [.resizeBox](#SmartShape+resizeBox) : [<code>ResizeBox</code>](#ResizeBox)
    * [.rotateBox](#SmartShape+rotateBox) : [<code>RotateBox</code>](#RotateBox)
    * [.initCenter](#SmartShape+initCenter) : <code>array</code>
    * [.shapeMenu](#SmartShape+shapeMenu) : <code>SmartShapeContextMenu</code>
    * [.init(root, options, points, show)](#SmartShape+init) ⇒ <code>object</code>
    * [.setOptions(options)](#SmartShape+setOptions)
    * [.addPoint(x, y, pointOptions)](#SmartShape+addPoint) ⇒ <code>object</code>
    * [.insertPoint(x, y, beforePoint, pointOptions)](#SmartShape+insertPoint) ⇒ <code>object</code>
    * [.addPoints(points, pointOptions)](#SmartShape+addPoints)
    * [.getPointIndex(point)](#SmartShape+getPointIndex) ⇒ <code>number</code>
    * [.deleteAllPoints()](#SmartShape+deleteAllPoints)
    * [.deletePoint(x, y)](#SmartShape+deletePoint)
    * [.findPoint(x, y)](#SmartShape+findPoint) ⇒ <code>null</code> \| <code>object</code>
    * [.findPointById(id)](#SmartShape+findPointById) ⇒ <code>null</code> \| <code>object</code>
    * [.getPointsArray()](#SmartShape+getPointsArray) ⇒ <code>array</code>
    * [.moveTo(x, y, redraw)](#SmartShape+moveTo)
    * [.moveBy(stepX, stepY, redraw)](#SmartShape+moveBy)
    * [.scaleTo(width, height)](#SmartShape+scaleTo)
    * [.scaleBy(scaleX, scaleY)](#SmartShape+scaleBy)
    * [.rotateBy(angle, centerX, centerY, checkBounds)](#SmartShape+rotateBy)
    * [.flip(byX, byY, includeChildren)](#SmartShape+flip)
    * [.redraw()](#SmartShape+redraw)
    * [.switchDisplayMode(mode)](#SmartShape+switchDisplayMode)
    * [.getPosition()](#SmartShape+getPosition) ⇒ <code>object</code>
    * [.getBounds()](#SmartShape+getBounds) ⇒ <code>object</code>
    * [.isShapePoint(point)](#SmartShape+isShapePoint) ⇒ <code>boolean</code>
    * [.belongsToShape(x, y)](#SmartShape+belongsToShape) ⇒ <code>boolean</code>
    * [.addEventListener(eventName, handler)](#SmartShape+addEventListener) ⇒ <code>function</code>
    * [.removeEventListener(eventName, listener)](#SmartShape+removeEventListener)
    * [.show()](#SmartShape+show)
    * [.hide()](#SmartShape+hide)
    * [.destroy()](#SmartShape+destroy)
    * [.getCenter(forGroup)](#SmartShape+getCenter) ⇒ <code>array</code>
    * [.toSvg(includeChildren)](#SmartShape+toSvg) ⇒ <code>string</code>
    * [.toPng(type, width, height, includeChildren)](#SmartShape+toPng) ⇒ <code>Promise</code>
    * [.toJSON(includeChildren, compact)](#SmartShape+toJSON) ⇒ <code>string</code>
    * [.clone(options, includeChildren)](#SmartShape+clone) ⇒ [<code>SmartShape</code>](#SmartShape) \| <code>null</code>
    * [.fromJSON(root, json, includeChildren)](#SmartShape+fromJSON) ⇒ [<code>SmartShape</code>](#SmartShape) \| <code>null</code>

<a name="new_SmartShape_new"></a>

### new SmartShape()
SmartShape class. Used to construct shapes.

**Returns**: SmartShape object that should be initialised using `init` method.  
<a name="SmartShape+root"></a>

### smartShape.root : <code>HTMLElement</code>
The HTML container element to which the shape will be injected. This can be any block element,
that can have children (div,span etc.)

**Kind**: instance property of [<code>SmartShape</code>](#SmartShape)  
<a name="SmartShape+points"></a>

### smartShape.points : <code>array</code>
Array of points of shape polygon. Each item of array is [SmartPoint](#SmartPoint) object.

**Kind**: instance property of [<code>SmartShape</code>](#SmartShape)  
<a name="SmartShape+svg"></a>

### smartShape.svg : <code>HTMLOrSVGElement</code>
[SVG element](https://developer.mozilla.org/en-US/docs/Web/SVG/Element), which used as a backend for shape.
SmartShape constructs SVG element based on provided point coordinates and options.

**Kind**: instance property of [<code>SmartShape</code>](#SmartShape)  
<a name="SmartShape+groupHelper"></a>

### smartShape.groupHelper : [<code>SmartShapeGroupHelper</code>](#SmartShapeGroupHelper)
Helper object that used to manage children shapes of this shape

**Kind**: instance property of [<code>SmartShape</code>](#SmartShape)  
<a name="SmartShape+options"></a>

### smartShape.options : <code>object</code>
Options of shape as an object. Can have the following parameters.

**Kind**: instance property of [<code>SmartShape</code>](#SmartShape)  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | Unique ID of shape's SVG HTML element. By default, empty. |
| name | <code>string</code> | Name of shape. By default, `Unnamed shape` |
| maxPoints | <code>number</code> | Number of points, which possible to add to the shape interactively. By default `-1`, which means Unlimited |
| style | <code>object</code> | CSS styles, that will be applied to underlying polygon SVG element. Using CSS styles and classes is an alternative way to specify options of SVG elements: https://jenkov.com/tutorials/svg/svg-and-css.html, https://css-tricks.com/svg-properties-and-css/ |
| fillGradient | <code>object</code> | Defines gradient object, that should be used to fill the shape. This could be either linear gradient or radial gradient. To make it work, it's required to set 'fill:#gradient' inside style. See demo [here](https://github.com/AndreyGermanov/smart_shape/blob/main/tests/dev/gradient.html). |
| fillImage | <code>object</code> | Defines image fill object to fill the shape with image. Should contain following fields: `href` - URL to image, `width` - width of image, `height` - height of image To make image fill work, it's required to set 'fill:#image' inside style See demo [here](https://github.com/AndreyGermanov/smart_shape/blob/main/tests/dev/fillimage.html). |
| filters | <code>object</code> | Object, that defines a set of SVG filters, that will be applied to this shape. Keys are names of filters, for example `feDropShadow` for drop-shadow filter. Values are objects with attributes for each filter. All attributes, that supported by each particular SVG filter are supported. See more about SVG filters [here](#https://developer.mozilla.org/en-US/docs/Web/SVG/Element/filter). The demo of applying feDropShadow filter see [here](https://github.com/AndreyGermanov/smart_shape/blob/main/tests/dev/svgfilters.html) |
| classes | <code>string</code> | CSS class names, that will be applied to underlying polygon SVG element. |
| offsetX | <code>number</code> | Number of pixels to add to X coordinate of each point to move entire shape to the right. Helps to move entire figure without need to change coordinates of each point. Default: `0`. |
| offsetY | <code>number</code> | Number of pixels to add to Y coordinate of each point to move entire shape to the bottom. Helps to move entire figure without need to change coordinates of each point. Default: `0` |
| canDragShape | <code>boolean</code> | Is it allowed to drag shape. Default `true`. |
| canAddPoints | <code>boolean</code> | Is it allowed to add points to the shape interactively, by mouse double-click on the screen. Default `false`. |
| canScale | <code>boolean</code> | Is it allowed to scale this shape. If true, then [ResizeBox](#ResizeBox) appears around shape and user can drag it to resize shape in different directions |
| canRotate | <code>boolean</code> | Is it allowed to rotate this shape. If true, then [RotateBox](#RotateBox) appears around shape and user can drag it to rotate shape in different directions |
| pointOptions | <code>object</code> | Default options for created points. See  [options](#SmartPoint+options) property of `SmartPoint` object. |
| zIndex | <code>number</code> | Order of element in a stack of HTML elements (https://www.w3schools.com/cssref/pr_pos_z-index.asp). Elements if higher z-index value placed on top. |
| bounds | <code>object</code> | Bounds for shape movement and points dragging. This is an object with `left`, `top`, `right` and `bottom` values. By default, all values are equal -1, which means that bounds not specified. If bounds not specified, then left, top, right and bottom of container element will be used for this |
| visible | <code>boolean</code> | Shape is visible or not. By default, `true`. |
| displayMode | [<code>SmartShapeDisplayMode</code>](#SmartShapeDisplayMode) | In which mode the shape is displayed: default mode or with resize or rotate box around it. See [SmartShapeDisplayMode](#SmartShapeDisplayMode) |
| managed | <code>boolean</code> | Should this shape be managed by [SmartShapeManager](#SmartShapeManager). Default: true |
| minWidth | <code>number</code> | Minimum width of shape. By default `-1` - unlimited |
| minHeight | <code>number</code> | Minimum height of shape. By default `-1` - unlimited |
| maxWidth | <code>number</code> | Maximum width of shape. By default `-1` - unlimited |
| maxHeight | <code>number</code> | Maximum width of shape. By default `-1` - unlimited |
| hasContextMenu | <code>boolean</code> | Should the shape have context menu. False by default |
| minPoints | <code>number</code> | Minimum number of points in the shape. Default: 3. |
| groupChildShapes | <code>boolean</code> | Should child shapes be grouped and move/resize/rotate/destroy together. True by default |
| moveToTop | <code>boolean</code> | Should shape go to top based on "zIndex" when user clicks on it. True by default |
| compactExport | <code>boolean</code> | If this is true, then it will save only coordinates of points, but not their properties during export to JSON using .toJSON() method |
| forceCreateEvent | <code>boolean</code> | Internal parameter used by JSON import. By default, if shape does not have point when create, it does not emit SHAPE_CREATE event on init() method. If this option set to true, then init() methods emits SHAPE_CREATE event event for empty shapes. |

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
<a name="SmartShape+rotateBox"></a>

### smartShape.rotateBox : [<code>RotateBox</code>](#RotateBox)
[RotateBox](#RotateBox) component, used to rotate shape if
`canRotate` option enabled

**Kind**: instance property of [<code>SmartShape</code>](#SmartShape)  
<a name="SmartShape+initCenter"></a>

### smartShape.initCenter : <code>array</code>
Initial center of shape, when user started rotating the shape
using Rotate Box

**Kind**: instance property of [<code>SmartShape</code>](#SmartShape)  
<a name="SmartShape+shapeMenu"></a>

### smartShape.shapeMenu : <code>SmartShapeContextMenu</code>
Context menu of shape that appear on right mouse click
if `hasContextMenu` option is true

**Kind**: instance property of [<code>SmartShape</code>](#SmartShape)  
<a name="SmartShape+init"></a>

### smartShape.init(root, options, points, show) ⇒ <code>object</code>
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
| show | <code>boolean</code> | Should display the shape by default. Default: true |

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

<a name="SmartShape+insertPoint"></a>

### smartShape.insertPoint(x, y, beforePoint, pointOptions) ⇒ <code>object</code>
Insert point to shape before specified point

**Kind**: instance method of [<code>SmartShape</code>](#SmartShape)  
**Returns**: <code>object</code> - [SmartPoint](#SmartPoint) object of added point  

| Param | Type | Description |
| --- | --- | --- |
| x | <code>number</code> | X coordinate relative to container left corner |
| y | <code>number</code> | Y coordinate relative to container top corner |
| beforePoint | <code>array</code> \| [<code>SmartPoint</code>](#SmartPoint) | Coordinates of point as [x,y] array or as a SmartPoint object, before which point should be inserted |
| pointOptions | <code>object</code> | Array of point options. Described in [SmartPoint.options](#SmartPoint+options). Can be empty, in this case default `SmartShape.options.pointOptions` will be used, or default options of SmartPoint class itself. |

<a name="SmartShape+addPoints"></a>

### smartShape.addPoints(points, pointOptions)
Adds specified points to shape.

**Kind**: instance method of [<code>SmartShape</code>](#SmartShape)  

| Param | Type | Description |
| --- | --- | --- |
| points | <code>array</code> | 2D array of points to add. Each point is array of [x,y] coordinates |
| pointOptions | <code>object</code> | Points options. Described in [SmartPoint.options](#SmartPoint+options). Can be empty, in this case default `SmartShape.options.pointOptions` will be used, or default options of SmartPoint class itself. |

<a name="SmartShape+getPointIndex"></a>

### smartShape.getPointIndex(point) ⇒ <code>number</code>
Method returns and index of specified point in points array

**Kind**: instance method of [<code>SmartShape</code>](#SmartShape)  
**Returns**: <code>number</code> - Index of point or -1 if not found  

| Param | Type | Description |
| --- | --- | --- |
| point | <code>array</code> \| [<code>SmartPoint</code>](#SmartPoint) | Point to find index for. Can be specified either as coordinates array [x,y] or as a SmartPoint object |

<a name="SmartShape+deleteAllPoints"></a>

### smartShape.deleteAllPoints()
Method used to delete all points from shape

**Kind**: instance method of [<code>SmartShape</code>](#SmartShape)  
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

### smartShape.moveTo(x, y, redraw)
Moves shape to specific position. It only changes coordinates of points, but do not
redraw the shape on new position. So, you need to call `redraw` yourself after move.

**Kind**: instance method of [<code>SmartShape</code>](#SmartShape)  

| Param | Type | Description |
| --- | --- | --- |
| x | <code>number</code> | new X coordinate |
| y | <code>number</code> | new Y coordinate |
| redraw | <code>boolean</code> | should the function redraw the shape after move. True by default |

<a name="SmartShape+moveBy"></a>

### smartShape.moveBy(stepX, stepY, redraw)
Moves shape by specified number of pixels by X and Y.

**Kind**: instance method of [<code>SmartShape</code>](#SmartShape)  

| Param | Type | Description |
| --- | --- | --- |
| stepX | <code>number</code> | number of pixels to move horizontally |
| stepY | <code>number</code> | number of pixes to move vertically |
| redraw | <code>boolean</code> | should the function redraw the shape after move. True by default |

<a name="SmartShape+scaleTo"></a>

### smartShape.scaleTo(width, height)
Scales image to fit specified `width` and `height`. It only changes coordinates of points, but do not
redraws the shape on new position. So, you need to call `redraw` yourself after scale.

**Kind**: instance method of [<code>SmartShape</code>](#SmartShape)  

| Param | Type | Description |
| --- | --- | --- |
| width | <code>number</code> \| <code>null</code> | new width. If not specified, then will be calculated automatically based on height to preserve aspect ratio |
| height | <code>number</code> \| <code>null</code> | new height. If not specifie, then will be calculated automatically based on width to preserve aspect ratio |

<a name="SmartShape+scaleBy"></a>

### smartShape.scaleBy(scaleX, scaleY)
Method used to scale the shape by specified ratio by X and Y

**Kind**: instance method of [<code>SmartShape</code>](#SmartShape)  

| Param | Type | Description |
| --- | --- | --- |
| scaleX | <code>number</code> | Horizontal scale ratio |
| scaleY | <code>number</code> | Vertical scale ratio |

<a name="SmartShape+rotateBy"></a>

### smartShape.rotateBy(angle, centerX, centerY, checkBounds)
Method used to rotate this shape by specified angle around it's center.

**Kind**: instance method of [<code>SmartShape</code>](#SmartShape)  

| Param | Type | Description |
| --- | --- | --- |
| angle | <code>number</code> | Angle in degrees. Positive - clockwise, Negative - counterclock-wise |
| centerX | <code>number</code> | X coordinate of center around which to rotate the shape. By default it's a center of the shape |
| centerY | <code>number</code> | Y coordinate of center around which to rotate the shape. By default it's a center of the shape |
| checkBounds | <code>boolean</code> | Should the function check that shape won't go beyond defined bounds or container bounds after rotation. By default false. |

<a name="SmartShape+flip"></a>

### smartShape.flip(byX, byY, includeChildren)
Method used to flip shape and its children vertically or horizontally

**Kind**: instance method of [<code>SmartShape</code>](#SmartShape)  

| Param | Type | Description |
| --- | --- | --- |
| byX | <code>boolean</code> | Flip horizontally |
| byY | <code>boolean</code> | Flip vertically |
| includeChildren | <code>boolean</code> | Flip includes children shapes |

<a name="SmartShape+redraw"></a>

### smartShape.redraw()
Method used to redraw shape polygon. Runs automatically when add/remove points or change their properties.

**Kind**: instance method of [<code>SmartShape</code>](#SmartShape)  
<a name="SmartShape+switchDisplayMode"></a>

### smartShape.switchDisplayMode(mode)
Method used to switch display mode of SmartShape from Default to Resize to Rotate.

**Kind**: instance method of [<code>SmartShape</code>](#SmartShape)  

| Param | Type | Description |
| --- | --- | --- |
| mode | [<code>SmartShapeDisplayMode</code>](#SmartShapeDisplayMode) | Display mode to switch to. One of values of [SmartShapeDisplayMode](#SmartShapeDisplayMode). If not specified, then automatically switches to next mode in the following loop sequence: DEFAULT -> SCALE -> ROTATE -> DEFAULT |

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

<a name="SmartShape+belongsToShape"></a>

### smartShape.belongsToShape(x, y) ⇒ <code>boolean</code>
Method returns true if point with specified coordinates lays
inside shape or false otherwise.

**Kind**: instance method of [<code>SmartShape</code>](#SmartShape)  
**Returns**: <code>boolean</code> - True if (x,y) belongs to shape and false otherwise  

| Param | Type | Description |
| --- | --- | --- |
| x | <code>number</code> | X coodrinate |
| y | <code>number</code> | Y coordinate |

<a name="SmartShape+addEventListener"></a>

### smartShape.addEventListener(eventName, handler) ⇒ <code>function</code>
Uniform method that used to add event handler of specified type to this object.
SmartShape can emit events, defined in [ShapeEvents](#ShapeEvents) enumeration. So, you can
listen any of these events.

**Kind**: instance method of [<code>SmartShape</code>](#SmartShape)  
**Returns**: <code>function</code> - - Pointer to added event handler. Should be used to remove event listener later.  

| Param | Type | Description |
| --- | --- | --- |
| eventName | <code>string</code> | Name of event. Use one of names, defined for [ShapeEvents](#ShapeEvents). |
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
<a name="SmartShape+getCenter"></a>

### smartShape.getCenter(forGroup) ⇒ <code>array</code>
Method returns coordinates of the center of the shape.

**Kind**: instance method of [<code>SmartShape</code>](#SmartShape)  
**Returns**: <code>array</code> - Center of a shape as an array [x,y]  

| Param | Type | Description |
| --- | --- | --- |
| forGroup | <code>boolean</code> | Should get center of all shapes in the group. Default: false |

<a name="SmartShape+toSvg"></a>

### smartShape.toSvg(includeChildren) ⇒ <code>string</code>
Method exports shape and all its children to SVG document.

**Kind**: instance method of [<code>SmartShape</code>](#SmartShape)  
**Returns**: <code>string</code> - Body of SVG document as a string  

| Param | Type | Description |
| --- | --- | --- |
| includeChildren | <code>boolean</code> | Should include children of this shape to output. 'null' by default. In this case value of shape.options.groupChildShapes will be used* |

<a name="SmartShape+toPng"></a>

### smartShape.toPng(type, width, height, includeChildren) ⇒ <code>Promise</code>
Method exports shape and all its children as a PNG image

**Kind**: instance method of [<code>SmartShape</code>](#SmartShape)  
**Returns**: <code>Promise</code> - Promise that resolves either to DataURL string or to BLOB object, depending on value of
`type` argument  

| Param | Type | Description |
| --- | --- | --- |
| type | [<code>PngExportTypes</code>](#PngExportTypes) | Format of returned result - `dataurl` or `blob`. By default `dataurl` |
| width | <code>number</code> \| <code>null</code> | Width of image. If not specified, then calculate based on height or current width of shape |
| height | <code>number</code> \| <code>null</code> | Height of image. If not specified, then calculate based on width or current height of shape |
| includeChildren | <code>boolean</code> | Should include children of this shape to output. 'null' by default. In this case value of shape.options.groupChildShapes will be used* |

<a name="SmartShape+toJSON"></a>

### smartShape.toJSON(includeChildren, compact) ⇒ <code>string</code>
Method used to save shape to JSON string.
Returns string with JSON object or JSON array, depending on should it save children too

**Kind**: instance method of [<code>SmartShape</code>](#SmartShape)  
**Returns**: <code>string</code> - Serialized JSON as string.  

| Param | Type | Description |
| --- | --- | --- |
| includeChildren | <code>boolean</code> | If true, then it appends JSONs of all children to `children` property of resulting JSON. |
| compact | <code>boolean</code> | If this is true, then it will save only coordinates of points, but not their properties |

<a name="SmartShape+clone"></a>

### smartShape.clone(options, includeChildren) ⇒ [<code>SmartShape</code>](#SmartShape) \| <code>null</code>
Method creates complete copy of current shape

**Kind**: instance method of [<code>SmartShape</code>](#SmartShape)  
**Returns**: [<code>SmartShape</code>](#SmartShape) \| <code>null</code> - Created shape object or null in case of errors  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> | Array of shape options to override on cloned object. |
| includeChildren | <code>boolean</code> | If true, then clones all children of this shape as well Any [SmartShape options](#SmartShape+options) can be in this object. |

<a name="SmartShape+fromJSON"></a>

### smartShape.fromJSON(root, json, includeChildren) ⇒ [<code>SmartShape</code>](#SmartShape) \| <code>null</code>
Method used to load shape data from specified JSON string, that previously serialized by `toJSON` method

**Kind**: instance method of [<code>SmartShape</code>](#SmartShape)  
**Returns**: [<code>SmartShape</code>](#SmartShape) \| <code>null</code> - Loaded SmartShape object or null in case of JSON reading errors  

| Param | Type | Description |
| --- | --- | --- |
| root | <code>HTMLElement</code> | HTML container to insert loaded shape |
| json | <code>string</code> \| <code>object</code> | JSON-Serialized shape data as an object or as a string |
| includeChildren | <code>boolean</code> | Should load children of this shape if existed. True by default. |

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

<a name="SmartShapeGroupHelper"></a>

## SmartShapeGroupHelper
**Kind**: global class  

* [SmartShapeGroupHelper](#SmartShapeGroupHelper)
    * [new SmartShapeGroupHelper(shape)](#new_SmartShapeGroupHelper_new)
    * [.shape](#SmartShapeGroupHelper+shape) : [<code>SmartShape</code>](#SmartShape)
    * [.children](#SmartShapeGroupHelper+children) : <code>array</code>
    * [.parent](#SmartShapeGroupHelper+parent) : <code>object</code>
    * [.init()](#SmartShapeGroupHelper+init) ⇒ [<code>SmartShapeGroupHelper</code>](#SmartShapeGroupHelper)
    * [.addChild(child)](#SmartShapeGroupHelper+addChild)
    * [.removeChild(child)](#SmartShapeGroupHelper+removeChild)
    * [.removeAllChildren(all)](#SmartShapeGroupHelper+removeAllChildren)
    * [.getChildren(all)](#SmartShapeGroupHelper+getChildren) ⇒ <code>array</code>
    * [.getParent()](#SmartShapeGroupHelper+getParent) ⇒ [<code>SmartShape</code>](#SmartShape) \| <code>null</code>
    * [.getRootParent()](#SmartShapeGroupHelper+getRootParent) ⇒ [<code>SmartShape</code>](#SmartShape) \| <code>null</code>
    * [.getParentsList(plist)](#SmartShapeGroupHelper+getParentsList) ⇒ <code>array</code>
    * [.getPosition(forGroup)](#SmartShapeGroupHelper+getPosition) ⇒ <code>object</code>

<a name="new_SmartShapeGroupHelper_new"></a>

### new SmartShapeGroupHelper(shape)
Class used as an extension to [SmartShape](#SmartShape) class to add
shape groups functionality. The feature works the following way:

Each shape can have a children shapes. If shape has children, then
all actions, that user do with the shape propagated to all children:
when user drags the shape, all children draged with it, if user resizes the shape,
then all children resized with it. If user rotates the shape, then all shapes
rotates with it.

You should not use this class directly. SmartShape class instantiates it.
When init, this class extends provided SmartShape object by adding all it's methods to it
and then you can use them right from your [SmartShape](#SmartShape) instance.
For example, methods `addChild` and `removeChild` declared here can be used
right from SmartShape object, e.g. `shape.addChild(child)`, `shape.removeChild(child)`
and all other methods, declared here.


| Param | Type | Description |
| --- | --- | --- |
| shape | [<code>SmartShape</code>](#SmartShape) | SmartShape object to extend |

<a name="SmartShapeGroupHelper+shape"></a>

### smartShapeGroupHelper.shape : [<code>SmartShape</code>](#SmartShape)
SmartShape object to extend

**Kind**: instance property of [<code>SmartShapeGroupHelper</code>](#SmartShapeGroupHelper)  
<a name="SmartShapeGroupHelper+children"></a>

### smartShapeGroupHelper.children : <code>array</code>
Array of children of current shape

**Kind**: instance property of [<code>SmartShapeGroupHelper</code>](#SmartShapeGroupHelper)  
<a name="SmartShapeGroupHelper+parent"></a>

### smartShapeGroupHelper.parent : <code>object</code>
Object, that used to move all original methods of SmartShape class
before override, to be able to call them if needed

**Kind**: instance property of [<code>SmartShapeGroupHelper</code>](#SmartShapeGroupHelper)  
<a name="SmartShapeGroupHelper+init"></a>

### smartShapeGroupHelper.init() ⇒ [<code>SmartShapeGroupHelper</code>](#SmartShapeGroupHelper)
Initialization method. This function adds all methods of this
class to provided `shape` object, extending it this way

**Kind**: instance method of [<code>SmartShapeGroupHelper</code>](#SmartShapeGroupHelper)  
<a name="SmartShapeGroupHelper+addChild"></a>

### smartShapeGroupHelper.addChild(child)
Method used to add specified shape as a child of current shape

**Kind**: instance method of [<code>SmartShapeGroupHelper</code>](#SmartShapeGroupHelper)  

| Param | Type | Description |
| --- | --- | --- |
| child | [<code>SmartShape</code>](#SmartShape) | Shape to add |

<a name="SmartShapeGroupHelper+removeChild"></a>

### smartShapeGroupHelper.removeChild(child)
Method used to remove specified shape from children list of current shape

**Kind**: instance method of [<code>SmartShapeGroupHelper</code>](#SmartShapeGroupHelper)  

| Param | Type | Description |
| --- | --- | --- |
| child | [<code>SmartShape</code>](#SmartShape) | SmartShape object to add |

<a name="SmartShapeGroupHelper+removeAllChildren"></a>

### smartShapeGroupHelper.removeAllChildren(all)
Method removes all children of current shape

**Kind**: instance method of [<code>SmartShapeGroupHelper</code>](#SmartShapeGroupHelper)  

| Param | Type | Description |
| --- | --- | --- |
| all | <code>boolean</code> | If true, then it removes all children hierarchically |

<a name="SmartShapeGroupHelper+getChildren"></a>

### smartShapeGroupHelper.getChildren(all) ⇒ <code>array</code>
Method returns array of children of current shape

**Kind**: instance method of [<code>SmartShapeGroupHelper</code>](#SmartShapeGroupHelper)  
**Returns**: <code>array</code> - Array of [SmartShape](#SmartShape) objects  

| Param | Type | Description |
| --- | --- | --- |
| all | <code>boolean</code> | If true, then it returns deep list, including all children of each children of this shape |

<a name="SmartShapeGroupHelper+getParent"></a>

### smartShapeGroupHelper.getParent() ⇒ [<code>SmartShape</code>](#SmartShape) \| <code>null</code>
Method returns parent of current shape or null

**Kind**: instance method of [<code>SmartShapeGroupHelper</code>](#SmartShapeGroupHelper)  
<a name="SmartShapeGroupHelper+getRootParent"></a>

### smartShapeGroupHelper.getRootParent() ⇒ [<code>SmartShape</code>](#SmartShape) \| <code>null</code>
Method returns top parent of current shape

**Kind**: instance method of [<code>SmartShapeGroupHelper</code>](#SmartShapeGroupHelper)  
**Returns**: [<code>SmartShape</code>](#SmartShape) \| <code>null</code> - Parent shape or null  
<a name="SmartShapeGroupHelper+getParentsList"></a>

### smartShapeGroupHelper.getParentsList(plist) ⇒ <code>array</code>
Method returns a list of parents of current shape ordered from nearest to root

**Kind**: instance method of [<code>SmartShapeGroupHelper</code>](#SmartShapeGroupHelper)  
**Returns**: <code>array</code> - Array of [SmartShape](#SmartShape) objects  

| Param | Type | Description |
| --- | --- | --- |
| plist | <code>array</code> | Temporary list of parents from previous recursive call |

<a name="SmartShapeGroupHelper+getPosition"></a>

### smartShapeGroupHelper.getPosition(forGroup) ⇒ <code>object</code>
Method overrides SmartShape's getPosition method to return position
of all group if forGroup parameter is set

**Kind**: instance method of [<code>SmartShapeGroupHelper</code>](#SmartShapeGroupHelper)  
**Returns**: <code>object</code> - Position object {left,top,right,bottom,width,height}  

| Param | Type | Description |
| --- | --- | --- |
| forGroup | <code>boolean</code> | If true, then it calculates left, top, right and bottom of this shape and all its children |

<a name="SmartShapeManager"></a>

## SmartShapeManager
**Kind**: global class  

* [SmartShapeManager](#SmartShapeManager)
    * [new SmartShapeManager()](#new_SmartShapeManager_new)
    * [.shapes](#SmartShapeManager+shapes) : <code>object</code>
    * [.visibleShapes](#SmartShapeManager+visibleShapes) : <code>object</code>
    * [.activeShape](#SmartShapeManager+activeShape) : [<code>SmartShape</code>](#SmartShape)
    * [.draggedShape](#SmartShapeManager+draggedShape) : [<code>SmartShape</code>](#SmartShape)
    * [.shapeOnCursor](#SmartShapeManager+shapeOnCursor) : [<code>SmartShape</code>](#SmartShape)
    * [.containerEventListeners](#SmartShapeManager+containerEventListeners) : <code>array</code>
    * [.createShape(root, options, points, show)](#SmartShapeManager+createShape) ⇒ <code>object</code>
    * [.findShapeByPoint(point)](#SmartShapeManager+findShapeByPoint) ⇒ <code>null</code> \| [<code>SmartShape</code>](#SmartShape)
    * [.getShapeByGuid(guid)](#SmartShapeManager+getShapeByGuid) ⇒ <code>null</code> \| [<code>SmartShape</code>](#SmartShape)
    * [.getShapesByContainer(container)](#SmartShapeManager+getShapesByContainer) ⇒ <code>array</code>
    * [.getMaxZIndex(container)](#SmartShapeManager+getMaxZIndex) ⇒ <code>number</code>
    * [.getShapes()](#SmartShapeManager+getShapes) ⇒ <code>array</code>
    * [.activateShape(shape, displayMode)](#SmartShapeManager+activateShape)
    * [.addContainerEvent(container, eventName, handler)](#SmartShapeManager+addContainerEvent)
    * [.getShapeOnCursor(x, y)](#SmartShapeManager+getShapeOnCursor) ⇒ [<code>SmartShape</code>](#SmartShape) \| <code>null</code>
    * [.toJSON(shapes, compact)](#SmartShapeManager+toJSON) ⇒ <code>string</code>
    * [.fromJSON(root, json, progressCallback)](#SmartShapeManager+fromJSON) ⇒ <code>array</code> \| <code>null</code>
    * [.findShapesByOptionValue(name, value)](#SmartShapeManager+findShapesByOptionValue) ⇒ <code>array</code>
    * [.findShapeById(id)](#SmartShapeManager+findShapeById) ⇒ [<code>SmartShape</code>](#SmartShape) \| <code>null</code>
    * [.findShapeByName(name)](#SmartShapeManager+findShapeByName) ⇒ [<code>SmartShape</code>](#SmartShape) \| <code>null</code>
    * [.fromGeoJson(container, geoJSON, options)](#SmartShapeManager+fromGeoJson) ⇒ <code>array</code>
    * [.length()](#SmartShapeManager+length) ⇒ <code>number</code>

<a name="new_SmartShapeManager_new"></a>

### new SmartShapeManager()
Object that keeps collection of shapes and keep track of
their activity. This object is instantiated automatically by
when first shape created. Then it listens lifecycle events of shapes
to keep their collection, correctly switch activity status and
handle other global events related to shapes and their containers

<a name="SmartShapeManager+shapes"></a>

### smartShapeManager.shapes : <code>object</code>
Collection of [SmartShape's](#SmartShape) objects.
Each object indexed by GUID

**Kind**: instance property of [<code>SmartShapeManager</code>](#SmartShapeManager)  
<a name="SmartShapeManager+visibleShapes"></a>

### smartShapeManager.visibleShapes : <code>object</code>
Collection of [SmartShape's](#smartShape) objects
that are visible now. Each object indexed by GUID

**Kind**: instance property of [<code>SmartShapeManager</code>](#SmartShapeManager)  
<a name="SmartShapeManager+activeShape"></a>

### smartShapeManager.activeShape : [<code>SmartShape</code>](#SmartShape)
Which shape is currently selected

**Kind**: instance property of [<code>SmartShapeManager</code>](#SmartShapeManager)  
<a name="SmartShapeManager+draggedShape"></a>

### smartShapeManager.draggedShape : [<code>SmartShape</code>](#SmartShape)
Which shape user is currently dragging

**Kind**: instance property of [<code>SmartShapeManager</code>](#SmartShapeManager)  
<a name="SmartShapeManager+shapeOnCursor"></a>

### smartShapeManager.shapeOnCursor : [<code>SmartShape</code>](#SmartShape)
The shape under mouse cursor

**Kind**: instance property of [<code>SmartShapeManager</code>](#SmartShapeManager)  
<a name="SmartShapeManager+containerEventListeners"></a>

### smartShapeManager.containerEventListeners : <code>array</code>
List of event listeners, attached to containers of shapes in format
{container: DOM-link to container, name: name of event, listener: handler function}

**Kind**: instance property of [<code>SmartShapeManager</code>](#SmartShapeManager)  
<a name="SmartShapeManager+createShape"></a>

### smartShapeManager.createShape(root, options, points, show) ⇒ <code>object</code>
Method used to construct SmartShape object with specified `points` and
with specified `options`.
Then it binds this object to specified `root` HTML node and displays it

**Kind**: instance method of [<code>SmartShapeManager</code>](#SmartShapeManager)  
**Returns**: <code>object</code> - constructed SmartShape object  

| Param | Type | Description |
| --- | --- | --- |
| root | <code>HTMLElement</code> | HTML DOM node af a container element |
| options | <code>object</code> | Options object to construct this shape (See [SmartShape options](#SmartShape+options)) |
| points | <code>array</code> | 2D Array of points for shape polygon. Each element is [x,y] coordinate array |
| show | <code>boolean</code> | Should display the shape by default. Default: true |

<a name="SmartShapeManager+findShapeByPoint"></a>

### smartShapeManager.findShapeByPoint(point) ⇒ <code>null</code> \| [<code>SmartShape</code>](#SmartShape)
Method returns a shape to which specified point object belongs
or null

**Kind**: instance method of [<code>SmartShapeManager</code>](#SmartShapeManager)  

| Param | Type |
| --- | --- |
| point | [<code>SmartPoint</code>](#SmartPoint) | 

<a name="SmartShapeManager+getShapeByGuid"></a>

### smartShapeManager.getShapeByGuid(guid) ⇒ <code>null</code> \| [<code>SmartShape</code>](#SmartShape)
Returns shape by GUID

**Kind**: instance method of [<code>SmartShapeManager</code>](#SmartShapeManager)  
**Returns**: <code>null</code> \| [<code>SmartShape</code>](#SmartShape) - The shape object  

| Param | Type | Description |
| --- | --- | --- |
| guid | <code>string</code> | GUID of shape |

<a name="SmartShapeManager+getShapesByContainer"></a>

### smartShapeManager.getShapesByContainer(container) ⇒ <code>array</code>
Returns an array of shapes that connected to specified DOM container

**Kind**: instance method of [<code>SmartShapeManager</code>](#SmartShapeManager)  
**Returns**: <code>array</code> - Array of [SmartShape](#SmartShape) objects  

| Param | Type | Description |
| --- | --- | --- |
| container | <code>HTMLElement</code> | Link to container |

<a name="SmartShapeManager+getMaxZIndex"></a>

### smartShapeManager.getMaxZIndex(container) ⇒ <code>number</code>
Method returns zIndex of the topmost shape either in specified container or globally

**Kind**: instance method of [<code>SmartShapeManager</code>](#SmartShapeManager)  
**Returns**: <code>number</code> - zIndex of the topmost shape  

| Param | Type | Description |
| --- | --- | --- |
| container | <code>HTMLElement</code> \| <code>null</code> | Container to search in or null if search through all shapes |

<a name="SmartShapeManager+getShapes"></a>

### smartShapeManager.getShapes() ⇒ <code>array</code>
Method returns an array of all registered shapes (excluding rotate and resize boxes around them)

**Kind**: instance method of [<code>SmartShapeManager</code>](#SmartShapeManager)  
**Returns**: <code>array</code> - Array of [SmartShape)(#SmartShape) objects  
<a name="SmartShapeManager+activateShape"></a>

### smartShapeManager.activateShape(shape, displayMode)
Method used to make specified shape active and move it on top according to zIndex

**Kind**: instance method of [<code>SmartShapeManager</code>](#SmartShapeManager)  

| Param | Type | Description |
| --- | --- | --- |
| shape | [<code>SmartShape</code>](#SmartShape) | Shape to activate |
| displayMode | [<code>SmartShapeDisplayMode</code>](#SmartShapeDisplayMode) | In which mode to activate the shape (by default select next mode) |

<a name="SmartShapeManager+addContainerEvent"></a>

### smartShapeManager.addContainerEvent(container, eventName, handler)
Method adds event handler of specified event of specified HTML container.

**Kind**: instance method of [<code>SmartShapeManager</code>](#SmartShapeManager)  

| Param | Type | Description |
| --- | --- | --- |
| container | <code>object</code> | Container |
| eventName | <code>string</code> | Name of event |
| handler | <code>function</code> | Event handling function |

<a name="SmartShapeManager+getShapeOnCursor"></a>

### smartShapeManager.getShapeOnCursor(x, y) ⇒ [<code>SmartShape</code>](#SmartShape) \| <code>null</code>
Internal method used to determine the shape which is under
mouse cursor right now.

**Kind**: instance method of [<code>SmartShapeManager</code>](#SmartShapeManager)  
**Returns**: [<code>SmartShape</code>](#SmartShape) \| <code>null</code> - Either SmartShape object or null  

| Param | Type | Description |
| --- | --- | --- |
| x | <code>number</code> | X coordinate of mouse cursor |
| y | <code>number</code> | Y coordinate of mouse cursor |

<a name="SmartShapeManager+toJSON"></a>

### smartShapeManager.toJSON(shapes, compact) ⇒ <code>string</code>
Method used to export shapes to JSON.

**Kind**: instance method of [<code>SmartShapeManager</code>](#SmartShapeManager)  
**Returns**: <code>string</code> - JSON string with array of SmartShape objects. If not specified, then exports all
shapes, that exists in SmartShapeManager.  

| Param | Type | Description |
| --- | --- | --- |
| shapes | <code>array</code> | Array of [SmartShape](#SmartShape) objects to export |
| compact | <code>boolean</code> | If this is true, then it will save only coordinates of points, but not their properties |

<a name="SmartShapeManager+fromJSON"></a>

### smartShapeManager.fromJSON(root, json, progressCallback) ⇒ <code>array</code> \| <code>null</code>
Method loads shapes from JSON string, previously serialized by `toJSON` method

**Kind**: instance method of [<code>SmartShapeManager</code>](#SmartShapeManager)  
**Returns**: <code>array</code> \| <code>null</code> - array of loaded [SmartShape](#SmartShape) objects or null in case
of JSON reading error  

| Param | Type | Description |
| --- | --- | --- |
| root | <code>HTMLElement</code> | Container element to bind shapes to |
| json | <code>string</code> \| <code>object</code> | JSON data with shapes as an object or as a string with array of shape definitions |
| progressCallback | <code>function</code> | Callback function that triggered after loading each shape in collection with ratio of processed items between 0 and 1 |

<a name="SmartShapeManager+findShapesByOptionValue"></a>

### smartShapeManager.findShapesByOptionValue(name, value) ⇒ <code>array</code>
Method returns all shapes which have option with specified `name` and specified `value`

**Kind**: instance method of [<code>SmartShapeManager</code>](#SmartShapeManager)  
**Returns**: <code>array</code> - Array of [SmartShape](#SmartShape) objects that match condition  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | Name of option to check |
| value | <code>any</code> | Value of option to check |

<a name="SmartShapeManager+findShapeById"></a>

### smartShapeManager.findShapeById(id) ⇒ [<code>SmartShape</code>](#SmartShape) \| <code>null</code>
Method returns shape by specified ID

**Kind**: instance method of [<code>SmartShapeManager</code>](#SmartShapeManager)  
**Returns**: [<code>SmartShape</code>](#SmartShape) \| <code>null</code> - SmartShape object or null if no shape with specified ID found  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | ID to check |

<a name="SmartShapeManager+findShapeByName"></a>

### smartShapeManager.findShapeByName(name) ⇒ [<code>SmartShape</code>](#SmartShape) \| <code>null</code>
Method returns shape by specified name

**Kind**: instance method of [<code>SmartShapeManager</code>](#SmartShapeManager)  
**Returns**: [<code>SmartShape</code>](#SmartShape) \| <code>null</code> - SmartShape object or null if no shape with specified name found  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | Name to check |

<a name="SmartShapeManager+fromGeoJson"></a>

### smartShapeManager.fromGeoJson(container, geoJSON, options) ⇒ <code>array</code>
Method used to import collection of shapes from JSON array in GeoJSON format: https://geojson.org/

**Kind**: instance method of [<code>SmartShapeManager</code>](#SmartShapeManager)  
**Returns**: <code>array</code> - Array of SmartShape objects  

| Param | Type | Description |
| --- | --- | --- |
| container | <code>HTMLElement</code> | The HTML element to connect loaded shapes |
| geoJSON | <code>object</code> | Javascript object in geoJSON format |
| options | <code>object</code> | Options to tune the import process: `idField`: the field from "properties collection of GeoJSON object that used as a shape ID, `nameField`: the field from "properties" collection of GeoJSON object that used as a shape name, `width`: the width to which loaded shapes should be scaled (if not specified then calc automatically based on height), `height`: the height to which loaded shapes should be scaled (if not specified then calc automatically based on width), `options`: shape options [SmartShape.options](#SmartShape+options) to set to each shape after import |

<a name="SmartShapeManager+length"></a>

### smartShapeManager.length() ⇒ <code>number</code>
Method returns total count of shapes, managed by this manager

**Kind**: instance method of [<code>SmartShapeManager</code>](#SmartShapeManager)  
<a name="EventsManager"></a>

## EventsManager
**Kind**: global class  

* [EventsManager](#EventsManager)
    * [new EventsManager()](#new_EventsManager_new)
    * [.subscriptions](#EventsManager+subscriptions) : <code>object</code>
    * [.subscribe(events, handler)](#EventsManager+subscribe) ⇒ <code>function</code>
    * [.emit(eventName, target, params)](#EventsManager+emit) ⇒ <code>boolean</code>
    * [.unsubscribe(events, handler)](#EventsManager+unsubscribe) ⇒ <code>boolean</code>
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

### eventsManager.subscribe(events, handler) ⇒ <code>function</code>
Add subscription to event of specified type or to array of events of specified types

**Kind**: instance method of [<code>EventsManager</code>](#EventsManager)  
**Returns**: <code>function</code> - Pointer to handling function, that will be added  

| Param | Type | Description |
| --- | --- | --- |
| events | <code>string</code> \| <code>array</code> | Name of event as a string or names of events as an array of strings. |
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

### eventsManager.unsubscribe(events, handler) ⇒ <code>boolean</code>
Removes specified handler from event with specified name or from array of events with specified names.

**Kind**: instance method of [<code>EventsManager</code>](#EventsManager)  
**Returns**: <code>boolean</code> - True if really removed the handler or false if you could not remove because it does not exist  

| Param | Type | Description |
| --- | --- | --- |
| events | <code>string</code> \| <code>array</code> | Name of event as a string or names of events as an array of strings. |
| handler | <code>function</code> | Pointer to a function to remove. (This pointer returned from `subscribe` method and can be used here to unsubscribe |

<a name="EventsManager+clear"></a>

### eventsManager.clear()
Method removes all subscriptions to events.

**Kind**: instance method of [<code>EventsManager</code>](#EventsManager)  
<a name="point"></a>

## point : [<code>SmartPoint</code>](#SmartPoint)
The point object to manage menu for

**Kind**: global variable  
<a name="ResizeBoxEvents"></a>

## ResizeBoxEvents : <code>enum</code>
Enumeration that defines events, that ResizeBox can emit.

**Kind**: global enum  

| Param | Type | Description |
| --- | --- | --- |
| resize | <code>ResizeBoxEvents.RESIZE\_BOX\_RESIZE</code> | Emitted when user resized the shape by dragging one of marker points. Event object includes fields `oldPos` and `newPos` which are positions of shape before and after resizing. Position is an object with following fields "left,top,right,bottom,width,height" |
| create | <code>ShapeEvents.SHAPE\_CREATE</code> | Emitted right after shape is created and initialized. Event object contains created shape [SmartShape](#SmartShape) object in a `target` field |
| move_start | <code>MouseEvent</code> | Emitted when user presses left mouse button on shape to start dragging. Standard [MouseEvent](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent) mousedown object with additional field `pos`, which is a position of shape when movement started. Position is an object with following fields "left,top,right,bottom,width,height" |
| move | <code>MouseEvent</code> | Emitted when user drags shape. Standard [MouseEvent](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent) mousemove object, but also includes additional properties `oldPos` - shape position before previous movement. `newPos` - shape position after previous movement. Position is an object with following fields "left,top,right,bottom,width,height" |
| move_end | <code>MouseEvent</code> | Emitted when user releases mouse button to stop drag the shape. Standard [MouseEvent](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent) mouseup object with additional field `pos`, which is a position of shape when movement started. Position is an object with following fields "left,top,right,bottom,width,height" |
| mousemove | <code>MouseEvent</code> | Emitted when user moves mouse over shape Standard [MouseEvent](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent) mousemove object |
| mouseover | <code>MouseEvent</code> | Emitted when mouse cursor goes inside shape Standard [MouseEvent](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent) mouseover object |
| mouseout | <code>MouseEvent</code> | Emitted when mouse cursor goes away from shape Standard [MouseEvent](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent) mouseout object |
| click | <code>MouseEvent</code> | Emitted when click on shape Standard [MouseEvent](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent) click object |
| dblclick | <code>MouseEvent</code> | Emitted when double-click on shape Standard [MouseEvent](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent) dblclick object |
| point_drag_start | <code>MouseEvent</code> | Emitted when user starts dragging one of shape's point. Event Includes `point` field. It is a [SmartPoint](#SmartPoint) object. |
| point_drag_move | <code>MouseEvent</code> | Emitted when user dragging one of shape's point. Event Includes `point` field. It is a [SmartPoint](#SmartPoint) object. |
| point_drag_end | <code>MouseEvent</code> | Emitted when user finishes dragging one of shape's point. Event Includes `point` field. It is a [SmartPoint](#SmartPoint) object. |
| destroy | <code>ShapeEvents.SHAPE\_DESTROY</code> | Emitted right before shape is destroyed Event object contains created shape [SmartShape](#SmartShape) object in a `target` field |

<a name="RotateBoxEvents"></a>

## RotateBoxEvents : <code>enum</code>
Enumeration that defines events, that RotateBox can emit.

**Kind**: global enum  

| Param | Type | Description |
| --- | --- | --- |
| rotate | <code>RotateBoxEvents.ROTATE\_BOX\_ROTATE</code> | Emitted when user rotate the shape by dragging one of marker points. The event object of this type contains `angle` option, which is an angle of rotation in degrees. |
| create | <code>ShapeEvents.SHAPE\_CREATE</code> | Emitted right after shape is created and initialized. Event object contains created shape [SmartShape](#SmartShape) object in a `target` field |
| move_start | <code>MouseEvent</code> | Emitted when user presses left mouse button on shape to start dragging. Standard [MouseEvent](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent) mousedown object with additional field `pos`, which is a position of shape when movement started. Position is an object with following fields "left,top,right,bottom,width,height" |
| move | <code>MouseEvent</code> | Emitted when user drags shape. Standard [MouseEvent](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent) mousemove object, but also includes additional properties `oldPos` - shape position before previous movement. `newPos` - shape position after previous movement. Position is an object with following fields "left,top,right,bottom,width,height" |
| move_end | <code>MouseEvent</code> | Emitted when user releases mouse button to stop drag the shape. Standard [MouseEvent](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent) mouseup object with additional field `pos`, which is a position of shape when movement started. Position is an object with following fields "left,top,right,bottom,width,height" |
| mousemove | <code>MouseEvent</code> | Emitted when user moves mouse over shape Standard [MouseEvent](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent) mousemove object |
| mouseover | <code>MouseEvent</code> | Emitted when mouse cursor goes inside shape Standard [MouseEvent](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent) mouseover object |
| mouseout | <code>MouseEvent</code> | Emitted when mouse cursor goes away from shape Standard [MouseEvent](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent) mouseout object |
| click | <code>MouseEvent</code> | Emitted when click on shape Standard [MouseEvent](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent) click object |
| dblclick | <code>MouseEvent</code> | Emitted when double-click on shape Standard [MouseEvent](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent) dblclick object |
| point_drag_start | <code>MouseEvent</code> | Emitted when user starts dragging one of shape's point. Event Includes `point` field. It is a [SmartPoint](#SmartPoint) object. |
| point_drag_move | <code>MouseEvent</code> | Emitted when user dragging one of shape's point. Event Includes `point` field. It is a [SmartPoint](#SmartPoint) object. |
| point_drag_end | <code>MouseEvent</code> | Emitted when user finishes dragging one of shape's point. Event Includes `point` field. It is a [SmartPoint](#SmartPoint) object. |
| destroy | <code>ShapeEvents.SHAPE\_DESTROY</code> | Emitted right before shape is destroyed Event object contains created shape [SmartShape](#SmartShape) object in a `target` field |

<a name="PointEvents"></a>

## PointEvents : <code>enum</code>
Enumeration of event names, that can be emitted by [SmartPoint](#SmartPoint) object.

**Kind**: global enum  

| Param | Type | Description |
| --- | --- | --- |
| create | <code>PointEvents.POINT\_ADDED</code> | Emitted when point created. Event contains SmartPoint object in `target` field |
| drag_start | <code>MouseEvent</code> | Emitted when user press mouse button on point before start dragging it. Standard [MouseEvent](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent) mousedown object |
| drag | <code>MouseEvent</code> | Emitted when user drags point by a mouse. Standard [MouseEvent](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent) mousemove object and two additional fields: `oldX` and `oldY` coordinates, which was before event start. |
| drag_end | <code>MouseEvent</code> | Emitted when user releases mouse button after pressing it on point Standard [MouseEvent](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent) mouseup object |
| mousedown | <code>MouseEvent</code> | Emitted when user presses mouse button on point Standard [MouseEvent](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent) mousedown object |
| mouseup | <code>MouseEvent</code> | Emitted when user releases mouse button on point Standard [MouseEvent](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent) mouseup object |
| mouseover | <code>MouseEvent</code> | Emitted when mouse cursor goes inside point Standard [MouseEvent](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent) mouseover object |
| mousemove | <code>MouseEvent</code> | Emitted when mouse cursor moves on top of point Standard [MouseEvent](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent) mouseover object |
| mouseout | <code>MouseEvent</code> | Emitted when mouse cursor goes away from point Standard [MouseEvent](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent) mouseout object |
| click | <code>MouseEvent</code> | Emitted when click on point Standard [MouseEvent](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent) click object |
| dblclick | <code>MouseEvent</code> | Emitted when double-click on point Standard [MouseEvent](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent) dblclick object |
| destroy | <code>PointEvents.POINT\_DESTROYED</code> | Emitted when point destroyed (by pressing right mouse button on it or programmatically using `destroy` method) |

<a name="PointMoveDirections"></a>

## PointMoveDirections : <code>enum</code>
Enumeration that defines point move directions. Values from this enumeration should be used
in point option `moveDirections` to specify in which directions point can be moved.
Members of enumeration: `LEFT`, `TOP`, `RIGHT`, `BOTTOM`

**Kind**: global enum  
<a name="SmartShapeDisplayMode"></a>

## SmartShapeDisplayMode : <code>enum</code>
Enumeration of SmartShape display modes

**Kind**: global enum  

| Param | Description |
| --- | --- |
| default | basic display mode without resize or rotate boxes and points are hidden |
| selected | In this mode the points displayed on shape, but resize and rotate boxes are hidden |
| scale | In this mode the shape displayed with resize box around it |
| rotate | In this mode the shape displayed with rotate box around it |

<a name="PngExportTypes"></a>

## PngExportTypes : <code>enum</code>
Enumeration of PNG export types for SmartShape.toPng() function

**Kind**: global enum  

| Param | Description |
| --- | --- |
| dataurl | Return PNG as a DataURL string |
| blob | Return PNG as a BLOB object |

<a name="ShapeEvents"></a>

## ShapeEvents : <code>enum</code>
Enumeration of event names, that can be emitted by [SmartShape](#SmartShape) object.

**Kind**: global enum  

| Param | Type | Description |
| --- | --- | --- |
| create | <code>ShapeEvents.SHAPE\_CREATE</code> | Emitted right after shape is created and initialized. Event object contains created shape [SmartShape](#SmartShape) object in a `target` field |
| move_start | <code>MouseEvent</code> | Emitted when user presses left mouse button on shape to start dragging. Standard [MouseEvent](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent) mousedown object with additional field `pos`, which is a position of shape when movement started. Position is an object with following fields "left,top,right,bottom,width,height" |
| move | <code>MouseEvent</code> | Emitted when user drags shape. Standard [MouseEvent](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent) mousemove object, but also includes additional properties `oldPos` - shape position before previous movement. `newPos` - shape position after previous movement. Position is an object with following fields "left,top,right,bottom,width,height" |
| move_end | <code>MouseEvent</code> | Emitted when user releases mouse button to stop drag the shape. Standard [MouseEvent](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent) mouseup object with additional field `pos`, which is a position of shape when movement started. Position is an object with following fields "left,top,right,bottom,width,height" |
| mousemove | <code>MouseEvent</code> | Emitted when user moves mouse over shape Standard [MouseEvent](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent) mousemove object |
| mouseover | <code>MouseEvent</code> | Emitted when mouse cursor goes inside shape Standard [MouseEvent](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent) mouseover object |
| mouseout | <code>MouseEvent</code> | Emitted when mouse cursor goes away from shape Standard [MouseEvent](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent) mouseout object |
| click | <code>MouseEvent</code> | Emitted when click on shape Standard [MouseEvent](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent) click object |
| dblclick | <code>MouseEvent</code> | Emitted when double-click on shape Standard [MouseEvent](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent) dblclick object |
| resize | <code>ResizeBoxEvents.RESIZE\_BOX\_RESIZE</code> | Emitted when user resized the shape using resize box. Event object includes fields `oldPos` and `newPos` which are positions of shape before and after resizing. Position is an object with following fields "left,top,right,bottom,width,height" |
| rotate | <code>RotateBoxEvents.ROTATE\_BOX\_ROTATE</code> | Emitted when user rotated the shape using rotate box Event object includes the `angle` field, which is a rotation angle. Position is an object with following fields "left,top,right,bottom,width,height" |
| point_drag_start | <code>MouseEvent</code> | Emitted when user starts dragging one of shape's point. Event Includes `point` field. It is a [SmartPoint](#SmartPoint) object. |
| point_drag_move | <code>MouseEvent</code> | Emitted when user dragging one of shape's point. Event Includes `point` field. It is a [SmartPoint](#SmartPoint) object. |
| point_drag_end | <code>MouseEvent</code> | Emitted when user finishes dragging one of shape's point. Event Includes `point` field. It is a [SmartPoint](#SmartPoint) object. |
| point_added | <code>MouseEvent</code> | Emitted when new point added to the shape |
| point_removed | <code>MouseEvent</code> | Emitted when point removed from the shape |
| destroy | <code>ShapeEvents.SHAPE\_DESTROY</code> | Emitted right before shape is destroyed |
| add_child | <code>ShapeEvents.SHAPE\_ADD\_CHILD</code> | New child shape added to this shape. Event object contains a `child` field which is a SmartShape object of added child. |
| remove_child | <code>ShapeEvents.SHAPE\_REMOVE\_CHILD</code> | Child shape removed from this shape. Event object contains a `child` field which is a SmartShape object of removed child. |
| shape_activated | <code>ShapeEvents.SHAPE\_ACTIVATED</code> | Shape activated |

<a name="SmartShapeManagerEvents"></a>

## SmartShapeManagerEvents : <code>enum</code>
Events that SmartShapeManager can emit.

**Kind**: global enum  

| Param | Description |
| --- | --- |
| MANAGER_ADD_CONTAINER_LISTENERS | Emits each time when add SmartShape event listeners to container for shapes (usually after first shape added to it) |
| MANAGER_REMOVE_CONTAINER_LISTENERS | Emits each time when remove SmartShape event listeners from container for shapes (usually after last shape removed from container) |

<a name="ContainerEvents"></a>

## ContainerEvents : <code>enum</code>
Enumeration of event names, that can be emitted by [SmartShape](#SmartShape) object.

**Kind**: global enum  

| Param | Description |
| --- | --- |
| CONTAINER_BOUNDS_CHANGED | Emitted by shape when dimensions of container changed, e.g. browser  window resized. Sends the event with the following fields: `bounds` -an object with the following fields:  left:number,top:number,right:number,bottom:number, `points` - array of points ([SmartPoint](#SmartPoint) objects)  with array of all points of this shape, which could be affected by this bounds change. |

