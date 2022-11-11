import ResizeBox from "./ResizeBox/ResizeBox.js";
import RotateBox from "./RotateBox/RotateBox.js";
import SmartShape, {SmartShapeDisplayMode} from "./SmartShape/SmartShape.js";
import SmartShapeManager from "./SmartShapeManager/SmartShapeManager.js";
import EventsManager from "./events/EventsManager.js";
import SmartShapeEventListener,{ShapeEvents} from "./SmartShape/SmartShapeEventListener.js";
import SmartShapeGroupHelper from "./SmartShape/SmartShapeGroupHelper.js";
import {createEvent,getMousePos,getMouseCursorPos} from "./events/functions.js";

try {
    window.ResizeBox = ResizeBox;
    window.SmartShape = SmartShape;
    window.RotateBox = RotateBox;
    window.SmartShapeManager = SmartShapeManager;
    window.SmartShapeGroupHelper = SmartShapeGroupHelper;
    window.SmartShapeDisplayMode = SmartShapeDisplayMode;
    window.ShapeEvents = ShapeEvents;
    window.createEvent = createEvent;
    window.getMousePos = getMousePos;
    window.getMouseCursorPos = getMouseCursorPos
} catch (err) {}

export {
    SmartShape,ResizeBox,RotateBox,SmartShapeManager,EventsManager,ShapeEvents,
    SmartShapeDisplayMode,SmartShapeGroupHelper,SmartShapeEventListener,
    createEvent, getMousePos, getMouseCursorPos
};
