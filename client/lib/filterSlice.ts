import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RidePostQueryParameters } from "../types/ridePost";

const initialState: RidePostQueryParameters = {
  ridePostAuthorRoleId: undefined,
  onlyOwnRidePosts: false,
  sourceId: undefined,
  destinationId: undefined,
  minPrice: undefined,
  maxPrice: undefined,
  departureStartDateTime: undefined,
  departureEndDateTime: undefined,
  minSeats: undefined,
  maxSeats: undefined,
  authorName: "",
  authorPhoneNumber: "",
  authorComment: "",
  sort: "sooner",
  page: undefined, // default is 1
  pageSize: 20, // default is 20
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setFilters: (_state, action: PayloadAction<RidePostQueryParameters>) => {
      return action.payload;
    },
    updateFilter: (
      state,
      action: PayloadAction<Partial<RidePostQueryParameters>>
    ) => {
      Object.assign(state, action.payload);
    },
    resetFilters: () => initialState,
  },
});

export const { setFilters, updateFilter, resetFilters } = filterSlice.actions;
export default filterSlice.reducer;
