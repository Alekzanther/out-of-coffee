const OrderId = (props) => {
  return <div>hjej {props.id}</div>;
};

export async function getServerSideProps(context) {
  const sleep = new Promise((resolve) => setTimeout(resolve, 2000));
  await sleep;
  console.log('I AM AWAKE');
  return {
    props: { id: context.query.id }, // will be passed to the page component as props
  };
}
export default OrderId;
