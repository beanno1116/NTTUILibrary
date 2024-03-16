import styles from './app.module.css';
import NTTDatePicker from './components/NTTDatePicker/NTTDatePicker'
import NTTPopover,{positions,usePopover} from './components/NTTPopover/NTTPopover';

function App() {
  const {isShowing,close,open,position} = usePopover();

  const onClickHandler = (e) => {
    
  }

  return (
    <div className={styles.app}>
      
      <section className={styles.component_row}>
        <NTTDatePicker />
      </section>

      <section className={styles.component_row}>
        <NTTPopover close={close} open={open} show={isShowing} config={{position:positions.RIGHT_CENTER}}>
          <button onClick={(e) => onClickHandler(e)}>Click Me!</button>
        </NTTPopover>        
      </section>

      
      <div style={{position:"absolute",top:'100%',height:"500px",width:"100%"}}></div>
    </div>    
  )
}

export default App
