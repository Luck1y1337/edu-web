import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { allCourses } from "../data/courses.data";

const BuyCourse = () => {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("payme");
  const [saveCard, setSaveCard] = useState(false);

  // We'll mock the course for checkout, usually this comes from useParams
  const course = allCourses.find((c) => c.slug === "javascript-dasturlash") || allCourses[0];

  const handleCheckout = () => {
    // Navigate to a success page or somewhere else after payment
    navigate("/dashboard/my-courses");
  };

  return (
    <div className="space-y-6 pb-12">
      {/* ── Breadcrumb ── */}
      <nav className="flex items-center gap-2 text-sm text-gray-500">
        <Link to="/dashboard/catalog" className="hover:text-gray-900 transition">
          Katalog
        </Link>
        <span>&rsaquo;</span>
        <Link to={`/courses/${course.slug}`} className="hover:text-gray-900 transition">
          {course.title}
        </Link>
        <span>&rsaquo;</span>
        <span className="font-semibold text-gray-900">To'lov</span>
      </nav>

      <div className="flex flex-col lg:flex-row gap-6 items-start">
        {/* ── Main Content (Left) ── */}
        <div className="flex-1 space-y-6 w-full">
          {/* Payment Method Selection */}
          <article className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="font-manrope text-lg font-bold text-gray-900 mb-5">
              To'lov usulini tanlang
            </h3>

            <div className="space-y-3">
              {/* Payme */}
              <label
                className={`flex cursor-pointer items-center gap-4 rounded-xl border p-4 transition ${
                  paymentMethod === "payme"
                    ? "border-blue-600 bg-blue-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div
                  className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${
                    paymentMethod === "payme" ? "border-blue-600" : "border-gray-300"
                  }`}
                >
                  {paymentMethod === "payme" && (
                    <div className="h-2.5 w-2.5 rounded-full bg-blue-600"></div>
                  )}
                </div>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="payme"
                  className="hidden"
                  checked={paymentMethod === "payme"}
                  onChange={() => setPaymentMethod("payme")}
                />
                <div className="flex-1">
                  <span className="block text-sm font-semibold text-gray-900">Payme</span>
                  <span className="block text-xs text-gray-500">Payme ilovasi orqali tez to'lov</span>
                </div>
                <div className="flex items-center justify-center rounded-lg bg-gray-100 px-3 py-1.5">
                  <span className="text-sm font-bold text-gray-700">Payme</span>
                </div>
              </label>

              {/* Click */}
              <label
                className={`flex cursor-pointer items-center gap-4 rounded-xl border p-4 transition ${
                  paymentMethod === "click"
                    ? "border-blue-600 bg-blue-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div
                  className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${
                    paymentMethod === "click" ? "border-blue-600" : "border-gray-300"
                  }`}
                >
                  {paymentMethod === "click" && (
                    <div className="h-2.5 w-2.5 rounded-full bg-blue-600"></div>
                  )}
                </div>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="click"
                  className="hidden"
                  checked={paymentMethod === "click"}
                  onChange={() => setPaymentMethod("click")}
                />
                <div className="flex-1">
                  <span className="block text-sm font-semibold text-gray-900">Click</span>
                  <span className="block text-xs text-gray-500">Click orqali to'lov</span>
                </div>
                <div className="flex items-center justify-center rounded-lg bg-gray-100 px-3 py-1.5">
                  <span className="text-sm font-bold text-gray-700">Click</span>
                </div>
              </label>

              {/* Karta */}
              <label
                className={`flex cursor-pointer items-center gap-4 rounded-xl border p-4 transition ${
                  paymentMethod === "karta"
                    ? "border-blue-600 bg-blue-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div
                  className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${
                    paymentMethod === "karta" ? "border-blue-600" : "border-gray-300"
                  }`}
                >
                  {paymentMethod === "karta" && (
                    <div className="h-2.5 w-2.5 rounded-full bg-blue-600"></div>
                  )}
                </div>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="karta"
                  className="hidden"
                  checked={paymentMethod === "karta"}
                  onChange={() => setPaymentMethod("karta")}
                />
                <div className="flex-1">
                  <span className="block text-sm font-semibold text-gray-900">Plastik karta</span>
                  <span className="block text-xs text-gray-500">UzCard / Humo / Visa</span>
                </div>
                <div className="flex items-center justify-center rounded-lg bg-gray-100 px-3 py-1.5">
                  <span className="text-sm font-bold text-gray-700">Karta</span>
                </div>
              </label>
            </div>
          </article>

          {/* Card Details (Only visually shown for layout, or conditional) */}
          <article className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="font-manrope text-lg font-bold text-gray-900 mb-5">
              Karta ma'lumotlari
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Karta raqami
                </label>
                <input
                  type="text"
                  placeholder="8600 0000 0000 0000"
                  className="block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    Amal qilish muddati
                  </label>
                  <input
                    type="text"
                    placeholder="OO/YY"
                    className="block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div className="flex-1">
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    SMS kod / CVV
                  </label>
                  <input
                    type="text"
                    placeholder="•••"
                    className="block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="pt-2">
                <label className="flex cursor-pointer items-center gap-3">
                  <div
                    className={`relative inline-flex h-5 w-9 shrink-0 items-center rounded-full transition-colors duration-200 ease-in-out ${
                      saveCard ? "bg-blue-600" : "bg-gray-300"
                    }`}
                    onClick={() => setSaveCard(!saveCard)}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                        saveCard ? "translate-x-4" : "translate-x-0.5"
                      }`}
                    />
                  </div>
                  <span className="text-sm text-gray-700">Kartani keyingi to'lovlar uchun saqlash</span>
                </label>
              </div>
            </div>
          </article>
        </div>

        {/* ── Order Summary (Right) ── */}
        <aside className="w-full shrink-0 lg:w-[360px]">
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="font-manrope text-lg font-bold text-gray-900 mb-5">
              Buyurtma xulosasi
            </h3>

            <div className="mb-6 flex gap-4">
              <img
                src={course.image}
                alt={course.title}
                className="h-14 w-20 shrink-0 rounded-lg object-cover"
              />
              <div className="flex flex-col justify-center">
                <h4 className="text-sm font-bold text-gray-900 line-clamp-2">
                  {course.title}
                </h4>
                <p className="mt-0.5 text-xs text-gray-500">{course.teacher}</p>
              </div>
            </div>

            <div className="mb-6 space-y-3 border-y border-gray-100 py-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Kurs narxi</span>
                <span className="font-medium text-gray-900">690 000 so'm</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Chegirma</span>
                <span className="font-medium text-emerald-600">-200 000 so'm</span>
              </div>
            </div>

            <div className="mb-6 flex items-center justify-between">
              <span className="font-manrope text-lg font-bold text-gray-900">Jami</span>
              <span className="font-manrope text-xl font-extrabold text-gray-900">490 000 so'm</span>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full rounded-lg bg-blue-600 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 transition"
            >
              To'lovni tasdiqlash
            </button>

            <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-500">
              <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span>To'lov xavfsiz himoyalangan. Umrbod kirish.</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default BuyCourse;
