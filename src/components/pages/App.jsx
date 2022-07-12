import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./Login";
import Home from "./Home";
import MyProfile from "./MyProfile";
import MyCalendar from "./MyCalendar";
import ToDoList from "./ToDoList";
import StudyBuddies from "./StudyBuddies";
import FindStudyBuddy from "./FindStudyBuddy";
import MyStudyBuddies from "./MyStudyBuddies";
import StudyBuddyNotifications from "./StudyBuddyNotifications";
import AboutUs from "./AboutUs";
import StudyBuddiesRequests from "./StudyBuddiesRequests";
import NewToDoEvent from "./NewToDoEvent";
import ToDoListDone from "./ToDoListDone";
import { useEffect } from "react";
import { getUserAuth } from "../../action";
import { connect } from "react-redux";
import NewMyCalendar from "./NewMyCalendar";
import NewSB from "./NewSB";
import CalendarEvents from "./CalendarEvents";

function App(props) {
  useEffect(() => {
    props.getUserAuth();
  }, []);

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/myprofile">
            <MyProfile />
          </Route>
          <Route path="/mycalendar">
            <MyCalendar />
          </Route>
          <Route path="/todolist">
            <ToDoList />
          </Route>
          <Route path="/studybuddies">
            <StudyBuddies />
          </Route>
          <Route path="/aboutus">
            <AboutUs />
          </Route>
          <Route path="/findstudybuddy">
            <FindStudyBuddy />
          </Route>
          <Route path="/mystudybuddies">
            <MyStudyBuddies />
          </Route>
          <Route path="/studybuddynotifications">
            <StudyBuddyNotifications />
          </Route>
          <Route path="/studybuddyrequests">
            <StudyBuddiesRequests />
          </Route>
          <Route path="/createnewtodo">
            <NewToDoEvent />
          </Route>
          <Route path="/todolistdone">
            <ToDoListDone />
          </Route>
          <Route path="/createnewcalendar">
            <NewMyCalendar />
          </Route>
          <Route path="/findnewsb">
            <NewSB />
          </Route>
          <Route path="/calendarevents">
            <CalendarEvents />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => ({
  getUserAuth: () => dispatch(getUserAuth()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);