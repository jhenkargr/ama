export let products=[]


class Product{
    id;
    image;
    name;
    rating;
    priceCents;

    constructor(productdetail){
        this.id=productdetail.id;
        this.image=productdetail.image;
        this.name=productdetail.name;
        this.rating=productdetail.rating;
        this.priceCents=productdetail.priceCents;
        
    }
}

class Clothing extends Product{
   sizeChartLink;

    constructor(productdetail){
        super(productdetail);
        this.sizeChartLink=productdetail.sizeChartLink;
    }
}

export function getProduct(productId) {
    let matchingProduct;
    console.log(products);
    products.forEach((product) => {
        
      if (product.id === productId) {
        matchingProduct = product;
       
      }
    });
    
    return matchingProduct;
  }

export function loadProductsFetch() {
    const promise = fetch(
      'https://supersimplebackend.dev/products'
    ).then((response) => {
      return response.json();
    }).then((productsData) => {
      products = productsData.map((productDetails) => {
        if (productDetails.type === 'clothing') {
          return new Clothing(productDetails);
        }
        return new Product(productDetails);
      });
  
      console.log('load products');
    }).catch((error) => {
      console.log('Unexpected error. Please try again later.');
    });
  
    return promise;
  }

export function loadproducts(render){
    const xhr=new XMLHttpRequest();
    console.log("hii")

    xhr.addEventListener('load',()=>{
        products=JSON.parse(xhr.response).map((productdetails)=>{
            if(productdetails.type==='clothing'){
                return new Clothing(productdetails);
            }
            else{
                return new Product(productdetails);
            }
        })
        render();
    })
    xhr.addEventListener('error',(error)=>{
        console.log("error")
    })

    xhr.open('GET','https://supersimplebackend.dev/products')
    xhr.send()
}






/*export const products=[{
    name:"6 pair of socks for men",
    image:"images/products/athletic-cotton-socks-6-pairs.jpg",
    rating:{
        stars:"40",
        number:"4"
    },
    price:23,
    id:"1"

},{
    name:"6 pair of ",
    image:"images/products/athletic-cotton-socks-6-pairs.jpg",
    rating:{
        stars:"40",
        number:"4"
    },
    price:23,
    id:"2"
},{
    name:" of socks for men",
    image:"images/products/athletic-cotton-socks-6-pairs.jpg",
    rating:{
        stars:"40",
        number:"4"
    },
    price:23,
    id:"3"
}]*/