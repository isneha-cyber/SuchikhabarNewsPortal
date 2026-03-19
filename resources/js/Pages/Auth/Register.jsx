// import InputError from '@/Components/InputError';
// import InputLabel from '@/Components/InputLabel';
// import PrimaryButton from '@/Components/PrimaryButton';
// import TextInput from '@/Components/TextInput';
// import GuestLayout from '@/Layouts/GuestLayout';
// import { Head, Link, useForm } from '@inertiajs/react';

// export default function Register() {
//     const { data, setData, post, processing, errors, reset } = useForm({
//         name: '',
//         email: '',
//         password: '',
//         password_confirmation: '',
//     });

//     const submit = (e) => {
//         e.preventDefault();

//         post(route('register'), {
//             onFinish: () => reset('password', 'password_confirmation'),
//         });
//     };

//     return (
//         <GuestLayout>
//             <Head title="Register" />

//             <form onSubmit={submit}>
//                 <div>
//                     <InputLabel htmlFor="name" value="Name" />

//                     <TextInput
//                         id="name"
//                         name="name"
//                         value={data.name}
//                         className="mt-1 block w-full"
//                         autoComplete="name"
//                         isFocused={true}
//                         onChange={(e) => setData('name', e.target.value)}
//                         required
//                     />

//                     <InputError message={errors.name} className="mt-2" />
//                 </div>

//                 <div className="mt-4">
//                     <InputLabel htmlFor="email" value="Email" />

//                     <TextInput
//                         id="email"
//                         type="email"
//                         name="email"
//                         value={data.email}
//                         className="mt-1 block w-full"
//                         autoComplete="username"
//                         onChange={(e) => setData('email', e.target.value)}
//                         required
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
//                         autoComplete="new-password"
//                         onChange={(e) => setData('password', e.target.value)}
//                         required
//                     />

//                     <InputError message={errors.password} className="mt-2" />
//                 </div>

//                 <div className="mt-4">
//                     <InputLabel
//                         htmlFor="password_confirmation"
//                         value="Confirm Password"
//                     />

//                     <TextInput
//                         id="password_confirmation"
//                         type="password"
//                         name="password_confirmation"
//                         value={data.password_confirmation}
//                         className="mt-1 block w-full"
//                         autoComplete="new-password"
//                         onChange={(e) =>
//                             setData('password_confirmation', e.target.value)
//                         }
//                         required
//                     />

//                     <InputError
//                         message={errors.password_confirmation}
//                         className="mt-2"
//                     />
//                 </div>

//                 <div className="mt-4 flex items-center justify-end">
//                     <Link
//                         href={route('login')}
//                         className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
//                     >
//                         Already registered?
//                     </Link>

//                     <PrimaryButton className="ms-4" disabled={processing}>
//                         Register
//                     </PrimaryButton>
//                 </div>
//             </form>
//         </GuestLayout>
//     );
// }



import InputError from '@/Components/InputError';
import Navbar from '@/Suchikhabar/Navbar';
import { Head, Link, useForm } from '@inertiajs/react';

import { useEffect, useRef } from 'react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const cardRef = useRef(null);
    const lineRef = useRef(null);

    useEffect(() => {
        if (cardRef.current) {
            cardRef.current.style.opacity = '0';
            cardRef.current.style.transform = 'translateY(24px)';
            setTimeout(() => {
                cardRef.current.style.transition = 'opacity 0.55s cubic-bezier(.4,0,.2,1), transform 0.55s cubic-bezier(.4,0,.2,1)';
                cardRef.current.style.opacity = '1';
                cardRef.current.style.transform = 'translateY(0)';
            }, 60);
        }
        if (lineRef.current) {
            lineRef.current.style.width = '0';
            setTimeout(() => {
                lineRef.current.style.transition = 'width 0.7s cubic-bezier(.4,0,.2,1) 0.3s';
                lineRef.current.style.width = '100%';
            }, 80);
        }
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    const fieldStyle = (hasError) => ({
        width: '100%',
        padding: '10px 13px',
        fontSize: '0.88rem',
        border: hasError ? '1px solid #dc2626' : '1px solid rgba(28,23,17,0.18)',
        borderBottom: hasError ? '2px solid #dc2626' : '2px solid #1c1711',
        background: '#faf9f8',
        color: '#1c1711',
        outline: 'none',
        boxSizing: 'border-box',
        transition: 'border-color 0.2s',
        borderRadius: '2px',
    });

    const labelStyle = {
        display: 'block',
        fontSize: '0.68rem',
        fontWeight: 700,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        color: '#4a3f35',
        marginBottom: '7px',
    };

    return (
        <>
            <Head title="दर्ता गर्नुहोस् — शुचीखबर" />
            <Navbar/>

            <div style={{
                minHeight: 'calc(100vh - 52px)',
                background: '#f7f5f2',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '40px 16px',
                fontFamily: "'Noto Sans Devanagari', 'Noto Serif', Georgia, serif",
            }}>
                {/* Decorative vertical strip */}
                <div style={{
                    position: 'fixed',
                    left: 0,
                    top: '52px',
                    bottom: 0,
                    width: '4px',
                    background: 'linear-gradient(to bottom, #00649b, #c9a84c, #8B0000)',
                    opacity: 0.7,
                }} />

                <div ref={cardRef} style={{ width: '100%', maxWidth: '440px' }}>

                    {/* Header block */}
                    <div style={{ marginBottom: '32px' }}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            marginBottom: '12px',
                        }}>
                            <div style={{ width: '28px', height: '2px', background: '#00649b' }} />
                            <span style={{
                                fontSize: '0.65rem',
                                letterSpacing: '0.18em',
                                fontWeight: 700,
                                color: '#00649b',
                                textTransform: 'uppercase',
                                fontFamily: 'Georgia, serif',
                            }}>
                                नयाँ सदस्यता
                            </span>
                        </div>

                        <h1 style={{
                            fontSize: '2.1rem',
                            fontWeight: 800,
                            color: '#1c1711',
                            lineHeight: 1.15,
                            letterSpacing: '-0.02em',
                            marginBottom: '6px',
                            fontFamily: 'Georgia, "Times New Roman", serif',
                        }}>
                            खाता बनाउनुहोस्
                        </h1>

                        <div ref={lineRef} style={{
                            height: '2px',
                            background: 'linear-gradient(to right, #1c1711, transparent)',
                            marginBottom: '10px',
                        }} />

                        <p style={{
                            fontSize: '0.83rem',
                            color: '#7a6f66',
                            letterSpacing: '0.01em',
                        }}>
                            शुचीखबरमा दर्ता गरेर ताजा समाचार र विश्लेषणमा सबैभन्दा पहिले पहुँच पाउनुहोस्।
                        </p>
                    </div>

                    {/* Form card */}
                    <div style={{
                        background: '#ffffff',
                        border: '1px solid rgba(28,23,17,0.1)',
                        borderTop: '3px solid #00649b',
                        padding: '32px',
                        boxShadow: '0 2px 20px rgba(28,23,17,0.06)',
                    }}>
                        <form onSubmit={submit}>

                            {/* Name */}
                            <div style={{ marginBottom: '20px' }}>
                                <label style={labelStyle}>पूरा नाम</label>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    autoComplete="name"
                                    autoFocus
                                    required
                                    style={fieldStyle(!!errors.name)}
                                    onFocus={e => e.target.style.borderBottomColor = '#8B0000'}
                                    onBlur={e => e.target.style.borderBottomColor = errors.name ? '#dc2626' : '#1c1711'}
                                />
                                {errors.name && (
                                    <p style={{ fontSize: '0.75rem', color: '#dc2626', marginTop: '5px' }}>{errors.name}</p>
                                )}
                            </div>

                            {/* Email */}
                            <div style={{ marginBottom: '20px' }}>
                                <label style={labelStyle}>इमेल ठेगाना</label>
                                <input
                                    type="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    autoComplete="username"
                                    required
                                    style={fieldStyle(!!errors.email)}
                                    onFocus={e => e.target.style.borderBottomColor = '#8B0000'}
                                    onBlur={e => e.target.style.borderBottomColor = errors.email ? '#dc2626' : '#1c1711'}
                                />
                                {errors.email && (
                                    <p style={{ fontSize: '0.75rem', color: '#dc2626', marginTop: '5px' }}>{errors.email}</p>
                                )}
                            </div>

                            {/* Password */}
                            <div style={{ marginBottom: '20px' }}>
                                <label style={labelStyle}>पासवर्ड</label>
                                <input
                                    type="password"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    autoComplete="new-password"
                                    required
                                    style={fieldStyle(!!errors.password)}
                                    onFocus={e => e.target.style.borderBottomColor = '#8B0000'}
                                    onBlur={e => e.target.style.borderBottomColor = errors.password ? '#dc2626' : '#1c1711'}
                                />
                                {errors.password && (
                                    <p style={{ fontSize: '0.75rem', color: '#dc2626', marginTop: '5px' }}>{errors.password}</p>
                                )}
                            </div>

                            {/* Confirm Password */}
                            <div style={{ marginBottom: '28px' }}>
                                <label style={labelStyle}>पासवर्ड पुष्टि गर्नुहोस्</label>
                                <input
                                    type="password"
                                    value={data.password_confirmation}
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                    autoComplete="new-password"
                                    required
                                    style={fieldStyle(!!errors.password_confirmation)}
                                    onFocus={e => e.target.style.borderBottomColor = '#8B0000'}
                                    onBlur={e => e.target.style.borderBottomColor = errors.password_confirmation ? '#dc2626' : '#1c1711'}
                                />
                                {errors.password_confirmation && (
                                    <p style={{ fontSize: '0.75rem', color: '#dc2626', marginTop: '5px' }}>{errors.password_confirmation}</p>
                                )}
                            </div>

                            {/* Password strength hint */}
                            {data.password && (
                                <div style={{
                                    marginBottom: '20px',
                                    marginTop: '-16px',
                                    display: 'flex',
                                    gap: '4px',
                                    alignItems: 'center',
                                }}>
                                    {[1, 2, 3, 4].map(i => {
                                        const len = data.password.length;
                                        const active = len >= (i === 1 ? 1 : i === 2 ? 6 : i === 3 ? 10 : 14);
                                        const colors = ['#dc2626', '#f97316', '#c9a84c', '#16a34a'];
                                        return (
                                            <div key={i} style={{
                                                flex: 1,
                                                height: '3px',
                                                background: active ? colors[i - 1] : 'rgba(28,23,17,0.1)',
                                                borderRadius: '2px',
                                                transition: 'background 0.3s',
                                            }} />
                                        );
                                    })}
                                    <span style={{ fontSize: '0.62rem', color: '#a09488', marginLeft: '6px', whiteSpace: 'nowrap' }}>
                                        {data.password.length < 6 ? 'कमजोर' : data.password.length < 10 ? 'ठीकठाक' : data.password.length < 14 ? 'राम्रो' : 'उत्कृष्ट'}
                                    </span>
                                </div>
                            )}

                            {/* Submit */}
                            <button
                                type="submit"
                                disabled={processing}
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    background: processing ? '#a09488' : '#00649b',
                                    color: '#fff',
                                    border: 'none',
                                    fontSize: '0.78rem',
                                    fontWeight: 700,
                                    letterSpacing: '0.14em',
                                    textTransform: 'uppercase',
                                    cursor: processing ? 'not-allowed' : 'pointer',
                                    transition: 'background 0.2s, transform 0.1s',
                                    borderRadius: '2px',
                                }}
                                onMouseEnter={e => { if (!processing) e.target.style.background = '#004d78'; }}
                                onMouseLeave={e => { if (!processing) e.target.style.background = '#00649b'; }}
                                onMouseDown={e => { e.target.style.transform = 'scale(0.99)'; }}
                                onMouseUp={e => { e.target.style.transform = 'scale(1)'; }}
                            >
                                {processing ? 'दर्ता हुँदैछ...' : 'दर्ता गर्नुहोस्'}
                            </button>
                        </form>
                    </div>

                    {/* Footer */}
                    <div style={{
                        marginTop: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                    }}>
                        <span style={{ height: '1px', flex: 1, background: 'rgba(28,23,17,0.12)' }} />
                        <p style={{ fontSize: '0.78rem', color: '#7a6f66', whiteSpace: 'nowrap' }}>
                            पहिले नै दर्ता भइसक्नुभयो?{' '}
                            <Link href={route('login')} style={{
                                color: '#8B0000',
                                fontWeight: 700,
                                textDecoration: 'none',
                                borderBottom: '1px solid transparent',
                                transition: 'border-color 0.2s',
                            }}
                                onMouseEnter={e => e.target.style.borderBottomColor = '#8B0000'}
                                onMouseLeave={e => e.target.style.borderBottomColor = 'transparent'}
                            >
                                प्रवेश गर्नुहोस्
                            </Link>
                        </p>
                        <span style={{ height: '1px', flex: 1, background: 'rgba(28,23,17,0.12)' }} />
                    </div>

                    <p style={{
                        textAlign: 'center',
                        fontSize: '0.62rem',
                        color: '#c0b8b0',
                        marginTop: '28px',
                        letterSpacing: '0.1em',
                        fontStyle: 'italic',
                    }}>
                        सत्य, निष्पक्षता र पारदर्शिता — शुचीखबरको आधार
                    </p>
                </div>
            </div>
        </>
    );
}