import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  AsyncThunk,
  AnyAction,
} from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import counties from '../../data/counties.json';
import schools from '../../data/schools.json';
import { County } from '../../types/County.d';
import { School } from '../../types/School.d'

type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>

type PendingAction = ReturnType<GenericAsyncThunk['pending']>
type RejectedAction = ReturnType<GenericAsyncThunk['rejected']>
type FulfilledAction = ReturnType<GenericAsyncThunk['fulfilled']>

export interface MainState {
  counties: Array<County>;
  schools: Array<School>;
  selectedCounty: String;
  selectedSchools: Array<String>;
}

const initialState: MainState = {
  counties: [],
  schools: [],
  selectedCounty: '',
  selectedSchools: [],
};

export const mainSlice = createSlice({
  name: 'main',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    updateCounty: (state, action: PayloadAction<String>) => {
      state.selectedCounty = action.payload;
    },
    updateSchools: (state, action: PayloadAction<Array<String>>) => {
      // state.value -= 1;
      state.selectedSchools = action.payload;
    },

  },

  extraReducers: (builder) => {
    builder
      .addCase(loadCounties.fulfilled, (state, action) => {
        state.counties = action.payload;
      })
      .addCase(loadSchools.fulfilled, (state, action) => {
        state.schools = action.payload;
      });
  },

});
export const { updateCounty, updateSchools } = mainSlice.actions;

export const loadCounties = createAsyncThunk(
  'main/loadCounties',
  async () => {
    return counties
  }
);

export const loadSchools = createAsyncThunk(
  'main/loadSchools',
  async () => {
    return schools
  }
);

export const selectAllSchools = (state: RootState) => state.main.schools;
export const selectAllCounties = (state: RootState) => state.main.counties;
export const selectSchoolById = (state: RootState, id: String) => state.main.schools.find(it => it.id === id)


export default mainSlice.reducer;