

import { products ,loadproducts} from '../data/product.js';
import { cart, cartcount, deletecart } from '../data/cart.js';
import { deliveryoption } from '../data/delivery.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { updateamount } from '../data/amount.js';

loadproducts(showcart)
updateamount()

function showcart() {
    let productHTML = ''; 
    console.log(products); 
   
    
    cart.forEach((cartitem) => {
        const productId = cartitem.productId;
        let found;
        products.forEach((product) =>{
            if(product.id === productId)
                found=product; 
        });
        
        if (found) {
            productHTML += `
                <div class="b-left b-left-${found.id}">
                    <h1 class="first">Delivery date: ${deliverydate(cartitem)}</h1>
                    <div class="second">
                        <img class="b-photo" src="${found.image}">
                        <div class="row2">
                            <h1 class="row21">${found.name}</h1>
                            <h1 class="row22">$${found.priceCents/100}</h1>
                            <div class="row66">
                                <p class="row24">Quantity ${cartitem.quantity}</p>
                                <p class="row25">Update</p>
                                <p class="row26" data-product-id="${found.id}">Delete</p>
                            </div>
                        </div>
                        <div class="row2">
                            <h1 class="row31">Choose a delivery date</h1>
                            <div class="row32">
                                
                                    ${updatedelivery(found,cartitem)}
                                
                            </div>
                        </div>
                    </div>
                </div>`
        }

    });

    function updatedelivery(found,cartitem){
        let html='';

        deliveryoption.forEach((option) => {
            
            const today = dayjs();
            const deliveryDate = today.add(
              option.deliveryday,
              'days'
            );
            const dateString = deliveryDate.format(
              'dddd, MMMM D'
            );
            const isChecked = option.id === cartitem.deliveryId;
        
            html+= `<div class="row33"
                         data-product-id="${cartitem.productId}"
                        data-delivery-id="${option.id}">
                        <input type="radio" class="row34"
                        ${isChecked ? 'checked' : ''}
                        name="delivery-${cartitem.productId}">
                        <div class="row35">
                            <p class="row36">${dateString}</p>
                            <p class="row37">${option.deliveryprice} Shipping</p>
                        </div>
                        
                    </div>`
        })
            return html;
        }

    
    document.querySelector('.bottom').innerHTML = productHTML;


   
    
    
    let nu = cartcount();
    document.querySelector('.mid2').innerHTML = `(${nu} items)`;

    
    document.querySelectorAll('.row26').forEach((item) => {
        item.addEventListener('click', () => {
            const productId = item.dataset.productId;
            deletecart(productId);  

            
            const rem = document.querySelector(`.b-left-${productId}`);
            if (rem) rem.remove();

           
            let nu = cartcount();
            document.querySelector('.mid2').innerHTML = `(${nu} items)`;
            
            updateamount()
        });
    });
    document.querySelectorAll('.row33')
    .forEach((select)=>{
        select.addEventListener('click',()=>{
            const deliveryId=select.dataset.deliveryId;
            const productId=select.dataset.productId;
            updatedate(deliveryId,productId);
            updateamount()
            showcart();
        })
    })

     

}

function updatedate(deliveryId,productId){
    let match;
    cart.forEach((option)=>{
        if(productId===option.productId){
            match=option;
        }

    })
    match.deliveryId=deliveryId;
    localStorage.setItem('cart', JSON.stringify(cart));
    
}
    


function deliverydate(cartitem){
    let dateString;
    deliveryoption.forEach((option)=>{

        if (option.id===cartitem.deliveryId){
            const today=dayjs();
            const deliveryDate = today.add(
                option.deliveryday,
                'days'
            );
            dateString = deliveryDate.format(
                'dddd, MMMM D'
            );
            
        }
        
    })
   
    return dateString;
    
    

}


