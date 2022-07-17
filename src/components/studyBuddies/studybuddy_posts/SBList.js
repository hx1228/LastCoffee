import SBItem from "./SBItem";
import classes from "./SBList.module.css";

function SBList(props) {
  return (
    <ul className={classes.list}>
      {props.events.map((event) => (
        <SBItem
          key={event.id}
          // *bug solved* note: userUID not passed into the db
          userUID={props.userUID}
          id={event.id}
          posterUID={event.posterUID}
          gender={event.gender}
          info={event.info}
          location={event.location}
          number={event.number}
          timing={event.timing}
          subjects={event.faculty}
          description={event.description}
        />
      ))}
    </ul>
  );
}

export default SBList;
