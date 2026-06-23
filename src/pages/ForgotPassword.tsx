import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { Icon } from "../components/ui/Icon";
import { useForgotPassword } from "../hooks/api/useAuthActions";

const ForgotPassword = () => {
  const form = useForm<{ email: string }>();
  const { mutateAsync, isPending, isSuccess } = useForgotPassword();
  const { formState: { errors } } = form;

  const onSubmit = async (values: { email: string }) => {
    await mutateAsync(values.email);
  };

  return (
    <div className="flex min-h-screen bg-gray-50 flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="mx-auto flex justify-center text-blue-600 h-12 w-12">
          <Icon.graduationCap />
        </div>
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
          Parolni unutdingizmi?
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Email manzilingizni kiriting, biz sizga parolni tiklash havolasini yuboramiz.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white px-4 py-8 shadow sm:rounded-xl sm:px-10">
          {isSuccess ? (
            <div className="rounded-md bg-green-50 p-4">
              <div className="flex">
                <div className="flex-shrink-0 h-5 w-5 text-green-400">
                  <Icon.check />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-green-800">
                    Ko'rsatmalar email manzilingizga yuborildi. Iltimos pochtangizni tekshiring.
                  </p>
                </div>
              </div>
              <div className="mt-6 text-center">
                <Link to="/login" className="text-sm font-medium text-blue-600 hover:text-blue-500">
                  Kirish sahifasiga qaytish
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <Input
                name="email"
                type="email"
                form={form}
                placeholder="aziz@example.uz"
                label="Email manzil"
                required
                leftIcon={<Icon.mail />}
                error={errors.email?.message}
                rules={{
                  required: "Email kiritilishi shart",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Email manzil noto'g'ri",
                  },
                }}
              />

              <Button
                type="submit"
                variant="primary"
                fullWidth
                disabled={isPending}
                className="mt-1"
              >
                {isPending ? "Yuborilmoqda..." : "Havolani yuborish"}
              </Button>

              <div className="mt-4 text-center">
                <Link to="/login" className="text-sm font-medium text-gray-600 hover:text-gray-900">
                  <span aria-hidden="true">&larr;</span> Kirish sahifasiga qaytish
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
