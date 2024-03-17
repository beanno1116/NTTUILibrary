import { Children,cloneElement,useRef } from 'react';
import * as positionValues from './positions/positions';
import usePopover from './hooks/usePopover';
import useOnClickOutside from './hooks/useOnClickOutside';
import usePopoverPosition from './hooks/usePopoverPosition';

import styles from './nttPopover.module.css';



const defaultConfig = {
  position: positionValues.BOTTOM_CENTER,
  gap: 8
}




const NTTPopover = ({children,close,open,show,config={...defaultConfig}}) => {
  const {position,updatePosition} = usePopoverPosition(config);
  const childArray = Children.toArray(children);  
 

  const popoverModalRef = useRef(null);

  useOnClickOutside(popoverModalRef,() => close())

  const onClickHandler = (e) => {    
    updatePosition(e.target,popoverModalRef.current.parentElement);    
    open();
  }

  
  return (
    <div className={styles.popover}>

      <div className={`${styles.popover_modal} ${show ? styles.showing : ""}`}>
        <div ref={popoverModalRef} className={styles.modal_popover} style={{ position: "absolute", ...position }}>
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