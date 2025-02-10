import {products,loadproducts} from '../data/product.js'
import {cart,addtocart,cartcount} from '../data/cart.js'

loadproducts(render);


function render(){
    let productsHTML='';
    console.log(products)

products.forEach((product)=>{
        let HTML=`<div class="block">
                    <div class="photo">
                        <img class="photo-logo" src="${product.image}">
                    </div>

                    <div class="info">
                        <p class="detail">${product.name}</p>
                        <div class="rate">
                            <img class="star" src="images/ratings/rating-${product.rating.stars*10}.png">
                            <p class="number">${product.rating.count}</p>
                        </div>
                        <p class="price"><strong>$${product.priceCents/100}</strong></p>
                        <div class="quantity">
                            <select>
                            <option selected value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                            </select>
                        </div>
                        <button class="add" data-product-id=${product.id}>Add to cart</button>
                    </div>
                </div>`;

       productsHTML+=HTML;

});

document.querySelector('.bottom').innerHTML=productsHTML

/*let nu=JSON.parse(localStorage.getItem('nu'));*/
let nu=cartcount();
if(!nu){
    nu=0;
}
let inner=` <img class="cart-logo" src="images/icons/cart-icon.png">
                    <p class="num">${nu}</p> 
                    <p class="ass">cart</p>`

document.querySelector('.cart').innerHTML=inner;


document.querySelectorAll('.add')
.forEach((button) => {
    button.addEventListener('click', () => {
        const productId=button.dataset.productId;
        console.log(productId);
        addtocart(productId);
       
        nu=cartcount();
        document.querySelector('.num').innerHTML=nu;
        
        /*localStorage.setItem('nu', JSON.stringify(nu));*/
      
        
    })
})


}
   