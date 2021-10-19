import { useEffect } from "react";
import { useHistory, useParams } from "react-router";

const RequestPage = () => {
  const { id } = useParams();

  useEffect(() => {
    console.log(id);
  }, [id]);

  return <div>ID: {id}</div>;
};

export default RequestPage;
