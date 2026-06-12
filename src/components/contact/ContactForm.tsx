import { Icon } from "../ui/Icon";
import { messageSubjects } from "../../data/contact.data";

const inputClass =
  "w-full rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100";

const ContactForm = () => {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-7 shadow-sm sm:p-8">
      <h2 className="text-2xl font-bold">Xabar yuborish</h2>
      <p className="mt-2 text-sm text-gray-500">24 soat ichida javob beramiz.</p>

      <form className="mt-7 space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-medium">
              Ism <span className="text-red-500">*</span>
            </label>
            <input type="text" placeholder="Aziz" className={inputClass} />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium">Familiya</label>
            <input type="text" placeholder="Karimov" className={inputClass} />
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-medium">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              placeholder="aziz@example.uz"
              className={inputClass}
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium">Telefon</label>
            <input
              type="tel"
              placeholder="+998 90 123 45 67"
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium">Mavzu</label>
          <select className={inputClass}>
            {messageSubjects.map((subject) => (
              <option key={subject}>{subject}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium">
            Xabar <span className="text-red-500">*</span>
          </label>
          <textarea
            rows={5}
            placeholder="Xabaringizni shu yerda yozing..."
            className={`${inputClass} resize-none`}
          />
          <p className="mt-1.5 text-xs text-gray-400">
            Iltimos, savolingizni iloji boricha aniq yozing.
          </p>
        </div>

        <label className="flex items-center gap-x-2.5 text-sm text-gray-600">
          <input
            type="checkbox"
            className="h-4 w-4 rounded border-gray-300 text-blue-600"
          />
          Foydalanish shartlari va shaxsiy ma'lumotlarni qayta ishlashga
          roziman.
        </label>

        <div className="flex justify-end">
          <button
            type="button"
            className="inline-flex items-center gap-x-2 rounded-lg bg-blue-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-700"
          >
            Xabarni yuborish <Icon.send />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
