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
          if (current >= 98) {
            clearInterval(interval);

            // Crawl after 98
            interval = setInterval(() => {
              current += 1;
              setLoader(current);

              if (current >= 100) {
                clearInterval(interval);
              }
            }, 2000);
          }
          if (current >= 100) {
            clearInterval(interval);
          }
        }, 250); // slower step
      }
    }, 90); // fast step
  };

  startLoader();

  return () => clearInterval(interval);
}
