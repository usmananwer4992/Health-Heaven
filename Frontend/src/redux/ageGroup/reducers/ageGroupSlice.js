import { createSlice } from "@reduxjs/toolkit";

const ageGroupSlice = createSlice({
  name: "ageGroup",
  initialState: {
    ageGroups: [],
    selectedAgeGroup: null,
    error: null,
    totalCount: 0,
    loading: false,
  },
  reducers: {
    setAgeGroups: (state, action) => {
      state.ageGroups = action.payload;
    },
    setSelectedAgeGroup: (state, action) => {
      state.selectedAgeGroup = action.payload;
    },
    addAgeGroups: (state, action) => {
      state.ageGroups = [...state.ageGroups, action.payload];
    },
    _updateAgeGroup: (state, action) => {
      state.ageGroups = state.ageGroups.map((category) =>
        category.id === action.payload?.id ? action.payload : category
      );
    },
    _deleteAgeGroup: (state, action) => {
      state.ageGroups = state.ageGroups.filter(
        (category) => category.id !== action.payload.id
      );
    },
    addAgeGroupsError: (state, action) => {
      state.error = action.payload;
    },
    setCount: (state, action) => {
      state.totalCount = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const {
  setAgeGroups,
  setSelectedAgeGroup,
  addAgeGroups,
  _updateAgeGroup,
  _deleteAgeGroup,
  addAgeGroupsError,
  setCount,
  setLoading,
} = ageGroupSlice.actions;

export default ageGroupSlice.reducer;
