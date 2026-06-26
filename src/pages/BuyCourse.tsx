import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import GlobalSpinner from "../components/ui/GlobalSpinner";
import { publicApi } from "../services/api";
import { useCheckout } from "../hooks/api/useEnrollments";
import { formatPrice } from "../services/mappers";
import type { CheckoutDto } from "../types/api.type";
import { queryKeys } from "../config/queryKeys";

type PaymentMethod = CheckoutDto["paymentMethod"];

const paymentLabels: Record<PaymentMethod, { name: string; desc: string }> = {
  payme: { name: "Payme", desc: "Payme ilovasi orqali tez to'lov" },
  click: { name: "Click", desc: "Click orqali to'lov" },
  card: { name: "Plastik karta", desc: "UzCard / Humo / Visa" },
  cash: { name: "Naqd", desc: "O'quv markazda naqd to'lash" },
};

const BuyCourse = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const slug = params.get("course") || params.get("slug") || "";

  const courseQuery = useQuery({
    queryKey: queryKeys.public.course(slug),
    queryFn: () => publicApi.getCourse(slug),
    enabled: Boolean(slug),
    retry: false,
  });

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("payme");
  const [promo, setPromo] = useState("");
  const checkout = useCheckout();

  useEffect(() => {
    if (checkout.isSuccess) {
      navigate("/dashboard/courses");
    }
  }, [checkout.isSuccess, navigate]);

  if (!slug) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-xl font-bold text-gray-900">Kurs tanlanmagan</h2>
        <p className="mt-2 text-sm text-gray-500">
          Katalogdan kurs tanlab, "Sotib olish" tugmasini bosing.
        </p>
        <Link to="/dashboard/catalog" className="mt-4 inline-block text-sm font-medium text-blue-600">
          Katalogga o'tish
        </Link>
      </div>
    );
  }

  if (courseQuery.isLoading) return <GlobalSpinner />;
  if (courseQuery.isError || !courseQuery.data) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-xl font-bold text-gray-900">Kurs topilmadi</h2>
        <Link to="/dashboard/catalog" className="mt-4 inline-block text-sm font-medium text-blue-600">
          Katalogga qaytish
        </Link>
      </div>
    );
  }

  const course = courseQuery.data;

  const handleCheckout = () => {
    checkout.mutate({
      courseId: course.id,
      paymentMethod,
      promoCode: promo || undefined,
    });
  };

  return (
    <div className="space-y-6 pb-12">
      <nav className="flex items-center gap-2 text-sm text-gray-500">
        <Link to="/dashboard/catalog" className="hover:text-gray-900 transition">
          Katalog
        </Link>
        <span>&rsaquo;</span>
        <Link to={`/courses/${course.slug}`} className="hover:text-gray-900 transition">
          {course.name}
        </Link>
        <span>&rsaquo;</span>
        <span className="font-semibold text-gray-900">To'lov</span>
      </nav>

      <div className="flex flex-col lg:flex-row gap-6 items-start">
        <div className="flex-1 space-y-6 w-full">
          <article className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="font-manrope text-lg font-bold text-gray-900 mb-5">
              To'lov usulini tanlang
            </h3>

            <div className="space-y-3">
              {(Object.keys(paymentLabels) as PaymentMethod[]).map((method) => (
                <label
                  key={method}
                  className={`flex cursor-pointer items-center gap-4 rounded-xl border p-4 transition ${
                    paymentMethod === method
                      ? "border-blue-600 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div
                    className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${
                      paymentMethod === method ? "border-blue-600" : "border-gray-300"
                    }`}
                  >
                    {paymentMethod === method && <div className="h-2.5 w-2.5 rounded-full bg-blue-600" />}
                  </div>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={method}
                    className="hidden"
                    checked={paymentMethod === method}
                    onChange={() => setPaymentMethod(method)}
                  />
                  <div className="flex-1">
                    <span className="block text-sm font-semibold text-gray-900">
                      {paymentLabels[method].name}
                    </span>
                    <span className="block text-xs text-gray-500">{paymentLabels[method].desc}</span>
                  </div>
                </label>
              ))}
            </div>
          </article>

          <article className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="font-manrope text-lg font-bold text-gray-900 mb-5">
              Promo kod
            </h3>
            <input
              type="text"
              value={promo}
              onChange={(e) => setPromo(e.target.value)}
              placeholder="Agar bo'lsa, promo kodingizni kiriting"
              className="block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </article>
        </div>

        <aside className="w-full shrink-0 lg:w-[360px]">
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="font-manrope text-lg font-bold text-gray-900 mb-5">
              Buyurtma xulosasi
            </h3>

            <div className="mb-6 flex gap-4">
              {course.imageUrl && (
                <img
                  src={course.imageUrl}
                  alt={course.name}
                  className="h-14 w-20 shrink-0 rounded-lg object-cover"
                />
              )}
              <div className="flex flex-col justify-center">
                <h4 className="text-sm font-bold text-gray-900 line-clamp-2">{course.name}</h4>
                <p className="mt-0.5 text-xs text-gray-500">{course.category}</p>
              </div>
            </div>

            <div className="mb-6 space-y-3 border-y border-gray-100 py-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Kurs narxi</span>
                <span className="font-medium text-gray-900">
                  {formatPrice(course.oldPrice || course.price)}
                </span>
              </div>
              {course.oldPrice && course.oldPrice > course.price && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Chegirma</span>
                  <span className="font-medium text-emerald-600">
                    -{formatPrice(course.oldPrice - course.price)}
                  </span>
                </div>
              )}
            </div>

            <div className="mb-6 flex items-center justify-between">
              <span className="font-manrope text-lg font-bold text-gray-900">Jami</span>
              <span className="font-manrope text-xl font-extrabold text-gray-900">
                {formatPrice(course.price)}
              </span>
            </div>

            <button
              onClick={handleCheckout}
              disabled={checkout.isPending}
              className="w-full rounded-lg bg-blue-600 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 disabled:opacity-60"
            >
              {checkout.isPending ? "Jarayonda..." : "To'lovni tasdiqlash"}
            </button>

            <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-500">
              🔒 To'lov xavfsiz himoyalangan. Umrbod kirish.
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default BuyCourse;
