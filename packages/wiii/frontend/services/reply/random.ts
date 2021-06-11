import { AxiosStatic } from 'axios';

declare const Axios: AxiosStatic;

export const getRandomUser = async (nums = 15) => {
  try {
    const {
      data: { results },
      status,
      statusText,
    } = await Axios.get(`https://randomuser.me/api/?results=${nums}`, { responseType: 'json' });
    if (status >= 400) throw new Error(statusText);
    return results;
  } catch (e) {
    return console.error(e);
  }
};

export const getRandomText = async (nums = 15) => {
  try {
    const {
      data: messages,
      status: msgStatus,
      statusText: msgStatusText,
    } = await Axios.get(`http://metaphorpsum.com/paragraphs/${nums}`, { responseType: 'text' });
    if (msgStatus >= 400) throw new Error(msgStatusText);
    return { messages, msgStatus, msgStatusText };
  } catch (e) {
    return console.error(e);
  }
};
