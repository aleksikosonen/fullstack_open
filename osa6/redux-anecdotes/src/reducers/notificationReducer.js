import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notifications',
  initialState: 'Initial notification',
  reducers: {
    createNotification(state, action) {
      const newNotification = action.payload
      return newNotification
    },
    resetNotification(state, action) {
      return ''
    }
  },
})

export const showNotification = (notification) => {
   return dispatch => {
    dispatch(createNotification(notification))
    setTimeout(() => {
      dispatch(resetNotification())
    }, 5000);
  }
}

export const { createNotification, resetNotification } = notificationSlice.actions
export default notificationSlice.reducer
