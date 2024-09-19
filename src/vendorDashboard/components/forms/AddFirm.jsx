import React ,{useState} from 'react'
import {API_Path} from '../../utils/APIPath';

const AddFirm = () => {
    const [firmName, setFirmname] = useState("");
    const [area, setArea] = useState("");
    const [category, setCategory] = useState([]);
    const [region, setRegion] = useState([]);
    const [offer, setOffer] = useState("");
    const [file, setFile] = useState(null);

    const handleCategorychange = (event)=>{
      const value = event.target.value;
      if(category.includes(value)){
        setCategory(category.filter((item)=> item !== value));
      }else{
        setCategory([...category, value]);
      }
    }

    const handleRegionchange = (event)=>{
      const value = event.target.value;
      if(region.includes(value)){
        setRegion(region.filter((item)=> item !== value));
      }else{
        setRegion([...region, value]);
      }
    }

    const handleImageUpload = (event)=>{
      const selectedImage = event.target.files[0];
      setFile(selectedImage);
    }


    const handleFirmsubmit = async(e)=>{
        e.preventDefault();
        try {
          const loginToken = localStorage.getItem('loginToken');
          if(!loginToken){
            console.error("user not authenticated");
          }
          const formData = new FormData();
            formData.append('firmName', firmName);
            formData.append('area', area);
            formData.append('offer', offer);
            formData.append('image', file);

            category.forEach((value)=>{
              formData.append('category', value)
            });
            region.forEach((value)=>{
              formData.append('region', value)
            });

            const response = await fetch(`${API_Path}/firm/add-firm`,{
              method: "POST",
              headers: {
                'token' : `${loginToken}`
              },
              body: formData
            })
            const data = await response.json();
            if(response.ok){
              console.log(data);
              setFirmname("");
              setArea("")
              setCategory([]);
              setRegion([]);
              setOffer("");
              setFile(null);
              alert("Firm Added succesfully");
              const firmId = data.firmId;
              const FirmName = data.namefirm
              localStorage.setItem("firmId", firmId);
              localStorage.setItem("vendorFirmName", FirmName);
              window.location.reload();
              
            }else if(data.message === "vendor can have only one firm"){
              alert("1 firm already exists")
            }else{
              alert("Failed to add firm")
            }
            
        } catch (error) {
            console.error("Failed to add firm")
        }
    }

  return (
    <div className="firmsection">
        <form className='authform' onSubmit={handleFirmsubmit}>
            <h1> Add Firm</h1>
            <label>Firm Name</label>
            <input type="text" placeholder='Enter Restaurant Name ex: Alpha' name='firmName' value={firmName} onChange={(e)=> setFirmname(e.target.value)}/><br />
            <label>Area</label>
            <input type="text" placeholder='Enter Restaurant location'name='area' value={area} onChange={(e)=> setArea(e.target.value)}/><br />


            <div className='checkboxes'>
              <label>Category</label>
              <div className='checkboxContainer'>
                <div className='checkboxinp'>
                  <label>Non-Veg</label>
                  <input type="checkbox" checked={category.includes('veg')} value="veg" onChange={handleCategorychange}/>
                </div>
                <div className='checkboxinp'>
                  <label>Veg</label>
                  <input type="checkbox" checked= {category.includes('non-veg')} value="non-veg" onChange={handleCategorychange}/>
                </div>
              </div>
            </div>



            <div className='checkboxes'>
              <label>Region</label>
              <div className='checkboxContainer'>
                <div className='checkboxinp'>
                  <label>South-Indian</label>
                  <input type="checkbox" checked={region.includes('south-indian')} value="south-indian" onChange={handleRegionchange}/>
                </div>
                <div className='checkboxinp'>
                  <label>North-Indian</label>
                  <input type="checkbox" checked= {region.includes('north-indian')} value="north-indian" onChange={handleRegionchange}/>
                </div>
                <div className='checkboxinp'>
                  <label>Chinese</label>
                  <input type="checkbox" checked= {region.includes('chinese')} value="chinese" onChange={handleRegionchange}/>
                </div>
                <div className='checkboxinp'>
                  <label>Bakery</label>
                  <input type="checkbox" checked= {region.includes('bakery')} value="bakery" onChange={handleRegionchange}/>
                </div>
              </div>
            </div>

            <label>Offer</label>
            <input type="text" placeholder='Enter offer, ex: 50% off'name='offer' value={offer} onChange={(e)=> setOffer(e.target.value)}/><br />
            <label>Firm Image</label>
            <input type="file" placeholder='Enter ' onChange={handleImageUpload}/><br />
            
            <div className="btnsubmit">
                <button type='submit'>Submit</button>
            </div>
        </form>
    </div>
  )
}

export default AddFirm