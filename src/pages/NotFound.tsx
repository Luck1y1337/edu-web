import { Link } from "react-router-dom";
import Button from "../components/ui/Button";

const NotFound = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-4 py-12 text-center">
      <h1 className="text-9xl font-black text-slate-200">404</h1>
      <h2 className="mt-4 text-2xl font-bold tracking-tight text-slate-900 sm:text-4xl">
        Sahifa topilmadi
      </h2>
      <p className="mt-4 text-slate-500">
        Kechirasiz, siz qidirayotgan sahifa mavjud emas yoki o'chirilgan.
      </p>
      <Link to="/" className="mt-8 inline-flex">
        <Button variant="primary">Bosh sahifaga qaytish</Button>
      </Link>
    </div>
  );
};

export default NotFound;
