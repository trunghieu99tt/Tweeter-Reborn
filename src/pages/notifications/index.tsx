import PageMetadata from '@components/shared/page-metadata';
import { StyledContainer } from '@components/shared/shared-style';
import LayoutWithHeader from '@layout/layout-with-header';
import NotificationContainer, {
  ENotificationScreen,
} from 'containers/notification/notification.container';
import React from 'react';
import { useTranslation } from 'react-i18next';

const NotificationPage = () => {
  const { t } = useTranslation();

  return (
    <React.Fragment>
      <PageMetadata title={t('page.notification')} />
      <LayoutWithHeader>
        <StyledContainer>
          <NotificationContainer screen={ENotificationScreen.Notification} />
        </StyledContainer>
      </LayoutWithHeader>
    </React.Fragment>
  );
};

export default NotificationPage;
