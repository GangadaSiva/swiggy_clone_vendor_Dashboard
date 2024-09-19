import React,{useState} from 'react'
import {API_Path} from '../../utils/APIPath';

const AddProduct = () => {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState([]);
  const [bestSeller, setBestSeller] = useState(false);
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState("");


  const handleCategorychange = (event)=>{
    const value = event.target.value;
    if(category.includes(value)){
      setCategory(category.filter((item)=> item !== value));
    }else{
      setCategory([...category, value]);
    }
  }

  const handleBestSeller = (event)=>{
    const value = event.target.value === 'true';
    setBestSeller(value);
  }

  const handleImageUpload = (event)=>{
    const selectedImage = event.target.files[0];
    setFile(selectedImage);
  }

  const handleSubmit = async(e)=>{
    e.preventDefault();
    try {
      const loginToken = localStorage.getItem('loginToken');
      const firmId = localStorage.getItem('firmId');
      if(!loginToken || !firmId){
        console.error("user not authenticated");
      }
      const formData = new FormData();
        formData.append('productName', productName);
        formData.append('price', price);
        formData.append('description', description);
        formData.append('image', file);
        formData.append('bestSeller', bestSeller);


        category.forEach((value)=>{
          formData.append('category', value)
        });
     

        const response = await fetch(`${API_Path}/product/add-product/${firmId}`,{
          method: "POST",
          body: formData
        })
        const data = await response.json();
        if(response.ok){
          console.log(data);
          setProductName("");
          setPrice("")
          setCategory([]);
          setBestSeller(false);
          setDescription("");
          setFile(null);
          alert("Product Added succesfully");
        }else {
          console.error(data.message || "Failed to add product");
        }

    } catch (error) {
      console.error(error.message || "An error occurred while adding the product");
    }

  }





  return (
    <div className="productsection">
        <form className='authform' onSubmit={handleSubmit}>
            <h1> Add Product</h1>
            <label>Product Name</label>
            <input type="text" placeholder='Enter Product Name' value={productName} onChange={(e)=> setProductName(e.target.value)}/><br />
            <label>Price</label>
            <input type="text" placeholder='Enter Product price ' value={price} onChange={(e)=> setPrice(e.target.value)}/><br />

            <div className='checkboxes'>
              <label>Category</label>
              <div className='checkboxContainer'>
                <div className='checkboxinp'>
                  <label>Veg</label>
                  <input type="checkbox" checked={category.includes('veg')} value="veg" onChange={handleCategorychange}/>
                </div>
                <div className='checkboxinp'>
                  <label>Non-Veg</label>
                  <input type="checkbox" checked= {category.includes('non-veg')} value="non-veg" onChange={handleCategorychange}/>
                </div>
              </div>
            </div>

            <div className='checkboxes'>
              <label>Best Seller</label>
              <div className='checkboxContainer'>
                <div className='checkboxinp'>
                  <label>Yes</label>
                  <input type="radio" name='bestSeller' value="true" checked={bestSeller ===true} onChange={handleBestSeller}/>
                </div>
                <div className='checkboxinp'>
                  <label>No</label>
                  <input type="radio" name='bestSeller'  value="false" checked={bestSeller ===false} defaultChecked onChange={handleBestSeller}/>
                </div>
              </div>
            </div> <br />
            
            <label>Product Image</label>
            <input type="file" placeholder='Enter' onChange={handleImageUpload} /><br />
            <label>Description</label>
            <input type="text" placeholder='Enter Product description' value={description} onChange={(e)=> setDescription(e.target.value)}/><br />
            <div className="btnsubmit">
                <button type='submit'>Submit</button>
            </div>
        </form>
    </div>
  )
}

export default AddProduct