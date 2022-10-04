import Pagination from '@/Components/Pagintion'
import PublicLayout from '@/Layouts/PublicLayout'
import { Link } from '@inertiajs/inertia-react'
import { EyeIcon } from '@heroicons/react/20/solid'
import FlashMessage from '@/Components/FlashMessage'
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { PencilSquareIcon, EllipsisVerticalIcon, TrashIcon } from '@heroicons/react/20/solid'
import classNames from 'classnames'


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
                                    <div className="flex flex-shrink-0 self-center">
                                        <Menu as="div" className="relative inline-block text-left">
                                            <div>
                                                <Menu.Button className="-m-2 flex items-center rounded-full p-2 text-gray-400 hover:text-gray-600">
                                                    {/* <span className="sr-only">Open options</span> */}
                                                    <EllipsisVerticalIcon className="h-5 w-5" aria-hidden="true" />
                                                </Menu.Button>
                                            </div>

                                            <Transition
                                                as={Fragment}
                                                enter="transition ease-out duration-100"
                                                enterFrom="transform opacity-0 scale-95"
                                                enterTo="transform opacity-100 scale-100"
                                                leave="transition ease-in duration-75"
                                                leaveFrom="transform opacity-100 scale-100"
                                                leaveTo="transform opacity-0 scale-95"
                                            >
                                                <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                    <div className="py-1">
                                                        <Menu.Item>
                                                            {({ active }) => (
                                                                <Link
                                                                    href={route("post.edit", item.id)}
                                                                    className={classNames(
                                                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                                        'flex px-4 py-2 text-sm'
                                                                    )}
                                                                >
                                                                    <PencilSquareIcon className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
                                                                    <span>Edit</span>
                                                                </Link>
                                                            )}
                                                        </Menu.Item>
                                                        <Menu.Item>
                                                            {({ active }) => (
                                                                <Link
                                                                    method='delete'
                                                                    href={route("post.destroy", item.id)}
                                                                    className={classNames(
                                                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                                        'flex px-4 py-2 text-sm'
                                                                    )}
                                                                >
                                                                    <TrashIcon className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
                                                                    <span>Hapus</span>
                                                                </Link>
                                                            )}
                                                        </Menu.Item>
                                                    </div>
                                                </Menu.Items>
                                            </Transition>
                                        </Menu>
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
