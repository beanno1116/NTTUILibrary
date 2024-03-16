import { useState } from "react"


const popoverPosition = function(anchorRect,popoverRect){
  const instance = {
    getPositionCalculator: (position) => {
      return this.verify[position];
    },
    calculate: {
      alignLeft: (anchorRect) => {
        return anchorRect.left;
      },
      alignTop: (anchorRect) => {
        return anchorRect.top;
      },
      alignBottom: (anchorRect,popoverRect) => {
        return anchorRect.bottom - popoverRect.height; 
      },
      alignRight: (anchorRect,popoverRect) => {
        return anchorRect.right - popoverRect.width;
      },
      centerHorizontally: (anchorRect,popoverRect) => {
        return (anchorRect.left + (anchorRect.width * .5)) - (popoverRect.width * .5);  
      },
      centerVertically: (anchorRect,popoverRect) => {
        return ((anchorRect.top + (anchorRect.height * .5)) - (popoverRect.height * .5));
      },
      left: (anchorRect,popoverRect) => {
        return (anchorRect.left - (16 * .5)) - popoverRect.width;
      },
      right: (anchorRect) => {
        return (anchorRect.right + (16 * .5));
      },
      top: (anchorRect,popoverRect) => {
        return (anchorRect.top - (16 * .5) - popoverRect.height);
      },
      bottom: (anchorRect) => {
        return anchorRect.bottom + (16 * .5)
      },
      topLeft: (anchorRect,popoverRect) => {
        let position = {
          top: 0,
          left: 0
        }
        position.left = positions.alignLeft(anchorRect);
        position.top = positions.top(anchorRect,popoverRect);
        return {...position}
      },
      topCenter: (anchorRect,popoverRect) => {
        let position = {
          top: 0,
          left: 0
        }
        position.left = positions.centerHorizontally(anchorRect,popoverRect);
        position.top = positions.top(anchorRect,popoverRect);
        return {...position}
      },
      topRight: (anchorRect,popoverRect) => {
        let position = {
          top: 0,
          left: 0
        }
        position.left = positions.alignRight(anchorRect,popoverRect);
        position.top = positions.top(anchorRect,popoverRect);
        return {...position}
      },
      rightTop: (anchorRect,popoverRect) => {
        let position = {
          top: 0,
          left: 0
        }
        position.top = positions.alignTop(anchorRect);
        position.left = positions.right(anchorRect);    
        return {...position}
      },
      rightCenter: (anchorRect,popoverRect) => {
        let position = {
          top: 0,
          left: 0
        }
        position.top = positions.centerVertically(anchorRect,popoverRect);
        position.left = positions.right(anchorRect);    
        return {...position}
      },
      rightBottom: (anchorRect,popoverRect) => {
        let position = {
          top: 0,
          left: 0
        }
        position.top = positions.alignBottom(anchorRect,popoverRect);
        position.left = positions.right(anchorRect);    
        return {...position}
      },
      bottomRight: (anchorRect,popoverRect) => {
        let position = {
          top: 0,
          left: 0
        }
        position.left = positions.alignRight(anchorRect,popoverRect);
        position.top = positions.bottom(anchorRect);
        return {...position}
      },
      bottomCenter: (anchorRect,popoverRect) => {
        let position = {
          top: 0,
          left: 0
        }      
        position.left = positions.centerHorizontally(anchorRect,popoverRect);
        position.top = positions.bottom(anchorRect);
        return {...position}
      },
      bottomLeft: (anchorRect,popoverRect) => {
        let position = {
          top: 0,
          left: 0
        }
        position.left = positions.alignLeft(anchorRect);
        position.top = positions.bottom(anchorRect);
        return {...position}
      },
      leftBottom: (anchorRect,popoverRect) => {
        let position = {
          top: 0,
          left: 0
        }
        position.left = positions.left(anchorRect,popoverRect);    
        position.top = positions.alignBottom(anchorRect,popoverRect);    
        return {...position}
      },
      leftCenter: (anchorRect,popoverRect) => {
        let position = {
          top: 0,
          left: 0
        }
        position.left = positions.left(anchorRect,popoverRect);
        position.top = positions.centerVertically(anchorRect,popoverRect);
        return {...position}
      },
      leftTop: (anchorRect,popoverRect) => {
        let position = {
          top: 0,
          left: 0
        }
        position.left = positions.left(anchorRect,popoverRect);
        position.top = positions.alignTop(anchorRect);
        return {...position}
      }
    },
    verify: {
      bottomLeft: (anchorRect,popoverRect) => {
        let canDisplayBelow = canDisplayBelowAnchor(anchorRect,popoverRect);
        let canAlignLeft = canDisplayAlignLeft(anchorRect,popoverRect);
        if (canDisplayBelow && canAlignLeft) {
          return positions.bottomLeft(anchorRect,popoverRect);
        }
      },
      bottomCenter: (anchorRect,popoverRect) => {
        let canDisplayBelow = canDisplayBelowAnchor(anchorRect,popoverRect);
        let canAlignCenter = canDisplayCenterHorizontally(anchorRect,popoverRect);
        if (canDisplayBelow && canAlignCenter) {
          return positions.bottomCenter(anchorRect,popoverRect);
        }
      },
      bottomRight: (anchorRect,popoverRect) => {
        let canDisplayBelow = canDisplayBelowAnchor(anchorRect,popoverRect);
        let canAlignRight = canDisplayAlignRight(anchorRect,popoverRect);
        if (canDisplayBelow && canAlignRight) {
          return positions.bottomRight(anchorRect,popoverRect);
        }
      },
      topLeft: (anchorRect,popoverRect) => {
        let canDisplayAbove = canDisplayAboveAnchor(anchorRect,popoverRect);
        let canAlignLeft = canDisplayAlignLeft(anchorRect,popoverRect);
        if (canDisplayAbove && canAlignLeft) {
          return positions.topLeft(anchorRect,popoverRect);
        }
      },
      topCenter: (anchorRect,popoverRect) => {
        let canDisplayAbove = canDisplayAboveAnchor(anchorRect,popoverRect);
        let canAlignCenter = canDisplayCenterHorizontally(anchorRect,popoverRect);
        if (canDisplayAbove && canAlignCenter) {
          return positions.topCenter(anchorRect,popoverRect);
        }
      },
      topRight: (anchorRect,popoverRect) => {
        let canDisplayAbove = canDisplayAboveAnchor(anchorRect,popoverRect);
        let canAlignRight = canDisplayAlignRight(anchorRect,popoverRect);
        if (canDisplayAbove && canAlignRight) {
          return positions.topRight(anchorRect,popoverRect);
        }
      },
      leftTop: (anchorRect,popoverRect) => {
        let canDisplayLeft = canDisplayLeftAnchor(anchorRect,popoverRect);
        let canAlignTop = canDisplayAlignTop(anchorRect,popoverRect);
        if (canDisplayLeft && canAlignTop) {
          return positions.leftTop(anchorRect,popoverRect);
        }
      },
      leftCenter: (anchorRect,popoverRect) => {
        let canDisplayLeft = canDisplayLeftAnchor(anchorRect,popoverRect);
        let canAlignCenter = canDisplayCenterVertically(anchorRect,popoverRect);
        if (canDisplayLeft && canAlignCenter) {
          return positions.leftCenter(anchorRect,popoverRect);
        }
      },
      leftBottom: (anchorRect,popoverRect) => {
        let canDisplayLeft = canDisplayLeftAnchor(anchorRect,popoverRect);
        let canAlignBottom = canDisplayAlignBottom(anchorRect,popoverRect);
        if (canDisplayLeft && canAlignBottom) {
          return positions.leftBottom(anchorRect,popoverRect);
        }
      },
      rightTop: (anchorRect,popoverRect) => {
        let canDisplayRight = canDisplayRightAnchor(anchorRect,popoverRect);
        let canAlignTop = canDisplayAlignTop(anchorRect,popoverRect);
        if (canDisplayRight && canAlignTop) {
          return positions.rightTop(anchorRect,popoverRect);
        }
      },
      rightCenter: (anchorRect,popoverRect) => {
        let canDisplayRight = canDisplayRightAnchor(anchorRect,popoverRect);
        let canAlignCenter = canDisplayCenterVertically(anchorRect,popoverRect);
        if (canDisplayRight && canAlignCenter) {
          return positions.rightCenter(anchorRect,popoverRect);
        }
      },
      rightBottom: (anchorRect,popoverRect) => {
        let canDisplayRight = canDisplayRightAnchor(anchorRect,popoverRect);
        let canAlignBottom = canDisplayAlignBottom(anchorRect,popoverRect);
        if (canDisplayRight && canAlignBottom) {
          return positions.rightBottom(anchorRect,popoverRect);
        }
      },
    
    }
  }

  instance.anchorRect = anchorRect;
  instance.popoverRect = popoverRect;
  return instance;
}


const usePopover = () => {
  const [isShowing,setIsShowing] = useState(false);
  const [position,setPosition] = useState({
    top: 0,
    left: 0
  })

const close = () => {
  setIsShowing(false);
}
const open = () => {
  setIsShowing(true);
}



  return {
    isShowing,
    position,
    close,
    open
  }
}

export default usePopover;