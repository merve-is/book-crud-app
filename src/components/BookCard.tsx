import { Link } from "react-router";
import type { Book } from "../pages/Books";

type Props = {
  book: Book;
};

const BookCard = ({ book: { id, title, author, year } }: Props) => {
  return (

      <li >
        <div className="card size-64 gap-4 p-6 shadow-lg hover:scale-95 transition duration-300 bg-emerald-800">
          <Link to={`/books/${id}`} className="flex justify-center text-lg font-semibold">
            {title} 
          </Link>

          {author && <p className="text-md font-light opacity-80">Yazar: {author}</p>}
          <p className="text-md font-light opacity-80">Yıl: {year}</p>

          <div className="card-actions justify-end mt-6">
            <Link to={`/books/${id}/delete`} className="btn btn-error">
              Sil
            </Link>
            <Link to={`/books/${id}/edit`} className="btn btn-info">
              Düzenle
            </Link>
          </div>
        </div>
      </li>
  );
};

export default BookCard;