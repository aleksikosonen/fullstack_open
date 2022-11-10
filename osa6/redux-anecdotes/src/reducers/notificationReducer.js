import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notifications',
  initialState: '',
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

let timeout 

export const showNotification = (notification, time) => {
   return dispatch => {
    dispatch(createNotification(notification))
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      dispatch(resetNotification())
    }, time * 1000);
  }
}

export const { createNotification, resetNotification } = notificationSlice.actions
export default notificationSlice.reducer
