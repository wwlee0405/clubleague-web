import React, { useCallback, useState } from 'react';
import styled from "styled-components";
import { faMap } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ModalContainer = styled.div`
  width: 100%;
  height: 100vh;
  over-flow: hidden;
  position: fixed; 
  top: 0;
  left: 0;
  background-color: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;
const ModalStyle = styled.div`
  width: 600px;
  padding: 20px;
  background-color: ${(props) => props.theme.cardHeader};
`;
const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

// `useBlur` props로 모달 외부를 클릭하면 모달을 닫을지 선택하도록 했다.
const useEntryModal = ({ useBlur = true } = {}) => {
  // 모달의 렌더링 여부를 설정할 상태 값
  const [isOpen, setIsOpen] = useState(false);
  
  // 모달 열기
  const entryOpen = useCallback(() => {
    setIsOpen(() => true);
  }, []);
  
  // 모달 닫기
  const entryClose = useCallback(() => {
    setIsOpen(() => false);
  }, []);
  
  // isOpen이 true라면 Modal 컴포넌트를 반환, false라면 null을 반환
  return {
    EntryModal: isOpen
      ? ({ children }) => (
        <ModalContainer 
          className="modal"
          onClick={useBlur ? entryClose : null}
        >
          <ModalStyle 
            className="modal_container"
            onClick={(e) => e.stopPropagation()}
          >
            <ModalHeader>
              <div></div>
              <div onClick={useBlur ? entryClose : null}>
                <FontAwesomeIcon icon={faMap} size="2x" />
                <span>X</span>
              </div>
              
            </ModalHeader>
            {children}
          </ModalStyle>
        </ModalContainer>
        
      )
      : () => null,
    entryOpen,
    entryClose,
    isOpen,
  };
};
  
export default useEntryModal;