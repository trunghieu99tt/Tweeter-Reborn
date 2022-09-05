import DefaultUnknownAvatar from '@images/user.png';
import { IUser } from '@type/user.type';
import ImageWithPlaceholder from './image-with-place-holder';
import React from 'react';

interface Props {
  user: Pick<IUser, 'avatar' | 'gender' | 'name' | '_id'>;
  customStyles?: string;
}

const UserAvatarSmall = ({ user, customStyles }: Props): JSX.Element => {
  return (
    <ImageWithPlaceholder
      src={user?.avatar}
      defaultSrc={DefaultUnknownAvatar}
      alt={`${user?.name} avatar`}
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
