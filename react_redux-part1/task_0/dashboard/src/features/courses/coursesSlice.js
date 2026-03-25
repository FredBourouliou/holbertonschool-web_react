import { createSlice } from '@reduxjs/toolkit';

const coursesSlice = createSlice({
  name: 'courses',
  initialState: {
    courses: [],
  },
  reducers: {
    setCourses(state, action) {
      state.courses = action.payload;
    },
  },
});

export const { setCourses } = coursesSlice.actions;
export default coursesSlice.reducer;
