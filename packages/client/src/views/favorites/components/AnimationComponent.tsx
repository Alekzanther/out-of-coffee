import { Item } from 'generated/graphql';
import React, { useEffect, useId, useState } from 'react';

type AnimationComponentProps = {
  position: string[];
  transform: { x: number; y: number; id: string };
  item: Item;
};

const AnimationComponent = (props: AnimationComponentProps) => {
  const { position, item, transform } = props;
  const [style, setStyle] = useState<React.CSSProperties>({
    position: 'absolute',
    left: `${position[0]}px`,
    top: `${position[1]}px`,
    height: '50px',
    width: '50px',
  });
  const uniqueId = useId();

  const transformCss =
    transform && transform.id === item._id
      ? ({
          transform: `translate(${
            transform.x - Number(position[0])
          }px, ${transform.y - Number(position[1])}px)`,
          position: 'absolute',
          transition: 'transform 4s',
          left: `${position[0]}px`,
          top: `${position[1]}px`,
          width: '50px',
          height: '50px',
        } as React.CSSProperties)
      : ({} as React.CSSProperties);

  useEffect(() => {
    if (transform && transform.id === item._id) {
      setStyle(transformCss);
    }
  }, [transform]);

  return (
    <img
      src={`${item.productImageUrl}`}
      id={uniqueId}
      style={style}
    />
  );
};

export default AnimationComponent;
