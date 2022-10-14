// MANAGE FAVORITES
// They are still displayed along with all other items in products view, but here you can list them all and unfavorite them
// But you can still add favorites in any other view

import { useQuery } from "@apollo/client";
import { getFavoriteItemsQuery } from "../../apollo-client/queries/getFavoriteItems/getFavoriteItems";

const Favorites = () => {
  const { data, error, loading } = useQuery(getFavoriteItemsQuery);
  console.log('data', data);
  console.log('loading', loading);
  if (error) { 
    return <div>{error.message}</div>;
  }
  if (data) {
    return (
      <div>
        <ul>
          {data.GetItems.map((item) => (
            <li>{item.name}</li>
          ))}
        </ul>
      </div>
    );
  }
  return <div>Loading......</div>;
};

export default Favorites;
