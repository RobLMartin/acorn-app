import styled from "styled-components";
import { useAuth } from "../../contexts/auth.context";

export default function Canvas({ children }) {
  const { isAuth } = useAuth();

  return <Container isAuth={isAuth}>{children}</Container>;
}

const Container = styled.div`
  grid-area: canvas;
  height: 100vh;
  padding: ${({ isAuth }) => (isAuth ? "1em" : 0)};
  padding-right: ${({ isAuth }) => (isAuth ? "118px" : 0)};
`;
