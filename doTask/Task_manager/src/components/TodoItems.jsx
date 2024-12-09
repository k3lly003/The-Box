import {FaToggleOn, FaToggleOff, FaCheck, FaTimes, FaTrash} from "react-icons/fa"
import { toggleTodo, markComplete, markIncomplete, removeTodo } from "../redux/actions"
import { useDispatch } from "react-redux"


// eslint-disable-next-line react/prop-types
export const TodoItems = ({todo, index}) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const dispatch = useDispatch();
  return (
    <>
        <li className="flex flex-col sm:flex-row sm:items-center justify-between border-b-2 py-2 gap-4">
            <div className="flex items-center">
                <span className="mr-4 text-gray-500">{index + 1}</span>
                {/* eslint-disable-next-line react/prop-types */}
                <span className={`mr-4 ${todo.completed ? "line-through text-red-500": " "}`}>{todo.text}</span>
            </div>
            <div className="space-x-3 ml-8">
              {/* eslint-disable-next-line react/prop-types*/}
              <button onClick={()=> dispatch(toggleTodo(index))} className="mr-2 text-sm bg-blue-500 text-white sm:px-2 py-1 px-1 rounded">{todo.completed ? <FaToggleOff/> : <FaToggleOn/>}</button>
              <button onClick={()=> dispatch(removeTodo(index))} className="mr-2 text-sm bg-red-500 text-white sm:px-2 py-1 px-1 rounded"><FaTrash/></button>
              {
                // eslint-disable-next-line react/prop-types
                !todo.completed && (
                  <button onClick={()=> dispatch(markComplete(index))} className="mr-2 text-sm bg-yellow-500 text-white sm:px-2 py-1 px-1 rounded"><FaCheck/></button>
                )
              }
              {
                // eslint-disable-next-line react/prop-types
                todo.completed && (
                  <button onClick={()=> dispatch(markIncomplete(index))} className="mr-2 text-sm bg-blue-500 text-white sm:px-2 py-1 px-1 rounded"><FaTimes/></button>
                )
              }
            </div>
        </li>
    </>
  )
}