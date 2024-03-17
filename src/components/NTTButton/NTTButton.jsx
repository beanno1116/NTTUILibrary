

import { useCallback } from 'react';
import styles from './nttButton.module.css';

const defaultConfig = {
  preventDefault: false,
  propagate: true
}

const NTTButton = ({ onClick,config={},children,...props }) => {

  const buttonClasses = () => {
    let classStr = styles.button;
    switch (props.size) {
      case "sm":
        return classStr = classStr + " " + styles.sm;   
      case "lg":
        return classStr = classStr + " " + styles.lg;   
      default:
        return classStr;
    }
  }
  

  const handleButtonClickEvent = useCallback((e) => {
    const options = {...defaultConfig,...config};
    options.preventDefault && e.preventDefault();
    !options.propagate && e.stopPropagation();
    onClick && onClick(e);
  },[onClick,config])

  return (
    <button className={buttonClasses()} {...props} onClick={e => handleButtonClickEvent(e)}>
      {children ? children : "BUTTON"}
    </button>
  );
}

export default NTTButton;