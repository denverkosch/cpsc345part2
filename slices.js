import { createSlice } from "@reduxjs/toolkit";


const cipherHistorySlice = createSlice({
    name: 'cipherHistory',
    initialState: {
      messages: []
    },
    reducers: {
      addMessage: (state, messages) => {
        state.messages.push(messages.payload)
      },
      clearLog: (state) => {
        state.messages = []
      },
      deleteMessages: (state) => {
        state.messages.forEach(element => {
          if (element.marked) {
            console.log(state.messages.indexOf(element) + "Deleted")
            state.messages.splice(state.messages.indexOf(element), 1)
          }
        });
      },
      setMessageMarked: (state, index) => {
        state.messages[Number(index.payload)].marked = !state.messages[Number(index.payload)].marked
      }
    }
  });
  
  export const {addMessage, clearLog, deleteMessages, setMessageMarked } = cipherHistorySlice.actions
  export default cipherHistorySlice.reducer