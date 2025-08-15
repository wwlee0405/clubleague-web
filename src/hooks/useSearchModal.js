import React, { useCallback, useState } from 'react';
import styled from "styled-components";

const ModalContainer = styled.div`
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background-color: transparent;
`;
const ModalStyle = styled.div`
  width: 300px;
  padding: 5px 10px;
  border-radius: 10px;
  background-color: ${(props) => props.theme.cardContent};
`;

// `useBlur` props로 모달 외부를 클릭하면 모달을 닫을지 선택하도록 했다.
const useSearchModal = ({ useBlur = true } = {}) => {    
  // 모달의 렌더링 여부를 설정할 상태 값
  const [isOpen, setIsOpen] = useState(false);
  
  // 모달 열기
  const searchOpen = useCallback(() => {
    setIsOpen(() => true);
  }, []);
  
  // 모달 닫기
  const searchClose = useCallback(() => {
    setIsOpen(() => false);
  }, []);
  
  // isOpen이 true라면 Modal 컴포넌트를 반환, false라면 null을 반환
  return {
    SearchModal: isOpen
      ? ({ children }) => (
        <ModalContainer 
          className="modal"
          onClick={useBlur ? searchClose : null}
        >
          <ModalStyle 
            className="modal_container"
            onClick={(e) => e.stopPropagation()}
          > 
            {children}
          </ModalStyle>
        </ModalContainer>
      )
      : () => null,
    searchOpen,
    searchClose,
    isOpen,
  };
};
  
export default useSearchModal;