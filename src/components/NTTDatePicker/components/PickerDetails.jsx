import { DAYS_OF_WEEK,MONTHS_OF_YEAR } from '../../../utilities/WEDateUtils';


import styles from '../nttDatePicker.module.css';

const displayDetails = (displayDate) => {

  const dayName = Object.values(DAYS_OF_WEEK)[displayDate.getDay()];
  const day = displayDate.getDate();
  const month = Object.values(MONTHS_OF_YEAR)[displayDate.getMonth()];
  const year = displayDate.getFullYear();
  return `Today: ${dayName}, ${day}, ${month} ${year}`;
}

const PickerDetails = ({ date, onClick, ...props }) => {
  return (
    <div className={styles.picker_details}>
      <div className={styles.todays_date} title={"Go to today"} onClick={onClick}>{displayDetails(date)}</div>
    </div>
  );
}

export default PickerDetails;