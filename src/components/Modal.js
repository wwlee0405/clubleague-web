import styled from "styled-components";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ModalContainer = styled.div`
  width: 100%;
  height: 100vh;
  over-flow: hidden;
  position: fixed; 
  top: 0;
  left: 0;
  background-color: ${(props) => props.theme.modalBg};
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  z-index: 1; 
`;
const ModalStyle = styled.div`
  width: 600px;
  border-radius: 20px;
  background-color: ${(props) => props.theme.cardContent};
`;
const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
`;
const Icon = styled.div`
  cursor: pointer;
`;
const HeaderTitle = styled.span`
  font-size: 18px;
  font-weight: 600;
`;
const ModalContent = styled.div`
  padding: 25px 0;
`;

export default function Modal({ onClose, title, children }) {
  return (
    <ModalContainer 
      className="modal"
      onClick={onClose}
    >
      <ModalStyle 
        className="modal_container"
        onClick={(e) => e.stopPropagation()}
      >
        <ModalHeader>
          <Icon onClick={onClose}>
            <FontAwesomeIcon icon={faArrowLeft} fontSize="22px" />
          </Icon>
          <HeaderTitle>{title}</HeaderTitle>
          <div></div>
        </ModalHeader>
        <ModalContent>{children}</ModalContent>
      </ModalStyle>
    </ModalContainer>
  );
}