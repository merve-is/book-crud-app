import { useEffect, useState } from "react";
import { api } from "../api/api";
import { Link, useParams } from "react-router";
import BookCard from "../components/BookCard";

export type Book = {
  id: string;
  title: string;
  author: string;
  year?: string;
};

const BookDetail = () => {
  const { id } = useParams();

  const [book, setBook] = useState<Book | null>(null);
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBookData = async () => {
      if (!id) return;

      try {
        setLoading(true);
        setError(null);

        const [bookRes, booksRes] = await Promise.all([
          api.get<Book>(`/books/${id}`),
          api.get<Book[]>("/books"),
        ]);

        setBook(bookRes.data);
        setBooks(booksRes.data);
      } catch {
        setError("Kitap detayı yüklenirken bir hata oluştu.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookData();
  }, [id]);

  if (loading) {
    return <p>Yükleniyor...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!book) {
    return <p>Kitap bulunamadı.</p>;
  }

  const currentIndex = books.findIndex((b) => b.id === book.id);
  const prevBook = currentIndex > 0 ? books[currentIndex - 1] : null;
  const nextBook =
    currentIndex < books.length - 1 ? books[currentIndex + 1] : null;

  return (
    <div className="flex flex-col items-center p-4 gap-4">
      <BookCard book={book} />

      <div className="flex gap-4">
        {prevBook && (
          <Link to={`/books/${prevBook.id}`} className="btn btn-outline">
            ← Önceki Kitap
          </Link>
        )}

        {nextBook && (
          <Link to={`/books/${nextBook.id}`} className="btn btn-outline">
            Sonraki Kitap →
          </Link>
        )}
      </div>
    </div>
  );
};

export default BookDetail;