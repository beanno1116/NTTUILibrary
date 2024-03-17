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




const positionerProto = {
  init(anchorRect,popoverRect){
    this.anchorRect = anchorRect;
    this.popoverRect = popoverRect;
  },
  calculatePosition(position){
    return this[position]();    
  },
  bottomLeft() {
    let canDisplayBelow = canDisplayBelowAnchor(this.anchorRect,this.popoverRect);
    let canAlignLeft = canDisplayAlignLeft(this.anchorRect,this.popoverRect);
    if (canDisplayBelow && canAlignLeft) {
      let position = {
        top: 0,
        left: 0
      }
      position.left = this.alignLeft();
      position.top = this.bottom();
      return {...position}
    }
  },
  bottomCenter() {
    let canDisplayBelow = canDisplayBelowAnchor(this.anchorRect,this.popoverRect);
    let canAlignCenter = canDisplayCenterHorizontally(this.anchorRect,this.popoverRect);
    if (canDisplayBelow && canAlignCenter) {
      let position = {
        top: 0,
        left: 0
      }      
      position.left = this.centerHorizontally();
      position.top = this.bottom();
      return {...position}
    }
  },
  bottomRight() {
    let canDisplayBelow = canDisplayBelowAnchor(this.anchorRect,this.popoverRect);
    let canAlignRight = canDisplayAlignRight(this.anchorRect,this.popoverRect);
    if (canDisplayBelow && canAlignRight) {
      let position = {
        top: 0,
        left: 0
      }
      position.left = this.alignRight();
      position.top = this.bottom();
      return {...position}
    }
  },
  topLeft() {
    let canDisplayAbove = canDisplayAboveAnchor(this.anchorRect,this.popoverRect);
    let canAlignLeft = canDisplayAlignLeft(this.anchorRect,this.popoverRect);
    if (canDisplayAbove && canAlignLeft) {
      let position = {
        top: 0,
        left: 0
      }
      position.left = this.alignLeft();
      position.top = this.top();
      return {...position}
    }
  },
  topCenter() {
    let canDisplayAbove = canDisplayAboveAnchor(this.anchorRect,this.popoverRect);
    let canAlignCenter = canDisplayCenterHorizontally(this.anchorRect,this.popoverRect);
    if (canDisplayAbove && canAlignCenter) {
      let position = {
        top: 0,
        left: 0
      }
      position.left = this.centerHorizontally();
      position.top = this.top();
      return {...position}
    }
  },
  topRight() {
    let canDisplayAbove = canDisplayAboveAnchor(this.anchorRect,this.popoverRect);
    let canAlignRight = canDisplayAlignRight(this.anchorRect,this.popoverRect);
    if (canDisplayAbove && canAlignRight) {
      let position = {
        top: 0,
        left: 0
      }
      position.left = this.alignRight();
      position.top = this.top();
      return {...position}
    }
  },
  leftTop() {
    let canDisplayLeft = canDisplayLeftAnchor(this.anchorRect,this.popoverRect);
    let canAlignTop = canDisplayAlignTop(this.anchorRect,this.popoverRect);
    if (canDisplayLeft && canAlignTop) {
      let position = {
        top: 0,
        left: 0
      }
      position.left = this.left();
      position.top = this.alignTop();
      return {...position}
    }
  },
  leftCenter() {
    let canDisplayLeft = canDisplayLeftAnchor(this.anchorRect,this.popoverRect);
    let canAlignCenter = canDisplayCenterVertically(this.anchorRect,this.popoverRect);
    if (canDisplayLeft && canAlignCenter) {
      let position = {
        top: 0,
        left: 0
      }
      position.left = this.left();
      position.top = this.centerVertically();
      return {...position}
    }
  },
  leftBottom() {
    let canDisplayLeft = canDisplayLeftAnchor(this.anchorRect,this.popoverRect);
    let canAlignBottom = canDisplayAlignBottom(this.anchorRect,this.popoverRect);
    if (canDisplayLeft && canAlignBottom) {
      let position = {
        top: 0,
        left: 0
      }
      position.left = this.left();    
      position.top = this.alignBottom();    
      return {...position}
    }
  },
  rightTop() {
    let canDisplayRight = canDisplayRightAnchor(this.anchorRect,this.popoverRect);
    let canAlignTop = canDisplayAlignTop(this.anchorRect,this.popoverRect);
    if (canDisplayRight && canAlignTop) {
      let position = {
        top: 0,
        left: 0
      }
      position.top = this.alignTop();
      position.left = this.right();    
      return {...position}
    }
  },
  rightCenter() {
    let canDisplayRight = canDisplayRightAnchor(this.anchorRect,this.popoverRect);
    let canAlignCenter = canDisplayCenterVertically(this.anchorRect,this.popoverRect);
    if (canDisplayRight && canAlignCenter) {
      let position = {
        top: 0,
        left: 0
      }      
      position.top = this.centerVertically();
      position.left = this.right();    
      return {...position}      
    }
  },
  rightBottom() {
    let canDisplayRight = canDisplayRightAnchor(this.anchorRect,this.popoverRect);
    let canAlignBottom = canDisplayAlignBottom(this.anchorRect,this.popoverRect);
    if (canDisplayRight && canAlignBottom) {
      let position = {
        top: 0,
        left: 0
      }
      position.top = this.alignBottom();
      position.left = this.right();    
      return {...position}
    }
  },
  alignLeft() {
    return this.anchorRect.left;
  },
  alignTop() {
    return this.anchorRect.top;
  },
  alignBottom() {
    return this.anchorRect.bottom - this.popoverRect.height; 
  },
  alignRight() {
    return this.anchorRect.right - this.popoverRect.width;
  },
  centerHorizontally() {
    return (this.anchorRect.left + (this.anchorRect.width * .5)) - (this.popoverRect.width * .5);  
  },
  centerVertically() {
    return ((this.anchorRect.top + (this.anchorRect.height * .5)) - (this.popoverRect.height * .5));
  },
  left() {
    return (this.anchorRect.left - (16 * .5)) - this.popoverRect.width;
  },
  right() {
    return (this.anchorRect.right + (16 * .5));
  },
  top() {
    return (this.anchorRect.top - (16 * .5) - this.popoverRect.height);
  },
  bottom() {
    return this.anchorRect.bottom + (16 * .5)
  }
}

const Positioner = function(anchorRect,popoverRect) {  
  var instance = Object.create(positionerProto);  
  instance.init(anchorRect,popoverRect);
  return instance;
}



const make = function(objType,...args){
  var instance = Object.create(objType);
  instance.init(...args);
  return instance;
}

export {Positioner as default,make}