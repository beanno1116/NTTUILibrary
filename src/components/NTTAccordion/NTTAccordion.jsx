import AccordionPanel from './components/AccordionPanel';
import useAccordion from './hooks/useAccordion';

import { demoAccordionData } from '../../data/demoData';
import styles from './nttAccordion.module.css';



const NTTAccordion = () => {
  const {activePanel,accordionClickHandler} = useAccordion();
  

  return (
    <div className={styles.accordion} onClick={accordionClickHandler}>

      {demoAccordionData.map((panel, index) => {
        if (panel.content instanceof Array) {
          return (
            <AccordionPanel key={index} id={panel.id} text={panel.text}>
              {panel.content.map((p, index) => {
                return (
                  <p key={index}>
                    {p}
                  </p>
                )
              })}
            </AccordionPanel>
          )
        }
        return (
          <AccordionPanel id={panel.id} key={index} text={panel.text}>
            <p>{panel.content}</p>
          </AccordionPanel>
        )

      })}

       
    </div>
  );
}

NTTAccordion.Panel = AccordionPanel;

export default NTTAccordion;