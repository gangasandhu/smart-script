// src/utils/compileUtils.js
import { getOutputToken, getOutputStatus } from './compileApi';
import { showSuccessToast, showErrorToast } from '../utils/message';

// compileCode function
export const compileCode = async (sourceCode, languageId, customInput, setProcessing, setOutputDetails) => {
  setProcessing(true);
  try {
    const token = await getOutputToken(sourceCode, languageId, customInput);
    await getSubmission(token, setProcessing, setOutputDetails);
  } catch (error) {
    console.error(error);
    setProcessing(false);
    showErrorToast();
  }
};

// getSubmission function
export const getSubmission = async (token, setProcessing, setOutputDetails) => {
  try {
    const response = await getOutputStatus(token);
    const statusId = response.data.status?.id;

    // If the status is 1 or 2, it means the code is still being processed
    if (statusId === 1 || statusId === 2) {
      setTimeout(() => {
        getSubmission(token, setProcessing, setOutputDetails);
      }, 2000);
      return;
    }

    setProcessing(false);
    setOutputDetails(response.data);
    showSuccessToast(`Compiled Successfully!`);
  } catch (error) {
    console.error(error);
    setProcessing(false);
    showErrorToast();
  }
};
