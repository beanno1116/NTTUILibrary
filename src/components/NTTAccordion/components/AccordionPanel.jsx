

import styles from '../nttAccordion.module.css';
import ChevronIcon from '../icons/ChevronIcon';

const Header = ({ text }) => {
  return (
    <h2>
      <button className={styles.button} aria-expanded="false">
        {text}
      </button>
      <span className={styles.header_icon}><ChevronIcon width={24} height={24} /></span>
    </h2>
  )
}

const Content = ({ children }) => {
  return (
    <div className={styles.content} role="region" aria-hidden='true'>
      <div>
        {children}
      </div>
    </div>
  )
}

const AccordionPanel = ({ id,text, children }) => {
  return (
    <div className={styles.panel} data-panel={id}>
      <Header text={text} />
      <Content>
        {children}
      </Content>
    </div>
  );
}

AccordionPanel.Header = Header;
AccordionPanel.Content = Content;

export default AccordionPanel;


