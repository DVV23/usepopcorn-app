import { useEffect } from "react";

export function useKey(key, callback) {
  useEffect(() => {
    function addListener(e) {
      if (e.code.toLowerCase() === key.toLowerCase()) {
        callback();
      }
    }
    document.addEventListener("keydown", addListener);

    return function () {
      document.removeEventListener("keydown", addListener);
    };
  }, [key, callback]);
}
