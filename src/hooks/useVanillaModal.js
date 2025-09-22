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
  width: ${(props) => (props.modalWidth.main)};
  margin-top: ${(props) => (props.marginTop.main)};
  margin-left: ${(props) => (props.marginLeft.main)};
`;
ModalStyle.defaultProps = {
  modalWidth: {
    main: "300px"
  },
  marginTop: {
    main: "0px"
  },
  marginLeft: {
    main: "0px"
  },
};

// `useBlur` props로 모달 외부를 클릭하면 모달을 닫을지 선택하도록 했다.
// isOpen이 true라면 Modal 컴포넌트를 반환, false라면 null을 반환
// 이벤트 버블링 방지 시, onClick에 (e) => e.stopPropagation() 을 활용
const useVanillaModal = ({ useBlur = true } = {}) => {    
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
  return {
    SearchModal: isOpen
      ? ({ children, modalWidth, marginTop, marginLeft, onClick }) => (
        <ModalContainer 
          className="modal"
          onClick={useBlur ? searchClose : null}
        >
          <ModalStyle 
            className="modal_container"
            onClick={onClick}
            modalWidth={modalWidth}
            marginTop={marginTop}
            marginLeft={marginLeft}
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
  
export default useVanillaModal;