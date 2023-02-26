import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

import { db } from "../config/firebase";

export const addEvent = createAsyncThunk("addEvent", async (item) => {
  try {
    console.log("item", item);

    let newTodo = {
      title: item?.title,
      date: item?.date,
      location: item?.location,
      description: item?.description,
      creatorID: item?.creatorID,
      attendees: "no",
    };
    await addDoc(collection(db, "events"), newTodo);
    return newTodo;
  } catch (error) {
    console.log(error);
  }
});

// Get todo thunk
export const getEvent = createAsyncThunk("getEvent", async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "events"));
    let eventsList = [];
    querySnapshot.forEach((doc) => {
      eventsList.push({
        eventID: doc.id,
        title: doc.data().title,
        date: doc.data().date,
        location: doc.data().location,
        description: doc.data().description,
        creatorID: doc.data().creatorID,
        attendees: doc.data().attendees,
      });
    });

    return eventsList;
  } catch (error) {
    console.log(error);
  }
});

// delete todo thunk
export const deleteTodo = createAsyncThunk("deleteTodo", async (item) => {
  try {
  
    await deleteDoc(doc(db, "events", item.eventID));
    return item;
  } catch (error) {
    console.log(error);
  }
});
// update todo thunk
export const updateEvent = createAsyncThunk("updateEvent", async (item) => {
  try {
    await updateDoc(doc(db, "events", item.eventID), {
      attendees: "yes",
    });
    return item;
  } catch (error) {
    console.log(error);
  }
});

const eventSlice = createSlice({
  name: "event",
  initialState: { events: [], error: null },
  extraReducers: (builder) => {
    builder.addCase(addEvent.fulfilled, (state, action) => {
      let newState = {
        ...state,
        events: [...state.events, action.payload],
      };
      // console.log("🚀 ~ file: eventSlice.js:90 ~ builder.addCase ~ newState:", newState)
      return newState;
    });
    builder.addCase(getEvent.fulfilled, (state, action) => {
      let newState = {
        ...state,
        events: action.payload,
      };
      return newState;
    });
    builder.addCase(deleteTodo.fulfilled, (state, action) => {
      const events = state.events;
      const item = action.payload;
      let filteredTodos = events.filter((todo) => item.eventID !== todo.eventID);
      let newState = {
        ...state,
        events: filteredTodos,
      };
      return newState;
    });
    builder.addCase(updateEvent.fulfilled, (state, action) => {
      const events = state.events;
      const item = action.payload;
      let updatedItem = {
        title: item?.title,
        date: item?.date,
        location: item?.location,
        description: item?.description,
        creatorID: item?.creatorID,
        attendees: item?.attendees,
      };
      let updatedTodos = events.map((event) => {
        if (item.eventID == event.eventID) {
          return updatedItem;
        } else {
          return event;
        }
      });
      let newState = {
        ...state,
        events: updatedTodos,
      };

      return newState;
    });
  },
});

export const {} = eventSlice.actions;
export default eventSlice.reducer;
