import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchCourses = createAsyncThunk(
  'courses/fetchCourses',
  async () => {
    const response = await axios.get('/courses.json');
    return response.data;
  }
);

const courseSlice = createSlice({
  name: 'courses',
  initialState: {
    courses: [],
  },
  reducers: {
    selectCourse(state, action) {
      const course = state.courses.find((c) => c.id === action.payload);
      if (course) {
        course.isSelected = true;
      }
    },
    unSelectCourse(state, action) {
      const course = state.courses.find((c) => c.id === action.payload);
      if (course) {
        course.isSelected = false;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCourses.fulfilled, (state, action) => {
      state.courses = action.payload.map((course) => ({
        ...course,
        isSelected: false,
      }));
    });
  },
});

export const { selectCourse, unSelectCourse } = courseSlice.actions;
export default courseSlice.reducer;
