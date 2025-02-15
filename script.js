const products = [

   {id: 1,name:"IPhone",Image:"https://inspireonline.in/cdn/shop/files/iPhone_15_Pink_PDP_Image_Position-1__en-IN.jpg?v=1694605206&width=600",price: 40000},
   {id: 2,name:"Drone",Image:"https://m.media-amazon.com/images/I/51pircvv5iL._SX300_SY300_QL70_FMwebp_.jpg",price:5000 },
   {id: 3,name:"Cycle",Image:"https://d2f9uwgpmber13.cloudfront.net/public/image_new/26c3ff3bb9697d101705473576957.jpg",price:20000 },
   {id: 4,name:"baike",Image:"https://i.pinimg.com/736x/c3/51/c4/c351c43173602bfd6c818776b7b29a71.jpg",price:150000 },
   {id: 5,name:"truck",Image:"https://etimg.etb2bimg.com/photo/103642063.cms",price:5000000 },
   {id: 6,name:"Car",Image:"https://m.media-amazon.com/images/I/61Rx9tHudUL.jpg",price:1000000 },
   {id: 7,name:"jcb",Image:"https://assets.khetigaadi.com/new-tractor/JCB-3-DX1686120608.png",price:2500000},
   {id: 8,name:"Mobaile",Image:"https://in-exstatic-vivofs.vivo.com/gdHFRinHEMrj3yPG/1708310823906/b872ab7735f0bb458fd057c15381bcac.png",price:50000 },
   {id: 9,name:"RoyalStag",Image:"https://www.livcheers.com/static/content/images/liquor/LCIN01726.webp",price:1500 },
   {id: 10,name:"Black Dog",Image:"https://www.livcheers.com/static/content/images/liquor/LCIN00259.webp",price:1200 },
]
    
    //Render Products
    function renderProducts(products, productList){
    const container = document.getElementById(productList);
    container.innerHTML="";
    products.forEach(product => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("product-item");
    productDiv.innerHTML= `
    <img src= "${product. Image}"/>
    <h3>${product.name}</h3>
    <h2>${product.price}</h2>
    <button onclick = "addToCart(${product.id})">Add to Cart</button> 
    `
    container.appendChild(productDiv);
    })
    }
    if(document.getElementById("productList")) renderProducts (products, "productList");

// Search functionality
function searchProducts(query) {
    const filterProducts = products.filter(product =>
      product.name.toLocaleLowerCase().includes(query.toLocaleLowerCase())
    );
    renderProducts(filterProducts, "productList");
  }
  
  // Add EventListener to button
  document.getElementById("searchButton")?.addEventListener("click", () => {
    const query = document.getElementById("productSearch").value.trim(); // Added trim to remove leading/trailing spaces
    searchProducts(query);
  });
  // Sorting
function sortProducts(criteria) {
    if (criteria === "price") {
        return products.sort((a, b) => a.price - b.price);
    }
    return products; // Fallback for any other criteria
}

// Adding Event listeners
document.getElementById("sortOptions")?.addEventListener("change", (event) => {
    const sortedProducts = sortProducts(event.target.value);
    renderProducts(sortedProducts, "productList"); 
})



//Add to cart

function addToCart(productId){
    const product = products.find(p => p.id === productId);
    let cart = JSON.parse(localStorage.getItem("cart"))||[];
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${product.name} is added to cart`) 
    renderCart();
}




//Render items in cart

function renderCart() {
    const cart = JSON.parse(localStorage.getItem("cart"))||[];
    const container = document.getElementById("cartItems");
    container.innerHTML="";
    if(cart.length == 0) { 
    container.innerHTML="<h1>Your Cart is Empty</h1>" 
    }
    cart.forEach(item => {
    const cartDiv = document.createElement("div");
    cartDiv.classList.add("cart-item");
    cartDiv.innerHTML=`
    <img src="${item.Image}"/>
    <h3>${item.name}</h3>
    <h2>${item.price}</h2>
    
    <button onclick="removeFromCart(${item.id})">Remove</button>
    `
    container.appendChild(cartDiv);
    
    })
}
    // Remove from cart
function removeFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart =cart.filter(item => item.id !== productId);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Product is removed successfully");
    renderCart();
  }
  
  // Calculate subtotal
  function renderSubtotal(cart) {
    const subtotal = cart.reduce((total, item) => total + item.price, 0);
    const subtotalContainer = document.getElementById("subtotal");
    
    if(cart.length > 0) {
      subtotalContainer.innerHTML = `Subtotal : Rs. ${subtotal}`
    } else {
      subtotalContainer.innerHTML = `No items in the cart`
    }
  }


    if(document.getElementById("productList")) renderProducts (products, "productList");
    if(document.getElementById("cartItems")) renderCart();
    
