import { toast } from "react-toastify";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getEvent, updateEvent } from "../../store/eventSlice";
import { useNavigate, Link } from "react-router-dom";

import "./EventList.css";
function EventList() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const events = useSelector((store) => store.events.events);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const [searchTerm, setSearchTerm] = useState("");

  const onUpdateHAndler=(item)=>{
    
    dispatch(updateEvent(item))
    toast.success("Join Event")
  }
  const filteredEvents =
    events &&
    events.filter((event) => {
      return (
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  useEffect(() => {
    dispatch(getEvent());
  }, [updateEvent]);
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };
  return (
    <>
      <div className="container12">
        <div className="row">
          <div className="event-container">
            <div className="event-header">
              <h3>Search</h3>
              <input
                type="text"
                className="form-control"
                placeholder="Search by title or description"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
            {filteredEvents &&
              filteredEvents.map((item, index) => {
                return (
                  <div key={item._id} className="container1 event-item">
                    <div className="row">
                      {/* <div className="col-md-2 event-date">
                     
                        <span>usman</span>
                      </div> */}
                      <div className="col-md-10 event-desc">
                        <h4>Event ID: {item.eventID}</h4>
                        <h4>Title: {item.title}</h4>
                        <h4>Description: {item.description}</h4>
                        <h4>Date: {item.date}</h4>
                        <h4>Location: {item.location}</h4>
                        <h4>CreatorID: {item.creatorID}</h4>
                        <h4>Attendees: {item.attendees}</h4>

                      </div>
                      <div className="d-flex justify-content-center gap-2">
                       {isLoggedIn? <button
                          onClick={(e)=>{onUpdateHAndler(item)}}
                          className="btn btn-lg"
                        >
                          Join Event
                        </button>:
                         <button
                         className="btn btn-lg"
                         onClick={(e) => {
                           e.preventDefault();
                           navigate("/login");
                         }}
                       >
                         Login
                       </button>}
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
}

export default EventList;
