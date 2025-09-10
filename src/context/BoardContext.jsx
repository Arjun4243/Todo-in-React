import { createContext,useEffect,useState } from "react";

export const BoardContext = createContext();

const initialBoard = {
  toDo: [
    { status: "to do", userId: "", username: "", task: "Setup project" },
    { status: "to do", userId: "", username: "", task: "Design wireframes" }
  ],
  inProgress: [
    { status: "in progress", userId: "", username: "", task: "Develop homepage" }
  ],
  done: []
};

export function BoardProvider({children}){

    const [board,setBoard]=useState(initialBoard)

    const addTask=({columKey,taskText})=>{
        
        const newTask={
            status: columKey,
            userId: "",
            username: "",
            task: taskText
        }

        setBoard(prev=>({
            ...prev,
            [columKey]:[...prev[columKey],newTask]
        }))
    }



    return(
        <BoardContext.Provider value={{board,addTask}}>
            {children}
        </BoardContext.Provider>
    )
}


