import { Item } from 'generated/graphql';
import { Portal } from 'react-portal';
import React, { useEffect, useId, useState } from 'react';
import { useRef } from 'react';

type AnimationComponentProps = {
  position: string[];
  transform: { x: number; y: number; id: string };
  item: Item;
  destroyMe: (id: number) => void;
  id: number;
};

const ANIMATION_TIME = 5000;

export const AnimationComponent = React.memo(
  (props: AnimationComponentProps) => {
    const { position, item, transform, destroyMe, id } = props;
    const [haveRan, setHaveRan] = useState<boolean>(false);
    const [style, setStyle] = useState<React.CSSProperties>({
      position: 'absolute',
      left: `${position[0]}px`,
      top: `${position[1]}px`,
      height: '50px',
      width: '50px',
    });
    const ref = useRef(null);
    const uniqueId = useId();

    useEffect(() => {
      const timer = setTimeout(() => {
        setStyle((prev) => ({
          ...prev,
          transition: 'opacity 1s',
          opacity: '0%',
        }));
      }, ANIMATION_TIME);

      return () => {
        clearTimeout(timer);
      };
    }, []);

    useEffect(() => {
      const timer = setTimeout(() => {
        destroyMe(id);
      }, ANIMATION_TIME + 1500);
      return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
      if (transform && transform.id === item._id && !haveRan) {
        setStyle({
          transform: `translate(${
            transform.x - Number(position[0])
          }px, ${transform.y - Number(position[1])}px)`,
          position: 'absolute',
          transition: 'transform 4s',
          left: `${position[0]}px`,
          top: `${position[1]}px`,
          width: '50px',
          height: '50px',
        });
        setHaveRan(true);
      }
    }, [transform]);

    return (
      <Portal key={uniqueId}>
        <img
          src={`${item.productImageUrl}`}
          id={uniqueId}
          style={style}
          ref={ref}
        />
      </Portal>
    );
  },
);
