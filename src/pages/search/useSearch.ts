import { EEndpoints } from '@constants';
import { IGetList } from '@type/app.type';
import { getList } from '@utils/query';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'store';

export enum ESearchType {
  Tweet = 'tweet',
  User = 'user',
  Hashtag = 'hashtag',
}

type TSearch = {
  search: string;
  category: ESearchType;
};

const requestSearch = async <T>(query: TSearch): Promise<IGetList<T>> => {
  if (!query.search || !query.category) return { data: [], total: 0 };

  return getList<T>(
    `${EEndpoints.Search}?search=${query.search}&category=${query.category}`,
    0,
    {
      limit: 1000,
    },
  );
};

const useSearch = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [query, setQuery] = useState<TSearch>({
    search: '',
    category: ESearchType.Tweet,
  });
  const [response, setResponse] = useState<{
    type: ESearchType;
    data: any[];
  } | null>(null);

  const onChange = (e: any) => {
    const { name, value } = e.target;
    setQuery({
      ...query,
      [name]: value,
    });
  };

  const onSubmit = async (e) => {
    if (query.search.trim() === '') return;
    e.preventDefault();
    setLoading(true);
    const { data } = await requestSearch(query);
    setResponse({
      type: query.category,
      data,
    });
    setLoading(false);
  };
  return {
    query,
    loading,
    response,

    onSubmit,
    onChange,
  };
};

export { useSearch };
