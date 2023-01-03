import { createSlice } from '@reduxjs/toolkit'

const filterSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    filterChange(state, action) {
      return action.payload
    },
  },
})

export const { filterChange } =
  filterSlice.actions

 export const changeFilter = (value) => {
    return async (dispatch) => {
      dispatch(filterChange(value))
    }
  }

export default filterSlice.reducer