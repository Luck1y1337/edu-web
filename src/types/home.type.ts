export interface NavLink {
  label: string;
  active: boolean;
}

export interface Stat {
  value: string;
  label: string;
  color: string;
}

export interface Course {
  image: string;
  category: string;
  rating: string;
  reviews: string;
  title: string;
  desc: string;
  teacher: string;
  price: string;
}

export interface Advantage {
  icon: string;
  color: string;
  title: string;
  desc: string;
}

export interface Teacher {
  photo: string;
  name: string;
  role: string;
  desc: string;
  courses: string;
  students: string;
  rating: string;
}

export interface Testimonial {
  text: string;
  photo: string;
  name: string;
  role: string;
}

export interface Faq {
  question: string;
  answer: string;
}
