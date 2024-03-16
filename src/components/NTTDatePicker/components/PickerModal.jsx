import { forwardRef, useState, useRef, useEffect } from 'react';
import { DAYS_OF_WEEK, dateDetails, previousMonth, nextMonth, daysInMonth, firstDayOfMonth, isDaySame, padValue } from '../../../utilities/WEDateUtils';



import PickerDetails from './PickerDetails';
import PickerGrid from './PickerGrid';
import PickerHeader from './PickerHeader';


import styles from '../nttDatePicker.module.css';
import PickerGridItem from './PickerGridItem';

const FIRST_DAY_OF_WEEK = 7;
const TOTAL_CELLS_IN_GRID = 42;


const PickerModal = forwardRef(function PickerRef({ date, handleSelect, handleClose, show, top, left }, ref) {
  const [currentDate, setCurrentDate] = useState(date || new Date());
  const [selectedDate, setSelectedDate] = useState();
  const modalRef = useRef(null);


  

  useEffect(() => {

    const detectScrollEvent = (e) => {
      handleClickOutside(e);
    }

    if (show){
      document.addEventListener("scroll",detectScrollEvent);
    }
    return () => {
      document.removeEventListener("scroll",detectScrollEvent);
    }
  })

  const renderGridItems = () => {
    const itemArray = [];
    const { month, year } = dateDetails(currentDate);

    const prevMonth = previousMonth(month, year);
    const nxtMonth = nextMonth(month, year);


    const monthDayCount = daysInMonth(month, year);
    const prevMonthDayCount = daysInMonth(prevMonth.month, prevMonth.year);


    const monthStartDay = firstDayOfMonth(month + 1, year);


    let dayCount = 1;


    while (dayCount <= TOTAL_CELLS_IN_GRID) {
      const props = {
        key: month + '_' + dayCount,
        disabled: false,
        text: Math.abs(dayCount),
        active: false,
        selected: false,
        month: month,
        year: year
      }

      if (monthStartDay === FIRST_DAY_OF_WEEK) {
        if (dayCount > monthDayCount) {
          props.disabled = true;
          props.text = Math.abs(dayCount - monthDayCount);
          props.month = nxtMonth.month;
          props.year = nxtMonth.yeaar;
        }
        else {
          if (isDaySame(new Date(`${year}-${month + 1}${padValue(monthStartDay - dayCount)}`), new Date())) {
            props.active = true;
          }
        }
      } else {

        props.text = Math.abs(monthStartDay - dayCount);
        if (dayCount <= monthStartDay) {
          props.disabled = true;
          props.text = Math.abs((prevMonthDayCount - monthStartDay)) + dayCount;
          props.month = prevMonth.month;
          props.year = prevMonth.year;
        } else if (dayCount > monthDayCount + monthStartDay) {
          props.disabled = true;
          props.text = dayCount - (monthDayCount + monthStartDay);
          props.month = nxtMonth.month;
          props.year = nxtMonth.year;
        }
        else {
          if (isDaySame(new Date(`${year}-${month + 1}${padValue(monthStartDay - dayCount)}`), new Date())) {
            props.active = true;
          }
        }


      }


      let dateForDay = new Date(`${year}-${padValue(month + 1, 2)}-${padValue(props.text, 2)} 12:00:00.000`);

      if (!props.disabled) {
        let tmp = selectedDate;
        if (tmp !== undefined) {
          if (isDaySame(selectedDate, dateForDay)) {
            props.selected = true;
          }
        } else {
          props.selected = false;
        }
      }

      itemArray.push(
        <PickerGridItem {...props} onClick={e => handleDayClickAction(e, new Date(`${props.year}-${padValue(props.month + 1, 2)}-${padValue(props.text, 2)} 12:00:00.000`))} />
        // <PickerGridItem {...props} onClick={e => handleDayClickAction(e, dateForDay)} />
      )

      dayCount++;
    }


    return itemArray;
  }
  const renderGridColumnHeadings = () => {
    return Object.values(DAYS_OF_WEEK).map((day, index) => {
      return (
        <PickerGridItem key={index + '_' + day} dayItem={true} text={day} />
      )
    })
  }

  const handleHeaderButtonClickAction = (e, action) => {
    const { month, year } = dateDetails(currentDate);
    switch (action) {
      case "prev":
        const prevMonth = previousMonth(month + 1, year);
        const prevMonthDateObj = new Date(`${prevMonth.year}-${padValue(prevMonth.month, 2)}-02`);
        setCurrentDate(prevMonthDateObj);
        break;
      case "next":
        const nxtMonth = nextMonth(month + 1, year);
        const nxtMonthDateObj = new Date(`${nxtMonth.year}-${padValue(nxtMonth.month, 2)}-02`);
        setCurrentDate(nxtMonthDateObj);
        break;
      default:
        break;
    }


  }

  const handleDetailsClickAction = (e) => {
    setCurrentDate(new Date());
  }

  const handleDayClickAction = (e, date) => {
    ;
    let dateSelected = date;
    if (selectedDate && isDaySame(dateSelected, selectedDate)) {
      dateSelected = undefined;
    }
    setSelectedDate(dateSelected);
    handleSelect(dateSelected);
  }

  const handleClickOutside = (e) => {
    debugger;
    if (ref.current && !ref.current.contains(e.target)) {
      handleClose(false);
    }
  }


  return (
    <div ref={modalRef} className={`${styles.picker_modal} ${show ? styles.showing : ""}`} onClick={handleClickOutside}>
      <div ref={ref} className={styles.date_picker_modal} style={{ position: "absolute", top: top, left: left }}>

        <PickerHeader date={currentDate} navAction={handleHeaderButtonClickAction} />

        <PickerDetails date={new Date()} onClick={handleDetailsClickAction} />

        <PickerGrid>
          {renderGridColumnHeadings()}
          {renderGridItems()}
        </PickerGrid>

      </div>
    </div>
  );
});


export default PickerModal;