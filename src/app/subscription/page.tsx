'use client'

import { ManageSubscriptionModal } from '@/components/modals/ManageSubscriptionModal'
import { Check, Crown, Settings, ChevronLeft, ChevronRight } from 'lucide-react'
import { useState } from 'react'

const Subscription = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  const [monthlyPlan, setMonthlyPlan] = useState({
    name: 'Premium Monthly',
    price: '$29.99',
    cycle: 'month',
    features: [
      'Unlimited access to all features',
      'Priority customer support',
      'Advanced analytics dashboard',
      'Custom branding options',
      'API access',
      'Team collaboration tools',
      'Monthly reports',
      'Cancel anytime',
    ],
  })

  const [yearlyPlan, setYearlyPlan] = useState({
    name: 'Premium Yearly',
    price: '$299.99',
    cycle: 'year',
    features: [
      'Everything in Monthly plan',
      'Priority customer support',
      'Advanced analytics dashboard',
      'Custom branding options',
      'API access',
      'Team collaboration tools',
      'Quarterly business reviews',
      'Dedicated account manager',
      'Early access to new features',
    ],
  })

  const handleSave = (
    updatedMonthly: typeof monthlyPlan,
    updatedYearly: typeof yearlyPlan
  ) => {
    setMonthlyPlan(updatedMonthly)
    setYearlyPlan(updatedYearly)
  }

  return (
    <div className="m-2 py-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#0D2357] dark:text-white">
            Subscription Plans
          </h1>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 rounded-lg border border-[#F4B057] bg-[#F4B057] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#F4B057]/90"
        >
          <Settings className="h-4 w-4" />
          Manage Plans
        </button>
      </div>

      <div className="mx-auto grid max-w-4xl pt-10 pb-5 grid-cols-1 gap-6 md:grid-cols-2">
        {/* Monthly Plan */}
        <div className="rounded-lg border border-[#E2E8F0] bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-[#F4B057] dark:bg-sidebar">
          <div className="mb-4">
            <h2 className="text-xl font-bold text-[#0D2357] dark:text-white">
              {monthlyPlan.name}
            </h2>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-4xl font-bold text-[#0D2357] dark:text-white">
                {monthlyPlan.price}
              </span>
              <span className="text-sm text-[#0D2357]/70 dark:text-white/70">
                / {monthlyPlan.cycle}
              </span>
            </div>
          </div>

          <ul className="space-y-3">
            {monthlyPlan.features.map((feature, index) => (
              <li key={index} className="flex items-start gap-2">
                <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600 dark:text-green-400" />
                <span className="text-sm text-[#0D2357] dark:text-white">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Yearly Plan */}
        <div className="relative rounded-lg border-2 border-[#F4B057] bg-white p-6 shadow-lg transition-all hover:shadow-xl dark:bg-sidebar">
          <div className="absolute -top-3 right-4 flex items-center gap-1 rounded-full bg-[#F4B057] px-3 py-1 text-xs font-medium text-white">
            <Crown className="h-3 w-3" />
            Best Value
          </div>

          <div className="mb-4">
            <h2 className="text-xl font-bold text-[#0D2357] dark:text-white">
              {yearlyPlan.name}
            </h2>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-4xl font-bold text-[#0D2357] dark:text-white">
                {yearlyPlan.price}
              </span>
              <span className="text-sm text-[#0D2357]/70 dark:text-white/70">
                / {yearlyPlan.cycle}
              </span>
            </div>
            <div className="mt-1 flex items-center gap-2">
              <span className="text-sm text-[#0D2357]/50 line-through dark:text-white/50">
                $359.88
              </span>
              <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900/30 dark:text-green-400">
                Save $59.89
              </span>
            </div>
          </div>

          <ul className="space-y-3">
            {yearlyPlan.features.map((feature, index) => (
              <li key={index} className="flex items-start gap-2">
                <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600 dark:text-green-400" />
                <span className="text-sm text-[#0D2357] dark:text-white">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Subscribed Users Table */}
       <h1 className="my-8 text-2xl font-bold text-[#0D2357] dark:text-white">
            Subscribed Users
          </h1>
      <div className="rounded-lg border border-[#E2E8F0] bg-white shadow-sm dark:border-[#F4B057] dark:bg-sidebar">
        <div className="p-4 sm:p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#E2E8F0] dark:border-[#F4B057]">
                  <th className="pb-3 text-left text-sm font-medium text-[#0D2357] dark:text-white">
                    User Name
                  </th>
                  <th className="pb-3 text-left text-sm font-medium text-[#0D2357] dark:text-white">
                    Email
                  </th>
                  <th className="pb-3 text-left text-sm font-medium text-[#0D2357] dark:text-white">
                    Plan
                  </th>
                  <th className="pb-3 text-left text-sm font-medium text-[#0D2357] dark:text-white">
                    Start Date
                  </th>
                  <th className="pb-3 text-left text-sm font-medium text-[#0D2357] dark:text-white">
                    Next Billing
                  </th>
                  <th className="pb-3 text-center text-sm font-medium text-[#0D2357] dark:text-white">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {(() => {
                  const allUsers = [
                    {
                      id: 1,
                      name: 'John Doe',
                      email: 'john.doe@example.com',
                      plan: 'Premium Monthly',
                      startDate: '2024-10-15',
                      nextBilling: '2024-12-15',
                      status: 'Active',
                    },
                    {
                      id: 2,
                      name: 'Jane Smith',
                      email: 'jane.smith@example.com',
                      plan: 'Premium Yearly',
                      startDate: '2024-01-20',
                      nextBilling: '2025-01-20',
                      status: 'Active',
                    },
                    {
                      id: 3,
                      name: 'Mike Johnson',
                      email: 'mike.j@example.com',
                      plan: 'Premium Monthly',
                      startDate: '2024-11-01',
                      nextBilling: '2024-12-01',
                      status: 'Active',
                    },
                    {
                      id: 4,
                      name: 'Sarah Williams',
                      email: 'sarah.w@example.com',
                      plan: 'Premium Yearly',
                      startDate: '2024-03-10',
                      nextBilling: '2025-03-10',
                      status: 'Active',
                    },
                    {
                      id: 5,
                      name: 'David Brown',
                      email: 'david.b@example.com',
                      plan: 'Premium Monthly',
                      startDate: '2024-09-05',
                      nextBilling: '2024-12-05',
                      status: 'Cancelled',
                    },
                    {
                      id: 6,
                      name: 'Emily Davis',
                      email: 'emily.d@example.com',
                      plan: 'Premium Yearly',
                      startDate: '2024-02-14',
                      nextBilling: '2025-02-14',
                      status: 'Active',
                    },
                    {
                      id: 7,
                      name: 'Robert Wilson',
                      email: 'robert.w@example.com',
                      plan: 'Premium Monthly',
                      startDate: '2024-08-22',
                      nextBilling: '2024-12-22',
                      status: 'Active',
                    },
                    {
                      id: 8,
                      name: 'Lisa Anderson',
                      email: 'lisa.a@example.com',
                      plan: 'Premium Yearly',
                      startDate: '2024-05-30',
                      nextBilling: '2025-05-30',
                      status: 'Active',
                    },
                  ]

                  const startIndex = (currentPage - 1) * itemsPerPage
                  const endIndex = startIndex + itemsPerPage
                  const currentUsers = allUsers.slice(startIndex, endIndex)
                  const totalPages = Math.ceil(allUsers.length / itemsPerPage)

                  return (
                    <>
                      {currentUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b border-[#E2E8F0] last:border-0 dark:border-[#F4B057]/30"
                  >
                    <td className="py-3 text-sm text-[#0D2357] dark:text-white">
                      {user.name}
                    </td>
                    <td className="py-3 text-sm text-[#0D2357] dark:text-white">
                      {user.email}
                    </td>
                    <td className="py-3 text-sm text-[#0D2357] dark:text-white">
                      {user.plan}
                    </td>
                    <td className="py-3 text-sm text-[#0D2357] dark:text-white">
                      {user.startDate}
                    </td>
                    <td className="py-3 text-sm text-[#0D2357] dark:text-white">
                      {user.nextBilling}
                    </td>
                    <td className="py-3 text-center">
                      <span
                        className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${
                          user.status === 'Active'
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                            : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                        }`}
                      >
                        {user.status}
                      </span>
                    </td>
                  </tr>
                      ))}
                    </>
                  )
                })()}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="mt-4 flex flex-col items-start justify-between gap-3 border-t border-[#E2E8F0] pt-4 sm:flex-row sm:items-center dark:border-[#F4B057]/30">
            <div className="text-sm text-[#0D2357] dark:text-white">
              Showing {(currentPage - 1) * itemsPerPage + 1} to{' '}
              {Math.min(currentPage * itemsPerPage, 8)} of 8 users
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="flex h-8 w-8 items-center justify-center rounded border border-[#E2E8F0] bg-white text-[#0D2357] transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-[#F4B057] dark:bg-sidebar dark:text-white dark:hover:bg-[#F4B057]/10"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              {Array.from({ length: Math.ceil(8 / itemsPerPage) }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`flex h-8 w-8 items-center justify-center rounded border text-sm transition-colors ${
                      currentPage === page
                        ? 'border-[#F4B057] bg-[#F4B057] text-white'
                        : 'border-[#E2E8F0] bg-white text-[#0D2357] hover:bg-gray-50 dark:border-[#F4B057] dark:bg-sidebar dark:text-white dark:hover:bg-[#F4B057]/10'
                    }`}
                  >
                    {page}
                  </button>
                )
              )}
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, Math.ceil(8 / itemsPerPage)))
                }
                disabled={currentPage === Math.ceil(8 / itemsPerPage)}
                className="flex h-8 w-8 items-center justify-center rounded border border-[#E2E8F0] bg-white text-[#0D2357] transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-[#F4B057] dark:bg-sidebar dark:text-white dark:hover:bg-[#F4B057]/10"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <ManageSubscriptionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        monthlyPlan={monthlyPlan}
        yearlyPlan={yearlyPlan}
        onSave={handleSave}
      />
    </div>
  )
}

export default Subscription
