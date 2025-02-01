import "./App.css";
import { useState } from "react";

function Button({ text, onClick, variant }) {
  return (
    <button onClick={onClick} className="border px-4 py-2 rounded-md">
      {text}
    </button>
  );
}

function App() {
  const [value, setValue] = useState(0);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex gap-4 items-center">
        <Button
          onClick={() => setValue(value + 1)}
          text="Tambah ( Merah )"
          variant="primary"
        />
        <h1>{value}</h1>
        <Button
          onClick={() => setValue(value - 1)}
          text="Kurang ( kuning )"
          variant="secondary"
        />
      </div>
    </div>
  );
}

export default App;
