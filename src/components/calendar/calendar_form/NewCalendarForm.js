import { useRef } from "react";
import { concatenateDateTime } from "../../../action";
import Card from "../../../action/Card";
import classes from "./NewCalendarForm.module.css";

function NewCalendarForm(props) {
  const titleInputRef = useRef();
  const startDateInputRef = useRef();
  const startTimeInputRef = useRef();
  const endDateInputRef = useRef();
  const endTimeInputRef = useRef();
  //const descriptionInputRef = useRef();
  const userUID = props.userUID;
  //console.log(props.user.uid)

  function submitHandler(event) {
    event.preventDefault();

    const enteredTitle = titleInputRef.current.value;
    const enteredstartDate = startDateInputRef.current.value;
    const enteredstartTime = startTimeInputRef.current.value;
    const enteredendDate = endDateInputRef.current.value;
    const enteredendTime = endTimeInputRef.current.value;
    //const enteredDescription = descriptionInputRef.current.value;

    const CalendarData = {
      userUID: userUID,
      title: enteredTitle,
      startDate: enteredstartDate,
      startTime: enteredstartTime,
      endDate: enteredendDate,
      endTime: enteredendTime,
      startTimestamp: concatenateDateTime(enteredstartDate, enteredstartTime),
      //description: enteredDescription,
    };

    console.log(CalendarData);
    props.onAddCalendar(CalendarData);
  }

  return (
    <Card>
      <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="title">Event Title</label>
          <input type="text" required id="title" ref={titleInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="start date">Event Start Date</label>
          <input type="date" required id="startDate" ref={startDateInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="start time">Event Start Time</label>
          <input type="time" required id="startTime" ref={startTimeInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="end date">Event End Date</label>
          <input type="date" required id="endDate" ref={endDateInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="end time">Event End Time</label>
          <input type="time" required id="endTime" ref={endTimeInputRef} />
        </div>

        <div className={classes.actions}>
          <button>Submit</button>
        </div>
      </form>
    </Card>
  );
}

export default NewCalendarForm;
