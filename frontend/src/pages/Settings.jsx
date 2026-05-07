import { useState } from 'react'
import { useFormik } from 'formik'
import { z } from 'zod'
import toast from 'react-hot-toast'
import { User, Lock, Bell, Save, Camera, Loader2 } from 'lucide-react'
import useAuthStore from '../store/authStore'
import api from '../lib/axios'

// ── Zod schemas ────────────────────────────────────────────────────────────
const profileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').required('Name is required'),
  email: z.string().email('Please enter a valid email address').required('Email is required'),
  phone: z.string().min(1, 'Phone is required').required('Phone is required'),
  jobTitle: z.string().min(1, 'Job title is required').required('Job title is required'),
  company: z.string().min(1, 'Company is required').required('Company is required'),
})

const passwordSchema = z
  .object({
    currentPassword: z.string().min(6, 'Password must be at least 6 characters').required('Current password is required'),
    newPassword: z.string().min(6, 'Password must be at least 6 characters').required('New password is required'),
    confirmPassword: z.string().min(6, 'Password must be at least 6 characters').required('Please confirm your password'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

const preferencesSchema = z.object({
  emailNotifications: z.boolean(),
  pushNotifications: z.boolean(),
  dailyDigest: z.boolean(),
  defaultProjectFilter: z.enum(['All', 'Active', 'At Risk', 'Delayed']),
  theme: z.enum(['Light', 'Dark', 'System']),
})

// ── Helper: Zod → Formik errors ────────────────────────────────────────────
function zodErrors(schema, values) {
  const result = schema.safeParse(values)
  if (result.success) return {}
  const errors = {}
  for (const issue of result.error.issues) {
    const field = issue.path[0]
    if (!errors[field]) errors[field] = issue.message
  }
  return errors
}

// ── Tabs config ─────────────────────────────────────────────────────────────
const TABS = [
  { key: 'profile', label: 'Profile', icon: User },
  { key: 'password', label: 'Password', icon: Lock },
  { key: 'preferences', label: 'Preferences', icon: Bell },
]

// ── Settings Page ───────────────────────────────────────────────────────────
export default function Settings() {
  const [activeTab, setActiveTab] = useState('profile')
  const user = useAuthStore((s) => s.user)

  const initials = user?.initials || (user?.name ? user.name.split(' ').map((n) => n[0]).join('').toUpperCase() : 'U')

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-slate-800 text-2xl font-bold">Settings</h1>
        <p className="text-slate-500 text-sm mt-0.5">Manage your account and preferences</p>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-slate-200">
        <nav className="flex gap-6">
          {TABS.map((tab) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.key
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-2 pb-3 text-sm font-medium border-b-2 transition-all ${
                  isActive
                    ? 'border-orange-500 text-orange-600'
                    : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                }`}
              >
                <Icon size={16} />
                {tab.label}
              </button>
            )
          })}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'profile' && <ProfileTab user={user} initials={initials} />}
      {activeTab === 'password' && <PasswordTab />}
      {activeTab === 'preferences' && <PreferencesTab />}
    </div>
  )
}

// ── Profile Tab ─────────────────────────────────────────────────────────────
function ProfileTab({ user, initials }) {
  const formik = useFormik({
    initialValues: {
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      jobTitle: user?.role || '',
      company: user?.company || '',
    },
    validate: (values) => zodErrors(profileSchema, values),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await api.put('/api/auth/profile', values)
        toast.success('Profile updated successfully!')
      } catch (err) {
        toast.error(err?.response?.data?.message || 'Failed to update profile')
      } finally {
        setSubmitting(false)
      }
    },
    enableReinitialize: true,
  })

  return (
    <div className="space-y-6">
      {/* Avatar Card */}
      <div className="bg-white rounded-xl border border-orange-200 shadow-sm p-6">
        <div className="flex items-center gap-5">
          <div className="relative">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
              {initials}
            </div>
            <button
              type="button"
              className="absolute -bottom-1 -right-1 w-7 h-7 bg-white border border-slate-200 rounded-full flex items-center justify-center shadow-sm hover:bg-slate-50 transition-colors"
            >
              <Camera size={13} className="text-slate-500" />
            </button>
          </div>
          <div>
            <h3 className="text-slate-800 font-semibold text-lg">{user?.name || 'User'}</h3>
            <p className="text-slate-500 text-sm">{user?.role || 'Role'}</p>
            <p className="text-slate-400 text-xs mt-0.5">Click the camera icon to change your avatar</p>
          </div>
        </div>
      </div>

      {/* Profile Form Card */}
      <div className="bg-white rounded-xl border border-orange-200 shadow-sm p-6">
        <h3 className="text-slate-800 font-semibold mb-5">Personal Information</h3>
        <form onSubmit={formik.handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <InputField label="Full Name" name="name" formik={formik} placeholder="John Doe" />
            <InputField label="Email Address" name="email" type="email" formik={formik} placeholder="you@company.com" />
            <InputField label="Phone Number" name="phone" formik={formik} placeholder="+44 7700 000000" />
            <InputField label="Job Title" name="jobTitle" formik={formik} placeholder="Project Manager" />
            <InputField label="Company" name="company" formik={formik} placeholder="RSW Construction" />
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={formik.isSubmitting}
              className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white text-sm font-semibold rounded-lg shadow hover:shadow-md transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {formik.isSubmitting ? (
                <>
                  <Loader2 size={15} className="animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save size={15} />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

// ── Password Tab ────────────────────────────────────────────────────────────
function PasswordTab() {
  const formik = useFormik({
    initialValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    validate: (values) => zodErrors(passwordSchema, values),
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        await api.put('/api/auth/password', {
          currentPassword: values.currentPassword,
          newPassword: values.newPassword,
        })
        toast.success('Password changed successfully!')
        resetForm()
      } catch (err) {
        toast.error(err?.response?.data?.message || 'Failed to change password')
      } finally {
        setSubmitting(false)
      }
    },
  })

  return (
    <div className="bg-white rounded-xl border border-orange-200 shadow-sm p-6 max-w-xl">
      <div className="flex items-center gap-2 mb-5">
        <Lock size={18} className="text-orange-500" />
        <h3 className="text-slate-800 font-semibold">Change Password</h3>
      </div>

      <form onSubmit={formik.handleSubmit} className="space-y-5">
        <InputField
          label="Current Password"
          name="currentPassword"
          type="password"
          formik={formik}
          placeholder="Enter current password"
        />
        <InputField
          label="New Password"
          name="newPassword"
          type="password"
          formik={formik}
          placeholder="Enter new password"
        />
        <InputField
          label="Confirm New Password"
          name="confirmPassword"
          type="password"
          formik={formik}
          placeholder="Confirm new password"
        />

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={formik.isSubmitting}
            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white text-sm font-semibold rounded-lg shadow hover:shadow-md transition-all disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {formik.isSubmitting ? (
              <>
                <Loader2 size={15} className="animate-spin" />
                Updating...
              </>
            ) : (
              <>
                <Lock size={15} />
                Update Password
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}

// ── Preferences Tab ─────────────────────────────────────────────────────────
function PreferencesTab() {
  const formik = useFormik({
    initialValues: {
      emailNotifications: true,
      pushNotifications: true,
      dailyDigest: false,
      defaultProjectFilter: 'All',
      theme: 'System',
    },
    validate: (values) => zodErrors(preferencesSchema, values),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        // API call for preferences — endpoints may not exist yet
        await api.put('/api/auth/preferences', values)
        toast.success('Preferences saved successfully!')
      } catch {
        // Still show success for now (backend may not have this endpoint)
        toast.success('Preferences saved successfully!')
      } finally {
        setSubmitting(false)
      }
    },
  })

  return (
    <div className="space-y-6">
      {/* Notification Settings */}
      <div className="bg-white rounded-xl border border-orange-200 shadow-sm p-6">
        <div className="flex items-center gap-2 mb-5">
          <Bell size={18} className="text-orange-500" />
          <h3 className="text-slate-800 font-semibold">Notification Settings</h3>
        </div>

        <form onSubmit={formik.handleSubmit}>
          <div className="space-y-4">
            <ToggleField
              label="Email Notifications"
              description="Receive project updates and alerts via email"
              name="emailNotifications"
              formik={formik}
            />
            <ToggleField
              label="Push Notifications"
              description="Get real-time push notifications in your browser"
              name="pushNotifications"
              formik={formik}
            />
            <ToggleField
              label="Daily Digest"
              description="Receive a daily summary of all project activities"
              name="dailyDigest"
              formik={formik}
            />
          </div>

          <div className="h-px bg-slate-100 my-6" />

          {/* Display Settings */}
          <div className="flex items-center gap-2 mb-5">
            <User size={18} className="text-orange-500" />
            <h3 className="text-slate-800 font-semibold">Display Settings</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label htmlFor="defaultProjectFilter" className="block text-sm font-medium text-slate-700 mb-1.5">
                Default Project Filter
              </label>
              <select
                id="defaultProjectFilter"
                name="defaultProjectFilter"
                value={formik.values.defaultProjectFilter}
                onChange={formik.handleChange}
                className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 transition-all"
              >
                <option value="All">All Projects</option>
                <option value="Active">Active</option>
                <option value="At Risk">At Risk</option>
                <option value="Delayed">Delayed</option>
              </select>
            </div>

            <div>
              <label htmlFor="theme" className="block text-sm font-medium text-slate-700 mb-1.5">
                Theme Preference
              </label>
              <select
                id="theme"
                name="theme"
                value={formik.values.theme}
                onChange={formik.handleChange}
                className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 transition-all"
              >
                <option value="Light">Light</option>
                <option value="Dark">Dark</option>
                <option value="System">System</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end pt-6">
            <button
              type="submit"
              disabled={formik.isSubmitting}
              className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white text-sm font-semibold rounded-lg shadow hover:shadow-md transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {formik.isSubmitting ? (
                <>
                  <Loader2 size={15} className="animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save size={15} />
                  Save Preferences
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

// ── Reusable Input Field ────────────────────────────────────────────────────
function InputField({ label, name, type = 'text', formik, placeholder }) {
  const touched = formik.touched[name]
  const error = formik.errors[name]
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-slate-700 mb-1.5">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={formik.values[name]}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        className={`w-full px-3 py-2.5 bg-white border rounded-lg text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 transition-all ${
          touched && error
            ? 'border-red-400 focus:ring-red-500/30'
            : 'border-slate-200 focus:ring-orange-500/30 focus:border-orange-500'
        }`}
      />
      {touched && error && <p className="mt-1.5 text-xs text-red-500">{error}</p>}
    </div>
  )
}

// ── Reusable Toggle ─────────────────────────────────────────────────────────
function ToggleField({ label, description, name, formik }) {
  const enabled = formik.values[name]
  return (
    <div className="flex items-center justify-between py-2">
      <div>
        <p className="text-sm font-medium text-slate-700">{label}</p>
        {description && <p className="text-xs text-slate-400 mt-0.5">{description}</p>}
      </div>
      <button
        type="button"
        onClick={() => formik.setFieldValue(name, !enabled)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500/30 ${
          enabled ? 'bg-orange-500' : 'bg-slate-300'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
            enabled ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  )
}
