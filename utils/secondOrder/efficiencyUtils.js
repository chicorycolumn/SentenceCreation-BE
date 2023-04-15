exports.curryCheckTimeout = (startTime, timeLimit, returnCallback) => {
  return (label) => {
    let currentTime = Date.now();

    if (currentTime - startTime >= timeLimit) {
      console.log(
        `qvzn "${label}" timed out because currentTime ${currentTime} is more than ${timeLimit} later than startTime ${startTime}.`
      );
      return returnCallback(label);
    }
  };
};
