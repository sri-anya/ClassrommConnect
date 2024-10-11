import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  students: [],
};

export const studentsSlice = createSlice({
  name: 'students',
  initialState,
  reducers: {
    setStudents: (state, action) => {
      state.students = action.payload; // Set students from fetched data
    },
    addStudent: (state, action) => {
      state.students.push(action.payload); // Add a new student
    },
    updateStudent: (state, action) => {
      const { id, updatedStudent } = action.payload;
      const index = state.students.findIndex(student => student.id === id);
      if (index !== -1) {
        state.students[index] = { ...state.students[index], ...updatedStudent }; // Update student details
      }
    },
    removeStudent: (state, action) => {
      state.students = state.students.filter(student => student.id !== action.payload); // Remove student by id
    },
  },
});

// Action creators are generated for each case reducer function
export const { setStudents, addStudent, updateStudent, removeStudent } = studentsSlice.actions;

export default studentsSlice.reducer;
