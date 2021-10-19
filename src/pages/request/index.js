import { useParams } from "react-router";

const RequestPage = () => {
  const { id } = useParams();

  return <div>ID: {id}</div>;
};

export default RequestPage;
