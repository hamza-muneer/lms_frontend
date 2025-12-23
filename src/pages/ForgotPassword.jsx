import React, { useState } from 'react';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';
import { Mail, ArrowRight, Shield, Key } from 'lucide-react';
import { toast } from 'sonner';

export const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        setIsLoading(true);
        try {
            await api.post('/forgot-password', { email });
            
            toast.success('OTP sent successfully! Check your email.');
            
            // Show success message with slight delay for better UX
            setTimeout(() => {
                navigate('/reset-password', { state: { email } });
            }, 1500);
        } catch (err) {
            toast.error(err.response?.data?.message || 'Something went wrong');
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-cyan-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10" />
            
            <div className="w-full max-w-md">
                {/* Logo/Header Section */}
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-500 to-cyan-600 rounded-2xl shadow-lg shadow-emerald-100 mb-6">
                        <Key className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent mb-2">
                        Reset Your Password
                    </h1>
                    <p className="text-gray-600 text-sm">
                        Enter your email to receive a secure OTP
                    </p>
                </div>

                {/* Card */}
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-100 p-8 transition-all duration-300 hover:shadow-2xl">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                                <Mail className="w-4 h-4 text-emerald-500" />
                                Email Address
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="email"
                                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent focus:outline-none transition-all duration-200 text-gray-800 placeholder-gray-400 hover:bg-white"
                                    placeholder="you@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                    {email && (
                                        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                                    )}
                                </div>
                            </div>
                            <p className="text-xs text-gray-500 mt-2">
                                We'll send a 6-digit OTP to this email
                            </p>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full group relative overflow-hidden bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-700 hover:to-cyan-700 text-white font-medium py-3.5 px-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <span className="relative flex items-center justify-center gap-2">
                                {isLoading ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        Sending OTP...
                                    </>
                                ) : (
                                    <>
                                        Send Secure OTP
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                                    </>
                                )}
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="relative my-8">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-200" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-4 bg-white text-gray-500">Remember your password?</span>
                        </div>
                    </div>

                    {/* Back to Login */}
                    <button
                        onClick={() => navigate('/login')}
                        className="w-full py-3 border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 active:scale-[0.98]"
                    >
                        Back to Login
                    </button>

                    {/* Security Note */}
                    <div className="mt-8 p-4 bg-gradient-to-r from-emerald-50 to-cyan-50 rounded-xl border border-emerald-100">
                        <div className="flex items-start gap-3">
                            <div className="mt-0.5">
                                <Shield className="w-5 h-5 text-emerald-600" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-emerald-900">Secure Process</p>
                                <p className="text-xs text-emerald-700 mt-1">
                                    Your email is encrypted and protected. OTP will expire in 15 minutes.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="text-center mt-8">
                    <p className="text-xs text-gray-500">
                        Need help?{' '}
                        <button
                            onClick={() => {/* Add contact support logic */}}
                            className="text-emerald-600 hover:text-emerald-700 font-medium hover:underline"
                        >
                            Contact Support
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};