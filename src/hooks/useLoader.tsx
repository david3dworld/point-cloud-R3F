import { useEffect, useState } from "react";
import { load } from "@loaders.gl/core";

function useLoader(file, loader) {
  const [data, setData] = useState(null);
  const [err, setErr] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setData(null);
    setErr(null);
    setIsLoading(true);

    try {
      load(file, loader).then((result) => {
        console.log("loader result", result);
        setData(result);
        setIsLoading(false);
      });
    } catch (err) {
      setErr(err);
      setIsLoading(false);
    }
  }, [file, loader]);

  return { data, err, isLoading };
}

export default useLoader;
