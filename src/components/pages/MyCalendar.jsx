import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import styled from "styled-components";
import Header from "./Header";
import db from "../../firebase";
import { Link } from "react-router-dom";
import CalendarApp from "../calendar/calendar_app/CalendarApp";
import { concatenateDateTime } from "../../action";
//import CalendarApp from "./calendar/CalendarApp";

const Container = styled.div`
  max-width: 100%;
`;

const Content = styled.div`
  max-width: 1128px;
  margin: auto;
`;

const Section = styled.section`
  min-height: 50px;
  margin: 16px 0 -30px;
  box-sizing: content-box;
  text-align: center;
  text-decoration: underline;
  display: flex;
  justify-content: center;
  h5 {
    color: #0a66c2;
    font-size: 14px;
    margin-block-start: 0;
    margin-block-end: 0;
    a {
      font-weight: 700;
    }
  }
  p {
    font-size: 14px;
    color: #434649;
    margin-block-start: 0;
    margin-block-end: 0;
    font-weight: 600;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 0 5px;
    margin: 16px 0;
  }
`;

const Layout = styled.div`
  display: grid;
  grid-template-areas: "left main right";
  grid-template-columns: minmax(0, 5fr) minmax(0, 12fr) minmax(300px, 7fr);
  column-gap: 25px;
  row-gap: 25px;
  margin: 25px 0;
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    padding: 0 5px;
  }
`;

const HomePage = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: space-evenly;
  background-color: white;
  width: 100%;
  margin-left: auto;
  margin-right: auto;

  button {
    border: 0.0625rem solid rgb(17, 109, 255);
    background-color: rgb(17, 109, 255);
    border-radius: 1.875rem;
    font-family: var(--main-text-font);
    width: 20rem;
    height: 3.5rem;
    cursor: pointer;
    color: #ffffff;
    font-size: 1.5rem;
    font-weight: 300;
    margin-top: 2rem;
    align-items: center;
    a:link {
      text-decoration: none;
    }

    a:visited {
      text-decoration: none;
    }

    a:hover {
      text-decoration: none;
    }

    a:active {
      text-decoration: none;
    }

    span {
      color: white;
      text-decoration: none;
      background-color: none;
    }
  }
`;

//home page upon signing in
function MyCalendar(props) {
  const [loadedEventslist, setLoadedEvents] = useState([]);
  const userUID = props.user.uid;
  //console.log(loadedEventslist);
  //console.log(userUID);

  useEffect(() => {
    db.collection("CLDDB")
      .get()
      .then((snapshot) => {
        const calendarEvents = [];
        snapshot.docs.forEach((doc) => {
          if (doc.data().userUID === userUID) {
            const calendarEvent = {
              id: doc.id,
              title: doc.data().title,
              start: concatenateDateTime(
                doc.data().startDate,
                doc.data().startTime
              ),
              end: concatenateDateTime(doc.data().endDate, doc.data().endTime),
            };
            calendarEvents.push(calendarEvent);
            //console.log(calendarEvents);
          }
        });
        //console.log(calendarEvents);
        setLoadedEvents(calendarEvents);
        //console.log(loadedEventslist);
      });
  }, []);

  return (
    <Container>
      {!props.user && <Redirect to="/" />}
      <Header />
      <Section>
        <h5>
          <a>THIS IS MY CALENDAR EVENT</a>
        </h5>
      </Section>
      <HomePage>
        <button>
          <Link to="/createnewcalendar">
            <a href="/createnewcalendar">
              <span>Add new Calendar Event</span>
            </a>
          </Link>
        </button>
        <button>
          <Link to="/calendarevents">
            <a href="/calendarevents">
              <span>Calendar Events</span>
            </a>
          </Link>
        </button>
      </HomePage>
      <CalendarApp userUID={userUID} events={loadedEventslist} />
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.userState.user,
  };
};

export default connect(mapStateToProps)(MyCalendar);