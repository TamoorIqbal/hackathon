import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

import "./JoinEvent.css";
import { useDispatch, useSelector } from "react-redux";
import { deleteTodo } from "../../store/eventSlice";

function JoinEvent() {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth?.user);
  console.log(user?.uid);
  const events = useSelector((store) => store.events.events);

  const filteredEvents = events.filter((event) => event.creatorID == user?.uid);
  return (
    <>
      {filteredEvents &&
        filteredEvents.map((item) => {
          return (
            <article className="content-container">
              <header>
                <h3 className="artist-info">
                  Title: {item.title}
                  <br />
                  <span className="supporting-artists">
                    Description: {item.description}
                  </span>
                </h3>
                <h2 className="guests">Date: {item.date}</h2>
                <h2 className="guests">Location: {item.location}</h2>
                <h2 className="guests">Date: {item.date}</h2>
              </header>
              <p className="guests">Attendees: {item.attendees}</p>
              <div style={{ textAlign: "center" }}>
                <button
                  className="btn btn-lg "
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(deleteTodo(item));
                    toast.success("delete Successfully");
                  }}
                >
                  Login
                </button>
              </div>
            </article>
          );
        })}
    </>
  );
}

export default JoinEvent;
