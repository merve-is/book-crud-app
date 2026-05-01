import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import type { Book } from "./Books";
import { api } from "../api/api";

const DeleteBook = () => {
  const { id } = useParams();
  const [book, setBook] = useState<Book>();
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;

    api
      .get<Book>(`/books/${id}`)   // SADECE GET
      .then((res) => setBook(res.data))
      .catch((err) => console.error("Kitap alınamadı:", err));
  }, [id]);

  if (!book) {
    return <div className="p-4">Yükleniyor...</div>;
  }

  const handleDelete = () => {
    api.delete(`/books/${id}`).then(() => {
      navigate("/books");
    });
  };

  return (
    <div className="p-4">
      <p>
        <strong>{book.title}</strong> filmini silmek istediğinize emin misiniz?
      </p>

      <div className="flex gap-2 mt-4">
        <button onClick={handleDelete} className="btn btn-error">
          Evet
        </button>

        <Link to="/books" className="btn btn-info">
          Hayır
        </Link>
      </div>
    </div>
  );
};

export default DeleteBook;