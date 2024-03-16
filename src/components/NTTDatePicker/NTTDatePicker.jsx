import { useRef, useState, useEffect } from 'react';
import { formatISO, DAYS_OF_WEEK, MONTHS_OF_YEAR, dateDetails } from '../../utilities/WEDateUtils';
import { getElementStyle,getElementQuadrant } from '../../utilities/WEDomUtils.js';




import PickerModal from './components/PickerModal.jsx';


import styles from './nttDatePicker.module.css';


const displayPositions = {
  top: {
    left: "",
    mid: "",
    right: ""
  },
  bottom: {
    left: "",
    mid: "",
    right: ""
  },
  left: {
    top: "",
    mid: "",
    bottom: ""
  },
  right: {
    top: "",
    mid: "",
    bottom: ""
  }
}

const positions = {
  centerVertically: true,
  topAlign: false,
  bottomAlign: false,
  centerHorizontally:false,
  leftAlign: false,
  rightAlign: true
}

const defaultConfig = {
  position: "auto",
}



const domRectAsObject = (ele) => {
  const rect = ele.getBoundingClientRect();
  return {
    bottom: rect.bottom,
    height: rect.height,
    width: rect.width,
    top: rect.top,
    left: rect.left,
    right: rect.right,
    x: rect.x,
    y: rect.y
  }
}
const getModalDimensions = (ele) => {
  
  
  ele.parentElement.style.visibility = 'hidden';
  ele.parentElement.style.opacity = '0';
  ele.parentElement.classList.add(styles.showing);
  let retObj = domRectAsObject(ele);
  ele.parentElement.style.opacity = '1';
  ele.parentElement.style.visibility = 'visible';
  ele.parentElement.classList.remove(styles.showing);
  return retObj;
}

const canDisplayCenter = (_inputDims, _modalDims) => {

  let inputCenter = _inputDims.left + (_inputDims.width * .5);
  
  let halfModalWidth = _modalDims.width * .5;
  

  let modalLeft = inputCenter - halfModalWidth;
  let modalRight = inputCenter + halfModalWidth;
  
  
  if ((modalLeft < 0) || (modalRight > window.innerWidth)) {
    return false;
  }
  

  return true;

}
const canDisplayLeft = (_inputDims, _modalDims) => {
  let leftCheck = (_inputDims.left - _modalDims.width);
  if (leftCheck < 0) {
    return false;
  }
  return true;
}
const canDisplayRight = (_inputDims, _modalDims) => {
  let leftCheck =  _inputDims.right + (_modalDims.width + (16 * .5));
  if (leftCheck < 0) {
    return false;
  }
  return true;
}
const canDisplayBottom = (_inputDims, _modalDims) => {
  
  let topCheck = (_inputDims.bottom + (16 * .5)) + _modalDims.height;
  if (topCheck > window.innerHeight) {
    return false;
  }
  return true;
}
const canDisplayTop = (_inputDims, _modalDims) => {
  debugger;
  let topCheck = (_inputDims.top - (16 * .5)) - _modalDims.height;
  if (topCheck < 0) {
    return false;
  }
  return true;
}

const modalBelow = (_inputDims, _modalDims) => {
  let top = _inputDims.height + (16 * .5) + _inputDims.top;
  return top;
}
const modalAbove = (_inputDims, _modalDims) => {
  debugger;
  let top = ((16 * .5) + _modalDims.height + _inputDims.height) - _inputDims.top;
  return top;
}
const centerModal = (_inputDims, _modalDims) => {
  let halfModal = _modalDims.width * .5;
  let inputMiddle = (_inputDims.width / 2) + _inputDims.left;
  let left = inputMiddle - halfModal;
  return left;
}
const leftAlignModal = (_inputDims, _modalDims) => {
  let left = _inputDims.left;
  return left;
}
const rightAlignModal = (_inputDims, _modalDims) => {
  let inputRight = _inputDims.left + (_inputDims.width - (16 * 1.25));
  let left = inputRight - _modalDims.width;
  return left;
}

const alignTop = () => {

}

const alignBottom = () => {

}

const centerVertically = (inputDims,modalDims) => {
  return (modalDims.height * .5) - (inputDims.height * .5)
}

const centerHorizontally = () => {

}

const getModalTopAndLeft = (_inputDims, _modalDims) => {
  
  let displayCenter = canDisplayCenter(_inputDims,_modalDims);
  let displayBottom = canDisplayBottom(_inputDims,_modalDims);
  let displayTop = canDisplayTop(_inputDims,_modalDims);
  let displayLeft = canDisplayLeft(_inputDims,_modalDims);
  let displayright = canDisplayRight(_inputDims,_modalDims);

  let tmpTop = 0;
  let tmpLeft = 0;
  debugger;

  

  if (!displayBottom && !displayTop) {
    // tmpTop = modalAbove(_inputDims,_modalDims)
    // tmpLeft = rightAlignModal(_inputDims,_modalDims);
  }
  
  if (displayCenter){
    tmpTop = centerVertically(_inputDims,_modalDims);
  }
  if (displayLeft){
    tmpLeft = rightAlignModal(_inputDims,_modalDims) - _inputDims.width;
  }else{
    tmpLeft = leftAlignModal(_inputDims,_modalDims) + _inputDims.width;
    tmpTop = centerVertically(_inputDims,_modalDims);
  }
  // let left = canDisplayCenter(_inputDims, _modalDims) ?
  //   centerModal(_inputDims, _modalDims) : canDisplayLeft(_inputDims, _modalDims) ?
  //     leftAlignModal(_inputDims, _modalDims) : canDisplayRight(_inputDims, _modalDims) ?
  //       rightAlignModal(_inputDims, _modalDims) : centerModal(_inputDims, _modalDims);
  // let top = canDisplayBottom(_inputDims, _modalDims) ?
  //   modalBelow(_inputDims, _modalDims) : modalAbove(_inputDims, _modalDims);
  // return {
  //   top,
  //   left
  // }
  return {
    top: tmpTop,
    left: tmpLeft
  }
}


const NTTDatePicker = ({ date = new Date(), selectRange = false, ...props }) => {
  const [defaultDate, setDefaultDate] = useState(date);
  const [showPickerModal, setShowPickerModal] = useState(false);
  const [pickerModalCoords, setPickerModalCoords] = useState({
    top: 0,
    left: 0
  })

  const inputRef = useRef(null);
  const modalRef = useRef(null);

  useEffect(() => {
    updateInput();
  }, [defaultDate])

  const updateInput = () => {
    if (inputRef.current) {
      inputRef.current.value = formatISO(defaultDate);
    }
  }

  const handleDateSelectAction = (date) => {
    
    console.log(date);
    if (date !== undefined) {
      setDefaultDate(date);
      !selectRange && setShowPickerModal(false);
      return;
    }
    setDefaultDate(new Date());
  }

  const handleDateClick = (e) => {
    
    let inputDims;
    let modalDims;
    let location = {
      top: 0,
      left: 0
    }

    if (inputRef.current) {
      let quad = getElementQuadrant(inputRef.current);
      
      let tmpDim = domRectAsObject(modalRef.current);
      modalDims = getModalDimensions(modalRef.current);
      inputDims = domRectAsObject(inputRef.current);
      location = { ...getModalTopAndLeft(inputDims, modalDims) };
    }

    setPickerModalCoords({ top: location.top, left: location.left });
    setShowPickerModal(true);
  }

  return (
    <div className={styles.date_picker}>
      <div className={styles.input_wrapper} onClick={handleDateClick}>
        <input type={"date"} ref={inputRef} />
      </div>

      <PickerModal ref={modalRef} top={pickerModalCoords.top} left={pickerModalCoords.left} date={defaultDate} show={showPickerModal} handleClose={setShowPickerModal} handleSelect={handleDateSelectAction} />

    </div>
  );
}

export default NTTDatePicker;