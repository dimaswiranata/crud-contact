import {createSlice, nanoid} from '@reduxjs/toolkit';

const apiSlice = createSlice({
  name: 'api',
  initialState: {
    data: [],
    status: 'idle',
  },
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    addData: (state, action) => {
      state.data.unshift({id: nanoid(), photo: 'N/A', ...action.payload});
    },
    modifyData: (state, action) => {
      const {id, updatedData} = action.payload;
      const index = state.data.findIndex(item => item.id === id);
      if (index !== -1) {
        state.data[index] = {...state.data[index], ...updatedData};
      }
    },
    removeData: (state, action) => {
      const id = action.payload;
      state.data = state.data.filter(item => item.id !== id);
    },
  },
});

export const {setData, setStatus, addData, modifyData, removeData} =
  apiSlice.actions;
export default apiSlice.reducer;
