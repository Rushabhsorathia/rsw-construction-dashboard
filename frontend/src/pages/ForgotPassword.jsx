import { useFormik } from 'formik'
import { z } from 'zod'
import toast from 'react-hot-toast'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Mail, Loader2, ArrowLeft, CheckCircle2 } from 'lucide-react'

// ── Zod schema ──────────────────────────────────────────────────────────────
const forgotSchema = z.object({
  email: z.string().email('Please enter a valid email address').required('Email is required'),
})

// ── ForgotPassword Page ─────────────────────────────────────────────────────
export default function ForgotPassword() {
  const [submitted, setSubmitted] = useState(false)

  const formik = useFormik({
    initialValues: { email: '' },
    validate: (values) => {
      const result = forgotSchema.safeParse(values)
      if (result.success) return {}
      const errors = {}
      for (const issue of result.error.issues) {
        const field = issue.path[0]
        if (!errors[field]) errors[field] = issue.message
      }
      return errors
    },
    onSubmit: async (values, { setSubmitting }) => {
      // Simulate API call
      await new Promise((r) => setTimeout(r, 1500))
      toast.success('If that email exists, a reset link has been sent.')
      setSubmitted(true)
      setSubmitting(false)
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
        <div className="bg-slate-800 border border-slate-700 rounded-2xl shadow-2xl p-8 sm:p-10">
          {/* Logo & Header */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-lg shadow-orange-500/20 mb-4">
              <span className="text-white font-black text-base tracking-tight">RSW</span>
            </div>
            <h1 className="text-2xl font-bold text-white">
              {submitted ? 'Check your email' : 'Reset password'}
            </h1>
            <p className="text-slate-400 text-sm mt-1 text-center">
              {submitted
                ? `We sent a reset link to ${formik.values.email}`
                : 'Enter your email and we\'ll send you a reset link'}
            </p>
          </div>

          {!submitted ? (
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

              {/* Submit */}
              <button
                type="submit"
                disabled={formik.isSubmitting}
                className="w-full py-2.5 px-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold rounded-lg shadow-lg shadow-orange-500/25 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {formik.isSubmitting ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Sending link...
                  </>
                ) : (
                  'Send reset link'
                )}
              </button>
            </form>
          ) : (
            <div className="flex flex-col items-center py-4">
              <CheckCircle2 size={48} className="text-green-400 mb-4" />
              <p className="text-slate-300 text-sm text-center">
                Didn't receive the email? Check your spam folder or{' '}
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-orange-400 hover:text-orange-300 transition-colors"
                >
                  try again
                </button>
              </p>
            </div>
          )}

          {/* Back to Sign In */}
          <div className="mt-6 text-center">
            <Link
              to="/signin"
              className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-orange-400 transition-colors"
            >
              <ArrowLeft size={14} />
              Back to Sign In
            </Link>
          </div>

          {/* Footer */}
          <p className="text-center text-slate-500 text-xs mt-6">
            RSW Construction Management System v2.0
          </p>
        </div>
      </div>
    </div>
  )
}
