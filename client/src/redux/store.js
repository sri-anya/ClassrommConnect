import { configureStore } from '@reduxjs/toolkit'
import ClassesReducer from "./Classes/ClassesSlice"
import studentsReducer from "./students/StudentsSlice"; 

export const store = configureStore({
  reducer: {classes: ClassesReducer,
    students: studentsReducer
  }
 
})