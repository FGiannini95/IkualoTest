import "./App.css";
import { AppRoutes } from "../routes/AppRoutes";
import { IkauloProvider } from "../context/IkauloContext";

function App() {
  return (
    <>
      <IkauloProvider>
        <AppRoutes />
      </IkauloProvider>
    </>
  );
}

export default App;
