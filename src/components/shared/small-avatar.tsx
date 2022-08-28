import DefaultManAvatar from '@images/man.svg';
import DefaultUnknownAvatar from '@images/user.png';
import DefaultWomanAvatar from '@images/woman.svg';
import { IUser } from '@type/user.type';
import { EGender } from 'constants/user.constant';
import React, { useEffect, useState } from 'react';
import ImageWithPlaceholder from './image-with-place-holder';

interface Props {
  user: Pick<IUser, 'avatar' | 'gender' | 'name' | '_id'>;
  customStyles?: string;
}

const UserAvatarSmall = ({ user, customStyles }: Props): JSX.Element => {
  const [defaultSrc, setDefaultSrc] = useState<any>(
    user?.avatar || DefaultUnknownAvatar,
  );

  useEffect(() => {
    if (user) {
      let defaultSrc = DefaultUnknownAvatar;
      if (user?.gender !== undefined) {
        switch (user.gender) {
          case EGender.MALE:
            defaultSrc = DefaultManAvatar;
            break;
          case EGender.FEMALE:
            defaultSrc = DefaultWomanAvatar;
            break;
          default:
            defaultSrc = DefaultUnknownAvatar;
        }
      }
      setDefaultSrc(defaultSrc);
    }
  }, [user]);

  return (
    <ImageWithPlaceholder
      src={user?.avatar || ''}
      defaultSrc={defaultSrc}
      alt={`${user?.name} avatar`}
      key={user?.avatar}
      customStyles={`--size: 3.5rem;
                width: var(--size);
                height: var(--size);
                border-radius: 0.5rem;
                ${customStyles}
            `}
    ></ImageWithPlaceholder>
  );
};

export default UserAvatarSmall;
