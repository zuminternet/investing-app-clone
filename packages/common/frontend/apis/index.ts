import { AxiosStatic } from 'axios';

declare const Axios: AxiosStatic;

const devURL = 'http://localhost:3000';

export interface getSearchedItemsInfo {
  keyword: string;
}

const getSearchedItems = async ({ keyword }: getSearchedItemsInfo) => {
  try {
    const result = await Axios.get(`${devURL}/api/search/items?keyword=${keyword}`);

    console.log(result);

    if (result) {
      return result;
    }

    throw new Error('getting searched items was failed in front api');
  } catch (error) {
    console.log(error);
  }
};

export { getSearchedItems };
