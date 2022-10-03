import { Link } from "@inertiajs/inertia-react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import classNames from "classnames";

export default function Pagination({ pagination }) {
    return (
        <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
            <div className="flex flex-1 justify-between sm:hidden">
                <Link
                    as={pagination.current_page === 1 ? "span" : "a"}
                    href={pagination.prev_page_url}
                    className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                    Previous
                </Link>
                <Link
                    as={pagination.current_page === pagination.last_page ? "span" : "a"}
                    href={pagination.next_page_url}
                    className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                    Next
                </Link>
            </div>

            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm text-gray-700">
                        Menampilkan <span className="font-medium">{pagination.from}</span>{" "}
                        ke <span className="font-medium">{pagination.to}</span> dari{" "}
                        <span className="font-medium">{pagination.total}</span> hasil
                    </p>
                </div>
                <div>
                    <nav
                        className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                        aria-label="Pagination"
                    >
                        {pagination.links.map((page, idx) => {
                            const isFirst = idx === 0;
                            const isLast = idx === pagination.links.length - 1;

                            function renderLabel() {
                                if (isFirst) {
                                    return (
                                        <>
                                            <span className="sr-only">Previous</span>
                                            <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                                        </>
                                    );
                                }

                                if (isLast) {
                                    return (
                                        <>
                                            <span className="sr-only">Next</span>
                                            <ChevronRightIcon
                                                className="h-5 w-5"
                                                aria-hidden="true"
                                            />
                                        </>
                                    );
                                }

                                return page.label;
                            }

                            return (
                                <Link
                                    key={page.label}
                                    href={page.url}
                                    as={page.url ? "a" : "span"}
                                    aria-current={page.active ? "page" : "false"}
                                    className={classNames(
                                        page.active
                                            ? "z-10 bg-indigo-50 border-indigo-500 text-indigo-600"
                                            : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50",
                                        isFirst && "rounded-l-md",
                                        isLast && "rounded-r-md",
                                        "relative inline-flex items-center border px-4 py-2 text-sm font-medium focus:z-20"
                                    )}
                                >
                                    {renderLabel()}
                                </Link>
                            );
                        })}
                    </nav>
                </div>
            </div>
        </div>
    );
}
