import { Eye, EyeOff, Lock, Mail } from 'lucide-react';
import { MdOutlineVerified } from 'react-icons/md';
import { ToastContainer } from 'react-toastify';
import logo from "../../../src/assets/icons/Abu_Dawas.png";
import { Alert } from '../../components/common/Alert';
import { InputField } from '../../components/common/InputField';
import Loader from '../../components/common/Loader';
import { useLoginHook } from '../../hooks/useLoginHook';

export const LoginPage = () => {
    const {
        formData,
        errors,
        isLoading,
        showPassword,
        submitMessage,
        submitType,
        handleInputChange,
        togglePasswordVisibility,
        handleLogin
    } = useLoginHook();

    return (
        <div className="min-h-screen bg-gradient-to-br  flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
                <div className="h-32 bg-gradient-to-r from-[var(--secondary)] to-primary bg relative">
                    <div className="absolute inset-0 bg-black opacity-10"></div>
                    <div className="relative h-full flex items-center justify-center">
                        <div className="text-center">
                            <div className="w-35 h-35 rounded-full flex items-center relative justify-center mx-auto mb-2">
                                <img src={logo} style={{
                                    width: "100px", height: "100px",
                                }} alt="" className=' rounded-full' />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-8 -mt-8 relative">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">
                            تسجيل الدخول
                        </h1>
                        <p className="text-[var(--primary)]">
                            وزارة البلديات والإسكان
                        </p>
                    </div>

                    {submitMessage && (
                        <div className="mb-6">
                            <Alert type={submitType} message={submitMessage} />
                        </div>
                    )}

                    <form onSubmit={handleLogin} className="space-y-6">
                        <InputField
                            label="البريد الإلكتروني"
                            type="email"
                            value={formData.email}
                            onChange={(value: any) => handleInputChange('email', value)}
                            error={errors.email}
                            disabled={isLoading}
                            placeholder="example@email.com"
                            icon={Mail}
                            req
                        />

                        <InputField
                            label="كلمة المرور"
                            type={showPassword ? 'text' : 'password'}
                            value={formData.password}
                            onChange={(value: any) => handleInputChange('password', value)}
                            error={errors.password}
                            disabled={isLoading}
                            placeholder="••••••••"
                            req
                            icon={Lock}
                            endIcon={showPassword ? EyeOff : Eye}
                            onEndIconClick={togglePasswordVisibility}
                        />

                        <button
                            type='submit'
                            disabled={isLoading}
                            className="w-full bg-gradient-to-r from-[var(--secondary)] to-[var(--primary)] hover:from-[var(--secondary)] hover:via-purple-700 hover:to-[var(--primary)]  cursor-pointer text-white py-3 px-4 rounded-lg font-medium text-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg hover:shadow-xl"
                        >
                            {isLoading ? (
                                <div className="flex items-center justify-center space-x-2">
                                    <Loader />
                                    <span>جاري تسجيل الدخول...</span>
                                </div>
                            ) : (

                                <span className='flex justify-center items-center'>
                                    <MdOutlineVerified />
                                    <span className='ms-2'>
                                        تسجيل الدخول
                                    </span>
                                </span>
                            )}
                        </button>
                    </form>
                </div>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={true}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </div>
    );
};