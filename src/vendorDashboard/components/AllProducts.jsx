import React ,{useState, useEffect}from 'react'
import {API_Path} from '../utils/APIPath';

const AllProducts = () => {
    const [products, setProducts] = useState([]);

    const ProductHandler = async()=>{
        const firmId = localStorage.getItem('firmId');
        try {
            const response = await fetch(`${API_Path}/product/get-product/${firmId}`);
            const newProductsData = await response.json();
            setProducts(newProductsData.products);
            console.log(newProductsData);
        } catch (error) {
            console.error("Failed to fetch Products");
        }
    }
    useEffect(()=>{
        ProductHandler()
        console.log("this is use Effect");
    },[])

    const deleteProductById = async(productId)=>{
        if (!confirm('Are you sure you want to delete this product?')) {
            return;
        }
        try {
            const response = await fetch(`${API_Path}/product/delete/${productId}`,{
                method: 'DELETE'
            })
            const result = await response.json();
            if(response.ok){
                setProducts((prevProducts) => prevProducts.filter((product) => product._id !== productId));
                
                alert("Product deleted sucessfully");
            }
            else {
                console.error('Failed to delete product:', result.message);
            }
        } catch (error) {
            console.error("Failed to delete Products");
        }
    }

  return (
    <div className='table-container'>
        {
            !products ? (<p>No records found</p>) : (
                <table className="product-table">
                    <thead>
                        <tr>
                            <th>Product Name</th>
                            <th>Price</th>
                            <th>Image</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products.map((item)=>{
                                return(
                                    <>
                                        <tr key={item._id}>
                                            <td>{item.productName}</td>
                                            <td>{item.price}</td>
                                            <td>
                                                <img src={`${API_Path}/uploads/${item.image}`} alt={item.productName} 
                                                style={{width: "50px", height: "50px"}}
                                                />
                                            </td>
                                            <td>
                                                <button onClick={()=>deleteProductById(item._id)}>Delete</button>
                                            </td>
                                        </tr>
                                    </>
                                )
                            })
                        }
                    </tbody>
                </table>
            )
        }
    </div>
  )
}

export default AllProducts