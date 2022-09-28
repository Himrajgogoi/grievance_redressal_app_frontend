import "../styles/globals.css";
import Header from "../components/header";
import Footer from "../components/footer";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { LocalizationProvider } from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Header />
        <br />
        <br />
        <br />
        <Component {...pageProps} />
        <ToastContainer />
        <Footer />
      </LocalizationProvider>
    </>
  );
}

export default MyApp;
