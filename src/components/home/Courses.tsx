import { Link } from "react-router-dom";
import { Icon } from "../ui/Icon";
import SectionHeading from "../ui/SectionHeading";
import { courses } from "../../data/home.data";
import type { Course } from "../../types/home.type";

interface Props {
  items?: Course[];
}

const Courses = ({ items = courses }: Props) => {
  return (
    <section id="kurslar" className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Mashhur kurslar"
          title="Eng yaxshi ko'rinadigan kurslarimiz"
          subtitle="Mehnat bozorida eng talab qilinadigan zamonaviy yo'nalishlar bo'yicha amaliy ta'lim."
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((course) => (
            <article
              key={course.title}
              className="flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-shadow hover:shadow-lg"
            >
              <img
                src={course.image}
                alt={course.title}
                className="h-40 w-full object-cover"
              />
              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-600">
                    {course.category}
                  </span>
                  <span className="flex items-center gap-x-1 text-xs text-gray-500">
                    <Icon.star />
                    <span className="font-semibold text-gray-900">
                      {course.rating}
                    </span>
                    ({course.reviews})
                  </span>
                </div>
                <h3 className="mt-3 text-base font-semibold">{course.title}</h3>
                <p className="mt-2 flex-1 text-xs leading-relaxed text-gray-500">
                  {course.desc}
                </p>
                <p className="mt-4 flex items-center gap-x-2 border-b border-gray-100 pb-4 text-xs text-gray-500">
                  <img
                    src={`https://i.pravatar.cc/40?u=${course.teacher}`}
                    alt={course.teacher}
                    className="h-5 w-5 rounded-full"
                  />
                  O'qituvchi: {course.teacher}
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-base font-bold">{course.price}</span>
                  <Link
                    to="/courses"
                    className="rounded-lg bg-blue-600 px-3.5 py-1.5 text-xs font-medium text-white transition-colors hover:bg-blue-700"
                  >
                    Batafsil
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/courses"
            className="inline-flex items-center gap-x-2 rounded-lg border border-gray-200 bg-white px-6 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
          >
            Barcha kurslarni ko'rish <Icon.arrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Courses;
