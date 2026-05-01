import { useNavigate, useParams } from "react-router";
import { api } from "../api/api";
import type { Book } from "./Books";
import { useEffect, useState } from "react";

const EditBook = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [book, setBook] = useState<Book | null>(null);

    useEffect(() => {
        // id yoksa istek atma
        if (!id) return;

        api
            .get<Book>(`/books/${id}`)
            .then((res) => setBook(res.data))
            .catch((err) => console.error("Film alınamadı:", err));
    }, [id]);

    // film henüz gelmediyse loading göster
    if (!book) {
        return <div className="p-4">Yükleniyor...</div>;
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        // sayfanın refresh edilmesini engeller
        e.preventDefault();

        // 1. Form elemanından form detaylarını almak içindir
        const formData = new FormData(e.currentTarget);

        // 2. Form verilerini düzenleyip JS objesine çevir
        const updatedBook = {
            // mevcut filmin id'sini koru
            id: book.id,

            // input name="title" alanındaki veriyi al
            title: formData.get("title") as string,

            // input name="title" alanındaki veriyi al
            author: formData.get("author") as string,

            // input name="year" alanındaki veriyi al
            year: formData.get("year") as string,

        };

        try {
            // 3. Mevcut filmi güncelle
            await api.put(`/book/${id}`, updatedBook);

            // 4. Güncelleme sonrası film listesine dön
            navigate("/movies");
        } catch (err) {
            console.error("Güncelleme hatası:", err);
        }
    };

    return (
        <form className="p-4 max-w-64" onSubmit={handleSubmit}>
            <fieldset className="fieldset">
                <legend className="fieldset-legend">Kitap Adı</legend>
                <input
                    type="text"
                    className="input"
                    placeholder="Book Title"
                    name="title"
                    defaultValue={book.title}
                />
                <legend className="fieldset-legend">Yazar</legend>
                <input
                    type="text"
                    className="input"
                    placeholder="Yazar"
                    name="author"
                    defaultValue={book.author}
                />

                <legend className="fieldset-legend">Yıl</legend>
                <input
                    type="text"
                    className="input"
                    placeholder="Year"
                    name="year"
                    defaultValue={book.year}
                />

                <button type="submit" className="btn btn-primary">
                    Kaydet
                </button>
            </fieldset>
        </form>
    );
};

export default EditBook;