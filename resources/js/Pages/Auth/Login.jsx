// import Checkbox from '@/Components/Checkbox';
// import InputError from '@/Components/InputError';
// import InputLabel from '@/Components/InputLabel';
// import PrimaryButton from '@/Components/PrimaryButton';
// import TextInput from '@/Components/TextInput';
// import GuestLayout from '@/Layouts/GuestLayout';
// import { Head, Link, useForm } from '@inertiajs/react';

// export default function Login({ status, canResetPassword }) {
//     const { data, setData, post, processing, errors, reset } = useForm({
//         email: '',
//         password: '',
//         remember: false,
//     });

//     const submit = (e) => {
//         e.preventDefault();

//         post(route('login'), {
//             onFinish: () => reset('password'),
//         });
//     };

//     return (
//         <GuestLayout>
//             <Head title="Log in" />

//             {status && (
//                 <div className="mb-4 text-sm font-medium text-green-600">
//                     {status}
//                 </div>
//             )}

//             <form onSubmit={submit}>
//                 <div>
//                     <InputLabel htmlFor="email" value="Email" />

//                     <TextInput
//                         id="email"
//                         type="email"
//                         name="email"
//                         value={data.email}
//                         className="mt-1 block w-full"
//                         autoComplete="username"
//                         isFocused={true}
//                         onChange={(e) => setData('email', e.target.value)}
//                     />

//                     <InputError message={errors.email} className="mt-2" />
//                 </div>

//                 <div className="mt-4">
//                     <InputLabel htmlFor="password" value="Password" />

//                     <TextInput
//                         id="password"
//                         type="password"
//                         name="password"
//                         value={data.password}
//                         className="mt-1 block w-full"
//                         autoComplete="current-password"
//                         onChange={(e) => setData('password', e.target.value)}
//                     />

//                     <InputError message={errors.password} className="mt-2" />
//                 </div>

//                 <div className="mt-4 block">
//                     <label className="flex items-center">
//                         <Checkbox
//                             name="remember"
//                             checked={data.remember}
//                             onChange={(e) =>
//                                 setData('remember', e.target.checked)
//                             }
//                         />
//                         <span className="ms-2 text-sm text-gray-600">
//                             Remember me
//                         </span>
//                     </label>
//                 </div>

//                 <div className="mt-4 flex items-center justify-end">
//                     {canResetPassword && (
//                         <Link
//                             href={route('password.request')}
//                             className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
//                         >
//                             Forgot your password?
//                         </Link>
//                     )}

//                     <PrimaryButton className="ms-4" disabled={processing}>
//                         Log in
//                     </PrimaryButton>
//                 </div>
//             </form>
//         </GuestLayout>
//     );
// }



import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const [showPassword, setShowPassword] = useState(false);

    const submit = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <div className="min-h-screen bg-[#a0d3ff] flex items-center justify-center p-6">
            <Head title="Log in" />

            <div className="w-full max-w-7xl rounded-xl overflow-hidden shadow-2xl flex min-h-[360px]">

                {/* ── LEFT: Form panel ── */}
                <div className="bg-white w-full md:w-1/2 flex flex-col justify-center px-10 py-12">
                    <h1 className="text-2xl font-bold text-[#173488] text-center mb-7 tracking-tight">
                        User Login
                    </h1>

                    {status && (
                        <div className="mb-4 text-sm font-medium text-green-600 text-center">
                            {status}
                        </div>
                    )}

                    <form onSubmit={submit} className="space-y-4">
                        {/* Email */}
                        <div>
                            <input
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                autoComplete="username"
                                autoFocus
                                placeholder="Email"
                                onChange={(e) => setData('email', e.target.value)}
                                className="w-full border border-gray-300 rounded px-4 py-2.5 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#173488] focus:border-transparent transition"
                            />
                            <InputError message={errors.email} className="mt-1" />
                        </div>

                        {/* Password */}
                        <div className="relative">
                            <input
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                value={data.password}
                                autoComplete="current-password"
                                placeholder="Enter your password"
                                onChange={(e) => setData('password', e.target.value)}
                                className="w-full border border-gray-300 rounded px-4 py-2.5 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#173488] focus:border-transparent transition pr-10"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(v => !v)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                                tabIndex={-1}
                            >
                                {showPassword ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-5 0-9-4-9-7s4-7 9-7a9.956 9.956 0 015.525 1.675M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 3l18 18" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                )}
                            </button>
                            <InputError message={errors.password} className="mt-1" />
                        </div>

                        {/* Remember me */}
                        <div className="flex items-center">
                            <Checkbox
                                name="remember"
                                checked={data.remember}
                                onChange={(e) => setData('remember', e.target.checked)}
                            />
                            <span className="ms-2 text-sm text-gray-500">Remember me</span>
                        </div>

                        {/* Login button */}
                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full bg-[#173488] hover:bg-[#283593] disabled:bg-[#5c6bc0] text-white font-semibold py-2.5 rounded text-sm tracking-wide transition-colors duration-200"
                        >
                            {processing ? 'Logging in...' : 'Login'}
                        </button>

                        {/* Divider */}
                        <div className="border-t border-gray-200" />

                        {/* Forgot password */}
                        {canResetPassword && (
                            <p className="text-center text-sm text-gray-500 hover:text-gray-700 transition">
                                <Link href={route('password.request')}>
                                    Forgot Password?
                                </Link>
                            </p>
                        )}
                    </form>
                </div>

                {/* ── RIGHT: Branding panel ── */}
                <div className="hidden md:flex w-1/2 bg-[#173488] flex-col items-center justify-center px-10 py-8 gap-5 rounded-r-2xl">
                    <p className="text-2xl font-semibold text-white tracking-wide -mb-2">Powered by</p>

                 {/* Logo */}
<div className="w-40 h-40 flex items-center justify-center overflow-hidden">
    <img
        src="/images/sait.png"
        alt="Logo"
        className="w-36 h-36 object-cover"
        onError={(e) => {
            e.target.style.display = 'none';
        }}
    />
</div>

                    <p className="text-2xl font-semibold text-white tracking-wide -mt-2">Reach Us</p>

                    {/* Social icons */}
                    <div className="flex items-center justify-center gap-3">
                        {/* Facebook */}
                        <a href="https://www.facebook.com/saitsolutionpokhara" className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition">
                            <svg className="w-4 h-4 fill-[#1877f2]" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
                        </a>
                        {/* Instagram */}
                        <a href="https://www.instagram.com/saitsolutionpokhara/" className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition">
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="url(#ig)" strokeWidth="2">
                                <defs>
                                    <linearGradient id="ig" x1="0%" y1="100%" x2="100%" y2="0%">
                                        <stop offset="0%" stopColor="#f09433"/>
                                        <stop offset="50%" stopColor="#e6683c"/>
                                        <stop offset="100%" stopColor="#bc1888"/>
                                    </linearGradient>
                                </defs>
                                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/>
                                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                            </svg>
                        </a>
                        {/* LinkedIn */}
                        <a href="https://www.linkedin.com/company/saitsolutionnepal/" className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition">
                            <svg className="w-4 h-4 fill-[#0077b5]" viewBox="0 0 24 24"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
                        </a>
                        {/* TikTok */}
                        <a href="https://www.tiktok.com/@saitsolution" className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition">
                            <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.75a4.85 4.85 0 01-1.01-.06z"/></svg>
                        </a>
                        {/* YouTube */}
                        <a href="https://www.youtube.com/@saitsolution" className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition">
                            <svg className="w-4 h-4 fill-[#ff0000]" viewBox="0 0 24 24"><path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 00-1.95 1.96A29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.95A29 29 0 0023 12a29 29 0 00-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z"/></svg>
                        </a>
                    </div>
{/* Contact numbers */}
<div className="flex items-center justify-center gap-4 text-sm text-white/80 tracking-wide">
    <a href="tel:061591368" target="_blank" rel="noopener noreferrer"
        className="hover:text-white transition-colors duration-200">
        061 591368
    </a>
    <span className="text-white/40">|</span>
    <a href="tel:9802835022" target="_blank" rel="noopener noreferrer"
        className="hover:text-white transition-colors duration-200">
        9802835022
    </a>
</div>
                </div>
            </div>
        </div>
    );
}