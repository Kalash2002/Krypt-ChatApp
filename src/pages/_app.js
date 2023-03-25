import "@/styles/globals.css";
import { ChatAppProvider } from "../../Context/ChatAppContext";
import { Navbar } from "../../Components/index";

const App = ({ Component, pageProps }) => {
  return (<div>
    <ChatAppProvider>
      <Navbar />
      <Component {...pageProps} />
    </ChatAppProvider>
  </div>);
};

export default App;
