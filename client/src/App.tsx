import { RecoilRoot } from "recoil";
import { DefaultPage } from "./pages/DefaultPage";

function App() {
  return (
    <RecoilRoot>
      learn react
      <DefaultPage />
    </RecoilRoot>
  );
}

export default App;
