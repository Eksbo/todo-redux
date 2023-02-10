import { createSlice ,createAsyncThunk} from "@reduxjs/toolkit";



export const fechTodos = createAsyncThunk(
'todos/fechTodos',
async function( _,{rejectWithValue}){
  try{
  const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10')

  if(!response.ok){
    throw new Error ('Srver error')
  }
  const data = await response.json();
  return data
  }
  catch(error){
 return rejectWithValue(error.message)
  }

}

)

const todoSlice = createSlice({
  name: "todos",
  initialState: {
    //изначальное состояние
    todos: [],
    status:null,
    error:null,
  },
  reducers: {
    addTodo(state, action) {
      // console.log(state)
      // console.log(action)
      state.todos.push({
        id: new Date().toISOString(),
        text: action.payload.text, 
        completed: false
      });
    },
    removeTodo(state, action) {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload.id);
    },
    toggleTodoComplete(state, action) {
      const toggledTodo = state.todos.find(
        (todo) => todo.id === action.payload.id
      );
      toggledTodo.completed = !toggledTodo.completed;
    } 
  },
  extraReducers:{
    [fechTodos.pending]:(state) => {
      state.status='loading'
      state.error=null
    }, // текущая
    [fechTodos.fulfilled]:(state,action)=>{
      state.status='resoved'
      state.todos =action.payload;
    }, //200
    [fechTodos.rejected]:(state,action)=>{
      state.status='rejected'
      state.error = action.payload;
    }   //400
  },
});

export const { addTodo, removeTodo, toggleTodoComplete } = todoSlice.actions;
export default todoSlice.reducer;
