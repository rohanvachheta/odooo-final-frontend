import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useDebounce } from 'use-lodash-debounce';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import { API_URL } from '../../constants';
import BooksCard from '../../components/BooksCard/BooksCard';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    background:'transparent',
    border:'none'
  },
};


Modal.setAppElement('#root');

const ECommerce: React.FC = () => {
  const cookie = Cookies.get('token');
  const [booksList, setBooksList] = useState([])
  const [recBooks, setRecBooks] = useState([]);
  const [searchInput, setsearchInput] = useState('');
  const [isLoading, setIsLoading] = useState(false)
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [clickedBookDetails, setClickedBookDetails] = useState({})

  console.log({clickedBookDetails});


  const debouncedSetValue = useDebounce(searchInput, 400)

  const callAPI = async () => {
    setIsLoading(true)

    try {
      const response = await fetch(`${API_URL}/books/recommend`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${cookie}`,
          'Content-Type': 'application/json',
        },
      });

      setIsLoading(false)
      if (!response.ok) {
        throw new Error('Failed to fetch user details');
      }

      const data = await response.json();

      console.log({ data });
      setRecBooks(data)
    } catch (error) {

    }
  }


  useEffect(() => {
   
    callAPI()

  }, []);



  const callAPISearch= async () => {
    setIsLoading(true)

    try {
      const response = await fetch(`${API_URL}/books?searchBy=${debouncedSetValue}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${cookie}`,
          'Content-Type': 'application/json',
        },
      });
      setIsLoading(false)
      if (!response.ok) {
        throw new Error('Failed to fetch user details');
      }

      const data = await response.json();

      setBooksList(data)
    } catch (error) {

    }
  }
  useEffect(() => {

   



    callAPISearch()
  }, [debouncedSetValue]);

  const fetchAlltheAPIs=()=>{
    callAPISearch();
    callAPI()
  }

  const notify = () => toast("You've successfully purchased book! thanks.");

    const handleBorrowBook = async () => {
      try {
          const response = await fetch(`${API_URL}/orders`, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${cookie}`
              },
              body: JSON.stringify({ bookId: clickedBookDetails._id, quantity: 1 })
          });

          if (!response.ok) {
              throw new Error('Network response was not ok');
          }

          const data = await response.json();
          console.log('Borrow success:', data);
          notify();
          setIsOpen(false);
          fetchAlltheAPIs()

          // Handle success: display a success message or update state
      } catch (error) {
          console.error('Borrow error:', error.message);
          // Handle error: display an error message or handle accordingly
      }
  };





  return <div>
            <ToastContainer />

    <Modal
      isOpen={modalIsOpen}
      onRequestClose={() => { }}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <div className="flex flex-col bg-white	p-2 border-black  shadow-sm rounded-xl pointer-events-auto dark:bg-neutral-800 dark:border-neutral-700 dark:shadow-neutral-700/70">
        <div className="flex justify-between items-center py-3 px-4 border-b dark:border-neutral-700">
          <h3 className="font-bold text-gray-800 dark:text-white">Confirmation Model</h3>
          <button
            type="button"
            className="flex justify-center items-center size-7 text-sm font-semibold rounded-full  border-transparent text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-neutral-700"
            data-hs-overlay="#hs-basic-modal"
          >
            <span className="sr-only">Close</span>
            <svg
             onClick={()=>{
              setIsOpen(false)
            }}
              className="flex-shrink-0 size-4"
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </div>
        <div className="p-4 overflow-y-auto">
          <p className="mt-1 text-gray-800 dark:text-neutral-400">
            Are you sure want to purchase the {clickedBookDetails.name} ?
          </p>
        </div>
        <div className="flex justify-end items-center gap-x-2 py-3 px-4  dark:border-neutral-700">
          <button
            type="button"
            className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800"
            data-hs-overlay="#hs-basic-modal"
            onClick={()=>{
              setIsOpen(false)
            }}
          >
            Close
          </button>
          <button
            type="button"
            onClick={handleBorrowBook}
            className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg  border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
          >
           Yes, sure
          </button>
        </div>
      </div>


    </Modal>
    {!cookie &&
      <>



        <nav className="bg-white border-gray-200 dark:bg-gray-900">
          <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
            <a
              // href="https://flowbite.com"
              className="flex items-center space-x-3 rtl:space-x-reverse"
            >

              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                The Library Management System
              </span>
            </a>
            <div className="flex items-center space-x-6 rtl:space-x-reverse">

              <Link
                to="/auth/signin"
                className="text-lg font-extrabold	  text-blue-600 dark:text-blue-500 hover:underline"
              >
                Login
              </Link>
            </div>
          </div>
        </nav>

      </>}


    <div className={`flex gap-2 justify-center items-center `} style={{
      width: '80%',
      margin: '0 auto',
      marginTop: cookie ? '' : '50px'
    }}>
      <input type="text" id="large-input"
        className="w-full rounded-lg border  border-stroke bg-white py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
        placeholder='Search for books'
        value={searchInput}
        onChange={(e) => setsearchInput(e.target.value)}
      />
      <button type="button" class="px-6 py-3.5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Search</button>


    </div>


    {!isLoading && <div className={` flex flex-wrap mt-7`}>
      <div className="w-full md:w-1/2 px-4 mb-4 md:mb-0">

        <p class="text-2xl p-4">New Arrivals</p>

        {/* Content for the first column */}
        {booksList.map(item => {
          return <BooksCard setClickedBookId={(id)=>{
            if(!cookie)return
            setIsOpen(true)
            setClickedBookDetails(id)
          }}  {...item} />
        })}

        {!booksList.length && <p className='text-center'>No Books found!</p>}
      </div>
      <div className="w-full md:w-1/2 px-4">

        <p class="text-2xl p-4">Trending</p>
        {/* Content for the second column */}
        {recBooks.map(item => {
          return <BooksCard setClickedBookId={(id)=>{
            if(!cookie)return
            setIsOpen(true)
            setClickedBookDetails(id)
          }}  {...item} />
        })}
        {!recBooks.length && <p className='text-center'>No Recommended Books found!</p>}
      </div>
    </div>}

  </div>
};

export default ECommerce;
