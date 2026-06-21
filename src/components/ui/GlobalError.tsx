import { useRouteError, isRouteErrorResponse } from "react-router-dom";
import Button from "./Button";

const GlobalError = () => {
  const error = useRouteError();

  let title = "Xatolik yuz berdi";
  let message = "Kutilmagan xatolik yuz berdi. Iltimos, keyinroq qayta urinib ko'ring.";

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      title = "Sahifa topilmadi";
      message = "Siz qidirayotgan sahifa mavjud emas.";
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white px-4 py-12 text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
        <svg
          className="h-8 w-8 text-red-600"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
      </div>
      <h2 className="mt-4 text-2xl font-bold tracking-tight text-slate-900">
        {title}
      </h2>
      <p className="mt-2 text-slate-500 max-w-md mx-auto">
        {message}
      </p>
      <div className="mt-6 flex gap-4">
        <Button
          variant="primary"
          onClick={() => window.location.reload()}
        >
          Qayta yuklash
        </Button>
        <Button
          variant="google"
          onClick={() => window.location.replace("/")}
        >
          Bosh sahifa
        </Button>
      </div>
    </div>
  );
};

export default GlobalError;
