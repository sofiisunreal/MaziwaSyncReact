import React, { useEffect, useState } from "react";
import api from "../context/api/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const FarmersBal = () => {
    const [farmer, setFarmer] = useState([]);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const FetchBalance = async () => {
        setLoading(true);

        try {
            const { data } = await api.get("cooperative/farmers/balance/");
            setFarmer(data);
            console.log(data);
        } catch (error) {
            toast.error("Failed to fetch farmers with balances");
        } finally {
            setLoading(false);
        }
    };

    // navigate to use payFarmer component 
    // move with the farmer object 
    const HandlePay=(farmer)=>{
        navigate("/admin-dashboard/admin/farmer/payfarmer",{state:{farmer}})
    }


    useEffect(() => {
        FetchBalance();
    }, []);

    return (
        <div className="space-y-6 p-6">
            {/* Header */}
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">
                        Farmers Balances
                    </h1>
                    <p className="text-gray-500">
                        Monitor outstanding farmer payments.
                    </p>
                </div>

                <div className="rounded-xl bg-emerald-50 px-5 py-3 border border-emerald-100">
                    <p className="text-sm text-gray-500">Farmers with Records</p>
                    <p className="text-2xl font-bold text-emerald-600">
                        {farmer.length}
                    </p>
                </div>
            </div>

            {/* Loading */}
            {loading && (
                <div className="rounded-xl border bg-white p-10 text-center shadow-sm">
                    <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-green-600"></div>
                    <p className="text-gray-500">Loading farmer balances...</p>
                </div>
            )}

            {/* Empty */}
            {!loading && !farmer.length && (
                <div className="rounded-xl border border-dashed bg-white p-10 text-center shadow-sm">
                    <div className="mb-3 text-5xl">🌾</div>
                    <h3 className="text-lg font-semibold text-gray-700">
                        No Farmers Found
                    </h3>
                    <p className="mt-2 text-gray-500">
                        There are currently no farmers with balances.
                    </p>
                </div>
            )}

            {/* Desktop Table */}
            {!loading && farmer.length > 0 && (
                <>
                    <div className="hidden overflow-hidden rounded-2xl border bg-white shadow md:block">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr className="text-left text-sm uppercase tracking-wide text-gray-500">
                                    <th className="px-6 py-4">Farmer</th>
                                    <th className="px-6 py-4">Earned</th>
                                    <th className="px-6 py-4">Paid</th>
                                    <th className="px-6 py-4">Balance</th>
                                    <th className="px-6 py-4 text-center">Status</th>
                                    <th className="px-6 py-4 text-center">Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {farmer.map((f) => (
                                    <tr
                                        key={f.id}
                                        className="border-t transition hover:bg-gray-50"
                                    >
                                        <td className="px-6 py-5 font-semibold text-gray-800">
                                            {f.farmer}
                                        </td>

                                        <td className="px-6 py-5 font-medium text-gray-700">
                                            Ksh {Number(f.earned).toLocaleString()}
                                        </td>

                                        <td className="px-6 py-5 font-medium text-gray-700">
                                            Ksh {Number(f.paid).toLocaleString()}
                                        </td>

                                        <td className="px-6 py-5">
                                            <span
                                                className={`rounded-full px-3 py-1 text-sm font-semibold ${f.balance > 0
                                                    ? "bg-red-100 text-red-600"
                                                    : "bg-green-100 text-green-600"
                                                    }`}
                                            >
                                                Ksh {Number(f.balance).toLocaleString()}
                                            </span>
                                        </td>

                                        <td className="px-6 py-5 text-center">
                                            {f.balance > 0 ? (
                                                <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700">
                                                    Pending
                                                </span>
                                            ) : (
                                                <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                                                    Cleared
                                                </span>
                                            )}
                                        </td>

                                        <td className="px-6 py-5 text-center">
                                            {f.balance > 0 ? (
                                                <button disabled={f.balance <= 0} onClick={()=>HandlePay(f)}
                                                    className="rounded-lg bg-green-600 px-4 py-2 font-medium text-white transition hover:bg-green-700"
                                                >
                                                    Pay Farmer
                                                </button>
                                            ) : (
                                                <span className="text-sm font-medium text-gray-400">
                                                    No Action Needed
                                                </span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile Cards */}
                    <div className="space-y-4 md:hidden">
                        {farmer.map((f) => (
                            <div
                                key={f.id}
                                className="rounded-2xl border bg-white p-5 shadow-sm"
                            >
                                <div className="mb-4 flex items-center justify-between">
                                    <h3 className="font-bold text-gray-800">{f.farmer}</h3>

                                    <span
                                        className={`rounded-full px-3 py-1 text-xs font-semibold ${f.balance > 0
                                            ? "bg-red-100 text-red-600"
                                            : "bg-green-100 text-green-600"
                                            }`}
                                    >
                                        {f.balance > 0 ? "Pending" : "Paid"}
                                    </span>
                                </div>

                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Earned</span>
                                        <span className="font-semibold">
                                            Ksh {Number(f.earned).toLocaleString()}
                                        </span>
                                    </div>

                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Paid</span>
                                        <span className="font-semibold">
                                            Ksh {Number(f.paid).toLocaleString()}
                                        </span>
                                    </div>

                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Balance</span>
                                        <span className="font-bold text-red-600">
                                            Ksh {Number(f.balance).toLocaleString()}
                                        </span>
                                    </div>
                                </div>

                                {f.balance > 0 ? (
                                    <button
                                        disabled={f.balance <= 0}
                                        onClick={()=>HandlePay(b)}
                                        // onClick={() =>
                                        //     navigate("/admin-dashboard/admin/farmer/payfarmer")
                                        // }
                                        className="mt-5 w-full rounded-lg bg-green-600 py-3 font-medium text-white transition hover:bg-green-700"
                                    >
                                        Pay Farmer
                                    </button>
                                ) : (
                                    <div className="mt-5 rounded-lg bg-green-50 py-3 text-center font-medium text-green-600">
                                        Farmer Balance Cleared
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default FarmersBal;
