import { useEffect } from "react";
import useSocket from "../hooks/useSocket";

const useMedicineSocket = (onEvent) => {
  const socket = useSocket();

  useEffect(() => {
    if (socket) {
      // Join the "admin" room
      socket.emit("joinRoom", "admin");

      // List of events to listen for
      const events = [
        "medicineRequest",
        "medicineRequestApproved",
        "medicineRequestRejected",
      ];

      // Set up event listeners
      events.forEach((event) => {
        socket.on(event, (data) => {
          if (onEvent) {
            onEvent(event, data);
          }
        });
      });

      // Clean up the event listeners when the component unmounts
      return () => {
        events.forEach((event) => {
          socket.off(event);
        });
      };
    }
  }, [socket, onEvent]);
};

export default useMedicineSocket;
