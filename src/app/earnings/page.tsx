'use client'

import { EarningChart } from '@/components/EarningChart'
import { CountingNumber } from '@/components/ui/CountingNumber'
import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const Earnings = () => {
  // These values would come from your API
  const avgTransaction = 1234.56
  const currentMonthRevenue = 5678.9
  const totalRevenue = 12345.67

  // Pagination and filter state
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())
  const itemsPerPage = 5

  // Available years
  const availableYears = [2025, 2024, 2023, 2022, 2021]

  // Sample data - replace with your API data
  const allTransactions = [
    {
      id: 'TXN001',
      date: '2025-11-15',
      description: 'Product Sale',
      type: 'Sale',
      amount: 234.5,
      status: 'Completed',
    },
    {
      id: 'TXN002',
      date: '2025-11-14',
      description: 'Service Payment',
      type: 'Service',
      amount: 450.0,
      status: 'Completed',
    },
    {
      id: 'TXN003',
      date: '2025-11-13',
      description: 'Subscription',
      type: 'Recurring',
      amount: 99.99,
      status: 'Completed',
    },
    {
      id: 'TXN004',
      date: '2025-11-12',
      description: 'Product Sale',
      type: 'Sale',
      amount: 189.0,
      status: 'Pending',
    },
    {
      id: 'TXN005',
      date: '2025-11-11',
      description: 'Refund',
      type: 'Refund',
      amount: -50.0,
      status: 'Completed',
    },
    {
      id: 'TXN006',
      date: '2025-11-10',
      description: 'Product Sale',
      type: 'Sale',
      amount: 320.0,
      status: 'Completed',
    },
    {
      id: 'TXN007',
      date: '2024-11-09',
      description: 'Service Payment',
      type: 'Service',
      amount: 550.0,
      status: 'Completed',
    },
    {
      id: 'TXN008',
      date: '2024-11-08',
      description: 'Subscription',
      type: 'Recurring',
      amount: 99.99,
      status: 'Completed',
    },
    {
      id: 'TXN009',
      date: '2025-12-20',
      description: 'Product Sale',
      type: 'Sale',
      amount: 275.0,
      status: 'Completed',
    },
    {
      id: 'TXN010',
      date: '2025-12-15',
      description: 'Service Payment',
      type: 'Service',
      amount: 400.0,
      status: 'Completed',
    },
  ]

  // Filter transactions by selected year
  const filteredTransactions = allTransactions.filter((transaction) => {
    const transactionYear = new Date(transaction.date).getFullYear()
    return transactionYear === selectedYear
  })

  // Reset to page 1 when year changes
  const handleYearChange = (year: number) => {
    setSelectedYear(year)
    setCurrentPage(1)
  }

  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentTransactions = filteredTransactions.slice(startIndex, endIndex)

  return (
    <div className="py-6">
        {/* stat */}
      <div
        className="mb-4 flex w-full items-center justify-center rounded-lg border border-[#E2E8F0] bg-white shadow-sm max-md:py-4 dark:bg-sidebar dark:border-[#F4B057]"
        style={{ minHeight: '110px' }}
      >
        <div className="flex flex-1 flex-col items-center justify-center px-2">
          <p className="mb-2 text-2xl font-bold text-[#0D2357] max-md:text-xl ipad:text-3xl lg:text-4xl dark:text-white">
            <CountingNumber
              end={avgTransaction}
              duration={1000}
              decimals={2}
              prefix="$"
              className="mb-2 text-2xl font-bold text-[#0D2357] max-md:text-xl ipad:text-3xl lg:text-4xl dark:text-white"
            />
          </p>
          <span className="text-center text-sm font-medium text-[#0D2357] lg:text-lg dark:text-white">
            Average Transaction
          </span>
        </div>
        <div className="mx-4 h-16 w-px bg-[#F4B057]" />
        <div className="flex flex-1 flex-col items-center justify-center px-2">
          <p className="mb-2 text-2xl font-bold text-[#0D2357] max-md:text-xl ipad:text-3xl lg:text-4xl dark:text-white">
            <CountingNumber
              end={currentMonthRevenue}
              duration={1000}
              decimals={2}
              prefix="$"
              className="mb-2 text-2xl font-bold text-[#0D2357] max-md:text-xl ipad:text-3xl lg:text-4xl dark:text-white"
            />
          </p>
          <span className="text-center text-sm font-medium text-[#0D2357] lg:text-lg dark:text-white">
            Current Month Revenue
          </span>
        </div>
        <div className="mx-4 h-16 w-px bg-[#F4B057]" />
        <div className="flex flex-1 flex-col items-center justify-center px-2">
          <p className="mb-2 text-2xl font-bold text-[#0D2357] max-md:text-xl ipad:text-3xl lg:text-4xl dark:text-white">
            <CountingNumber
              end={totalRevenue}
              duration={1000}
              decimals={2}
              prefix="$"
              className="mb-2 text-2xl font-bold text-[#0D2357] max-md:text-xl ipad:text-3xl lg:text-4xl dark:text-white"
            />
          </p>
          <span className="text-center text-sm font-medium text-[#0D2357] lg:text-lg dark:text-white">
            Total Revenue
          </span>
        </div>
      </div>

    {/* chart */}
      <div className="h-[350px] w-full sm:h-[400px]">
        <EarningChart />
      </div>

    {/* table  */}
     <h1 className="ml-2 mt-12 mb-5 text-2xl font-bold text-[#0D2357] dark:text-white">
              All Transactions
            </h1>

      <div className=" rounded-lg border border-[#E2E8F0] bg-white shadow-sm dark:bg-sidebar dark:border-[#F4B057]">
        <div className="p-4 sm:p-6">
          <div className="mb-4 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
          <h1 className="text-xl text-[#0D2357] dark:text-white">
              All transactions are here
            </h1>
            <div className="flex items-center gap-2">
              <label
                htmlFor="year-filter"
                className="text-sm font-medium text-[#0D2357] dark:text-white"
              >
                Year:
              </label>
              <select
                id="year-filter"
                value={selectedYear}
                onChange={(e) => handleYearChange(Number(e.target.value))}
                className="rounded-md border border-[#E2E8F0] bg-white px-3 py-1.5 text-sm text-[#0D2357] transition-colors hover:border-[#F4B057] focus:border-[#F4B057] focus:outline-none dark:border-[#F4B057] dark:bg-sidebar dark:text-white"
              >
                {availableYears.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#E2E8F0] dark:border-[#F4B057]">
                  <th className="pb-3 text-left text-sm font-medium text-[#0D2357] dark:text-white">
                    Transaction ID
                  </th>
                  <th className="pb-3 text-left text-sm font-medium text-[#0D2357] dark:text-white">
                    Date
                  </th>
                  <th className="pb-3 text-left text-sm font-medium text-[#0D2357] dark:text-white">
                    Description
                  </th>
                  <th className="pb-3 text-left text-sm font-medium text-[#0D2357] dark:text-white">
                    Type
                  </th>
                  <th className="pb-3 text-right text-sm font-medium text-[#0D2357] dark:text-white">
                    Amount
                  </th>
                  <th className="pb-3 text-center text-sm font-medium text-[#0D2357] dark:text-white">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentTransactions.map((transaction) => (
                  <tr
                    key={transaction.id}
                    className="border-b border-[#E2E8F0] last:border-0 dark:border-[#F4B057]/30"
                  >
                    <td className="py-3 text-sm text-[#0D2357] dark:text-white">
                      {transaction.id}
                    </td>
                    <td className="py-3 text-sm text-[#0D2357] dark:text-white">
                      {transaction.date}
                    </td>
                    <td className="py-3 text-sm text-[#0D2357] dark:text-white">
                      {transaction.description}
                    </td>
                    <td className="py-3 text-sm text-[#0D2357] dark:text-white">
                      {transaction.type}
                    </td>
                    <td
                      className={`py-3 text-right text-sm font-medium ${
                        transaction.amount < 0
                          ? 'text-red-600 dark:text-red-400'
                          : 'text-green-600 dark:text-green-400'
                      }`}
                    >
                      ${Math.abs(transaction.amount).toLocaleString()}
                    </td>
                    <td className="py-3 text-center">
                      <span
                        className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${
                          transaction.status === 'Completed'
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                            : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                        }`}
                      >
                        {transaction.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="mt-4 flex flex-col items-start justify-between gap-3 border-t border-[#E2E8F0] pt-4 sm:flex-row sm:items-center dark:border-[#F4B057]/30">
            <div className="text-sm text-[#0D2357] dark:text-white">
              Showing {filteredTransactions.length > 0 ? startIndex + 1 : 0} to{' '}
              {Math.min(endIndex, filteredTransactions.length)} of {filteredTransactions.length}{' '}
              transactions
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="flex h-8 w-8 items-center justify-center rounded border border-[#E2E8F0] bg-white text-[#0D2357] transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-[#F4B057] dark:bg-sidebar dark:text-white dark:hover:bg-[#F4B057]/10"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
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
              ))}
              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="flex h-8 w-8 items-center justify-center rounded border border-[#E2E8F0] bg-white text-[#0D2357] transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-[#F4B057] dark:bg-sidebar dark:text-white dark:hover:bg-[#F4B057]/10"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Earnings
