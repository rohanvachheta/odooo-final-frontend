import Breadcrumb from "../components/Breadcrumbs/Breadcrumb";
import AddBookForm from "../components/Forms/AddBookForm";

export const CreateBook = () => {
  return (
    <>
      <Breadcrumb pageName="Books" />
      <AddBookForm />
    </>
  );
};

export default CreateBook;
