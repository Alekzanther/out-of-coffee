import { Order } from '../components/Orders2/Orders';
import { Items } from '../components/Items/Items';

<link
  href="https://res.cloudinary.com/dr6lvwubh/raw/upload/v1581441981/Anicons/anicons-regular.css"
  rel="stylesheet"
/>;

// CURRENT ORDER AND A LIST OF ALL AVAILABLE ITEMS

const Index = () => {
  return (
    <div style={{ display: 'flex' }}>
      <Items />
      <Order />
    </div>
  );
};

// export async function getStaticProps() {
//   const apolloClient = initializeApollo();

//   return {
//     props: {
//       initialApolloState: {},
//     },
//   };
// }

export default Index;
