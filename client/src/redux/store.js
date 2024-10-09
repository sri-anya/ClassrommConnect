import { configureStore } from '@reduxjs/toolkit'
import ClassesReducer from "./Classes/ClassesSlice"

export const store = configureStore({
  reducer: {classes: ClassesReducer},
})