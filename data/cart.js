export let cart=JSON.parse(localStorage.getItem('cart'));
if(!cart){
    cart=[
    ];
}


export function addtocart(productid){
    let found;
    cart.forEach((item)=>{
        if(item.productId===productid){
            found=item;
            
        }
    })
    
    if(found){
        found.quantity+=1;
    }
    else{
            cart.push({
                productId:productid,
                quantity:1,
                deliveryId:"1"
            })
        }
        console.log(cart);
        localStorage.setItem('cart', JSON.stringify(cart));

    
}

export function cartcount(){
    let cartnum=0;
        cart.forEach((item)=>{
            cartnum+=item.quantity;
            
})

return cartnum;

}

export function deletecart(productId){
    let newcart=[];
    cart.forEach((item)=>{
        if(item.productId!=productId){
            newcart.push(item)
        }
    })
    cart=newcart;
    localStorage.setItem('cart', JSON.stringify(cart));
}

