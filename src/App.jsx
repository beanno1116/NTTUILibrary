import styles from './app.module.css';
import NTTAccordion from './components/NTTAccordion/NTTAccordion';
import NTTButton from './components/NTTButton/NTTButton';
import NTTDatePicker from './components/NTTDatePicker/NTTDatePicker'
import NTTPopover,{positions,usePopover} from './components/NTTPopover/NTTPopover';

function App() {
  const {isShowing,close,open} = usePopover();

  const nttButton_OnClickHandler = (e) => {
    alert("NTTButton clicked")
  }

  const nttPopoverButton_OnClickHandler = (e) => {
    
  }

  return (
    <div className={styles.app}>
      
      <section className={styles.component_row}>
        <NTTDatePicker />
      </section>

      <section className={styles.component_row}>
        <NTTPopover close={close} open={open} show={isShowing} config={{position:positions.BOTTOM_CENTER}}>
          <button onClick={(e) => nttPopoverButton_OnClickHandler(e)}>Click Me!</button>
        </NTTPopover>        
      </section>


      <section className={styles.component_row}>
        <NTTButton onClick={nttButton_OnClickHandler}/>
      </section>

      <section className={styles.component_row}>
        <NTTAccordion />
      </section>

      
      <div style={{position:"absolute",top:'100%',height:"500px",width:"100%"}}></div>
    </div>    
  )
}

export default App
