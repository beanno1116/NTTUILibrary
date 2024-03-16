import styles from '../nttDatePicker.module.css';

const PickerGridItem = ({ text, active, disabled, dayItem, selected, onClick, ...props }) => {
  return (
    <div data-month={props.month} data-year={props.year} className={`${styles.picker_grid_item} ${disabled ? styles.disabled : ""} ${active ? styles.active : ""} ${dayItem ? styles.day_item : ""} ${selected ? styles.selected : ""}`} onClick={onClick}>
      {text}
    </div>
  );
}

export default PickerGridItem;