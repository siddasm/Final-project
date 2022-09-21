// onclick hamburger menu

const menu = document.querySelector(".menu");
const output = document.querySelector(".menu-output");
// console.log(menu);
menu.addEventListener("mouseout", burger1);
menu.addEventListener("mouseover", burger);

function burger() {
  output.style.display = "flex";
}

function burger1() {
  output.style.display = "none";
}

fetch("https://5d76bf96515d1a0014085cf9.mockapi.io/product")
  .then(function (res) {
    const data = res.json();
    // console.log(data);
    return data;
  })
  .then((obj) => {
    // console.log("this is obj", obj[0]);

    // Clothing obj Header
    const homePageSection = document.querySelector("#home-page-section");
    const clothHeader = document.createElement("h2");
    clothHeader.className = "cards-header";
    clothHeader.id = "cloth";
    clothHeader.innerHTML = "Clothing for Men and Women";

    // Accessory obj Header
    const accHeader = document.createElement("h2");
    accHeader.className = "cards-header";
    accHeader.id = "accessories";
    accHeader.innerHTML = "Accessories for Men and Women";

    // Appending both headers in body
    homePageSection.appendChild(clothHeader);

    //container 1 =>  creating
    const container1 = document.createElement("div");
    container1.className = "containerOfCard";
    container1.id = "clothContainer";

    // container 2 =>  creating
    const container2 = document.createElement("div");
    container2.className = "containerOfCard";
    container2.id = "accContainer";
    // ===========================  For  Loop starts ==================================== //
    /* creating a loop for card making  */

    for (i = 0; i < obj.length; i++) {
      //condition = this container only containes non-accessory products
      if (obj[i].isAccessory === false) {
        //container1 => card
        const card = document.createElement("div");
        card.className = "cards";
        card.id = obj[i].id;
        card.setAttribute("onclick", 'changes("' + obj[i].id + '")');
        //container1 => card  => img
        const productImage = document.createElement("img");
        productImage.className = "productImage";
        productImage.src = obj[i].preview;

        //container1 => card => description
        const cardContent = document.createElement("div");
        cardContent.className = "cardContent";

        //container1 => card => description => heading3
        const heading3 = document.createElement("h3");
        heading3.tagName = "h3";
        heading3.className = "heading3";
        heading3.innerHTML = obj[i].name;

        //container1 => card => description => heading4
        const heading4 = document.createElement("h4");
        heading4.tagName = "h4";
        heading4.className = "heading4";
        heading4.innerHTML = obj[i].brand;

        //container1 => card => description => heading5
        const heading5 = document.createElement("h5");
        heading5.tagName = "h5";
        heading5.className = "heading5";
        heading5.innerHTML = "Rs  " + obj[i].price;

        // appending clilds
        cardContent.append(heading3, heading4, heading5);
        card.append(productImage, cardContent);
        container1.append(card);
        homePageSection.append(container1);
      }
    }

    homePageSection.appendChild(accHeader);

    for (i = 0; i < obj.length; i++) {
      //condition = this container only containes the accessory products
      if (obj[i].isAccessory === true) {
        //container2 => card
        const card = document.createElement("div");
        card.className = "cards";
        card.id = obj[i].id;

        card.setAttribute("onclick", 'changes("' + obj[i].id + '")');

        //container2 => card  => img
        const productImage = document.createElement("img");
        productImage.className = "productImage";
        productImage.src = obj[i].preview;

        //container2 => card => description
        const cardContent = document.createElement("div");
        cardContent.className = "cardContent";

        //container2 => card => description => heading3

        const heading3 = document.createElement("h3");
        heading3.tagName = "h3";
        heading3.className = "heading3";
        heading3.innerHTML = obj[i].name;

        //container2 => card => description => heading4
        const heading4 = document.createElement("h4");
        heading4.tagName = "h4";
        heading4.className = "heading4";
        heading4.innerHTML = obj[i].brand;

        //container2 => card => description => heading5
        const heading5 = document.createElement("h5");
        heading5.tagName = "h5";
        heading5.className = "heading5";
        heading5.innerHTML = "Rs  " + obj[i].price;

        // appending clilds
        cardContent.append(heading3, heading4, heading5);
        card.append(productImage, cardContent);
        container2.append(card);
        homePageSection.append(container2);
      }
    }

    // =============================== For Loop ends to create cards ================================== /
  });

// redirect to product preview function
let changes = function (e) {
  let hide = document.getElementById("home-page-section");
  let p = document.getElementById("product-preview-page-section");
  let hide1 = document.getElementById("order-placed-section");
  hide1.style.display = "none";
  hide.style.display = "none";
  let a = document.getElementById(e);

  console.log("img is focoused", e);
  // getting data
  fetch("https://5d76bf96515d1a0014085cf9.mockapi.io/product")
    .then(function (res) {
      const productData = res.json();
      console.log(productData);
      return productData;
    })
    .then((productData) => {
      const section = document.getElementById("product-preview-page-section");
      const banner = document.createElement("div");
      banner.className = "banner";

      const preview = document.createElement("div");
      preview.className = "preview";

      const previewImage = document.createElement("img");
      previewImage.className = "previewImage";

      const details = document.createElement("div");
      details.className = "details";

      const productName = document.createElement("h1");
      productName.className = "productName";

      const brandName = document.createElement("h3");
      brandName.className = "brandName";

      const price = document.createElement("h3");
      price.className = "price";

      const amount = document.createElement("span");
      amount.className = "amount";

      const descriptionHeader = document.createElement("h3");
      descriptionHeader.className = "descriptionHeader";

      const description = document.createElement("p");
      description.className = "description";

      const previewHeader = document.createElement("h3");
      previewHeader.className = "previewHeader";

      const productImages = document.createElement("div");
      productImages.id = "productImages";

      const addToCart = document.createElement("button");
      addToCart.id = "addToCart";
      addToCart.innerHTML = "Add to Cart";
      addToCart.setAttribute("onclick", "addItem(" + (e - 1) + ")");

      //  appending child elements into body

      section.append(banner);
      banner.append(preview, details);
      preview.append(previewImage);
      details.append(
        productName,
        brandName,
        price,
        descriptionHeader,
        description,
        previewHeader,
        productImages,
        addToCart
      );

      // loading the data to the elements
      previewImage.src = productData[e - 1].preview;
      productName.innerHTML = productData[e - 1].name;
      brandName.innerHTML = productData[e - 1].brand;
      price.innerHTML = "Price: Rs ";
      price.append(amount);
      amount.innerHTML = productData[e - 1].price;
      descriptionHeader.innerHTML = "Description";
      description.innerHTML = productData[e - 1].description;
      previewHeader.innerHTML = "Product Preview";

      //to add images of products as per array
      for (let i = 0; i < productData[e - 1].photos.length; i++) {
        let image = document.createElement("img");
        image.className = "listImages";
        image.id = "i" + i;
        image.setAttribute("onclick", 'changesImage("i' + i + '")');
        image.src = productData[e - 1].photos[i];
        productImages.append(image);
      }

      //preview change image function
    });
};

// other functions

function showHomePage() {
  let a = document.getElementById("home-page-section");
  a.style.display = "block";
  let b = document.getElementById("product-preview-page-section");
  b.innerHTML = ``;
  let c = document.getElementById("cart-section");
  c.style.display = "none";
  let d = document.getElementById("order-placed-section");
  d.style.display = "none";
}

function showOrderPlaced() {
  let f = document.getElementById("finalAmount");
  if (f.innerHTML != "0") {
    let a = document.getElementById("order-placed-section");
    a.style.display = "block";
    let z = document.getElementById("home-page-section");
    z.style.display = "none";
    let b = document.getElementById("product-preview-page-section");
    b.innerHTML = ``;
    let c = document.getElementById("cart-section");
    c.style.display = "none";
    let f = document.getElementById("finalAmount");
    f.innerHTML = "0";
    let cc = document.getElementById("cart-count");
    cc.innerHTML = "0";
    let ccc = document.getElementById("itemIncartcount");
    ccc.innerHTML = "0";
  } else {
  }
}
function showCart() {
  let a = document.getElementById("home-page-section");
  a.style.display = "none";
  let b = document.getElementById("product-preview-page-section");
  b.innerHTML = ``;
  let c = document.getElementById("cart-section");
  c.style.display = "block";
  let d = document.getElementById("order-placed-section");
  d.style.display = "none";
}

// adding products to cart
var count = 1;
var finalAmount = 0;
function addItem(e) {
  let final = document.getElementById("finalAmount");

  fetch("https://5d76bf96515d1a0014085cf9.mockapi.io/product")
    .then(function (res) {
      const productData = res.json();
      console.log(productData);
      return productData;
    })
    .then((productData) => {
      finalAmount += productData[e].price;
      final.innerHTML = finalAmount;
      productsInCartFunction();

      let cartCounting = document.getElementById("cart-count");
      cartCounting.innerHTML = count++;
      // console.log(cartCounting,count)
      // cartCounting.innerHTML = count++;
      itemIncartcount.innerHTML = cartCounting.innerHTML;
    });
}

// preview image change onclick function
let changesImage = (e) => {
  let a = document.getElementById(e);
  // console.log(a)
  let previewImage = document.querySelector(".previewImage");
  console.log(previewImage);
  previewImage.src = a.src;
  var arr = ["i0", "i1", "i2", "i3", "i4"];
  for (value of arr) {
    document.getElementById(value).style.border = "none";
  }
  document.getElementById(e).style.border = "2px solid #009688";
  console.clear();

  // function addItem()
};

// cart making

const cart = document.getElementById("cart-section");

// created an array for array of selected items
function getItem() {
  let item = document.getElementById("productsInCart");
}

function productsInCartFunction() {
  // let productsInCart = document.querySelectorAll(".productsInCart");
  // console.log(productsInCart);

  // let productWrapper = document.createElement("div");
  // let cartProductImage = document.createElement("img");
  // let itemIncartcount = document.getElementById("itemIncartcount");

  // let info = document.createElement("div");
  // let cartProductName = document.createElement("h4");
  // let cartProductCount = document.createElement("h5");
  // let cartProductCountNum = document.createElement("span");
  // cartProductCount.append(cartProductCountNum);
  // let cartProductAmount = document.createElement("h3");
  // info.append(cartProductName, cartProductCount, cartProductAmount);
  // productsInCart.append(cartProductImage, info);
}
