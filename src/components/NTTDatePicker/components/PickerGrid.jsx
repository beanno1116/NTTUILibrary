import styles from '../nttDatePicker.module.css';

const PickerGrid = ({ children }) => {
  return (
    <div className={styles.picker_grid}>
      {children}
    </div>
  );
}

export default PickerGrid;