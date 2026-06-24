import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { Icon } from "../components/ui/Icon";
import { useResetPassword } from "../hooks/api/useAuthActions";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();
  
  const form = useForm<any>();
  const { mutateAsync, isPending } = useResetPassword();
  const { formState: { errors } } = form;
  const [showPassword, setShowPassword] = useState("password");

  const onSubmit = async (values: any) => {
    if (!token) {
      toast.error("Yaroqsiz havola. Qaytadan urinib ko'ring.");
      return;
    }
    if (values.newPassword !== values.confirmPassword) {
      toast.error("Parollar mos kelmadi");
      return;
    }
    
    try {
      await mutateAsync({ token, newPassword: values.newPassword });
      setTimeout(() => navigate("/login"), 2000);
    } catch {
      // Error handled by hook
    }
  };

  if (!token) {
    return (
      <div className="flex min-h-screen bg-gray-50 flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100 mb-4 text-red-600">
            <Icon.alertCircle />
          </div>
          <h2 className="text-xl font-bold text-gray-900">Yaroqsiz havola</h2>
          <p className="mt-2 text-sm text-gray-600">Parolni tiklash havolasi xato yoki eskirgan.</p>
          <Link to="/forgot-password" className="mt-4 inline-block text-blue-600 font-medium">
            Yangi havola so'rash
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50 flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="mx-auto flex justify-center text-blue-600 h-12 w-12">
          <Icon.lock />
        </div>
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
          Yangi parol o'rnatish
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white px-4 py-8 shadow sm:rounded-xl sm:px-10">
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <Input
              name="newPassword"
              type={showPassword}
              form={form}
              placeholder="Kamida 8 ta belgi"
              label="Yangi parol"
              required
              leftIcon={<Icon.lock />}
              error={errors.newPassword?.message as string}
              rules={{
                required: "Yangi parol kiritilishi shart",
                minLength: {
                  value: 8,
                  message: "Kamida 8 ta belgi bo'lishi kerak",
                },
                pattern: {
                  value: /^(?=.*[A-Z])(?=.*\d).+$/,
                  message: "Kamida 1 ta katta harf va 1 ta raqam bo'lishi kerak"
                }
              }}
              rightIcon={
                <button
                  type="button"
                  onClick={() => setShowPassword(p => p === "password" ? "text" : "password")}
                >
                  {showPassword === "password" ? <Icon.eye /> : <Icon.eyeOff />}
                </button>
              }
            />

            <Input
              name="confirmPassword"
              type={showPassword}
              form={form}
              placeholder="Yangi parolni tasdiqlang"
              label="Parolni tasdiqlash"
              required
              leftIcon={<Icon.lock />}
              error={errors.confirmPassword?.message as string}
              rules={{
                required: "Parolni tasdiqlash shart",
              }}
            />

            <Button
              type="submit"
              variant="primary"
              fullWidth
              disabled={isPending}
              className="mt-1"
            >
              {isPending ? "Saqlanmoqda..." : "Parolni saqlash"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
