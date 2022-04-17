
import { Fragment, useEffect, useState } from "react";
import { Dialog, Menu, Transition } from "@headlessui/react";
import { MenuAlt3Icon, XIcon } from "@heroicons/react/outline";
import { Link, useNavigate } from "react-router-dom";
import { getToken } from "../helper";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/auth.action";


export default function Layout({
    children,
}) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { inProgressLogout } = useSelector((state) => state.auth)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmitLogout = async (e) => {
        await logout()(dispatch);
        navigate('/login');
    };



    return (
        <>
            <div className="h-full bg-secondary">
                <Transition.Root show={sidebarOpen} as={Fragment}>
                    <Dialog
                        as="div"
                        className="fixed inset-0 flex z-40 justify-end  lg:hidden"
                        onClose={setSidebarOpen}
                    >
                        <Transition.Child
                            as={Fragment}
                            enter="transition-opacity ease-linear duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition-opacity ease-linear duration-300"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
                        </Transition.Child>
                        <div className="flex-shrink-0 w-14" aria-hidden="true">
                            {/* Dummy element to force sidebar to shrink to fit close icon */}
                        </div>
                        <Transition.Child
                            as={Fragment}
                            enter="transition ease-in-out duration-300 transform"
                            enterFrom="translate-x-full"
                            enterTo="translate-x-0"
                            leave="transition ease-in-out duration-300 transform"
                            leaveFrom="-translate-x-0"
                            leaveTo="translate-x-full"
                        >
                            <div className="relative flex-1 h-full mt-16 flex flex-col max-w-xs w-full ">
                                <div
                                    aria-label="Sidebar"
                                    className="h-full bg-primary text-white flex flex-col"
                                >
                                    {/* Sidebar component, swap this element with another sidebar if you like */}
                                    <div className="flex flex-col  overflow-y-auto py-2">
                                        <nav
                                            className="flex-1 flex flex-col overflow-y-auto"
                                            aria-label="Sidebar"
                                        >
                                            <div className="">

                                            </div>
                                        </nav>
                                    </div>

                                    <div className="flex-1 flex flex-col h-full gap-4 py-4 items-center">
                                        <div className="flex gap-2">
                                            <button
                                                disabled={inProgressLogout}
                                                className="bg-white text-primary  px-3 py-2  rounded-lg      cursor-pointer border-primary uppercase inline-flex gap-2 justify-center items-center"
                                                onClick={handleSubmitLogout}
                                            >
                                                Logout
                                            </button>
                                        </div>
                                        <div className="flex gap-2  h-8 justify-center">

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Transition.Child>
                    </Dialog>
                </Transition.Root>

                <div className="flex w-full h-full flex-col">
                    <div className="z-10 flex-shrink-0 fixed w-full flex items-center justify-between h-16 lg:h-20 bg-primary text-white">
                        <div className="h-10 w-40 text-3xl font-extrabold uppercase ml-2">
                            <Link to="/">
                                Pack
                            </Link>
                        </div>
                        <div className="lg:hidden flex justify-center gap-2 items-center mr-2">

                            <div
                                onClick={() => {
                                    setSidebarOpen(!sidebarOpen);
                                }}
                            >
                                {sidebarOpen ? (
                                    <XIcon className="text-secondary-light h-10 w-10" />
                                ) : (
                                    <MenuAlt3Icon className="text-secondary-light h-10 w-10" />
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="h-full main w-full mt-16 lg:mt-20">
                        <main className="h-full w-full">
                            {children}
                        </main>
                    </div>
                </div>
            </div>
        </>
    );
}