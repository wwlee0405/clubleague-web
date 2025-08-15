import styled from "styled-components";

export const BaseBox = styled.div`
  background-color: ${(props) => props.theme.bgColor};
  border: 1px solid ${(props) => props.theme.borderColor};
  width: 100%;
`;

export const CardContainer = styled.div`
  background-color: ${(props) => props.theme.cardHeader};
  border-radius: 15px;
  border: 1px solid ${(props) => props.theme.border};
  max-width: 615px;
`;

export const CardBottom = styled.div`
  background-color: ${(props) => props.theme.cardContent};
  padding-bottom: 15px;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
`;

export const HeaderStyle = styled.div`
  background-color: ${(props) => props.theme.headerColor};
`;

export const MainText = styled.span`
  color: ${(props) => props.theme.text};
`;

export const SubText = styled.span`
  color: ${(props) => props.theme.subText};
`;

export const FatLink = styled.span`
  font-weight: 600;
  color: rgb(142, 142, 142);
`;

export const FatText = styled.span`
  font-weight: 600;
`;