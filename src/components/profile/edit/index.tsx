import { Suspense } from 'react';
import DatePicker from 'react-datepicker';
import { useTranslation } from 'react-i18next';

import GenderSelector from '@components/selectors/gender-selector';
import { StyledFlex } from '@components/shared/shared-style';
import UpdatableImage from '@components/shared/updatable-image/updatable-image';
import { IUser } from '@type/user.type';

interface Props {
  data: IUser;
  onCancel: () => void;
}

const EditInfo = ({ data, onCancel }: Props) => {
  const { t } = useTranslation();

  const {
    userInfo,
    newCover,
    newAvatar,
    showUpdatePassword,

    onUpdateInfo,
    updatePasswordData,
    onChangeBasicInfoFields,
    onChangePasswordFields,
    toggleShowUpdatePassword,
    onChangeSpecificBasicInfoField,
  } = useEditInfo({ data, onCancel });

  const body = (
    <StyledWrapper>
      <StyledFlex gap={5}>
        <EditItem>
          <StyledEditItemLabel>{t('coverPhoto')}</StyledEditItemLabel>
          <UpdatableImage
            updatable={true}
            label={t('updateCoverPhoto')}
            src={newCover?.preview || data?.coverPhoto}
            id={`update-cover-photo-${data._id}`}
          />
        </EditItem>
        <EditItem>
          <StyledEditItemLabel>{t('avatar')}</StyledEditItemLabel>
          <UpdatableImage
            updatable={true}
            label={t('updateYourAvatar')}
            src={newAvatar?.preview || data?.avatar}
            id={`update-avatar-photo-${data._id}`}
          />
        </EditItem>
      </StyledFlex>
      <StyledEditItemList>
        <EditItem>
          <StyledEditItemLabel>{t('name')}</StyledEditItemLabel>
          <EditItemInput
            name="name"
            value={userInfo.name}
            onChange={onChangeBasicInfoFields}
          />
        </EditItem>
        <EditItem>
          <StyledEditItemLabel>{t('email')}</StyledEditItemLabel>
          <EditItemInput
            name="email"
            value={userInfo.email}
            onChange={onChangeBasicInfoFields}
          />
        </EditItem>
        <EditItem>
          <StyledEditItemLabel>{t('bio')}</StyledEditItemLabel>
          <EditItemInput
            name="bio"
            value={userInfo.bio}
            onChange={onChangeBasicInfoFields}
          />
        </EditItem>
        <EditItem>
          <StyledEditItemLabel>{t('gender')}</StyledEditItemLabel>
          <GenderSelector
            defaultValue={userInfo.gender!}
            onChange={(gender: number) => {
              onChangeSpecificBasicInfoField('gender', gender);
            }}
          />
        </EditItem>
        <EditItem>
          <StyledEditItemLabel>{t('birthday')}</StyledEditItemLabel>
          <DatePicker
            selected={userInfo.birthday}
            onChange={(date: Date) =>
              onChangeSpecificBasicInfoField('birthday', date)
            }
          />
        </EditItem>
      </StyledEditItemList>
      <ToggleUpdatePasswordBtn onClick={toggleShowUpdatePassword}>
        {t('updatePassword')}
      </ToggleUpdatePasswordBtn>
      {showUpdatePassword && (
        <StyledEditItemList>
          <EditItem>
            <StyledEditItemLabel>{t('oldPassword')}</StyledEditItemLabel>
            <EditItemInput
              type="password"
              name="oldPassword"
              value={updatePasswordData.oldPassword}
              onChange={onChangePasswordFields}
            />
          </EditItem>
          <EditItem>
            <StyledEditItemLabel>{t('newPassword')}</StyledEditItemLabel>
            <EditItemInput
              type="password"
              name="newPassword"
              value={updatePasswordData.newPassword}
              onChange={onChangePasswordFields}
            />
          </EditItem>
          <EditItem>
            <StyledEditItemLabel>{t('confirmNewPassword')}</StyledEditItemLabel>
            <EditItemInput
              type="password"
              name="newPasswordConfirm"
              value={updatePasswordData.newPasswordConfirm}
              onChange={onChangePasswordFields}
            />
          </EditItem>
        </StyledEditItemList>
      )}
    </StyledWrapper>
  );

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Modal
        header={<h3>{t('changeUserInfo')}</h3>}
        isOpen={true}
        body={body}
        onOk={onUpdateInfo}
        onCancel={onCancel}
      />
    </Suspense>
  );
};

export default EditInfo;

export const StyledWrapper = styled.div``;

export const StyledEditItemList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  justify-content: center;
  align-items: center;
`;

export const EditItem = styled.div`
  margin-bottom: 1rem;

  input {
    padding: 1rem;
    border: 1px solid var(--gray-4);
    border-radius: 5px;

    &:focus {
      outline: none;
    }
  }
`;

export const StyledEditItemLabel = styled.label`
  display: block;
  font-size: 1.3rem;
  margin-bottom: 1rem;
`;

export const EditItemInput = styled.input`
  border: 1px solid var(--gray-4);
  padding: 1rem;
  border-radius: 0.5rem;
`;

export const ToggleUpdatePasswordBtn = styled.button`
  display: block;
  color: var(--red);
  font-weight: 500;
  text-decoration: underline;
  padding-left: 0;
  margin-bottom: 0.5rem;
`;
