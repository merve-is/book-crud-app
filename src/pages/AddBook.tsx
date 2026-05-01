import { useNavigate } from "react-router"
import { api } from "../api/api";
import type { Book } from "./Books";

const AddBook = () => {

  const navigate = useNavigate();

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    // sayfanın refresh edilmesini engeller
    e.preventDefault();

    // 1. form elemanından form detayı almak içindir
    const formData = new FormData(e.currentTarget);

    // 2. formdata  js objesine çevirir
    const book = Object.fromEntries(formData.entries());
    
    api.get<Book[]>(`/books?title:eq=${book.title}`).then((res) => {
      if (res.data.length > 0) {
        alert(book.title + " zaten var");
      return;
      }
      api.post<Book>("/books", book)
        .then(() => {
          navigate("/books")
        });
    });

  };
  
  return (
    <form className="flex mt-40 justify-center" onSubmit={handleSubmit}>
      <fieldset className=" fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <legend className="fieldset-legend">Kitap Ekle</legend>

        <label className="label">Kitap Adı</label>
        <input type="text" className="input" name="title"/>

        <label className="label">Yazar</label>
        <input type="text" className="input" name="author" />

        <label className="label">Yıl</label>
        <input type="text" className="input" name="year" />

          <button className="btn btn-neutral mt-4" >Ekle</button>
      </fieldset>
    </form>
  )
}

export default AddBook