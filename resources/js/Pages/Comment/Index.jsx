import React from "react";
import { Inertia } from "@inertiajs/inertia";
import { Link } from "@inertiajs/inertia-react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Swal from "sweetalert2";
import Pagination from "@/Components/Pagintion";
import { TrashIcon, EyeIcon } from "@heroicons/react/20/solid";

export default function Post({ auth, errors, comment }) {
    function handleDelete(target) {
        Swal.fire({
            title: "Anda yakin ingin menghapus komentar ini?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Ya",
            denyButtonText: "Tidak",
        }).then((result) => {
            if (result.isConfirmed) {
                Inertia.visit(route("comment.destroy", target.id), {
                    method: "delete",
                });
            } else if (result.isDenied) {
                Swal.fire("Comment batal dihapus", "", "info");
            }
        });
    }

    return (
        <AuthenticatedLayout auth={auth} errors={errors}>
            <div className="py-4">
                <div className="sm:flex sm:items-center">
                    <div className="sm:flex-auto">
                        <h1 className="text-xl font-semibold text-gray-900">My Comments</h1>
                        <p className="mt-2 text-sm text-gray-700">
                            List Comments yang telah di buat
                        </p>
                    </div>
                </div>
                <div className="mt-8 flex flex-col">
                    <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                                <table className="min-w-full divide-y divide-gray-300">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th
                                                scope="col"
                                                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                                            >
                                                Judul Post
                                            </th>
                                            <th
                                                scope="col"
                                                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                                            >
                                                Komentar
                                            </th>
                                            <th
                                                scope="col"
                                                className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                                            >
                                                <span className="sr-only">Hapus</span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white">
                                        {comment.data.map((item, idx) => (
                                            <tr
                                                key={idx}
                                                className={idx % 2 === 0 ? undefined : "bg-gray-50"}
                                            >
                                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                                    {item.post.judul}
                                                </td>
                                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                                    {item.konten}
                                                </td>
                                                <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium space-x-2 sm:pr-6">
                                                    {/* <Link
                                                        href={route("post.detail", item.post.id) + '#comment-' + item.id}
                                                        className="text-green-600 hover:text-green-900"
                                                    >
                                                        <EyeIcon className="inline-block w-5 h-5" />
                                                        <span className="sr-only">, {item.judul}</span>
                                                    </Link> */}
                                                    <span
                                                        className="text-red-600 hover:text-red-900 cursor-pointer"
                                                        onClick={() => handleDelete(item)}
                                                    >
                                                        <TrashIcon className="inline-block h-5 w-5" aria-hidden="true" />
                                                        <span className="sr-only">, {item.nama}</span>
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <Pagination pagination={comment} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
