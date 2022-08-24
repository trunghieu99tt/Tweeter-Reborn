import BaseSelector from '@components/shared/base-selector';
import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { BsFillPeopleFill } from 'react-icons/bs';
import { MdPublic } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import { v4 as uuid } from 'uuid';

type Props = {
  value: number;
  onChange: (input: number) => void;
};

const AudienceSelector = ({ value, onChange }: Props) => {
  const currentLanguage = useSelector(
    (state: RootState) => state.appState.language,
  );
  const { t } = useTranslation();

  const options = useMemo(() => {
    return [
      {
        label: t('everyone'),
        icon: <MdPublic />,
        value: 0,
        id: uuid(),
      },
      {
        label: t('peopleFollowYou'),
        icon: <BsFillPeopleFill />,
        value: 1,
        id: uuid(),
      },
    ];
  }, [currentLanguage]);

  return (
    <BaseSelector<number> options={options} value={value} onChange={onChange} />
  );
};

export default memo(AudienceSelector);
