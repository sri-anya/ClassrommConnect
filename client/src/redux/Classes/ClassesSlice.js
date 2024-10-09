import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  classes: [],
};

export const classesSlice = createSlice({
  name: 'classes',
  initialState,
  reducers: {
    setClasses: (state, action) => {
      state.classes = action.payload; // Set classes from fetched data
    },
    addClass: (state, action) => {
      state.classes.push(action.payload); // Add a new class
    },
    updateClass: (state, action) => {
      const { id, updatedClass } = action.payload;
      const index = state.classes.findIndex(cls => cls.id === id);
      if (index !== -1) {
        state.classes[index] = { ...state.classes[index], ...updatedClass }; // Update class details
      }
    },
    removeClass: (state, action) => {
      state.classes = state.classes.filter(cls => cls.id !== action.payload); // Remove class by id
    },
  },
});

// Action creators are generated for each case reducer function
export const { setClasses, addClass, updateClass, removeClass } = classesSlice.actions;

export default classesSlice.reducer;
