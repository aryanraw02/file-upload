import Link from "next/link";
import { CloudUpload, Loader2 } from "lucide-react";

export default function AuthForm({
    type,
    formData,
    loading,
    onChange,
    onSubmit,
}) {
    const isSignup = type === "signup";

    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
            <div className="w-full max-w-lg bg-surface p-10 rounded-2xl shadow-2xl border border-accent/30 flex flex-col justify-between">

                <form className="flex flex-col h-full" onSubmit={onSubmit} autoComplete="off">

                    <div className="flex items-center gap-3 mb-12 justify-center">
                        <CloudUpload size={42} className="text-accent" />
                        <h1 className="text-4xl font-bold text-text">FileShare</h1>
                    </div>

                    {isSignup && (
                        <div className='mb-6'>
                            <label className='block mb-2 text-text/90 font-semibold text-sm uppercase tracking-wide'>Full Name</label>
                            <input
                                name='fullname'
                                type="text"
                                placeholder='Enter the name '
                                value={formData.fullname}
                                onChange={onChange}
                                className='w-full p-4 rounded-xl text-text bg-background/50 border-2 border-accent/30 focus:outline-none focus:border-accent focus:bg-background transition-all placeholder:text-text/40'
                                autoComplete="off"
                            />
                        </div>
                    )}

                    <div className={`${isSignup ? "flex flex-col sm:flex-row gap-5 mb-6" : "mt-16 mb-6"}`}>
                        <div className='flex-1'>
                            <label className='block mb-2 text-text/90 font-semibold text-sm uppercase tracking-wide'>Email</label>
                            <input
                                name='email'
                                type="text"
                                required
                                placeholder='Enter email'
                                value={formData.email}
                                onChange={onChange}
                                className='w-full p-4 rounded-xl text-text bg-background/50 border-2 border-accent/30 focus:outline-none focus:border-accent focus:bg-background transition-all placeholder:text-text/40'
                                autoComplete="off"
                            />
                        </div>
                        {isSignup && (
                            <div className='flex-1'>
                                <label className='block mb-2 text-text/90 font-semibold text-sm uppercase tracking-wide'>Mobile</label>
                                <input
                                    name='mobile'
                                    type="text"
                                    inputMode="numeric"
                                    required
                                    placeholder='Mobile number'
                                    value={formData.mobile}
                                    onChange={onChange}
                                    className='w-full p-4 rounded-xl text-text bg-background/50 border-2 border-accent/30 focus:outline-none focus:border-accent focus:bg-background transition-all placeholder:text-text/40 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
                                    autoComplete="off"
                                />
                            </div>
                        )}

                    </div>

                    <div className={`${isSignup ? "mb-8" : "mb-16"}`}>
                        <label className='block mb-2 text-text/90 font-semibold text-sm uppercase tracking-wide'>Password</label>
                        <input
                            name='password'
                            type="password"
                            required
                            placeholder='Enter password'
                            value={formData.password}
                            onChange={onChange}
                            className='w-full p-4 rounded-xl text-text bg-background/50 border-2 border-accent/30 focus:outline-none focus:border-accent focus:bg-background transition-all placeholder:text-text/40'
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className='w-full bg-accent text-background py-4 rounded-xl hover:bg-accent/80 active:scale-[0.98] transition-all font-bold text-lg cursor-pointer shadow-lg hover:shadow-xl flex items-center justify-center gap-3'
                    >
                        {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : null}
                        {loading
                            ? isSignup
                                ? "Signing up..."
                                : "Logging in..."
                            : isSignup
                                ? "Sign Up"
                                : "Login"
                        }
                    </button>
                    <p className="text-center text-text/70 text-sm mt-6">
                        {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
                        <Link
                            href={isSignup ? "/login" : "/signup"}
                            className="text-accent font-bold hover:text-accent/80 transition-colors"
                        >
                            {isSignup ? "Login" : "Sign Up"}
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    )
}
