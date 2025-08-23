import { request } from '@/util/request';
import Config from '@/config';

async function getSearchResultByText(searchText, searchTextMinLength = 2, opt = {}) {
  if (typeof searchText !== 'string' || searchText.length < searchTextMinLength) {
    return false;
  }

  const url = `${Config.api.backend}/getSearchResultByText`;
  const options = {
    method: 'POST',
    body: {
      keyword: searchText.trim(),
    },
    ...opt,
  };

  const data = await request(url, options);
  return data;
}

export default getSearchResultByText;
