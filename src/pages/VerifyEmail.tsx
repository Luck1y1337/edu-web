import { useEffect } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { Icon } from "../components/ui/Icon";
import { useVerifyEmail } from "../hooks/api/useAuthActions";
import GlobalSpinner from "../components/ui/GlobalSpinner";

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();
  
  const { mutate, isPending, isSuccess, isError } = useVerifyEmail();

  useEffect(() => {
    if (token) {
      mutate(token, {
        onSuccess: () => {
          setTimeout(() => navigate("/login"), 3000);
        }
      });
    }
  }, [token, mutate, navigate]);

  if (!token) {
    return (
      <div className="flex min-h-screen bg-gray-50 flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
          <h2 className="text-xl font-bold text-gray-900">Yaroqsiz havola</h2>
          <p className="mt-2 text-sm text-gray-600">Tasdiqlash havolasi xato yoki eskirgan.</p>
          <Link to="/" className="mt-4 inline-block text-blue-600 font-medium">
            Bosh sahifaga qaytish
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50 flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        {isPending && (
          <>
            <GlobalSpinner />
            <h2 className="mt-6 text-xl font-bold text-gray-900">Email tasdiqlanmoqda...</h2>
          </>
        )}
        
        {isSuccess && (
          <div className="rounded-md bg-green-50 p-6">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100 mb-4 text-green-600">
              <Icon.check />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Muvaffaqiyatli tasdiqlandi!</h2>
            <p className="mt-2 text-sm text-gray-600">
              Sizning email manzilingiz tasdiqlandi. Hozir sizni kirish sahifasiga yo'naltiramiz.
            </p>
            <Link to="/login" className="mt-6 inline-block text-blue-600 font-medium">
              Kirish sahifasiga o'tish
            </Link>
          </div>
        )}

        {isError && (
          <div className="rounded-md bg-red-50 p-6">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100 mb-4 text-red-600">
              <Icon.alertCircle />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Xatolik yuz berdi</h2>
            <p className="mt-2 text-sm text-gray-600">
              Email manzilini tasdiqlashda xatolik yuz berdi. Havola eskirgan bo'lishi mumkin.
            </p>
            <Link to="/" className="mt-6 inline-block text-blue-600 font-medium">
              Bosh sahifaga qaytish
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;
