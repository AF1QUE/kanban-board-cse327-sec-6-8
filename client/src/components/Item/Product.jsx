// Product.js

 
const Product = (product) => {
  console.log(product.product.titile)
  
  return (
    <div className="border p-6 m-2 ">
      <h3 className="text-lg font-bold mb-2">{product.product.titile}</h3>
      <p className="text-gray-600">${product.product.text}</p>
     
    </div>
  );
};

export default Product;
