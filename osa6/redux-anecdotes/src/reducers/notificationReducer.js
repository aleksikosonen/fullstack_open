import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notifications',
  initialState: 'Initial notification',
  reducers: {
    createNotification(state, action) {
      const newNotification = action.payload
      state.push(newNotification)
    },
  },
})

export const { createNotification } = notificationSlice.actions
export default notificationSlice.reducer
