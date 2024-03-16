const getWindowRect = () => {
  try {
    return {
      top: 0,
      left: 0,
      x: 0,
      y: 0,
      width: window.innerWidth,
      height: window.innerHeight,
      bottom: window.innerHeight,
      right: window.innerWidth
    }
  } catch (error) {
    console.error(error.message);
  }
}

const WINDOW_WIDTH = getWindowRect().width;
const WINDOW_HEIGHT = getWindowRect().height;



const isDomElement = (ele) => {
  try {
    if (ele === null || ele === undefined) throw new Error("Cannot find instance of null or undefined");    
    return ele instanceof HTMLElement;
  } catch (error) {
    console.error(error.message);
  }  
}


const getDOMRectObj = (ele) => {
  try {

    if (!isDomElement(ele)) {      
      throw new Error("Cannot get rect of an instance of null or undefined");    
    }
    
    var rect = null;    
    
    rect = ele.getBoundingClientRect();
    
    if (rect === null) throw new Error("Unkown error; Could not get bounding client rect of element");

    return rect;
    
  } catch (error) {
    console.error(error.message);
    return {
      bottom: 0,
      height: 0,
      width: 0,
      top: 0,
      left: 0,
      right: 0,
      x: 0,
      y: 0
    }
  }
}

const getElementStyles = (ele) => {
  try {
    if (!isDomElement(ele)) throw new Error("Cannot get style object of a null or undefined element");
    return getComputedStyle(ele);  
  } catch (error) {
    console.error(`[WEDomUtils][FNC][getElementStyles][ERROR]-${error.message}`);  
  }
}

const getElementStyle = (ele,style="") => {
  try {
    if (!isDomElement(ele)) throw new Error("Cannot get style object of a null or undefined element");
    if (style === "") throw new Error("Must include a style string");
    const styles = getComputedStyle(ele);
    return styles.getPropertyValue(style);    
  } catch (error) {
    console.error(`[WEDomUtils][FNC][getElementStyle][ERROR]-${error.message}`);  
  }
}

const getElementQuadrant = (target) => {
  try {  
    
    let xMidpoint = WINDOW_WIDTH * .5;
    let yMidPoint = WINDOW_HEIGHT * .5;
    let targetRect = getDOMRectObj(target);
  
  
    if (targetRect.x > xMidpoint && targetRect.y > yMidPoint){
      // Bottom Right Quadrant
      return 3;
    }else if (targetRect.x < xMidpoint && targetRect.y > yMidPoint) {
      // Bottom left quadrant
      return 2;
    }else if (targetRect.x < xMidpoint && targetRect.y < yMidPoint) {
       // Top left quandrant
       return 0;
    }else if (targetRect.x > xMidpoint && targetRect.y < yMidPoint) {
      // Top right quadrant
      return 1;
    }
  } catch (error) {
    console.error(error.message);
  }


}


const getModalDimensions = (ele) => {

  const addStyles = () => {
    ele.style.visibility = 'hidden';
    ele.style.opacity = '0';
    ele.style.display = 'block';
  }
  const removeStyles = () => {
    ele.style.opacity = '1';
    ele.style.visibility = 'visible';
    ele.style.display = "none";
    ele.style.removeProperty("visibility");
    ele.style.removeProperty("opacity");
    ele.style.removeProperty("display"); 
  }
    
  addStyles();

  let retObj = {};
  if (ele.children.length > 0){
    retObj = getDOMRectObj(ele.children[0]);
  }

  removeStyles();
   
  return retObj;
}


// const domUtilities = {
//   isDomElement,
//   getDOMRectObj,
//   getElementQuadrant,
//   getElementStyle,
//   getElementStyles,
//   getModalDimensions,
//   WINDOW_HEIGHT,
//   WINDOW_WIDTH,
// }

// export default domUtilities;

export {
  isDomElement,
  getElementQuadrant,
  getDOMRectObj,
  getElementStyles,
  getElementStyle,
  getModalDimensions,
  WINDOW_WIDTH,
  WINDOW_HEIGHT
}