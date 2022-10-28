/* eslint-disable react/display-name */
import React, { forwardRef } from 'react';
import New from '../assets/new.svg';
import Image from 'next/image'

type SimpleListItem = {
  title: string;
  newItem?: boolean;
  id: string;
  amount: number;
  name: string;
  productImageUrl?: string | null;
  removeItem: (id: string) => void;
};



export const SimpleList = forwardRef<HTMLDivElement, SimpleListItem>(
  (
    { title, newItem, id, amount, name, productImageUrl, removeItem },
    ref,
  ) => {
    const handleRemoveItem = () => {
      removeItem(id);
    };
    return (
      <div ref={ref} id={id}>
        <span>
          {newItem ? <New /> : null}
          <Image
            style={{ height: '50px', width: '50px' }}
            src={productImageUrl || ''}
            alt={name}
          />
          <p>{title}</p>
        </span>
        <button onClick={handleRemoveItem}>Ta bort</button>
        <p>{amount}</p>
      </div>
    );
  },
);
