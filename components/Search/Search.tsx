// PAST ORDERS
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useAddItemToOrderMutation } from '../../apollo-generated/client-graphql';
import { Order } from '../Orders/Orders';

const Stuff = () => {
  const [data, setData] = useState();
  // null === nudlar
  const [searchString, setSearchString] = useState('');

  const [addItem] = useAddItemToOrderMutation();

  useEffect(() => {
    const URL = `https://api.mathem.io/product-search/noauth/search/query?size=25&index=0&keyword=${searchString}&searchType=searchResult&sortTerm=popular&sortOrder=desc&storeId=19&type=p&append=false&badges=&brands=&categories=&q=${searchString}`;

    const fetchData = async () => {
      const result = await fetch(URL).then((res) => res.json());

      setData(result);
    };
    fetchData();
  }, [searchString]);

  const handleAddProduct = ({
    name,
    productUrl,
    productImageUrl,
    mathemId,
  }) => {
    return addItem({
      variables: {
        item: {
          name,
          mathemId,
          productUrl,
          productImageUrl,
        },
      },
    });
  };

  return (
    <div style={{ display: 'flex' }}>
      <div>
        <input
          onChange={(e) => setSearchString(e.currentTarget.value)}
        />

        <div>
          <div
            style={{
              display: 'flex',
              maxWidth: '1100px',
              flexWrap: 'wrap',
              gap: '12px',
            }}
          >
            {data?.products?.map((el) => (
              <div
                key={el.id}
                style={{
                  flexBasis: '200px',
                  padding: '16px',
                  display: 'inline-flex',
                  flexDirection: 'column',
                }}
              >
                <a
                  style={{ fontSize: '12px', whiteSpace: 'nowrap' }}
                  href={'https://www.mathem.se/' + el.url}
                >
                  {el.fullName}
                </a>
                <Image src={el.images.ORIGINAL} />
                <button
                  onClick={() =>
                    handleAddProduct({
                      name: el.fullName,
                      productUrl: 'https://www.mathem.se/' + el.url,
                      productImageUrl: el.images.ORIGINAL,
                      mathemId: el.id,
                    })
                  }
                >
                  ADD TO ORDER
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Order />
    </div>
  );
};

const StyledImage = styled.img<{ loaded: boolean }>`
  width: 100%;
  height: 100%;
  object-fit: contain;
  opacity: ${(props) => (props.loaded ? 1 : 0)};
  transition: opacity 250ms;
`;

export default Stuff;

const Image = ({ src }) => {
  const [loaded, setLoaded] = useState(false);
  return (
    <span
      style={{
        width: '100px',
        height: '100px',
        backgroundPosition: 'center center',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundImage: loaded
          ? 'none'
          : "url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/3/cat.gif')",
      }}
    >
      <StyledImage
        loading="lazy"
        src={src}
        loaded={loaded}
        onLoad={() => setLoaded(true)}
      />
    </span>
  );
};
