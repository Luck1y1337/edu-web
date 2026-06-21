import { useState } from "react";

interface Comment {
  id: number;
  name: string;
  avatar: string;
  date: string;
  text: string;
}

const initialComments: Comment[] = [
  {
    id: 1,
    name: "Jasur Toshmatov",
    avatar: "https://i.pravatar.cc/40?img=11",
    date: "16-may, 2026",
    text: "Juda foydali maqola! Frontend yo'nalishini tanlash bo'yicha aniq fikr berdingiz. Rahmat!",
  },
  {
    id: 2,
    name: "Malika Xasanova",
    avatar: "https://i.pravatar.cc/40?img=44",
    date: "16-may, 2026",
    text: "4-bosqich haqida ko'proq ma'lumot bersangiz yaxshi bo'lardi. Portfolio loyihalari nima bo'lishi kerak?",
  },
];

const ArticleComments = () => {
  const [comments, setComments] = useState(initialComments);
  const [text, setText] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() || !name.trim()) return;
    setComments((prev) => [
      ...prev,
      {
        id: Date.now(),
        name,
        avatar: `https://i.pravatar.cc/40?u=${Date.now()}`,
        date: new Date().toLocaleDateString("uz-UZ"),
        text,
      },
    ]);
    setText("");
    setName("");
  };

  return (
    <section className="flex flex-col gap-6">
      <h2 className="font-manrope text-xl font-bold text-gray-900">
        Izohlar ({comments.length})
      </h2>

      {/* Comment list */}
      <div className="flex flex-col gap-4">
        {comments.map((c) => (
          <div key={c.id} className="flex gap-3 rounded-xl border border-gray-100 bg-white p-4">
            <img src={c.avatar} alt={c.name} className="h-9 w-9 rounded-full object-cover" />
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-gray-900">{c.name}</span>
                <span className="text-xs text-gray-400">{c.date}</span>
              </div>
              <p className="mt-1 text-sm leading-relaxed text-gray-600">{c.text}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Write comment */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 rounded-xl border border-gray-200 bg-gray-50 p-5"
      >
        <h3 className="font-manrope text-base font-bold text-gray-900">
          Izoh qoldirish
        </h3>
        <input
          type="text"
          placeholder="Ismingiz"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
        />
        <textarea
          rows={3}
          placeholder="Fikringizni yozing..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
        />
        <div className="flex justify-end">
          <button
            type="submit"
            className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
          >
            Yuborish
          </button>
        </div>
      </form>
    </section>
  );
};

export default ArticleComments;
