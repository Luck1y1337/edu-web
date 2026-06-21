import { useState } from "react";

const toc = [
  { id: "why-programming", label: "Nima uchun dasturchilik?" },
  { id: "which-direction", label: "Qaysi yo'nalishni tanlash?" },
  { id: "learning-path", label: "O'rganish yo'li" },
  { id: "career", label: "Birinchi ishga tayyorlanish" },
  { id: "conclusion", label: "Xulosa" },
];

const ArticleSidebar = () => {
  const [active, setActive] = useState("why-programming");

  const scrollTo = (id: string) => {
    setActive(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <aside className="hidden lg:block lg:w-72 lg:shrink-0">
      <div className="sticky top-24 flex flex-col gap-4">
        {/* Table of Contents */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <h3 className="font-manrope mb-4 text-sm font-bold uppercase tracking-widest text-gray-400">
            Mundarija
          </h3>
          <nav className="flex flex-col gap-1">
            {toc.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                  active === item.id
                    ? "bg-blue-50 font-semibold text-blue-600"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Tags quick links */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <h3 className="font-manrope mb-3 text-sm font-bold uppercase tracking-widest text-gray-400">
            Teglar
          </h3>
          <div className="flex flex-wrap gap-2">
            {["JavaScript", "Karyera", "Boshlovchi", "Maslahat"].map((t) => (
              <span
                key={t}
                className="rounded bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default ArticleSidebar;
