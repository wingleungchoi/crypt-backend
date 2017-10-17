async function retry(asyncOperation, catchFunc, callCount) {
  try {
    const res = await asyncOperation();
    return res;
  } catch (e) {
    if (callCount > 0) {
      const updatedCallCount = callCount - 1;
      return retry(asyncOperation, catchFunc, updatedCallCount);
    }
    return catchFunc(e);
  }
}

const retryUtils = { retry };

export default retryUtils;
