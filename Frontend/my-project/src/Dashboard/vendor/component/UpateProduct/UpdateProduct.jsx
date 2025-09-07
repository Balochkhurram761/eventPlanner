import React from "react";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";

// Transition animation
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const UpdateProduct = ({
  open,
  setOpen,
  filed,
  productForm,
  handleform,
  updateProduct, // function jo API call karega
}) => {
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={() => setOpen(false)}
      aria-describedby="update-product"
    >
      <div className="p-6 w-[320px] sm:w-[460px]">
        <h2 className="text-xl font-semibold mb-4 text-center">
          Update Product
        </h2>
        <form className="flex flex-col gap-4" onSubmit={updateProduct}>
          {/* Service-specific fields */}
          {filed === "hall" && (
            <>
              <input
                type="text"
                onChange={handleform}
                name="hallCapacity"
                value={productForm.hallCapacity}
                placeholder="Hall Capacity"
                className="border rounded-lg p-2 outline-none"
              />
              <input
                type="text"
                onChange={handleform}
                name="hallPricePerHead"
                value={productForm.hallPricePerHead}
                placeholder="Price Per Head"
                className="border rounded-lg p-2 outline-none"
              />
              <input
                type="text"
                onChange={handleform}
                name="hallLocation"
                value={productForm.hallLocation}
                placeholder="Location"
                className="border rounded-lg p-2 outline-none"
              />
            </>
          )}

          {filed === "catering" && (
            <>
              <input
                type="text"
                onChange={handleform}
                name="cateringMenu"
                value={productForm.cateringMenu}
                placeholder="Catering Menu"
                className="border rounded-lg p-2 outline-none"
              />
              <input
                type="text"
                onChange={handleform}
                name="cateringPricePerHead"
                value={productForm.cateringPricePerHead}
                placeholder="Catering Price Per Head"
                className="border rounded-lg p-2 outline-none"
              />
            </>
          )}

          {filed === "dj" && (
            <>
              <input
                type="text"
                onChange={handleform}
                name="djRate"
                value={productForm.djRate}
                placeholder="DJ Rate"
                className="border rounded-lg p-2 outline-none"
              />
              <input
                type="text"
                onChange={handleform}
                name="djDuration"
                value={productForm.djDuration}
                placeholder="DJ Duration"
                className="border rounded-lg p-2 outline-none"
              />
            </>
          )}

          {/* Common fields */}
          <input
            type="text"
            onChange={handleform}
            name="contactNumber"
            value={productForm.contactNumber}
            placeholder="Enter Contact Number"
            className="border rounded-lg p-2 outline-none"
          />
          <input
            type="text"
            onChange={handleform}
            name="city"
            value={productForm.city ? productForm.city.toLowerCase() : ""}
            placeholder="Enter City"
            className="border rounded-lg p-2 outline-none"
          />

          {/* Buttons */}
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="px-4 py-2 cursor-pointer bg-gray-200 hover:bg-gray-300 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 cursor-pointer bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </Dialog>
  );
};

export default UpdateProduct;
