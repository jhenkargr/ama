import { cart, cartcount, deletecart } from '../data/cart.js';
import { products,loadproducts,getProduct,loadProductsFetch } from '../data/product.js';
import { deliveryoption } from '../data/delivery.js';

console.log(cart)
loadproducts(updateamount)

let amount={
    item:0,
    shipping:0,
    before:0,
    tax:0,
    total:0
}
export function updateamount(){

    
    console.log(amount.item)
        
        let items=0;
        
        cart.forEach((cartitems) => {
            
            let matching=getProduct(cartitems.productId);
            console.log(matching)
            if(matching){
            items+=matching.priceCents*cartitems.quantity;
            console.log(cartitems.quantity)
            console.log(matching.priceCents)
            }
            
        })
        
        amount.item=items/100;
        console.log(items)
        let ship=0;
        cart.forEach((cartitem)=>{
            let match;
            console.log(cart);
            deliveryoption.forEach((product)=>{
                if(product.id===cartitem.deliveryId){
                    match=product;
                    console.log(match.deliveryprice)
                }
        
            })
            ship+=match.deliveryprice
        })
        amount.shipping=ship;
        
        amount.before=amount.shipping+amount.item;
        const intr=amount.before*0.10
        amount.tax=intr.toFixed(2);
        console.log(amount.before)
        
        amount.total=((intr)+amount.before).toFixed(2);;

        const order=` <p class="last7">$${amount.item}</p>
        <p class="last7">$${amount.shipping}</p>
        <p class="last7">$${amount.before}</p>
        <p class="last7">$${amount.tax}</p>
        <h1 class="last5">$${amount.total}</h1>`
        document.querySelector('.last12').innerHTML=order;

        document.querySelector('.last622').innerHTML = ` items(${cartcount()})`;
}