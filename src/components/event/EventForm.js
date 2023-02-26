import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { addEvent } from "../../store/eventSlice";

import "./EventForm.css";
function EventForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth?.user);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [creatorId, setCreatorId] = useState(``);
  const [title, setTitle] = useState("");
  const [date, setdate] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  

  const submitHandler = (e) => {
    e.preventDefault()
    let addData={
        title:title,
        date :date,
        location:location,
        description:description,
        creatorID:user?.uid,
        

    }
    dispatch(addEvent(addData))
  };
  return (
    <>
      <div className="containerForm">
        <form className="form1">
          <div className="row justify-content-center">
            <div className="col-md-6  ">
              <div className="form-group">
                <label htmlFor="title">Creator ID</label>
                <input
                  className="form-control"
                  type="text"
                  onChange={(e) => setCreatorId(e.target.value)}
                  value={user?.uid}
                />
              </div>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  className="form-control"
                  type="text"
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                />
              </div>
              <div className="form-group">
                <label htmlFor="title">Date</label>
                <input
                  className="form-control"
                  type="date"
                  onChange={(e) => setdate(e.target.value)}
                  value={date}
                />
              </div>
              <div className="form-group">
                <label htmlFor="title">Location</label>
                <input
                  className="form-control"
                  type="text"
                  onChange={(e) => setLocation(e.target.value)}
                  value={location}
                />
              </div>
              <div className="form-group">
                <label htmlFor="title">Description</label>
                <input
                  className="form-control"
                  type="text"
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                />
              </div>
             
              <br />{" "}
              <div className="btn-group btn-group-justified">
          
                {isLoggedIn ? (
                  <button className="btn btn-lg" onClick={(e)=>submitHandler(e)}>Add Event</button>
                ) : (
                  <button
                    className="btn btn-lg"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate("/login");
                    }}
                  >
                    Login
                  </button>
                )}
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default EventForm;
