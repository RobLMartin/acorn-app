import styled from "styled-components";
import { useAuth } from "../../contexts/auth.context";

export default function Layout({ children }) {
  const { isAuth } = useAuth();

  return <Container isAuth={isAuth}>{children}</Container>;
}

const Container = styled.div`
  display: grid;
  grid-template-areas: ${({ isAuth = false }) =>
    isAuth ? '"app-bar canvas"' : '"canvas"'};
  grid-template-columns: 64px 1fr;
`;
