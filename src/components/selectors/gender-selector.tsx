import BaseSelector from '@components/shared/base-selector';
import React, { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { IoMdFemale, IoMdMale } from 'react-icons/io';
import { IoMaleFemaleSharp } from 'react-icons/io5';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import { v4 as uuid } from 'uuid';

type Props = {
  defaultValue?: number;
  onChange: (input: number) => void;
};

const GenderSelector = ({ defaultValue, onChange }: Props) => {
  const currentLanguage = useSelector(
    (state: RootState) => state.appState.language,
  );
  const { t } = useTranslation();

  const options = useMemo(() => {
    return [
      {
        value: 0,
        label: t('male'),
        id: uuid(),
        icon: <IoMdMale />,
      },
      {
        value: 1,
        label: t('female'),
        id: uuid(),
        icon: <IoMdFemale />,
      },
      {
        value: 2,
        label: t('other'),
        id: uuid(),
        icon: <IoMaleFemaleSharp />,
      },
    ];
  }, [currentLanguage]);

  return (
    <BaseSelector<number>
      options={options}
      defaultValue={defaultValue}
      onChange={onChange}
    />
  );
};

export default memo(GenderSelector);
