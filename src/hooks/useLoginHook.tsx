import { signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { useAuth } from './useAuth';
import { toast } from 'react-toastify';



export const useLoginHook = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors]: any = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [submitMessage] = useState('');
  const [submitType, setSubmitType] = useState('');
  const { login }: any = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/dashboard';

  const validateEmail = (email: any) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return 'البريد الإلكتروني مطلوب';
    if (!emailRegex.test(email)) return 'يجب إدخال بريد إلكتروني صحيح';
    return '';
  };

  const validatePassword = (password: any) => {
    if (!password) return 'كلمة المرور مطلوبة';
    if (password.length < 6) return 'كلمة المرور يجب أن تكون 6 أحرف على الأقل';
    return '';
  };

  const handleInputChange = (field: any, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    if (errors[field]) {
      setErrors((prev: any) => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validateForm = () => {
    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);

    const validationErrors: any = {};
    if (emailError) validationErrors.email = emailError;
    if (passwordError) validationErrors.password = passwordError;

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };


  const handleLogin = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);

    const isValid = validateForm();

    if (isValid) {
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );
        const user = userCredential.user;

        await user.getIdToken(true);
        const tokenResult = await user.getIdTokenResult();

        if (tokenResult.claims.superadmin) {
          login(user);
          setSubmitType("success");
          localStorage.setItem(import.meta.env.VITE_SECRET_AUTH, "1");

          toast.success("تم تسجيل الدخول بنجاح!");
          setTimeout(() => {
            navigate(from, { replace: true });
          }, 1000);
        } else {
          toast.error("غير مسموح بالدخول إلا لـ superadmin");
          console.log("غير مسموح بالدخول إلا لـ superadmin");
        }
      } catch (err: any) {
        toast.error("خطأ في تسجيل الدخول");
        console.log("خطأ في تسجيل الدخول: " + err.message);
      }
    }

    setIsLoading(false);
  };


  return {
    formData,
    errors,
    isLoading,
    showPassword,
    submitMessage,
    submitType,
    handleInputChange,
    togglePasswordVisibility,
    handleLogin
  };
};