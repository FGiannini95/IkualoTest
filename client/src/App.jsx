import "./App.css";
import { AppRoutes } from "../routes/AppRoutes";
import { IkauloProvider } from "../context/IkauloContext";
import 'bootstrap/dist/css/bootstrap.min.css';

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
