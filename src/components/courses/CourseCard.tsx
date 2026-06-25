import { Link } from "react-router-dom";
import type { Course } from "../../data/courses.data";

interface Props {
  course: Course;
}

const CourseCard = ({ course }: Props) => {
  return (
    <article className="flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md">
      {/* Image */}
      <Link to={`/courses/${course.slug}`} className="block overflow-hidden">
        <img
          src={course.image}
          alt={course.title}
          className="h-48 w-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </Link>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-3 p-5">
        {/* Top row: badge + rating */}
        <div className="flex items-center justify-between">
          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${course.badgeBg} ${course.badgeText}`}
          >
            {course.category}
          </span>
          <span className="flex items-center gap-1 text-sm font-semibold text-gray-700">
            <svg
              className="h-4 w-4 text-amber-400"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
            {course.rating}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-manrope text-lg font-semibold leading-snug tracking-tight text-gray-900">
          <Link
            to={`/courses/${course.slug}`}
            className="transition-colors hover:text-blue-600"
          >
            {course.title}
          </Link>
        </h3>

        {/* Description */}
        <p className="flex-1 text-sm leading-relaxed text-gray-500 line-clamp-2">
          {course.description}
        </p>

        {/* Meta: duration + lesson count */}
        <div className="flex items-center gap-4 text-xs text-gray-400">
          <span className="flex items-center gap-1.5">
            <svg
              className="h-3.5 w-3.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
            </svg>
            {course.duration}
          </span>
          <span className="flex items-center gap-1.5">
            <svg
              className="h-3.5 w-3.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            {course.lessons}
          </span>
        </div>
      </div>

      {/* Footer: price + CTA */}
      <div className="flex items-center justify-between border-t border-gray-100 px-5 py-4">
        <div className="flex items-baseline gap-2">
          <span className="font-manrope text-base font-bold text-gray-900">
            {course.price}
          </span>
        </div>
        <Link
          to={`/courses/${course.slug}`}
          className="rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-blue-700"
        >
          Batafsil
        </Link>
      </div>
    </article>
  );
};

export default CourseCard;
