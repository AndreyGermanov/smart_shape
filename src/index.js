import ResizeBox from "./ResizeBox/ResizeBox.js";
import RotateBox from "./RotateBox/RotateBox.js";
import SmartShape, {SmartShapeDisplayMode} from "./SmartShape/SmartShape.js";;
import SmartShapeManager from "./SmartShapeManager/SmartShapeManager.js";
import EventsManager from "./events/EventsManager.js";
import SmartShapeEventListener,{ShapeEvents} from "./SmartShape/SmartShapeEventListener.js";
import SmartShapeGroupHelper from "./SmartShape/SmartShapeGroupHelper.js";

try {
    window.ResizeBox = ResizeBox;
    window.SmartShape = SmartShape;
    window.RotateBox = RotateBox;
    window.SmartShapeManager = SmartShapeManager;
    window.SmartShapeGroupHelper = SmartShapeGroupHelper;
    window.SmartShapeDisplayMode = SmartShapeDisplayMode;
    window.ShapeEvents = ShapeEvents;
} catch (err) {}

export {SmartShape,ResizeBox,RotateBox,SmartShapeManager,EventsManager,ShapeEvents,SmartShapeDisplayMode,SmartShapeGroupHelper,SmartShapeEventListener};
