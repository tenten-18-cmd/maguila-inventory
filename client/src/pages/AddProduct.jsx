import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addProducts } from "../api/products";

const AddProduct = () => {
    const [productId, setProductId] = useState('');
    const [productName, setProductName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [unit, setUnit] = useState('');
    const [price, setPrice] = useState('');

    const [showMessage, setShowMessage] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();

    const handleAdd = async () => {
        const response = await addProducts(productId, productName, quantity, unit, price);

        if (response.exists) {
            setErrorMessage('Product already exists');
            setShowMessage(true);
        } else if (response.success) {
            setErrorMessage('Product added successfully');
            setShowMessage(true);
            // Clear the form fields
            setProductId('');
            setProductName('');
            setQuantity('');
            setUnit('');
            setPrice('');
        } else {
            setErrorMessage('Failed to add product');
            setShowMessage(true);
        }

        setTimeout(() => {
            setShowMessage(false);
        }, 5000);
    }

    const redirectToInventory = () => {
        navigate('/inventory');
    }

    return (
        <>

        
            <div className="h-screen flex flex-col items-center justify-center p-8 bg-gradient-to-r from-gray-200 to-gray-800 h-screen">
                <div className="p-5 border border-cyan-950 text-cyan-800 rounded rgba(192, 192, 192, 0.5)">
                    <div className="m-3 text-3xl font-extrabold text-center">Add Product</div>

                    <div className="flex flex-col gap-4">
                        <div className="flex grid-cols-2 gap-3">
                            <label className="text-md font-bold w-28">Product ID</label>
                            <input type="text" value={productId} onChange={(e) => setProductId(e.target.value)} className="rounded border border-cyan-500" />
                        </div>

                        <div className="flex gap-5">
                            <label className="text-md font-bold w-28">Product Name</label>
                            <input type="text" value={productName} onChange={(e) => setProductName(e.target.value)} className="rounded border border-cyan-500" />
                        </div>

                        <div className="flex gap-5">
                            <label className="text-md font-bold w-28">Quantity</label>
                            <input type="text" value={quantity} onChange={(e) => setQuantity(e.target.value)} className="rounded border border-cyan-500" />
                        </div>

                        <div className="flex gap-5">
                            <label className="text-md font-bold rounded-sm w-28">Unit</label>
                            <input type="text" value={unit} onChange={(e) => setUnit(e.target.value)} className="rounded border border-cyan-500" />
                        </div>

                        <div className="flex gap-5">
                            <label className="text-md font-bold w-28">Price</label>
                            <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} className="rounded border border-cyan-500" />
                        </div>

                        <button type="button" onClick={handleAdd} className=" text-white p-3  hover:bg-blue-700 border border-gray-300">ADD</button>
                        <button onClick={redirectToInventory} className="mt-4  text-white p-3  hover:bg-blue-700 border border-gray-300"> exit </button>
                    </div>

                    {showMessage && <div className="text-center mt-4">{errorMessage}</div>}
                </div>
                
            </div>
        </>
    );
};

export default AddProduct;
