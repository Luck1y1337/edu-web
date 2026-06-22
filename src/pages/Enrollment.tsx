import { Link } from "react-router-dom";
import { allCourses } from "../data/courses.data";

const Enrollment = () => {
  return (
    <main className="flex flex-col items-center pb-16">
      {/* ── Page Hero ── */}
      <section className="w-full bg-gradient-to-r from-blue-50 to-indigo-50 py-16 px-6 lg:px-24">
        <div className="mx-auto max-w-7xl flex flex-col items-center text-center">
          {/* Breadcrumb */}
          <nav className="mb-6 flex items-center gap-2 text-sm text-gray-500">
            <Link to="/" className="hover:text-gray-900 transition">
              Bosh sahifa
            </Link>
            <span>&rsaquo;</span>
            <span className="font-semibold text-gray-900">Kursga yozilish</span>
          </nav>

          <h1 className="mb-4 font-manrope text-4xl lg:text-5xl font-extrabold tracking-tight text-gray-900">
            Online kursga yozilish
          </h1>
          <p className="max-w-3xl text-lg text-gray-500 leading-relaxed">
            Kursni tanlang, ro'yxatdan o'ting va istalgan joydan o'qishni boshlang. Bepul demo darslar bilan tanishing — hech qanday majburiyatsiz.
          </p>
        </div>
      </section>

      {/* ── Steps Section ── */}
      <section className="mx-auto mt-16 w-full max-w-7xl px-6">
        <div className="mb-12 text-center">
          <span className="mb-3 block text-xs font-bold uppercase tracking-wider text-blue-600">
            Qanday ishlaydi
          </span>
          <h2 className="font-manrope text-3xl font-bold tracking-tight text-gray-900">
            O'qishni boshlash — 4 qadam
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Step 1 */}
          <div className="relative rounded-2xl border border-gray-200 bg-white p-6 pt-16 shadow-sm">
            <div className="absolute top-6 left-6 flex h-11 w-11 items-center justify-center rounded-full bg-blue-600 text-xl font-extrabold text-white">
              1
            </div>
            <h3 className="mb-3 font-manrope text-lg font-bold text-gray-900">
              Kursni tanlang
            </h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              Katalogdan yo'nalishingizga mos online kursni tanlang — barchasi video darslardan iborat.
            </p>
          </div>

          {/* Step 2 */}
          <div className="relative rounded-2xl border border-gray-200 bg-white p-6 pt-16 shadow-sm">
            <div className="absolute top-6 left-6 flex h-11 w-11 items-center justify-center rounded-full bg-blue-600 text-xl font-extrabold text-white">
              2
            </div>
            <h3 className="mb-3 font-manrope text-lg font-bold text-gray-900">
              Ro'yxatdan o'ting
            </h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              Bir daqiqada hisob yarating va shaxsiy kabinetingizga darrov kiring.
            </p>
          </div>

          {/* Step 3 */}
          <div className="relative rounded-2xl border border-gray-200 bg-white p-6 pt-16 shadow-sm">
            <div className="absolute top-6 left-6 flex h-11 w-11 items-center justify-center rounded-full bg-blue-600 text-xl font-extrabold text-white">
              3
            </div>
            <h3 className="mb-3 font-manrope text-lg font-bold text-gray-900">
              Bepul demo darslar
            </h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              Har bir kursning birinchi darslari bepul — formati yoqsa, davom ettirasiz.
            </p>
          </div>

          {/* Step 4 */}
          <div className="relative rounded-2xl border border-gray-200 bg-white p-6 pt-16 shadow-sm">
            <div className="absolute top-6 left-6 flex h-11 w-11 items-center justify-center rounded-full bg-blue-600 text-xl font-extrabold text-white">
              4
            </div>
            <h3 className="mb-3 font-manrope text-lg font-bold text-gray-900">
              O'qishni boshlang
            </h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              Qulay tarifni tanlang va istalgan vaqtda, istalgan joydan o'qishni boshlang.
            </p>
          </div>
        </div>
      </section>

      {/* ── Popular Courses Table ── */}
      <section className="mt-16 w-full bg-gray-50 py-16 px-6 lg:px-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 text-left">
            <h2 className="mb-3 font-manrope text-3xl font-bold tracking-tight text-gray-900">
              Mashhur online kurslar
            </h2>
            <p className="text-lg text-gray-500">
              Istalgan vaqtda boshlang — barcha darslar video formatda, umrbod kirish bilan.
            </p>
          </div>

          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm overflow-x-auto">
            <table className="w-full min-w-[900px] text-left">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">Kurs</th>
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">Mentor</th>
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">Darslar</th>
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">Davomiyligi</th>
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">Narx</th>
                  <th className="px-6 py-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {allCourses.slice(0, 5).map((course, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">{course.title}</div>
                      <div className="text-xs text-gray-500 mt-1">Boshlovchi daraja</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img src={course.teacherAvatar} alt={course.teacher} className="h-8 w-8 rounded-full" />
                        <span className="font-medium text-gray-700">{course.teacher}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">{course.lessons}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">~24 soat</td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {course.slug === "react" ? "790 000" : course.slug === "javascript" || course.slug === "flutter" ? "690 000" : course.slug === "python" ? "590 000" : "490 000"} so'm
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link to={`/courses/${course.slug}`} className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-blue-700">
                        Boshlash
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── Enrollment Form Section ── */}
      <section className="mx-auto mt-16 w-full max-w-7xl px-6 pb-16">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Form */}
          <div className="flex-1 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
            <h2 className="mb-2 font-manrope text-2xl font-bold tracking-tight text-gray-900">
              Bepul ro'yxatdan o'ting
            </h2>
            <p className="mb-8 text-sm text-gray-500">
              Formani to'ldiring — demo darslarga kirish havolasi emailingizga yuboriladi.
            </p>

            <form className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">Ism *</label>
                  <input type="text" placeholder="Ismingiz" className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">Familiya</label>
                  <input type="text" placeholder="Familiyangiz" className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">Telefon *</label>
                  <input type="tel" placeholder="+998 90 123 45 67" className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">Email</label>
                  <input type="email" placeholder="Sizning emailingiz" className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">Kurs *</label>
                  <select className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-500">
                    <option>Kursni tanlang</option>
                    <option>JavaScript dasturlash</option>
                    <option>Python dasturlash</option>
                    <option>UX/UI dizayn</option>
                  </select>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">Tajriba darajangiz</label>
                  <select className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-500">
                    <option>Boshlang'ich — noldan boshlayman</option>
                    <option>O'rta daraja — bazaviy bilim bor</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">Izoh</label>
                <textarea rows={4} placeholder="Savolingiz yeki istaklaringiz bo'lsa yozing..." className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"></textarea>
              </div>

              <div className="flex items-start gap-3">
                <input type="checkbox" id="terms" className="mt-1 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                <label htmlFor="terms" className="text-sm text-gray-500">
                  Foydalanish shartlari va Shaxsiy ma'lumotlarni qayta ishlashga roziman.
                </label>
              </div>

              <button type="button" className="inline-flex w-full md:w-auto items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700">
                Ariza yuborish
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </form>
          </div>

          {/* Right Sidebar */}
          <div className="w-full lg:w-[380px] flex flex-col gap-6">
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="mb-6 font-manrope text-lg font-bold text-gray-900">
                Online ta'limda nimaga ega bo'lasiz?
              </h3>
              
              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm mb-1">HD video darslar</h4>
                    <p className="text-xs text-gray-500 leading-relaxed">Istalgan vaqtda, istalgan joydan ko'ring — umrbod kirish bilan.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm mb-1">Amaliy topshiriqlar</h4>
                    <p className="text-xs text-gray-500 leading-relaxed">Har modul oxirida topshiriq va testlar — bilimni mustahkamlash.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm mb-1">Mentor qo'llab-quvvatlovi</h4>
                    <p className="text-xs text-gray-500 leading-relaxed">Savollaringizga online chat orqali mentorlar javob beradi.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm mb-1">Sertifikat</h4>
                    <p className="text-xs text-gray-500 leading-relaxed">Kursni tugatganingizda raqamli sertifikat olasiz.</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border border-blue-100 bg-blue-50 p-6 shadow-sm">
              <h3 className="mb-2 font-manrope text-lg font-bold text-gray-900">
                Savolingiz bormi?
              </h3>
              <p className="mb-4 text-sm text-gray-600 leading-relaxed">
                Qo'ng'iroq qiling yoki Telegram orqali yozing — darhol javob beramiz.
              </p>
              <a href="tel:+998711234567" className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-white px-4 py-3 text-sm font-semibold text-gray-900 shadow-sm border border-gray-200 transition hover:bg-gray-50">
                +998 71 123 45 67
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Enrollment;
