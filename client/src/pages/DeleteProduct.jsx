import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteProduct } from "../api/products";

const DeleteProduct = () => {
    const [productId, setProductId] = useState('');
    const [showMessage, setShowMessage] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();

    const handleDelete = async () => {
        try {
            const response = await deleteProduct(productId);

            if (response.success) {
                setErrorMessage('Product deleted successfully');
                setShowMessage(true);
                // Clear the form field
                setProductId('');
            } else {
                setErrorMessage('Failed to delete product');
                setShowMessage(true);
            }
        } catch (error) {
            setErrorMessage('An error occurred while deleting the product');
            setShowMessage(true);
        }

        setTimeout(() => {
            setShowMessage(false);
        }, 5000);
    };

    const redirectToInventory = () => {
        navigate('/inventory');
    };

    return (
        <>
            <div className="h-screen flex items-center justify-center bg-red-200">
                <div className="p-5 border border-cyan-950 rounded bg-white">
                    <div className="m-3 text-3xl font-bold text-center">Delete Product</div>

                    <div className="flex flex-col gap-4">
                        <div className="flex grid-cols-2 gap-3">
                            <label className="text-md w-28">Product ID</label>
                            <input type="text" value={productId} onChange={(e) => setProductId(e.target.value)} className="rounded border border-cyan-500" />
                        </div>

                        <div className="flex grid-cols-2 gap-3">
                            <label className="text-md w-28">Product Name</label>
                            <input type="text" value={productId} onChange={(e) => setProductId(e.target.value)} className="rounded border border-cyan-500" />
                        </div>

                        <div className="flex grid-cols-2 gap-3">
                            <label className="text-md w-28">Quantity</label>
                            <input type="text" value={productId} onChange={(e) => setQuantity(e.target.value)} className="rounded border border-cyan-500" />
                        </div>

                        <div className="flex grid-cols-2 gap-3">
                            <label className="text-md w-28">Unit</label>
                            <input type="text" value={productId} onChange={(e) => setUnit(e.target.value)} className="rounded border border-cyan-500" />
                        </div>

                        <div className="flex grid-cols-2 gap-3">
                            <label className="text-md w-28">Price</label>
                            <input type="text" value={productId} onChange={(e) => setPrice(e.target.value)} className="rounded border border-cyan-500" />
                        </div>

                        <button type="button" onClick={handleDelete} className="bg-purple-700 text-black p-3 rounded-full hover:bg-pink-500 hover:text-white">DELETE</button>
                    </div>

                    {showMessage && <div className="text-center mt-4">{errorMessage}</div>}
                </div>
            </div>
        </>
    );
};

export default DeleteProduct;
