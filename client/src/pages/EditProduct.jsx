import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { editProduct } from "../api/products";


const EditProduct = () => {
    const [productId, setProductId] = useState('');
    const [productName, setProductName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [unit, setUnit] = useState('');
    const [price, setPrice] = useState('');

    const [showMessage, setShowMessage] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const loadProduct = async () => {
            try {
                const response = await getProduct(id);
                setProductId(response.product_id);
                setProductName(response.product_name);
                setQuantity(response.quantity);
                setUnit(response.unit);
                setPrice(response.price);
            } catch (error) {
                setErrorMessage('Error fetching product');
                setShowMessage(true);
            }
        };

        loadProduct();
    }, [id]);

    const handleEdit = async () => {
        try {
            const response = await editProduct(productId, productName, quantity, unit, price);

            if (response.success) {
                setErrorMessage('Product edited successfully');
            } else {
                setErrorMessage('Failed to edit product');
            }
        } catch (error) {
            setErrorMessage('An error occurred while editing the product');
        }

        setShowMessage(true);
        setTimeout(() => {
            setShowMessage(false);
        }, 5000);
    };

    const redirectToInventory = () => {
        navigate('/inventory');
    };
    return (
        <>
             <div className="h-screen flex flex-col items-center justify-center p-8 bg-gradient-to-r from-gray-200 to-gray-800 h-screen">
             <div className="p-5 border border-cyan-950 text-cyan-800 rounded rgba(192, 192, 192, 0.5)">
                    <div className="m-3 text-3xl font-extrabold text-cyan-800 text-center">Edit Product</div>
                    <div className="flex flex-col gap-4">
                        <div className="flex grid-cols-2 gap-3">
                            <label className="text-md font-bold text-gray-700 w-28">Product ID</label>
                            <input type="text" value={productId} readOnly className="rounded border border-cyan-500" />
                        </div>
                        <div className="flex gap-5">
                            <label className="text-md font-bold text-gray-700 w-28">Product Name</label>
                            <input type="text" value={productName} onChange={(e) => setProductName(e.target.value)} className="rounded border border-cyan-500" />
                        </div>
                        <div className="flex gap-5">
                            <label className="text-md font-bold text-gray-700 w-28">Quantity</label>
                            <input type="text" value={quantity} onChange={(e) => setQuantity(e.target.value)} className="rounded border border-cyan-500" />
                        </div>
                        <div className="flex gap-5">
                            <label className="text-md font-bold text-gray-700 w-28">Unit</label>
                            <input type="text" value={unit} onChange={(e) => setUnit(e.target.value)} className="rounded border border-cyan-500" />
                        </div>
                        <div className="flex gap-5">
                            <label className="text-md font-bold text-gray-700 w-28">Price</label>
                            <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} className="rounded border border-cyan-500" />
                        </div>
                        <button type="button" onClick={handleEdit} className=" text-white p-3  hover:bg-blue-700 border border-gray-300">EDIT</button>
                        <button onClick={redirectToInventory} className="mt-4 text-white p-3  hover:bg-blue-700 border border-gray-300"> exit </button>
                    </div>
                    {showMessage && <div className="text-center mt-4">{errorMessage}</div>}
                </div>
                <div className="flex justify-left"></div>
                
            </div>
            
        </>
    );
};

export default EditProduct;
