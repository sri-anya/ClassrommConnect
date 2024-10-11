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
    }

  },
});

// Action creators are generated for each case reducer function
export const { setClasses, addClass, updateClass, removeClass } = classesSlice.actions;

export default classesSlice.reducer;
