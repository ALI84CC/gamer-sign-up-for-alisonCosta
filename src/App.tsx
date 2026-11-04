import { Button } from "./components/Button";

function App() {
  const lidarComClick = () => {
    console.log("Botão clicado!");
  };

  return (
    <>
      <h1> Meu Projeto Vite + react + typescript</h1>
      <Button texto="Clique aqui" onClick={lidarComClick} variant="primary" />
    </>
  );
}

export default App;
