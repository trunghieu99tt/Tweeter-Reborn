import { EFontSize, EFontWeight } from 'constants/style.constant';
import styled from 'styled-components';

interface Props {
  title: string;
  content: any;
}

const SideBarWrapper = ({ title, content }: Props) => {
  return (
    <StyledRoot>
      <StyledHeader>{title}</StyledHeader>
      <StyledContent>{content}</StyledContent>
    </StyledRoot>
  );
};

export default SideBarWrapper;

const StyledRoot = styled.div`
  background: #ffffff;
  box-shadow: var(--box-shadow-1);
  border-radius: 1.2rem;
  padding: 1rem 2rem;
  margin-bottom: 2.5rem;
`;

const StyledHeader = styled.header`
  padding-bottom: 0.8rem;
  border-bottom: 1px solid var(--gray-5);
  margin-bottom: 2.5rem;
  font-size: ${EFontSize.Font3};
  font-weight: ${EFontWeight.FontWeight600};
`;

const StyledContent = styled.div``;
