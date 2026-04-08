import { useState, useEffect } from "react";
import { useLocation, Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { AuthStorage } from "@/lib/auth-storage";
import { AILoadingAnimation } from "@/components/landing/AILoadingAnimation";
import {
  Mail, Lock, Eye, EyeOff, ArrowRight,
  Activity, PhoneForwarded, CheckCircle2, User, ArrowLeft, KeyRound
} from "lucide-react";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(1, "Password is required"),
});

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email"),
});

const resetPasswordSchema = z.object({
  otp: z.string().min(6, "OTP must be 6 digits"),
  newPassword: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type LoginFormData = z.infer<typeof loginSchema>;
type RegisterFormData = z.infer<typeof registerSchema>;
type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

type ViewType = "login" | "register" | "register-otp" | "forgot-password" | "reset-password";

export default function LoginPage() {
  const [location, setLocation] = useLocation();
  const initialTab = location === "/register" ? "register" : "login";
  const [activeView, setActiveView] = useState<ViewType>(initialTab);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showLoadingAnimation, setShowLoadingAnimation] = useState(false);
  const [pendingRedirect, setPendingRedirect] = useState<string | null>(null);
  const [userName, setUserName] = useState<string>("");
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState<string>("");
  const [otpTimer, setOtpTimer] = useState(0);
  const [registerOtpCode, setRegisterOtpCode] = useState<string>("");
  const [canResendOtp, setCanResendOtp] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (otpTimer > 0) {
      const timer = setTimeout(() => setOtpTimer(otpTimer - 1), 1000);
      return () => clearTimeout(timer);
    } else if (otpTimer === 0 && (activeView === 'register-otp' || activeView === 'reset-password')) {
      setCanResendOtp(true);
    }
  }, [otpTimer, activeView]);

  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const registerForm = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: "", email: "", password: "", confirmPassword: "" },
  });

  const forgotPasswordForm = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  const resetPasswordForm = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { otp: "", newPassword: "", confirmPassword: "" },
  });

  const handleLoadingComplete = () => {
    if (pendingRedirect) {
      setLocation(pendingRedirect);
    }
  };

  const handleLogin = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Login failed");

      AuthStorage.setAuthData(result.token, result.user, result.refreshToken, result.expiresIn);
      setUserName(result.user.name || result.user.email.split('@')[0]);
      toast({ title: "Welcome back!", description: "Login successful" });
      const redirectPath = (result.user.role === 'admin' || result.user.role === 'super_admin') ? "/admin" : "/app";
      setPendingRedirect(redirectPath);
      setShowLoadingAnimation(true);
    } catch (error: any) {
      toast({ title: "Login failed", description: error.message || "Invalid credentials", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendRegistrationOTP = async (data: RegisterFormData) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: data.email, name: data.name }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Failed to send verification code");

      toast({ title: "Code sent!", description: `Check your email at ${data.email}` });
      setActiveView('register-otp');
      setOtpTimer(300);
      setCanResendOtp(false);
      setRegisterOtpCode("");
    } catch (error: any) {
      toast({ title: "Failed to send code", description: error.message, variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendRegistrationOTP = async () => {
    const data = registerForm.getValues();
    setIsLoading(true);
    try {
      const response = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: data.email, name: data.name }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Failed to resend verification code");

      toast({ title: "Code resent!", description: "A new verification code has been sent" });
      setOtpTimer(300);
      setCanResendOtp(false);
      setRegisterOtpCode("");
    } catch (error: any) {
      toast({ title: "Failed to resend code", description: error.message, variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyAndRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (registerOtpCode.length !== 6) {
      toast({ title: "Invalid code", description: "Please enter a 6-digit code", variant: "destructive" });
      return;
    }
    setIsLoading(true);
    try {
      const verifyResponse = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: registerForm.getValues().email, otpCode: registerOtpCode }),
      });
      const verifyResult = await verifyResponse.json();
      if (!verifyResponse.ok) throw new Error(verifyResult.error || "Invalid verification code");

      const registerData = registerForm.getValues();
      const registerResponse = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: registerData.email, password: registerData.password, name: registerData.name }),
      });
      const result = await registerResponse.json();
      if (!registerResponse.ok) throw new Error(result.error || "Registration failed");

      AuthStorage.setAuthData(result.token, result.user, result.refreshToken, result.expiresIn);
      setUserName(result.user.name || result.user.email.split('@')[0]);
      toast({ title: "Account created!", description: `Welcome, ${result.user.name}` });
      const redirectPath = result.user.role === 'admin' ? "/admin" : "/app";
      setPendingRedirect(redirectPath);
      setShowLoadingAnimation(true);
    } catch (error: any) {
      toast({ title: "Verification failed", description: error.message, variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPasswordSubmit = async (data: ForgotPasswordFormData) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/auth/forgot-password/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: data.email }),
      });
      const result = await response.json();
      if (response.ok) {
        setForgotPasswordEmail(data.email);
        setOtpTimer(300);
        setCanResendOtp(false);
        setActiveView("reset-password");
        toast({ title: "Code sent!", description: "Check your email for the verification code" });
      } else {
        toast({ title: "Failed to send code", description: result.error || "Something went wrong", variant: "destructive" });
      }
    } catch (error: any) {
      toast({ title: "Failed to send code", description: error.message, variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendForgotPasswordOTP = async () => {
    if (otpTimer > 0) return;
    setIsLoading(true);
    try {
      const response = await fetch("/api/auth/forgot-password/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: forgotPasswordEmail }),
      });
      const result = await response.json();
      if (response.ok) {
        setOtpTimer(300);
        setCanResendOtp(false);
        toast({ title: "Code resent!", description: "Check your email for the new code" });
      } else {
        toast({ title: "Failed to resend", description: result.error || "Something went wrong", variant: "destructive" });
      }
    } catch (error: any) {
      toast({ title: "Failed to resend", description: error.message, variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (data: ResetPasswordFormData) => {
    setIsLoading(true);
    try {
      const verifyResponse = await fetch("/api/auth/forgot-password/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: forgotPasswordEmail, otpCode: data.otp }),
      });
      const verifyResult = await verifyResponse.json();
      if (!verifyResponse.ok) {
        toast({ title: "Invalid code", description: verifyResult.error || "Please check the code", variant: "destructive" });
        setIsLoading(false);
        return;
      }
      const resetResponse = await fetch("/api/auth/forgot-password/reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: forgotPasswordEmail, newPassword: data.newPassword }),
      });
      const resetResult = await resetResponse.json();
      if (resetResponse.ok) {
        toast({ title: "Password reset!", description: "You can now login with your new password" });
        resetPasswordForm.reset();
        forgotPasswordForm.reset();
        setActiveView("login");
      } else {
        toast({ title: "Failed to reset password", description: resetResult.error || "Something went wrong", variant: "destructive" });
      }
    } catch (error: any) {
      toast({ title: "Failed to reset password", description: error.message, variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  const inputClasses = "w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-[#FF0066]/20 focus:border-[#FF0066] transition-all shadow-sm";
  const buttonClasses = "w-full flex items-center justify-center gap-2 py-4 mt-2 rounded-xl font-bold text-white bg-gradient-to-r from-[#FF0066] via-[#FF6633] to-[#FFBB33] bg-[length:200%_auto] hover:bg-right shadow-md hover:shadow-lg hover:shadow-[#FF0066]/20 transition-all duration-500 active:scale-95 disabled:opacity-70";
  const labelClasses = "text-sm font-bold text-gray-900";
  const iconContainerClasses = "absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none";

  return (
    <>
      <AILoadingAnimation
        isVisible={showLoadingAnimation}
        onComplete={handleLoadingComplete}
        userName={userName}
      />

      <div className="min-h-screen flex font-jakarta bg-gradient-to-br from-[#FF0066]/[0.03] via-white to-[#FFBB33]/[0.04]">
        <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 sm:px-16 md:px-24 xl:px-32 relative z-10 overflow-y-auto py-12">
          <div className="lg:hidden mb-8">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl font-black tracking-tight">
                <span className="text-black">Voice</span>
                <span className="bg-gradient-to-r from-[#FF0066] via-[#FF6633] to-[#FFBB33] bg-clip-text text-transparent pr-1">X</span>
              </span>
            </Link>
          </div>

          <div className="max-w-md w-full mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeView}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                {activeView === "login" && (
                  <>
                    <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-2 tracking-tight">Welcome back</h1>
                    <p className="text-gray-500 mb-8 text-base font-medium">Enter your credentials to access your agent dashboard.</p>
                    <form className="space-y-5" onSubmit={loginForm.handleSubmit(handleLogin)}>
                      <div className="space-y-2">
                        <label className={labelClasses}>Email Address</label>
                        <div className="relative">
                          <div className={iconContainerClasses}><Mail className="h-5 w-5 text-gray-400" /></div>
                          <input type="email" placeholder="you@company.com" className={inputClasses} {...loginForm.register("email")} />
                        </div>
                        {loginForm.formState.errors.email && <p className="text-xs text-red-500">{loginForm.formState.errors.email.message}</p>}
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <label className={labelClasses}>Password</label>
                          <button type="button" onClick={() => { forgotPasswordForm.setValue("email", loginForm.getValues("email")); setActiveView("forgot-password"); }} className="text-sm font-bold text-[#FF6633] hover:text-[#FF0066] transition-colors">Forgot password?</button>
                        </div>
                        <div className="relative">
                          <div className={iconContainerClasses}><Lock className="h-5 w-5 text-gray-400" /></div>
                          <input type={showPassword ? "text" : "password"} placeholder="••••••••" className={`${inputClasses} pr-12`} {...loginForm.register("password")} />
                          <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors">
                            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                          </button>
                        </div>
                        {loginForm.formState.errors.password && <p className="text-xs text-red-500">{loginForm.formState.errors.password.message}</p>}
                      </div>
                      <button type="submit" disabled={isLoading} className={buttonClasses}>
                        {isLoading ? "Signing In..." : "Sign In to Dashboard"} <ArrowRight className="h-5 w-5" />
                      </button>
                    </form>
                    <p className="mt-10 text-center text-sm font-medium text-gray-500">
                      Don't have an account? <button onClick={() => setActiveView("register")} className="font-bold text-[#FF0066] hover:underline">Sign up for free</button>
                    </p>
                  </>
                )}

                {activeView === "register" && (
                  <>
                    <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-2 tracking-tight">Create an account</h1>
                    <p className="text-gray-500 mb-8 text-base font-medium">Get started with your free agent dashboard.</p>
                    <form className="space-y-5" onSubmit={registerForm.handleSubmit(handleSendRegistrationOTP)}>
                      <div className="space-y-2">
                        <label className={labelClasses}>Full Name</label>
                        <div className="relative">
                          <div className={iconContainerClasses}><User className="h-5 w-5 text-gray-400" /></div>
                          <input type="text" placeholder="Full Name" className={inputClasses} {...registerForm.register("name")} />
                        </div>
                        {registerForm.formState.errors.name && <p className="text-xs text-red-500">{registerForm.formState.errors.name.message}</p>}
                      </div>
                      <div className="space-y-2">
                        <label className={labelClasses}>Email Address</label>
                        <div className="relative">
                          <div className={iconContainerClasses}><Mail className="h-5 w-5 text-gray-400" /></div>
                          <input type="email" placeholder="you@company.com" className={inputClasses} {...registerForm.register("email")} />
                        </div>
                        {registerForm.formState.errors.email && <p className="text-xs text-red-500">{registerForm.formState.errors.email.message}</p>}
                      </div>
                      <div className="space-y-2">
                        <label className={labelClasses}>Password</label>
                        <div className="relative">
                          <div className={iconContainerClasses}><Lock className="h-5 w-5 text-gray-400" /></div>
                          <input type={showPassword ? "text" : "password"} placeholder="••••••••" className={`${inputClasses} pr-12`} {...registerForm.register("password")} />
                          <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors">
                            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                          </button>
                        </div>
                        {registerForm.formState.errors.password && <p className="text-xs text-red-500">{registerForm.formState.errors.password.message}</p>}
                      </div>
                      <div className="space-y-2">
                        <label className={labelClasses}>Confirm Password</label>
                        <div className="relative">
                          <div className={iconContainerClasses}><Lock className="h-5 w-5 text-gray-400" /></div>
                          <input type="password" placeholder="••••••••" className={inputClasses} {...registerForm.register("confirmPassword")} />
                        </div>
                        {registerForm.formState.errors.confirmPassword && <p className="text-xs text-red-500">{registerForm.formState.errors.confirmPassword.message}</p>}
                      </div>
                      <button type="submit" disabled={isLoading} className={buttonClasses}>
                        {isLoading ? "Sending Code..." : "Send Verification Code"} <ArrowRight className="h-5 w-5" />
                      </button>
                    </form>
                    <p className="mt-10 text-center text-sm font-medium text-gray-500">
                      Already have an account? <button onClick={() => setActiveView("login")} className="font-bold text-[#FF0066] hover:underline">Sign in</button>
                    </p>
                  </>
                )}

                {activeView === "register-otp" && (
                  <>
                    <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-2 tracking-tight">Check your email</h1>
                    <p className="text-gray-500 mb-8 text-base font-medium">We sent a verification code to <strong className="text-gray-900">{registerForm.getValues().email}</strong></p>
                    <form className="space-y-5" onSubmit={handleVerifyAndRegister}>
                      <div className="space-y-2">
                        <label className={labelClasses}>Verification Code</label>
                        <input type="text" maxLength={6} value={registerOtpCode} onChange={(e) => setRegisterOtpCode(e.target.value.replace(/\D/g, ''))} className={`${inputClasses} text-center text-2xl tracking-[0.5em]`} placeholder="000000" />
                      </div>
                      {otpTimer > 0 && <p className="text-sm font-bold text-gray-500 text-center">Code expires in {Math.floor(otpTimer / 60)}:{String(otpTimer % 60).padStart(2, '0')}</p>}
                      <button type="submit" disabled={isLoading || registerOtpCode.length !== 6} className={buttonClasses}>
                        {isLoading ? "Verifying..." : "Verify & Create Account"}
                      </button>
                      <div className="flex gap-4 mt-4">
                        <button type="button" onClick={() => { setActiveView('register'); setRegisterOtpCode(""); }} className="flex-1 py-3 bg-white border border-gray-200 text-gray-700 rounded-xl font-bold hover:bg-gray-50 transition-all shadow-sm">Back</button>
                        <button type="button" onClick={handleResendRegistrationOTP} disabled={isLoading || !canResendOtp} className="flex-1 py-3 bg-white border border-gray-200 text-gray-700 rounded-xl font-bold hover:bg-gray-50 transition-all shadow-sm disabled:opacity-50">
                          {canResendOtp ? "Resend Code" : `Resend in ${Math.floor(otpTimer / 60)}s`}
                        </button>
                      </div>
                    </form>
                  </>
                )}

                {activeView === "forgot-password" && (
                  <>
                    <div className="mb-6 w-16 h-16 rounded-2xl bg-[#FF0066]/10 flex items-center justify-center">
                      <KeyRound className="w-8 h-8 text-[#FF0066]" />
                    </div>
                    <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-2 tracking-tight">Forgot password?</h1>
                    <p className="text-gray-500 mb-8 text-base font-medium">Enter your email to receive a reset code.</p>
                    <form className="space-y-5" onSubmit={forgotPasswordForm.handleSubmit(handleForgotPasswordSubmit)}>
                      <div className="space-y-2">
                        <label className={labelClasses}>Email Address</label>
                        <div className="relative">
                          <div className={iconContainerClasses}><Mail className="h-5 w-5 text-gray-400" /></div>
                          <input type="email" placeholder="you@company.com" className={inputClasses} {...forgotPasswordForm.register("email")} />
                        </div>
                        {forgotPasswordForm.formState.errors.email && <p className="text-xs text-red-500">{forgotPasswordForm.formState.errors.email.message}</p>}
                      </div>
                      <button type="submit" disabled={isLoading} className={buttonClasses}>
                        {isLoading ? "Sending..." : "Send Reset Code"} <ArrowRight className="h-5 w-5" />
                      </button>
                      <button type="button" onClick={() => setActiveView("login")} className="w-full mt-4 flex items-center justify-center gap-2 py-3 text-gray-600 font-bold hover:text-gray-900 transition-colors">
                        <ArrowLeft className="w-4 h-4" /> Back to login
                      </button>
                    </form>
                  </>
                )}

                {activeView === "reset-password" && (
                  <>
                    <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-2 tracking-tight">Reset password</h1>
                    <p className="text-gray-500 mb-8 text-base font-medium">Enter the code sent to <strong className="text-gray-900">{forgotPasswordEmail}</strong></p>
                    <form className="space-y-5" onSubmit={resetPasswordForm.handleSubmit(handleResetPassword)}>
                      <div className="space-y-2">
                        <label className={labelClasses}>Verification Code</label>
                        <input type="text" maxLength={6} className={`${inputClasses} text-center text-2xl tracking-[0.5em]`} {...resetPasswordForm.register("otp")} />
                        <div className="flex justify-center mt-2">
                          {otpTimer > 0 ? (
                            <span className="text-sm font-bold text-gray-500">Resend in {Math.floor(otpTimer / 60)}:{String(otpTimer % 60).padStart(2, '0')}</span>
                          ) : (
                            <button type="button" onClick={handleResendForgotPasswordOTP} className="text-sm font-bold text-[#FF6633] hover:text-[#FF0066]">Resend code</button>
                          )}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className={labelClasses}>New Password</label>
                        <div className="relative">
                          <div className={iconContainerClasses}><Lock className="h-5 w-5 text-gray-400" /></div>
                          <input type={showPassword ? "text" : "password"} className={`${inputClasses} pr-12`} {...resetPasswordForm.register("newPassword")} />
                          <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors">
                            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                          </button>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className={labelClasses}>Confirm New Password</label>
                        <div className="relative">
                          <div className={iconContainerClasses}><Lock className="h-5 w-5 text-gray-400" /></div>
                          <input type="password" className={inputClasses} {...resetPasswordForm.register("confirmPassword")} />
                        </div>
                      </div>
                      <button type="submit" disabled={isLoading} className={buttonClasses}>
                        {isLoading ? "Resetting..." : "Reset Password"}
                      </button>
                      <button type="button" onClick={() => { setActiveView("forgot-password"); resetPasswordForm.reset(); }} className="w-full mt-4 flex items-center justify-center gap-2 py-3 text-gray-600 font-bold hover:text-gray-900 transition-colors">
                        <ArrowLeft className="w-4 h-4" /> Change email
                      </button>
                    </form>
                  </>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="hidden lg:flex lg:w-1/2 relative items-center justify-center overflow-hidden p-12">
          <div className="absolute top-[10%] left-[20%] w-96 h-96 bg-[#FF0066]/[0.05] rounded-full blur-[100px] pointer-events-none"></div>
          <div className="absolute bottom-[10%] right-[20%] w-96 h-96 bg-[#FFBB33]/[0.07] rounded-full blur-[100px] pointer-events-none"></div>
          <div className="relative z-10 w-full max-w-lg flex flex-col h-full justify-between py-10">
            <div className="flex justify-start">
              <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                <h1 className="text-5xl font-black tracking-tighter flex items-center justify-center drop-shadow-sm">
                  <span className="text-gray-900">Voice</span>
                  <span className="bg-gradient-to-r from-[#FF0066] via-[#FF6633] to-[#FFBB33] bg-clip-text text-transparent pr-1">X</span>
                </h1>
              </Link>
            </div>

            <div className="space-y-6 my-12 relative">
              <div className="absolute left-6 top-8 bottom-8 w-px bg-gradient-to-b from-gray-200 via-gray-200 to-transparent -z-10"></div>
              <div className="bg-white/80 backdrop-blur-md border border-gray-100 rounded-2xl p-5 flex items-center gap-4 shadow-xl shadow-[#FF0066]/5 transform transition-transform hover:-translate-y-1 ml-0 relative">
                <div className="absolute -left-[5px] top-1/2 w-2.5 h-2.5 rounded-full bg-[#FF0066] shadow-[0_0_10px_#FF0066]"></div>
                <div className="w-12 h-12 rounded-xl bg-[#FF0066]/10 flex items-center justify-center flex-shrink-0">
                  <Activity className="w-6 h-6 text-[#FF0066]" />
                </div>
                <div>
                  <h3 className="text-gray-900 font-bold text-sm">Real-time Intent Analysis</h3>
                  <p className="text-gray-500 text-xs mt-0.5">Processing 10,000+ interactions/sec</p>
                </div>
              </div>
              <div className="bg-white/80 backdrop-blur-md border border-gray-100 rounded-2xl p-5 flex items-center gap-4 shadow-xl shadow-[#FF6633]/5 transform transition-transform hover:-translate-y-1 ml-8 relative">
                <div className="w-12 h-12 rounded-xl bg-[#FF6633]/10 flex items-center justify-center flex-shrink-0">
                  <PhoneForwarded className="w-6 h-6 text-[#FF6633]" />
                </div>
                <div>
                  <h3 className="text-gray-900 font-bold text-sm">Automated Outbound Calling</h3>
                  <p className="text-gray-500 text-xs mt-0.5">Connecting to global carrier networks</p>
                </div>
              </div>
              <div className="bg-white/80 backdrop-blur-md border border-gray-100 rounded-2xl p-5 flex items-center gap-4 shadow-xl shadow-emerald-500/5 transform transition-transform hover:-translate-y-1 ml-16 relative">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                </div>
                <div>
                  <h3 className="text-gray-900 font-bold text-sm">CRM Handoff Successful</h3>
                  <p className="text-gray-500 text-xs mt-0.5">Ticket created in Salesforce & Zendesk</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/60 backdrop-blur-md border border-gray-100 rounded-2xl p-5 shadow-lg shadow-gray-200/20 text-center transform transition-transform hover:-translate-y-1">
                <p className="text-3xl font-black tracking-tight text-[#FF0066]">100+</p>
                <p className="text-gray-500 font-bold text-[10px] uppercase tracking-widest mt-1">Countries</p>
              </div>
              <div className="bg-white/60 backdrop-blur-md border border-gray-100 rounded-2xl p-5 shadow-lg shadow-gray-200/20 text-center transform transition-transform hover:-translate-y-1">
                <p className="text-3xl font-black tracking-tight text-[#FF6633]">30+</p>
                <p className="text-gray-500 font-bold text-[10px] uppercase tracking-widest mt-1">Languages</p>
              </div>
              <div className="bg-white/60 backdrop-blur-md border border-gray-100 rounded-2xl p-5 shadow-lg shadow-gray-200/20 text-center transform transition-transform hover:-translate-y-1">
                <p className="text-3xl font-black tracking-tight text-emerald-500">99.9%</p>
                <p className="text-gray-500 font-bold text-[10px] uppercase tracking-widest mt-1">Uptime</p>
              </div>
              <div className="bg-white/60 backdrop-blur-md border border-gray-100 rounded-2xl p-5 shadow-lg shadow-gray-200/20 text-center transform transition-transform hover:-translate-y-1">
                <p className="text-3xl font-black tracking-tight text-[#FFBB33]">24/7</p>
                <p className="text-gray-500 font-bold text-[10px] uppercase tracking-widest mt-1">Support</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}