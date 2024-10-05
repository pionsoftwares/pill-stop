import { useContext } from "react";
import ScrollContext from "../context/ScrollContext";

const useScroll = () => {
  return useContext(ScrollContext);
};

export default useScroll;
