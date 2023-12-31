import { useDispatch, useSelector } from "react-redux";
import {
  clearSelectedProduct,
  createProductAsync,
  getProductByIdAsync,
  selectAllBrands,
  selectAllCategories,
  selectProductById,
  updateProductAsync,
} from "../product/productSlice";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Modal from "../common/Modal";
import { useAlert } from 'react-alert';

const ProductForm = () => {
  const dispatch = useDispatch();
  const categories = useSelector(selectAllCategories);
  const brands = useSelector(selectAllBrands);
  const params = useParams();
  const alert = useAlert();
  const selectedProduct = useSelector(selectProductById);
  const {
    register,
    reset,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const [openModal, setOpenModal] = useState(-1);

  useEffect(() => {
    if (params.id) {
      dispatch(getProductByIdAsync(params.id));
    } else {
      dispatch(clearSelectedProduct());
    }
  }, [dispatch, params.id]);

  useEffect(() => {
    if (selectedProduct && params.id) {
      setValue("title", selectedProduct.title);
      setValue("description", selectedProduct.description);
      setValue("category", selectedProduct.category);
      setValue("brand", selectedProduct.brand);
      setValue("price", selectedProduct.price);
      setValue("discountPercentage", selectedProduct.discountPercentage);
      setValue("stock", selectedProduct.stock);
      setValue("thumbnail", selectedProduct.thumbnail);
      setValue("image1", selectedProduct.images[0]);
      setValue("image2", selectedProduct.images[1]);
      setValue("image3", selectedProduct.images[2]);
    }
  }, [selectedProduct, params.id,setValue]);

  const onSubmit = (data) => {
    const product = { ...data };
    product.images = [
      product.image1,
      product.image2,
      product.image3,
      product.thumbnail,
    ];
    delete product.image1;
    delete product.image2;
    delete product.image3;
    
    if (params.id) {
      product.id = params.id;
      dispatch(updateProductAsync(product));
      alert.success('Product Updated', {
        timeout: 3000
      })
    } else {
      product.rating = 0;
      dispatch(createProductAsync(product));
      alert.success('New Product Created', {
        timeout: 3000
      })
      reset();
    }

    
  };

  const handleDelete = () => {
    const product = { ...selectedProduct };
    product.deleted = true;
    dispatch(updateProductAsync(product));
    reset();
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="space-y-12 bg-white px-10 py-5">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Add Product
          </h2>
          {selectedProduct && selectedProduct.deleted &&<p className="mt-1 text-sm font-semibold leading-6 text-red-400">
            Product is deleted
          </p>}

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label
                htmlFor="title"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Product Name/Title
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    {...register("title", { required: "Title is required" })}
                    id="title"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="title"
                  />
                </div>
                {errors.title && (
                  <span className="text-red-500">{errors.title?.message}</span>
                )}
              </div>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="description"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Description
              </label>
              <div className="mt-2">
                <textarea
                  id="description"
                  {...register("description", {
                    required: "description is required",
                  })}
                  rows={3}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  defaultValue={""}
                />
              </div>
              {errors.description && (
                <span className="text-red-500">
                  {errors.description?.message}
                </span>
              )}
              <p className="mt-3 text-sm leading-6 text-gray-600">
                Write a few sentences about product.
              </p>
            </div>
          </div>
        </div>

        <div className="border-b border-gray-900/10 pb-12">
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label
                htmlFor="category"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Category
              </label>
              <div className="mt-2">
                <select
                  id="category"
                  {...register("category", {
                    required: "category is required",
                  })}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  <option value="">--Choose category--</option>
                  {categories &&
                    categories.map((category,index) => (
                      <option key={index} value={category.value}>{category.label}</option>
                    ))}
                </select>
              </div>
              {errors.category && (
                <span className="text-red-500">{errors.category?.message}</span>
              )}
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="brand"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Brand
              </label>
              <div className="mt-2">
                <select
                  id="brand"
                  {...register("brand", { required: "brand is required" })}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  <option value="">--Choose brand--</option>
                  {brands &&
                    brands.map((brand,index) => (
                      <option key={index} value={brand.value}>{brand.label}</option>
                    ))}
                </select>
              </div>
              {errors.brand && (
                <span className="text-red-500">{errors.brand?.message}</span>
              )}
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="price"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Price
              </label>
              <div className="mt-2">
                <input
                  type="number"
                  {...register("price", {
                    required: "price is required",
                    min: {
                      value: 1,
                      message: "Value shouldnot be negative or 0",
                    },
                    max: 10000,
                    valueAsNumber: true,
                  })}
                  id="price"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              {errors.price && (
                <span className="text-red-500">{errors.price?.message}</span>
              )}
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="discountPercentage"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Discount Percentage
              </label>
              <div className="mt-2">
                <input
                  type="number"
                  {...register("discountPercentage", {
                    required: "discountPercentage is required",
                    min: { value: 0, message: "Value shouldnot be negative" },
                    max: {
                      value: 100,
                      message: "Value shouldnot be more than 100",
                    },
                    valueAsNumber: true,
                  })}
                  id="discountPercentage"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              {errors.discountPercentage && (
                <span className="text-red-500">
                  {errors.discountPercentage?.message}
                </span>
              )}
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="stock"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Stock
              </label>
              <div className="mt-2">
                <input
                  id="stock"
                  type="number"
                  {...register("stock", {
                    required: "stock is required",
                    min: {
                      value: 1,
                      message: "Value shouldnot be less than 1",
                    },
                    valueAsNumber: true,
                  })}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              {errors.stock && (
                <span className="text-red-500">{errors.stock?.message}</span>
              )}
            </div>

            <div className="col-span-full">
              <label
                htmlFor="thumbnail"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Thumbnail
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  {...register("thumbnail", {
                    required: "thumbnail is required",
                  })}
                  id="thumbnail"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              {errors.thumbnail && (
                <span className="text-red-500">
                  {errors.thumbnail?.message}
                </span>
              )}
            </div>
            <div className="col-span-full">
              <label
                htmlFor="image1"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Image 1:
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  {...register("image1", { required: "image1 is required" })}
                  id="image1"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              {errors.image1 && (
                <span className="text-red-500">{errors.image1?.message}</span>
              )}
            </div>
            <div className="col-span-full">
              <label
                htmlFor="image2"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Image 2:
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  {...register("image2", { required: "image2 is required" })}
                  id="image2"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              {errors.image2 && (
                <span className="text-red-500">{errors.image2?.message}</span>
              )}
            </div>
            <div className="col-span-full">
              <label
                htmlFor="image3"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Image 3:
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  {...register("image3", { required: "image3 is required" })}
                  id="image3"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              {errors.image3 && (
                <span className="text-red-500">{errors.image3?.message}</span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <Link to={"/admin"}>
          <button
            type="button"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Cancel
          </button>
        </Link>
       {selectedProduct && <Modal
          title={`Delete :${selectedProduct.title}`}
          message="Do you want to delete this item ?"
          dangerOption="Delete"
          cancelOption="Cancel"
          setModal={openModal === selectedProduct.id}
          dangerAction={(e)=>handleDelete()}
          cancelAction={(e) => setOpenModal(-1)}
        ></Modal>}
        {selectedProduct && (
          <button
            type="button"
            onClick={(e) => setOpenModal(selectedProduct.id)}
            className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
          >
            Delete
          </button>
        )}
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>
      </div>
    </form>
  );
};
export default ProductForm;
