import React from 'react'
import logo from "../assets/logo.png";

const Invoice = () => {
    return (
        <div className='min-h-screen shadow-xl px-4 pt-5 pb-20'>
            <div class="invoice-container max-w-4xl bg-white rounded-lg shadow-2xl p-8">
                <div class="mb-4 flex items-center justify-between">
                    <h1 class="text-3xl font-bold text-gray-700">INVOICE</h1>
                    <span className='border-2 flex'></span>
                </div>
                <header class="bg-logo flex flex-col sm:flex-row justify-between pb-6">
                    <div class="relative z-10 p-0 sm:p-0">
                        <h2 class="text-2xl font-semibold text-gray-800 relative z-10">Your Company Name</h2>
                        <p class="text-sm text-gray-600">Your Business Address</p>
                        <p class="text-sm text-gray-600">City</p>
                        <p class="text-sm text-gray-600">Country</p>
                        <p class="text-sm text-gray-600">Postal</p>
                    </div>
                    <div class="text-right">
                        <p class="text-sm text-gray-500">BILL TO:</p>
                        <p class="font-bold text-lg">Company Name</p>
                        <p class="text-sm">Address</p>
                        <p class="text-sm">City</p>
                        <p class="text-sm">Country</p>
                        <p class="text-sm">Postal</p>
                    </div>
                </header>

                <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 bg-gray-50 border-y border-gray-200 text-sm font-medium">
                    <div class="p-3">
                        <p class="text-gray-500">INVOICE #</p>
                        <p class="text-gray-800">123456</p>
                    </div>
                    <div class="p-3">
                        <p class="text-gray-500">DATE</p>
                        <p class="text-gray-800">12/31/20</p>
                    </div>
                    <div class="p-3">
                        <p class="text-gray-500">INVOICE DUE DATE</p>
                        <p class="text-gray-800">12/31/20</p>
                    </div>
                    <div class="col-span-2 sm:col-span-1 p-3 text-white bg-[#b30602] sm:text-right font-bold flex flex-col justify-center">
                        <p class="text-sm">AMOUNT DUE</p>
                        <p class="text-2xl">$0000.00</p>
                    </div>
                </div>

                <div class="mt-8">
                    <table class="min-w-full divide-y divide-gray-200">
                        <thead class="table-header-group bg-gray-50">
                            <tr>
                                <th scope="col" class="py-3 px-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-4/12">
                                    ITEMS
                                </th>
                                <th scope="col" class="py-3 px-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider w-1/12">
                                    QTY
                                </th>
                                <th scope="col" class="py-3 px-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider w-1/12">
                                    PRICE
                                </th>
                                <th scope="col" class="py-3 px-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider w-2/12">
                                    AMOUNT
                                </th>
                            </tr>
                        </thead>

                        <tbody class="divide-y divide-gray-200">
                            <tr>
                                <td class="px-2 py-4 whitespace-nowrap text-sm font-medium text-gray-900 sm:col-span-4  table-cell">
                                    Item 1
                                </td>

                                <td class="px-2 py-4 whitespace-nowrap text-sm text-gray-500 text-right  table-cell">
                                    3
                                </td>

                                <td class="px-2 py-4 whitespace-nowrap text-sm text-gray-500 text-right table-cell">

                                    $00.00
                                </td>

                                <td class="px-2 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-right table-cell">

                                    $0000.00
                                </td>
                            </tr>


                        </tbody>
                    </table>
                </div>

                <div class="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <div>
                        <h3 class="font-bold text-gray-700 mb-2">NOTES:</h3>
                        <p class="text-sm text-gray-600 italic">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ut nisi tempus massa blandit luctus.
                        </p>
                    </div>

                    <div class="sm:text-right">
                        <div class="space-y-1 text-sm">
                            <div class="flex justify-between">
                                <span class="font-medium">SUB-TOTAL</span>
                                <span class="font-medium">$0000.00</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-500">TAX RATE</span>
                                <span class="text-gray-500">00%</span>
                            </div>
                            <div class="flex justify-between border-b pb-2">
                                <span class="font-medium">TAX</span>
                                <span class="font-medium">$00.00</span>
                            </div>
                            <div class="flex justify-between pt-2 text-lg font-bold text-[#b30602] border-t border-gray-200">
                                <span>TOTAL</span>
                                <span>$0000.00</span>
                            </div>
                        </div>
                    </div>
                </div>

                <footer class="mt-12 pt-4 border-t border-gray-200 text-xs text-gray-500 text-center">
                    <p>
                        This invoice was generated with the help of Wave Financial Inc. To learn more, and create your own free account visit www.apps.com
                    </p>
                    <p class="mt-1 text-right text-gray-700 font-semibold">Powered by
                        <span class="text-blue-600 font-extrabold text-sm">
                            &#x261E; wave
                        </span>
                    </p>
                </footer>

            </div>
        </div>
    )
}

export default Invoice