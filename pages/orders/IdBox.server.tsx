import { Suspense } from 'react';

const IdBox = (props) => {
  return (
    <Suspense fallback={<div>loading......</div>}>
      {props.id}
    </Suspense>
  );
};

export default IdBox;
