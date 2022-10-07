import Pagination from '@/Components/Pagintion'
import PublicLayout from '@/Layouts/PublicLayout'
import { Link } from '@inertiajs/inertia-react'
import { EyeIcon } from '@heroicons/react/20/solid'
import FlashMessage from '@/Components/FlashMessage'

export default function Welcome({ post }) {
    return (
        <PublicLayout >
            <div className="text-center">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                    <span className="block xl:inline">Welcome</span>{" "}
                    <span className="block text-indigo-600 xl:inline">
                        My Blog
                    </span>
                </h1>
                <p className="mx-auto mt-3 max-w-md text-base text-gray-500 sm:text-lg md:mt-5 md:max-w-3xl md:text-xl">
                    List Post Blog
                </p>
            </div>
            <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-3">
                {post.data.map((item) => (
                    <li key={item.id} className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow">
                        <div className="flex w-full items-center justify-between space-x-6 p-6">
                            <div className="flex-1">
                                <div className="flex space-x-3">
                                    <div className="min-w-0 flex-1">

                                        <h1 className="text-xl font-medium text-gray-900 hover:underline">
                                            {item.judul}
                                        </h1>

                                        <span className="mt-2 inline-block flex-shrink-0 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">
                                            Pembuat : {item.user.name}
                                        </span>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div>
                            <div className="-mt-px flex divide-x divide-gray-200">
                                <div className="-ml-px flex w-0 flex-1">
                                    <Link
                                        href={route("post.detail", item.id)}
                                        className="relative inline-flex w-0 flex-1 items-center justify-center rounded-br-lg border border-transparent py-4 text-sm font-medium text-gray-700 hover:text-gray-500"
                                    >
                                        <EyeIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                        <span className="ml-3">Lihat Post</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
            <Pagination pagination={post} />
            <FlashMessage />
        </PublicLayout >
    )
}
