'use client'

import { X, Plus, Trash2 } from 'lucide-react'
import { useState } from 'react'

interface Plan {
  name: string
  price: string
  cycle: string
  features: string[]
}

interface ManageSubscriptionModalProps {
  isOpen: boolean
  onClose: () => void
  monthlyPlan: Plan
  yearlyPlan: Plan
  onSave: (monthly: Plan, yearly: Plan) => void
}

export function ManageSubscriptionModal({
  isOpen,
  onClose,
  monthlyPlan,
  yearlyPlan,
  onSave,
}: ManageSubscriptionModalProps) {
  const [monthly, setMonthly] = useState(monthlyPlan)
  const [yearly, setYearly] = useState(yearlyPlan)

  if (!isOpen) return null

  const handleSave = () => {
    onSave(monthly, yearly)
    onClose()
  }

  const addFeature = (planType: 'monthly' | 'yearly') => {
    if (planType === 'monthly') {
      setMonthly({ ...monthly, features: [...monthly.features, ''] })
    } else {
      setYearly({ ...yearly, features: [...yearly.features, ''] })
    }
  }

  const removeFeature = (planType: 'monthly' | 'yearly', index: number) => {
    if (planType === 'monthly') {
      setMonthly({
        ...monthly,
        features: monthly.features.filter((_, i) => i !== index),
      })
    } else {
      setYearly({
        ...yearly,
        features: yearly.features.filter((_, i) => i !== index),
      })
    }
  }

  const updateFeature = (planType: 'monthly' | 'yearly', index: number, value: string) => {
    if (planType === 'monthly') {
      const newFeatures = [...monthly.features]
      newFeatures[index] = value
      setMonthly({ ...monthly, features: newFeatures })
    } else {
      const newFeatures = [...yearly.features]
      newFeatures[index] = value
      setYearly({ ...yearly, features: newFeatures })
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-lg border border-[#E2E8F0] bg-white shadow-lg dark:border-[#F4B057] dark:bg-sidebar">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[#E2E8F0] bg-white p-4 dark:border-[#F4B057]/30 dark:bg-sidebar">
          <h2 className="text-lg font-semibold text-[#0D2357] dark:text-white">
            Manage Subscription Plans
          </h2>
          <button
            onClick={onClose}
            className="rounded-full p-1 text-[#0D2357] transition-colors hover:bg-gray-100 dark:text-white dark:hover:bg-[#F4B057]/10"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 gap-6 p-6 lg:grid-cols-2">
          {/* Monthly Plan */}
          <div className="rounded-lg border border-[#E2E8F0] p-4 dark:border-[#F4B057]/30">
            <h3 className="mb-4 text-base font-semibold text-[#0D2357] dark:text-white">
              Monthly Plan
            </h3>
            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-[#0D2357] dark:text-white">
                  Plan Name
                </label>
                <input
                  type="text"
                  value={monthly.name}
                  onChange={(e) => setMonthly({ ...monthly, name: e.target.value })}
                  className="w-full rounded-md border border-[#E2E8F0] bg-white px-3 py-2 text-sm text-[#0D2357] focus:border-[#F4B057] focus:outline-none dark:border-[#F4B057] dark:bg-sidebar dark:text-white"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-[#0D2357] dark:text-white">
                  Price
                </label>
                <input
                  type="text"
                  value={monthly.price}
                  onChange={(e) => setMonthly({ ...monthly, price: e.target.value })}
                  className="w-full rounded-md border border-[#E2E8F0] bg-white px-3 py-2 text-sm text-[#0D2357] focus:border-[#F4B057] focus:outline-none dark:border-[#F4B057] dark:bg-sidebar dark:text-white"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-[#0D2357] dark:text-white">
                  Billing Cycle
                </label>
                <input
                  type="text"
                  value={monthly.cycle}
                  onChange={(e) => setMonthly({ ...monthly, cycle: e.target.value })}
                  className="w-full rounded-md border border-[#E2E8F0] bg-white px-3 py-2 text-sm text-[#0D2357] focus:border-[#F4B057] focus:outline-none dark:border-[#F4B057] dark:bg-sidebar dark:text-white"
                />
              </div>
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label className="text-sm font-medium text-[#0D2357] dark:text-white">
                    Features
                  </label>
                  <button
                    onClick={() => addFeature('monthly')}
                    className="flex items-center gap-1 rounded-md bg-[#F4B057] px-2 py-1 text-xs text-white hover:bg-[#F4B057]/90"
                  >
                    <Plus className="h-3 w-3" />
                    Add
                  </button>
                </div>
                <div className="space-y-2">
                  {monthly.features.map((feature, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={feature}
                        onChange={(e) => updateFeature('monthly', index, e.target.value)}
                        className="flex-1 rounded-md border border-[#E2E8F0] bg-white px-3 py-2 text-sm text-[#0D2357] focus:border-[#F4B057] focus:outline-none dark:border-[#F4B057] dark:bg-sidebar dark:text-white"
                      />
                      <button
                        onClick={() => removeFeature('monthly', index)}
                        className="rounded-md border border-red-200 p-2 text-red-600 hover:bg-red-50 dark:border-red-900/30 dark:text-red-400 dark:hover:bg-red-900/10"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Yearly Plan */}
          <div className="rounded-lg border border-[#E2E8F0] p-4 dark:border-[#F4B057]/30">
            <h3 className="mb-4 text-base font-semibold text-[#0D2357] dark:text-white">
              Yearly Plan
            </h3>
            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-[#0D2357] dark:text-white">
                  Plan Name
                </label>
                <input
                  type="text"
                  value={yearly.name}
                  onChange={(e) => setYearly({ ...yearly, name: e.target.value })}
                  className="w-full rounded-md border border-[#E2E8F0] bg-white px-3 py-2 text-sm text-[#0D2357] focus:border-[#F4B057] focus:outline-none dark:border-[#F4B057] dark:bg-sidebar dark:text-white"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-[#0D2357] dark:text-white">
                  Price
                </label>
                <input
                  type="text"
                  value={yearly.price}
                  onChange={(e) => setYearly({ ...yearly, price: e.target.value })}
                  className="w-full rounded-md border border-[#E2E8F0] bg-white px-3 py-2 text-sm text-[#0D2357] focus:border-[#F4B057] focus:outline-none dark:border-[#F4B057] dark:bg-sidebar dark:text-white"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-[#0D2357] dark:text-white">
                  Billing Cycle
                </label>
                <input
                  type="text"
                  value={yearly.cycle}
                  onChange={(e) => setYearly({ ...yearly, cycle: e.target.value })}
                  className="w-full rounded-md border border-[#E2E8F0] bg-white px-3 py-2 text-sm text-[#0D2357] focus:border-[#F4B057] focus:outline-none dark:border-[#F4B057] dark:bg-sidebar dark:text-white"
                />
              </div>
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label className="text-sm font-medium text-[#0D2357] dark:text-white">
                    Features
                  </label>
                  <button
                    onClick={() => addFeature('yearly')}
                    className="flex items-center gap-1 rounded-md bg-[#F4B057] px-2 py-1 text-xs text-white hover:bg-[#F4B057]/90"
                  >
                    <Plus className="h-3 w-3" />
                    Add
                  </button>
                </div>
                <div className="space-y-2">
                  {yearly.features.map((feature, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={feature}
                        onChange={(e) => updateFeature('yearly', index, e.target.value)}
                        className="flex-1 rounded-md border border-[#E2E8F0] bg-white px-3 py-2 text-sm text-[#0D2357] focus:border-[#F4B057] focus:outline-none dark:border-[#F4B057] dark:bg-sidebar dark:text-white"
                      />
                      <button
                        onClick={() => removeFeature('yearly', index)}
                        className="rounded-md border border-red-200 p-2 text-red-600 hover:bg-red-50 dark:border-red-900/30 dark:text-red-400 dark:hover:bg-red-900/10"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="sticky bottom-0 flex justify-end gap-3 border-t border-[#E2E8F0] bg-white p-4 dark:border-[#F4B057]/30 dark:bg-sidebar">
          <button
            onClick={onClose}
            className="rounded-lg border border-[#E2E8F0] bg-white px-4 py-2 text-sm font-medium text-[#0D2357] transition-colors hover:bg-gray-50 dark:border-[#F4B057] dark:bg-sidebar dark:text-white dark:hover:bg-[#F4B057]/10"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="rounded-lg border border-[#F4B057] bg-[#F4B057] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#F4B057]/90"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  )
}
