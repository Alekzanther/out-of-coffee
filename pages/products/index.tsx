import { useQuery } from '@apollo/client';
import { FormEvent, useState } from 'react';
import { getItemsQuery } from '../../apollo-client/queries/getItems/getItems';
import {
  NewItem,
  useAddNewItemMutation,
} from '../../apollo-generated/client-graphql';

// ADD, REMOVE PRODUCTS TO CHOOSE FROM IN THE OTHER VIEW
// LIST AVAILABLE STUFF

const Items = (props: any) => {
  const [item, setItem] = useState<NewItem>({
    name: '',
    productUrl: '',
  });

  const { data, loading } = useQuery(getItemsQuery);
  console.log('data', data);
  console.log('loading', loading);

  const handleChange = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setItem((prev) => ({
      ...prev,
      [(event.target as HTMLInputElement).name]: (
        event.target as HTMLInputElement
      ).value,
    }));
  };

  const handleSubmit = () => {
    addNewItem({ variables: { newItem: item } });
  };

  const [
    addNewItem,
    { data: newItemData, loading: newItemLoading, error },
  ] = useAddNewItemMutation();

  console.log({ newItemData });
  return (
    <div>
      Add new products!!!!
      <form id="add" onChange={handleChange}>
        <label>Name</label>
        <input type="text" id="name" name="name" />
        <label>Url</label>
        <input type="url" id="productUrl" name="productUrl" />
        <button type="button" onClick={handleSubmit}>
          Add
        </button>
      </form>
      {data ? (
        <div>
          <ul>
            {data.GetItems.map((item) => (
              <li>{item.name}</li>
            ))}
          </ul>
        </div>
      ) : (
        <div>Loading......</div>
      )}
    </div>
  );
  // if (data) {
  //   return (
  //   );
  // }
  // return <div>Loading......</div>;
};

export default Items;

export const getStaticProps = () => {
  return {
    props: {
      name: 'Products',
    },
  };
};
