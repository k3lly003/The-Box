import { useEffect } from "react";
import "./App.css";
import { useCounterStore } from "./store";

function App() {
  const count = useCounterStore((state) => state.count);

  // useCounterStore also gives you a way to access the state directly within a independent function function
  const logCount = () =>{
    const count1 = useCounterStore.getState().count;
  console.log('count:', count1);
  }
  useEffect(()=>{
    logCount();
  },[]);

  return <OtherComponent count={count} />;
}

const OtherComponent = ({ count }: { count: number }) => {
  const incrementAsync = useCounterStore((state) => state.incrementAsync);
  const decrement = useCounterStore((state) => state.decrement);
  return (
    <div>
      {count}{" "}
      <div>
        <button onClick={incrementAsync}>IncrementAsync</button>
        <button onClick={decrement}>Decrement</button>
      </div>
    </div>
  );
};

export default App;
