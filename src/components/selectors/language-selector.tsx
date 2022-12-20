import BaseSelector from '@components/shared/base-selector';
import { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'store';
import { v4 as uuid } from 'uuid';

import USFlag from '@images/Us_flag.png';
import ViFlag from '@images/Vi_flag.png';
import { setLanguage } from '@redux/app/app.slice';
import { ELanguage } from '@type/app.type';

const options = [
  {
    label: 'English',
    value: ELanguage.En,
    icon: USFlag,
    id: uuid(),
  },
  {
    label: 'Tiếng Việt',
    value: ELanguage.Vi,
    icon: ViFlag,
    id: uuid(),
  },
];

const LanguageSelector = () => {
  const dispatch = useDispatch<AppDispatch>();
  const currentLanguage = useSelector(
    (state: RootState) => state.appState.language,
  );

  const onChange = (value: ELanguage) => {
    dispatch(setLanguage(value));
  };

  return (
    <BaseSelector<ELanguage>
      options={options}
      defaultValue={currentLanguage}
      onChange={onChange}
    />
  );
};

export default memo(LanguageSelector);
