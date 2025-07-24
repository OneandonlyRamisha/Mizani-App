export function startTimer(
  setLoader: React.Dispatch<React.SetStateAction<number>>
) {
  let interval: NodeJS.Timeout;

  const startLoader = () => {
    let current = 0;

    interval = setInterval(() => {
      current += 1;

      setLoader(current);

      if (current >= 90) {
        clearInterval(interval);

        // Slow down after 90
        interval = setInterval(() => {
          current += 1;
          setLoader(current);

          if (current >= 100) {
            clearInterval(interval);
          }
        }, 200); // slower step
      }
    }, 90); // fast step
  };

  startLoader();

  return () => clearInterval(interval);
}
