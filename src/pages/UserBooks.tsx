import Breadcrumb from "../components/Breadcrumbs/Breadcrumb";
import Cookies from 'js-cookie';
import { MdCheck, MdDelete } from "react-icons/md";
import { useEffect, useState } from "react";
import { API_URL } from "../constants";
import { useParams } from "react-router-dom";
import { formatDate } from "../utils/dates";


const UserBooks = () => {

    const cookie = Cookies.get('token');
    const [bookList, setBooList] = useState([]);
    const params =useParams()
    const getBookList = async () => {
        const response = await fetch(`${API_URL}/orders?ofUser=${params.id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${cookie}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch user details');
        }
        const data = await response.json();
        console.log(data)
        setBooList(data.filter(d => d.status !== "completed"));
    }

    useEffect(() => {
        getBookList()
    }, [])

    const confirmReturn = async (bookId) => {
        if (!confirm('Are you sure you want to return this book')) return;
        const response = await fetch(`${API_URL}/orders/${bookId}/complete`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${cookie}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch book data');
        } else {
            getBookList()
            alert("Book returned successfully")
        }

    }

    return (
        <>
            <Breadcrumb pageName="User's books" />

            <div className="flex flex-col gap-10">



                <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
                    <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
                        User's borrowed books List
                    </h4>

                    <div className="flex flex-col">
                        <div className="grid grid-cols-7 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-7">
                            <div className="p-2.5 xl:p-5">
                                <h5 className="text-sm font-medium uppercase xsm:text-base">
                                    Name
                                </h5>
                            </div>
                            <div className="p-2.5 text-center xl:p-5">
                                <h5 className="text-sm font-medium uppercase xsm:text-base">
                                    Author
                                </h5>
                            </div>
                            <div className="p-2.5 text-center xl:p-5">
                                <h5 className="text-sm font-medium uppercase xsm:text-base">
                                    Genre
                                </h5>
                            </div>
                            <div className="p-2.5 text-center xl:p-5">
                                <h5 className="text-sm font-medium uppercase xsm:text-base">
                                ISBN
                                </h5>
                            </div>

                            <div className="p-2.5 text-center xl:p-5">
                                <h5 className="text-sm font-medium uppercase xsm:text-base">
                                Issued At
                                </h5>
                            </div>
                            <div className="p-2.5 text-center xl:p-5">
                                <h5 className="text-sm font-medium uppercase xsm:text-base">
                                Due Date
                                </h5>
                            </div>

                            <div className="p-2.5 text-center xl:p-5">
                                <h5 className="text-sm font-medium uppercase xsm:text-base">
                                    Actions
                                </h5>
                            </div>

                        </div>

                        {bookList?.length ? bookList.map((book, key) => (
                            <div
                                className={`grid grid-cols-3 sm:grid-cols-7 ${key === bookList.length - 1
                                        ? ""
                                        : "border-b border-stroke dark:border-strokedark"
                                    }`}
                                key={key}
                            >
                                <div className="flex items-center gap-3 p-2.5 xl:p-5">

                                    <p className="hidden text-black dark:text-white sm:block">
                                        {book?.bookId?.name}
                                    </p>
                                </div>

                                <div className="flex items-center justify-center p-2.5 xl:p-5">
                                    <p className="text-black dark:text-white">{book?.bookId?.author}</p>
                                </div>

                                <div className="flex items-center justify-center p-2.5 xl:p-5">
                                    <p className="text-black dark:text-white">{book?.bookId?.genre}</p>
                                </div>

                                <div className="flex items-center justify-center p-2.5 xl:p-5">
                                    <p className="text-black dark:text-white">{book?.bookId?.ISBN}</p>
                                </div>

                                <div className="flex items-center justify-center p-2.5 xl:p-5">
                                    <p className="text-black dark:text-white">{formatDate(book?.issuedAt)}</p>
                                </div>

                                <div className="flex items-center justify-center p-2.5 xl:p-5">
                                    <p className="text-black dark:text-white">{formatDate(book?.dueDate)}</p>
                                </div>


                                <div className="flex items-center justify-center p-2.5 xl:p-5">
                                    <div className="ml-2 mr-2 cursor-pointer">
                                        <MdCheck onClick={() => confirmReturn(book?._id)} color="black" size={20} />
                                    </div>
                                </div>
                            </div>
                        )) : "User haven't active borrowed books"}
                    </div>
                </div>
            </div>
        </>
    );
};

export default UserBooks;
