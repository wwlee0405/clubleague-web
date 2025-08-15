import styled from "styled-components";

function ToggleButton({value, handleClick}) {
  return (
    <Container onClick={handleClick}>
      <Circle value={value} />
    </Container>
  );
}

export default ToggleButton;

const Container = styled.div`
  box-sizing: border-box;
  margin: 0.5px;
  width: 45px;
  height: 25px;
  border: 1px solid #e0e2e9;
  border-radius: 12px;
  background-color: #DEE2E6;
  display: flex;
  align-items: center;
  cursor: pointer;
`;
const Circle = styled.div`
  width: 17px;
  height: 17px;
  border-radius: 50%;
  background-color: ${({ value }) => (value ? "#3a7bec" : "#bfbfbf")};
  margin: 0 3px;
  transform: ${({ value }) => (value ? "translateX(20px)" : "translateX(0px)")};
  transition: all 0.2s ease-in-out;
  `;  