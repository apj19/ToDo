import "./App.css";
import Home from "./Components/Home";
import NavBar from "./Components/NavBar";

function App() {
  // const [count, setCount] = useState(0)

  return (
    <div
      className="min-w-[375px] bg-cover bg-center bg-no-repeat max-w-[1440px]  min-h-[100vh] flex justify-center items-start pt-16"
      style={{ backgroundImage: `url('./bg-3.jpg')` }}
    >
      <NavBar />
      <Home />
    </div>
  );
}

export default App;
