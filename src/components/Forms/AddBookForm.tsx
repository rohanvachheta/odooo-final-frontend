import React, { useState } from "react";
import Cookies from "js-cookie";
import { API_URL } from "../../constants";

export default function AddBookForm() {
  const [errors, setErrors] = useState<any>({});
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    publisher: "",
    ISBN: "",
    quantity: 0,
    maxReturnDays: 1,
    bookCover: "",
    genre: "",
    year: "",
  });

  const cookie = Cookies.get("token");
  const handleInputChange = (e: any) => {
    setErrors({});
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors: any = {};

    // Validate email
    if (!formData.author) {
      newErrors.author = "Author is required";
      isValid = false;
    }

    if (!formData.genre) {
      newErrors.genre = "genre is required";
      isValid = false;
    }

    // Validate password
    if (!formData.ISBN) {
      newErrors.ISBN = "ISBN is required";
      isValid = false;
    }

    if (!formData.bookCover) {
      newErrors.bookCover = "Book Cover is required";
      isValid = false;
    }

    if (!formData.publisher) {
      newErrors.publisher = "Publisher is required";
      isValid = false;
    }

    if (!formData.year) {
      newErrors.year = "year is required";
      isValid = false;
    }

    if (!formData.quantity) {
      newErrors.quantity = "Quantity is required";
      isValid = false;
    }

    if (!formData.title) {
      newErrors.title = "Title is required";
      isValid = false;
    }

    if (!formData.maxReturnDays) {
      newErrors.maxReturnDays = "Maximum Return days is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (validateForm()) {
        const payload = {
          name: formData.title,
          author: formData.author,
          quantity: formData.quantity,
          genre: formData.genre,
          ISBN: formData.ISBN,
          year: formData.year,
          publisher: formData.publisher,
          maxReturnDays: parseInt(formData.maxReturnDays.toString()),
        };

        console.log(payload);

        const addBookData = await fetch(`${API_URL}/books`, {
          method: "POST",
          body: JSON.stringify(payload),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${cookie}`,
          },
        });
        const response = await addBookData.json();

        console.log(response);
      }
    } catch (error) {}
  };

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-4 flex justify-center">
      <div className="w-full border-stroke xl:w-1/2 ">
        <div className="w-full ">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="mb-2.5 block font-medium text-black dark:text-white">
                Title
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Title"
                  className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  value={formData.title}
                  name="title"
                  onChange={handleInputChange}
                />

                {errors.title && (
                  <div className=" text-red-600">{errors.title}</div>
                )}
              </div>
            </div>
            <div className="mb-4">
              <label className="mb-2.5 block font-medium text-black dark:text-white">
                Author
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Author"
                  className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  value={formData.author}
                  name="author"
                  onChange={handleInputChange}
                />

                {errors.author && (
                  <div className=" text-red-600">{errors.author}</div>
                )}
              </div>
            </div>
            <div className="mb-4">
              <label className="mb-2.5 block font-medium text-black dark:text-white">
                Genre
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Genre"
                  className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  value={formData.genre}
                  name="genre"
                  onChange={handleInputChange}
                />

                {errors.genre && (
                  <div className=" text-red-600">{errors.genre}</div>
                )}
              </div>
            </div>
            <div className="mb-4">
              <label className="mb-2.5 block font-medium text-black dark:text-white">
                Publisher
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Publisher"
                  className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  value={formData.publisher}
                  name="publisher"
                  onChange={handleInputChange}
                />

                {errors.publisher && (
                  <div className=" text-red-600">{errors.publisher}</div>
                )}
              </div>
            </div>
            <div className="mb-4">
              <label className="mb-2.5 block font-medium text-black dark:text-white">
                ISBN Number
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="ISBN Number"
                  className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  value={formData.ISBN}
                  name="ISBN"
                  onChange={handleInputChange}
                />

                {errors.ISBN && (
                  <div className=" text-red-600">{errors.ISBN}</div>
                )}
              </div>
            </div>
            <div className="mb-4">
              <label className="mb-2.5 block font-medium text-black dark:text-white">
                Year
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Year"
                  className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  value={formData.year}
                  name="year"
                  onChange={handleInputChange}
                />

                {errors.year && (
                  <div className=" text-red-600">{errors.year}</div>
                )}
              </div>
            </div>
            <div className="mb-4">
              <label className="mb-2.5 block font-medium text-black dark:text-white">
                Quantity
              </label>
              <div className="relative">
                <input
                  type="number"
                  placeholder="Quantity"
                  className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  value={formData.quantity}
                  name="quantity"
                  onChange={handleInputChange}
                />

                {errors.quantity && (
                  <div className=" text-red-600">{errors.quantity}</div>
                )}
              </div>
            </div>
            <div className="mb-4">
              <label className="mb-2.5 block font-medium text-black dark:text-white">
                Maximum Return Days
              </label>
              <div className="relative">
                <input
                  type="number"
                  placeholder="Maximum Return Days"
                  className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  value={formData.maxReturnDays}
                  name="quantity"
                  onChange={handleInputChange}
                />

                {errors.maxReturnDays && (
                  <div className=" text-red-600">{errors.maxReturnDays}</div>
                )}
              </div>
            </div>
            <div className="mb-4">
              <label className="mb-2.5 block font-medium text-black dark:text-white">
                Book Cover
              </label>
              <div className="relative">
                <input
                  type="url"
                  placeholder="Image URL"
                  className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  value={formData.bookCover}
                  name="bookCover"
                  onChange={handleInputChange}
                />
                {errors.bookCover && (
                  <div className=" text-red-600">{errors.bookCover}</div>
                )}
              </div>
            </div>
            <input
              type="submit"
              value="Add"
              className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
            />
          </form>
        </div>
      </div>
    </div>
  );
}
