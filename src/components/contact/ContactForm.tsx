import { useForm } from "react-hook-form";
import { messageSubjects } from "../../data/contact.data";
import { useSendContact } from "../../hooks/api/useContact";
import type { ContactFormDto } from "../../types/api.type";

interface ContactFormValues {
  firstName: string;
  lastName?: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  agree: boolean;
}

const inputClass =
  "w-full rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100";

const ContactForm = () => {
  const form = useForm<ContactFormValues>();
  const { mutateAsync, isPending, isSuccess } = useSendContact();
  const { register, handleSubmit, reset, formState: { errors } } = form;

  const onSubmit = async (values: ContactFormValues) => {
    const fullName = [values.firstName, values.lastName].filter(Boolean).join(" ").trim();
    const body: ContactFormDto = {
      name: fullName,
      email: values.email,
      phone: values.phone || undefined,
      subject: values.subject || undefined,
      message: values.message,
    };
    await mutateAsync(body);
    reset();
  };

  return (
    <article className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm sm:p-7">
      <h2 className="font-manrope text-xl font-bold text-gray-900">Xabar yuborish</h2>
      <p className="mt-2 text-sm text-gray-500">24 soat ichida javob beramiz.</p>

      {isSuccess && (
        <p className="mt-4 rounded-lg bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
          Xabaringiz qabul qilindi.
        </p>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 flex flex-col gap-4" noValidate>
        {/* Row 1: First name + Last name */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="c-firstname" className="mb-1.5 block text-sm font-medium text-gray-700">
              Ism <span className="text-red-500" aria-hidden="true">*</span>
            </label>
            <input
              type="text"
              id="c-firstname"
              placeholder="Aziz"
              className={inputClass}
              {...register("firstName", { required: "Ism kiritilishi shart" })}
            />
            {errors.firstName && (
              <span className="mt-1 block text-xs text-red-500">{errors.firstName.message}</span>
            )}
          </div>
          <div>
            <label htmlFor="c-lastname" className="mb-1.5 block text-sm font-medium text-gray-700">
              Familiya
            </label>
            <input
              type="text"
              id="c-lastname"
              placeholder="Karimov"
              className={inputClass}
              {...register("lastName")}
            />
          </div>
        </div>

        {/* Row 2: Email + Phone */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="c-email" className="mb-1.5 block text-sm font-medium text-gray-700">
              Email <span className="text-red-500" aria-hidden="true">*</span>
            </label>
            <input
              type="email"
              id="c-email"
              placeholder="aziz@example.uz"
              className={inputClass}
              {...register("email", {
                required: "Email kiritilishi shart",
                pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Email noto'g'ri" },
              })}
            />
            {errors.email && (
              <span className="mt-1 block text-xs text-red-500">{errors.email.message}</span>
            )}
          </div>
          <div>
            <label htmlFor="c-phone" className="mb-1.5 block text-sm font-medium text-gray-700">
              Telefon
            </label>
            <input
              type="tel"
              id="c-phone"
              placeholder="+998 90 123 45 67"
              className={inputClass}
              {...register("phone")}
            />
          </div>
        </div>

        {/* Subject select */}
        <div>
          <label htmlFor="c-subject" className="mb-1.5 block text-sm font-medium text-gray-700">
            Mavzu
          </label>
          <div className="relative">
            <select
              id="c-subject"
              className={`${inputClass} appearance-none pr-10`}
              {...register("subject")}
            >
              {messageSubjects.map((subject) => (
                <option key={subject} value={subject}>
                  {subject}
                </option>
              ))}
            </select>
            <svg
              className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>
        </div>

        {/* Message textarea */}
        <div>
          <label htmlFor="c-message" className="mb-1.5 block text-sm font-medium text-gray-700">
            Xabar <span className="text-red-500" aria-hidden="true">*</span>
          </label>
          <textarea
            id="c-message"
            rows={6}
            placeholder="Xabaringizni shu yerda yozing..."
            className={`${inputClass} resize-none`}
            {...register("message", {
              required: "Xabar kiritilishi shart",
              minLength: { value: 5, message: "Kamida 5 ta belgi" },
            })}
          />
          {errors.message && (
            <span className="mt-1 block text-xs text-red-500">{errors.message.message}</span>
          )}
          <p className="mt-1.5 text-xs text-gray-400">
            Iltimos, savolingizni iloji boricha aniq yozing.
          </p>
        </div>

        {/* Checkbox */}
        <label className="flex items-start gap-x-2.5 text-sm text-gray-600">
          <input
            type="checkbox"
            className="mt-0.5 h-4 w-4 rounded border-gray-300 text-blue-600"
            {...register("agree", { required: true })}
          />
          <span>Foydalanish shartlari va shaxsiy ma'lumotlarni qayta ishlashga roziman.</span>
        </label>

        {/* Submit */}
        <div className="mt-3 flex justify-end">
          <button
            type="submit"
            disabled={isPending}
            className="inline-flex items-center gap-x-2 rounded-lg bg-blue-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:opacity-60"
          >
            {isPending ? "Yuborilmoqda..." : "Xabarni yuborish"}
            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </div>
      </form>
    </article>
  );
};

export default ContactForm;
