import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';

const TOGGLE_PUBLIC_MUTATION = gql`
  mutation TogglePublic($id: ID!, $isPublic: Boolean!) {
    togglePublic(id: $id, isPublic: $isPublic) {
      id
      isPublic
    }
  }
`;

function MyComponent({ itemId }) {
  const [isPublic, setIsPublic] = useState(false);
  const [togglePublic, { loading, error }] = useMutation(TOGGLE_PUBLIC_MUTATION);

  const handleCheckboxChange = (event) => {
    setIsPublic(event.target.checked);
  };

  const handleMutation = async () => {
    try {
      await togglePublic({
        variables: {
          id: itemId,
          isPublic: isPublic,
        },
      });
      // 성공적으로 mutation이 실행된 경우 처리 로직 (예: UI 업데이트)
    } catch (e) {
      // mutation 실행 중 오류 발생 시 처리 로직
      console.error(e);
    }
  };

  return (
    <div>
      <label>
        공개 여부:
        <input
          type="checkbox"
          checked={isPublic}
 //         onChange={handleCheckboxChange}  // 수정된 부분
          onChange={(e) => {
              setIsPublic(e.target.checked);
              handleMutation();  // checkbox 값 변경 시 바로 mutation 실행
          }}
        />
      </label>
      {loading && <p>로딩 중...</p>}
      {error && <p>에러 발생: {error.message}</p>}
    </div>
  );
}

export default MyComponent;