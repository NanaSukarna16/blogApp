import { Fragment } from "react";
import { Link } from "@inertiajs/inertia-react";
import { Popover, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { usePage } from "@inertiajs/inertia-react";

export default function PublicLayout(props) {

    const { auth } = usePage().props;
    // const navigation = [
    //     { name: "Home", href: "/" },
    //     { name: "Barang", href: '#' },
    //     { name: "Tentang", href: "#" },
    //     { name: "Kontak", href: "#" },
    // ];

    return (
        <div className="relative bg-gray-50 min-h-screen h-full">
            <div
                className="hidden sm:absolute sm:inset-y-0 sm:block sm:h-full sm:w-full"
                aria-hidden="true"
            >
                <div className="relative mx-auto h-full max-w-7xl">
                    <svg
                        className="absolute right-full translate-y-1/4 translate-x-1/4 transform lg:translate-x-1/2"
                        width={404}
                        height={784}
                        fill="none"
                        viewBox="0 0 404 784"
                    >
                        <defs>
                            <pattern
                                id="f210dbf6-a58d-4871-961e-36d5016a0f49"
                                x={0}
                                y={0}
                                width={20}
                                height={20}
                                patternUnits="userSpaceOnUse"
                            >
                                <rect
                                    x={0}
                                    y={0}
                                    width={4}
                                    height={4}
                                    className="text-gray-200"
                                    fill="currentColor"
                                />
                            </pattern>
                        </defs>
                        <rect
                            width={404}
                            height={784}
                            fill="url(#f210dbf6-a58d-4871-961e-36d5016a0f49)"
                        />
                    </svg>
                    <svg
                        className="absolute left-full -translate-y-3/4 -translate-x-1/4 transform md:-translate-y-1/2 lg:-translate-x-1/2"
                        width={404}
                        height={784}
                        fill="none"
                        viewBox="0 0 404 784"
                    >
                        <defs>
                            <pattern
                                id="5d0dd344-b041-4d26-bec4-8d33ea57ec9b"
                                x={0}
                                y={0}
                                width={20}
                                height={20}
                                patternUnits="userSpaceOnUse"
                            >
                                <rect
                                    x={0}
                                    y={0}
                                    width={4}
                                    height={4}
                                    className="text-gray-200"
                                    fill="currentColor"
                                />
                            </pattern>
                        </defs>
                        <rect
                            width={404}
                            height={784}
                            fill="url(#5d0dd344-b041-4d26-bec4-8d33ea57ec9b)"
                        />
                    </svg>
                </div>
            </div>

            <div className="relative pt-6 pb-16 sm:pb-24">
                <Popover>
                    <div className="mx-auto max-w-7xl px-4 sm:px-6">
                        <nav
                            className="relative flex items-center justify-between sm:h-10 md:justify-center"
                            aria-label="Global"
                        >
                            <div className="flex flex-1 items-center md:absolute md:inset-y-0 md:left-0">
                                <div className="flex w-full items-center justify-between md:w-auto">
                                    <Link href="/">
                                        <span className="sr-only">Your Company</span>
                                        <img
                                            className="h-8 w-auto sm:h-10"
                                            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                                            alt=""
                                        />
                                    </Link>
                                    <div className="-mr-2 flex items-center md:hidden">
                                        <Popover.Button className="inline-flex items-center justify-center rounded-md bg-gray-50 p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                                            <span className="sr-only">Open main menu</span>
                                            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                                        </Popover.Button>
                                    </div>
                                </div>
                            </div>

                            <div className="hidden md:absolute md:inset-y-0 md:right-0 md:flex md:items-center md:justify-end">
                                <span className="inline-flex rounded-md shadow">
                                    <Link
                                        href={auth.user ? route('dashboard') : route('login')}
                                        className="inline-flex items-center rounded-md border border-transparent bg-white px-4 py-2 text-base font-medium text-indigo-600 hover:bg-gray-50"
                                    >
                                        {auth.user ? "Dashboard" : "Log In"}
                                    </Link>
                                </span>
                            </div>
                        </nav>
                    </div>

                    <Transition
                        as={Fragment}
                        enter="duration-150 ease-out"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="duration-100 ease-in"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <Popover.Panel
                            focus
                            className="absolute inset-x-0 top-0 z-10 origin-top-right transform p-2 transition md:hidden"
                        >
                            <div className="overflow-hidden rounded-lg bg-white shadow-md ring-1 ring-black ring-opacity-5">
                                <div className="flex items-center justify-between px-5 pt-4">
                                    <div>
                                        <img
                                            className="h-8 w-auto"
                                            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                                            alt=""
                                        />
                                    </div>
                                    <div className="-mr-2">
                                        <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                                            <span className="sr-only">Close menu</span>
                                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                        </Popover.Button>
                                    </div>
                                </div>
                                {/* <div className="px-2 pt-2 pb-3">
                                    {navigation.map((item) => (
                                        <Link
                                            key={item.name}
                                            href={item.href}
                                            className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                                        >
                                            {item.name}
                                        </Link>
                                    ))}
                                </div> */}
                                <Link
                                    href={auth.user ? route('dashboard') : route('login')}
                                    className="block w-full bg-gray-50 px-5 py-3 text-center font-medium text-indigo-600 hover:bg-gray-100"
                                >
                                    {auth.user ? "Dashboard" : "Log In"}
                                </Link>
                            </div>
                        </Popover.Panel>
                    </Transition>
                </Popover>

                <main className="mx-auto mt-16 max-w-7xl px-4 sm:mt-24">
                    {props.children}
                </main>
            </div>
        </div>
    );
}
