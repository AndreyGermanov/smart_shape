import ResizeBox from "./ResizeBox/ResizeBox.js";
import RotateBox from "./RotateBox/RotateBox.js";
import SmartShape from "./SmartShape/SmartShape.js";
import SmartShapeManager from "./SmartShapeManager/SmartShapeManager.js";

try {
    window.ResizeBox = ResizeBox;
    window.SmartShape = SmartShape;
    window.RotateBox = RotateBox;
    window.SmartShapeManager = SmartShapeManager
} catch (err) {}

export {SmartShape,ResizeBox,RotateBox,SmartShapeManager}
