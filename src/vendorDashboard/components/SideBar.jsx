import React from 'react'

const SideBar = ({showFirmHandler, showProductHandler, ShowAllProductsHandler, showAddFirm}) => {
  return (
    <div className="sideBar">
        <ul>
          {showAddFirm ? 
          <li onClick={showFirmHandler}>Add Firm</li>: "" }
            
            <li onClick={showProductHandler}>Add Product</li>
            <li onClick={ShowAllProductsHandler}>All Products</li>
            <li>User details</li>
        </ul>
    </div>
  )
}

export default SideBar