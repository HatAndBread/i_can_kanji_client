import './App.css';

function App() {
  const handleClick = async () => {
    const res = await fetch('http://localhost:3000/home');
    console.log(res);
    const data = await res.json();
    console.log(data);
  };
  return (
    <div className="App">
      <button onClick={handleClick}>Click me</button>
    </div>
  );
}

export default App;
