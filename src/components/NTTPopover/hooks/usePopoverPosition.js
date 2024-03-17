import { useState } from "react";
import Positioner from "../Positioner";
import { getDOMRectObj,getModalDimensions } from "../../../utilities/WEDomUtils";





const usePopoverPosition = (config) => {
  const {position:positionType} = config;
  const [position,setPosition] = useState({top:0,left:0});

  const updatePosition = (anchor,popover) => {
    let anchorRect = getDOMRectObj(anchor);
    let popoverRect = getModalDimensions(popover);
    const positioner = Positioner(anchorRect,popoverRect);        
    const position = positioner.calculatePosition(positionType);    
    setPosition({...position});        
  }

  return {
    position,
    updatePosition
  }
}

export default usePopoverPosition;