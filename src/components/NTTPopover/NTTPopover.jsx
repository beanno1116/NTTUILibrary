import { Children,cloneElement,useRef,useState } from 'react';
import { getDOMRectObj, getElementStyle, getElementStyles,getModalDimensions } from '../../utilities/WEDomUtils';
import * as positionValues from './positions/positions';
import usePopover from './hooks/usePopover';

import styles from './nttPopover.module.css';
import useOnClickOutside from './hooks/useOnClickOutside';
import usePopoverPosition from './hooks/usePopoverPosition';




const canDisplayCenterHorizontally = (anchorRect,popoverRect) => {
  try {
    if (!anchorRect || !popoverRect) throw new Error("One or more parameters undefined");

    let inputCenter = anchorRect.left + (anchorRect.width * .5);    
    let halfModalWidth = popoverRect.width * .5;
    
    let modalLeft = inputCenter - halfModalWidth;
    let modalRight = inputCenter + halfModalWidth;
    
    if ((modalLeft < 0) || (modalRight > window.innerWidth)) {
      return false;
    }
    
    return true;
  } catch (error) {
    console.error(`[NTTPopover][FNC][canDisplayCenterHorizontally][ERROR]-${error.message}`)
  }
}

const canDisplayCenterVertically = (anchorRect,popoverRect) => {
  try {
    if (!anchorRect || !popoverRect) throw new Error("One or more parameters undefined");

    let inputCenter = (anchorRect.top + (anchorRect.height * .5));
    let halfModalHeight = popoverRect.height * .5;
    
    let modalTop = inputCenter - halfModalHeight;
    let modalBottom = inputCenter + halfModalHeight;
    
    if ((modalTop < 0) || (modalBottom > window.innerHeight)) {
      return false;
    }
    
    return true;
  } catch (error) {
    console.error(`[NTTPopover][FNC][canDisplayCenterVertically][ERROR]-${error.message}`);
  }
}

const canDisplayAboveAnchor = (anchorRect,popoverRect) => {
  try {    
    if (!anchorRect || !popoverRect) throw new Error("One or more parameters undefined");
    let topCheck = (anchorRect.top - (16 * .5)) - popoverRect.height;
    if (topCheck < 0) {
      return false;
    }
    return true;
  } catch (error) {
    console.error(`[NTTPopover][FNC][canDisplayAboveAnchor][ERROR]-${error.message}`)
  }
}

const canDisplayBelowAnchor = (anchorRect,popoverRect) => {
  try {    
    if (!anchorRect || !popoverRect) throw new Error("One or more parameters undefined");
    let bottomCheck = (anchorRect.bottom + (16 * .5)) + popoverRect.height;
    if (bottomCheck > window.innerHeight) {
      return false;
    }
    return true;
  } catch (error) {
    console.error(`[NTTPopover][FNC][canDisplayBelowAnchor][ERROR]-${error.message}`)
  }
}

const canDisplayLeftAnchor = (anchorRect,popoverRect) => {
  try {    
    let leftCheck = (anchorRect.left - popoverRect.width);
    if (leftCheck < 0) {
      return false;
    }
    return true;
  } catch (error) {
    console.error(`[NTTPopover][FNC][canDisplayLeftAnchor][ERROR]-${error.message}`)
  }
}

const canDisplayRightAnchor = (anchorRect,popoverRect) => {
  try {    
    let rightCheck =  anchorRect.right + (popoverRect.width + (16 * .5));
    if (rightCheck < 0) {
      return false;
    }
    return true;
  } catch (error) {
    console.error(`[NTTPopover][FNC][canDisplayRightAnchor][ERROR]-${error.message}`)
  }
}

const canDisplayAlignLeft = (anchorRect,popoverRect) => {
  try {    
    let alignLeftCheck = anchorRect.left + popoverRect.width;
    
    if (alignLeftCheck > window.innerWidth) {
      return false;
    }
    return true;
  } catch (error) {
    console.error(`[NTTPopover][FNC][canDisplayAlignLeft][ERROR]-${error.message}`)
  }
}

const canDisplayAlignRight = (anchorRect,popoverRect) => {
  try {    
    let alignLeftCheck = anchorRect.right - popoverRect.width;
    
    if (alignLeftCheck < 0) {
      return false;
    }
    return true;
  } catch (error) {
    console.error(`[NTTPopover][FNC][canDisplayAlignRight][ERROR]-${error.message}`)
  }
}


const canDisplayAlignBottom = (anchorRect,popoverRect) => {
  try {    
    let alignBottomCheck = anchorRect.bottom - popoverRect.height;
    
    if (alignBottomCheck < 0) {
      return false;
    }
    return true;
  } catch (error) {
    console.error(`[NTTPopover][FNC][canDisplayAlignTop][ERROR]-${error.message}`)
  }
}

const canDisplayAlignTop = (anchorRect,popoverRect) => {
  try {    
    let alignTopCheck = anchorRect.top + popoverRect.height;
    
    if (alignTopCheck > window.innerHeight) {
      return false;
    }
    return true;
  } catch (error) {
    console.error(`[NTTPopover][FNC][canDisplayAlignTop][ERROR]-${error.message}`)
  }
}




const defaultConfig = {
  position: "rightCenter"
}


const positions = {
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
}



const calculatePosition = {
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

const getPositionCalculator = (position) => {
  return calculatePosition[position];
}





const NTTPopover = ({children,close,open,show=true,config={...defaultConfig}}) => {
  const {position:poPosition,updatePosition} = usePopoverPosition(config);
  const childArray = Children.toArray(children);  
  const [position,setPosition] = useState({
    top: 0,
    left: 0
  })

  const popoverModalRef = useRef(null);

  useOnClickOutside(popoverModalRef,() => close())

  const onClickHandler = (e) => {
    let anchorRect = getDOMRectObj(e.target);
    let popoverModalRect = getModalDimensions(popoverModalRef.current.parentElement);
    // updatePosition(anchorRect,popoverModalRect);
    const caclulatePosition = getPositionCalculator(config.position);    
    const position = caclulatePosition(anchorRect,popoverModalRect);   
    setPosition({...position});    
    open();
  }

  
  return (
    <div className={styles.popover}>

      <div className={`${styles.popover_modal} ${show ? styles.showing : ""}`}>
        <div ref={popoverModalRef} className={styles.modal_popover} style={{ position: "absolute", top: position.top, left: position.left }}>
          <div>
            <div>This is a test</div>
            <div>This is a test</div>
            <div>This is a test</div>
          </div>
        </div>
      </div>
      

      {Children.map(childArray,(child) => {
        let childOnClickEvent = child.props.onClick;
        let onClick = (e) => onClickHandler(e,childOnClickEvent);
        let showing = show;        
        return cloneElement(child,{onClick,showing},child.props.children);
      })}
    </div>
  );
}

export {NTTPopover as default,positionValues as positions,usePopover};