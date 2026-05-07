import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useFormik } from 'formik'
import { z } from 'zod'
import toast from 'react-hot-toast'
import { Mail, Lock, Eye, EyeOff, Loader2, HardHat } from 'lucide-react'
import useAuthStore from '../store/authStore'

// ── Zod schema ──────────────────────────────────────────────────────────────
const loginSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required').min(6, 'Password must be at least 6 characters'),
})

// ── SignIn Page ─────────────────────────────────────────────────────────────
export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const login = useAuthStore((s) => s.login)

  // Where to redirect after login (fallback to dashboard)
  const from = location.state?.from?.pathname || '/'

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      remember: false,
    },
    validate: (values) => {
      const result = loginSchema.safeParse({
        email: values.email,
        password: values.password,
      })
      if (result.success) return {}
      const errors = {}
      for (const issue of result.error.issues) {
        const field = issue.path[0]
        if (!errors[field]) errors[field] = issue.message
      }
      return errors
    },
    onSubmit: async (values, { setFieldError, setSubmitting }) => {
      try {
        const res = await login(values.email, values.password)
        if (res.success) {
          toast.success('Welcome back to RSW Construction Portal!')
          navigate(from, { replace: true })
        } else {
          setFieldError('general', res.error || 'Login failed')
        }
      } catch (err) {
        setFieldError('general', err?.message || 'An unexpected error occurred')
      } finally {
        setSubmitting(false)
      }
    },
  })

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4 py-12">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'radial-gradient(circle at 25px 25px, white 2px, transparent 0)',
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      <div className="relative w-full max-w-md">
        {/* Card */}
        <div className="bg-slate-800 border border-slate-700 rounded-2xl shadow-2xl p-8 sm:p-10">
          {/* Logo & Header */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-lg shadow-orange-500/20 mb-4">
              <span className="text-white font-black text-base tracking-tight">RSW</span>
            </div>
            <h1 className="text-2xl font-bold text-white">Welcome back</h1>
            <p className="text-slate-400 text-sm mt-1">
              Sign in to RainStreamWeb Construction Portal
            </p>
          </div>

          {/* General error banner */}
          {formik.errors.general && (
            <div className="mb-6 px-4 py-3 bg-red-500/10 border border-red-500/30 rounded-lg flex items-start gap-2">
              <HardHat size={16} className="text-red-400 mt-0.5 flex-shrink-0" />
              <p className="text-red-300 text-sm">{formik.errors.general}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={formik.handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-1.5">
                Email address
              </label>
              <div className="relative">
                <Mail
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none"
                />
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@company.com"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`w-full pl-10 pr-4 py-2.5 bg-slate-900 border rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 transition-all ${
                    formik.touched.email && formik.errors.email
                      ? 'border-red-500 focus:ring-red-500/30'
                      : 'border-slate-600 focus:ring-orange-500/30 focus:border-orange-500'
                  }`}
                />
              </div>
              {formik.touched.email && formik.errors.email && (
                <p className="mt-1.5 text-xs text-red-400">{formik.errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none"
                />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`w-full pl-10 pr-11 py-2.5 bg-slate-900 border rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 transition-all ${
                    formik.touched.password && formik.errors.password
                      ? 'border-red-500 focus:ring-red-500/30'
                      : 'border-slate-600 focus:ring-orange-500/30 focus:border-orange-500'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {formik.touched.password && formik.errors.password && (
                <p className="mt-1.5 text-xs text-red-400">{formik.errors.password}</p>
              )}
            </div>

            {/* Remember me + Forgot password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  name="remember"
                  checked={formik.values.remember}
                  onChange={formik.handleChange}
                  className="w-4 h-4 rounded border-slate-600 bg-slate-900 text-orange-500 focus:ring-orange-500/30 focus:ring-offset-0 focus:ring-2 accent-orange-500"
                />
                <span className="text-sm text-slate-400">Remember me</span>
              </label>
              <Link
                to="/forgot-password"
                className="text-sm text-orange-400 hover:text-orange-300 transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={formik.isSubmitting}
              className="w-full py-2.5 px-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold rounded-lg shadow-lg shadow-orange-500/25 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {formik.isSubmitting ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Signing in...
                </>
              ) : (
                'Sign in'
              )}
            </button>
          </form>

          {/* Footer */}
          <p className="text-center text-slate-500 text-xs mt-8">
            RSW Construction Management System v2.0
          </p>
        </div>
      </div>
    </div>
  )
}
