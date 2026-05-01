import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { api } from "../api/api";
import BookCard from "../components/BookCard";

export type Book = {
  id: string;
  title: string;
  author: string;
  year?: string;
};

const Books = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const search = searchParams.get("search") || "";

  

  useEffect(() => {
    const fetchBooks = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await api.get("/books");
      setBooks(res.data);
    }
    catch{
      setError("Kitaplar yüklenirken bir hata oluştu.");
    }
    finally{
      setLoading(false);
    }
  };
  
    fetchBooks();
  }, []);

  if (loading) {
    return <p>Yükleniyor...</p>;
  };

  if (error) {
    return <p>{error}</p>;
  }

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(search.toLowerCase())
  );

  
  return (
    <>
      <input
        type="text"
        placeholder="Kitap ara..."
        className=" input input-bordered bg-gray-700 w-full max-w-md m-5"
        value={search}
        onChange={(e) =>
          setSearchParams(e.target.value ? { search: e.target.value } : {})
        }
      />

      {filteredBooks.length === 0 ? (
        <p className="p-4 text-gray-300">Aradığınız kitap bulunamadı.</p>
      ) : (
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {filteredBooks.map((book) => (
            <BookCard key={book.id} book={book} />
        ))}
  </ul>
)}
    </>
  );
};

export default Books;