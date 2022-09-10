import ResizeBox from "./ResizeBox/ResizeBox.js";
import RotateBox from "./RotateBox/RotateBox.js";
import SmartShape from "./SmartShape/SmartShape.js";


try {
    window.ResizeBox = ResizeBox;
    window.SmartShape = SmartShape;
    window.RotateBox = RotateBox;
} catch (err) {}

export {SmartShape,ResizeBox,RotateBox}
