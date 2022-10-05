import PublicLayout from '@/Layouts/PublicLayout'
import { useForm, Link } from '@inertiajs/inertia-react';
import InputLabel from "@/Components/InputLabel";
import TextAreaInput from '@/Components/TextAreaInput'
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInputHidden from '@/Components/TextInputHidden';
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import classNames from 'classnames';
import { PencilSquareIcon, EllipsisVerticalIcon, TrashIcon } from '@heroicons/react/20/solid'
import FlashMessage from '@/Components/FlashMessage';
import Swal from 'sweetalert2';
import { Inertia } from '@inertiajs/inertia';

export default function ShowPost({ auth, comment, post, can_update, can_delete }) {
    const { data, setData, errors, processing, submit, reset } = useForm(
        {
            konten: "",
            id_post: post.id
        }
    );

    function onSubmit(e) {
        e.preventDefault();

        const submitUrl = route("comment.store");
        submit("post", submitUrl, {
            onSuccess: reset()
        });
    }

    function handleEdit(comment) {
        Swal.fire({
            title: `Edit Comment ${comment.user.name}`,
            input: 'textarea',
            inputLabel: "comment anda",
            inputValue: `${comment.konten}`,
            inputAttributes: {
                autocapitalize: 'off',
            },
            showCancelButton: true,
            confirmButtonText: 'Update',
        }).then((result) => {
            // console.log(result);
            if (result.isConfirmed) {
                Inertia.visit(route("comment.update", comment.id), {
                    data: { 'konten': result.value },
                    method: "patch",
                    onSuccess: () => Swal.fire({
                        icon: "success",
                        title: `comment anda berhasi di edit`,
                        imageUrl: result.value.avatar_url
                    }),
                    onError: () => Swal.fire({
                        icon: "error",
                        title: `Gagal mengupdate comment`,
                        imageUrl: result.value.avatar_url
                    })
                });

            }
        })
    }

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
                    Detail Post Blog
                </p>
            </div>
            <div className="bg-white px-4 py-5 sm:px-6">
                <div className="flex space-x-3">
                    <div className="min-w-0 flex-1">
                        <h1 className="text-4xl font-medium text-gray-900">
                            {post.judul}
                        </h1>
                        <p className="text-sm font-medium text-gray-900 mt-5">
                            {post.konten}
                        </p>
                        <span className="inline-block flex-shrink-0 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800 mt-5">
                            Pembuat : {post.user.name}
                        </span>
                        <span className="inline-block flex-shrink-0 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800 ml-3">
                            Waktu : {post.created_at}
                        </span>
                    </div>
                    <div className="flex flex-shrink-0 self-center">
                        {can_update && can_delete && (
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
                                                        href={route("post.edit", post.id)}
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
                                                        href={route("post.destroy", post.id)}
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
                        )}
                    </div>
                </div>

                {auth.user && (
                    <form onSubmit={onSubmit} className="mt-2 space-y-3">
                        <div>
                            <TextInputHidden
                                name="id_post"
                                value={post.id}
                                handleChange={(e) => setData("id_post", e.target.value)}
                            />
                            <InputError message={errors.konten} className="mt-2" />
                        </div>
                        <div>
                            <InputLabel forInput="Komentar" value="Komentar" />
                            <TextAreaInput
                                name="konten"
                                value={data.konten}
                                className="mt-1 block w-full"
                                handleChange={(e) => setData("konten", e.target.value)}
                            />
                            <InputError message={errors.konten} className="mt-2" />
                        </div>

                        <div className="flex items-center justify-end mt-4">
                            <PrimaryButton processing={processing}>simpan</PrimaryButton>
                        </div>
                    </form>
                )}
                {!auth.user && <p className='font-medium text-lg text-gray-400 text-center'>Silahkan Login Untuk Menambahkan Komentar</p>}
            </div>



            <div className="mt-3 bg-white px-4 py-5 sm:px-6">
                <div className="flex space-x-3">
                    <div className="min-w-0 flex-1">
                        <h1 className="text-4xl font-medium text-gray-900">
                            Daftar Komentar
                        </h1>

                        {comment.map((item) => (

                            <div className='bg-white px-4 py-5 sam:px-6' key={item.id}>
                                <span className="inline-block h-10 w-10 overflow-hidden rounded-full bg-gray-100">
                                    <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                                    </svg>
                                </span>
                                <h4 className="text-2xl inline-block font-medium text-gray-900 ml-3">
                                    {item.user.name}
                                </h4>
                                <Menu as="div" className="relative inline-block text-left ml-5">
                                    <div>
                                        <Menu.Button className="-m-2 flex items-center rounded-full p-2 text-gray-400 hover:text-gray-600">
                                            <span className="sr-only">Open options</span>
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
                                                        <span
                                                            className={classNames(
                                                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                                'flex px-4 py-2 text-sm'
                                                            )}
                                                            onClick={() => handleEdit(item)}
                                                        >
                                                            <PencilSquareIcon className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
                                                            <span>Edit</span>
                                                        </span>
                                                        // <Link
                                                        //     href="#"
                                                        //     className={classNames(
                                                        //         active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                        //         'flex px-4 py-2 text-sm'
                                                        //     )}
                                                        // >
                                                        //     <PencilSquareIcon className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
                                                        //     <span>Edit</span>
                                                        // </Link>
                                                    )}
                                                </Menu.Item>
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <Link
                                                            method='post'
                                                            href={route('comment.destroy', item.id)}
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
                                <p className="text-sm font-medium text-gray-900 mt-5">
                                    {item.konten}
                                </p>
                                <span className="mt-3 inline-block flex-shrink-0 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">
                                    Waktu : {item.created_at}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <FlashMessage />
        </PublicLayout>

    )
}
