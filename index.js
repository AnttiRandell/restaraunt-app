import { menuArray } from "./data.js"

const paymentModal = document.getElementById('payment-modal')
const yourOrder = document.getElementById('your-order')

document.addEventListener('click', function(e){
    if(e.target.dataset.plus){
       handlePlus(e.target.dataset.plus) 
    }
    else if(e.target.dataset.remove){
        handleRemove(e.target.dataset.remove) 
    }
    else if(e.target.dataset.complete){
        handleComplete(e.target.dataset.complete)
    }
    else if(e.target.id === 'modal-close-btn'){
        handleCloseBtn()
    }
})

let orderBasket = []
let orderQuantity = {}

function handlePlus(orderId){ 
    const chosenItem = menuArray.filter(function(item){
        return item.id == orderId
    })[0]
if(orderBasket.includes(chosenItem)){
    //If order basket already contains the selected item, no need to add to basket just increment the quantity
        orderQuantity[chosenItem.name]+=1
    }else{
     //If order basket does not contain the selected item then set quantity to one and add to basket
        orderQuantity[chosenItem.name]=1
        orderBasket.push(chosenItem)
    }
    renderOrderHtml()
}

function handleRemove(removeId){
    const chosenItem = menuArray.filter(function(item){
        return item.id == removeId
    })[0]
    if(orderQuantity[chosenItem.name]>1){
        //If order basket already contains more than one of the selected item, just decrement the quantity
        orderQuantity[chosenItem.name]-=1
    }else{
        //If order basket only contains one of the selected item, set quantity to zero and remove from the basket
        orderQuantity[chosenItem.name]=0
        
        orderBasket = orderBasket.filter(function(item){
         return item.name !== chosenItem.name
    })
    }
    renderOrderHtml()
}

function handleComplete(){
    paymentModal.style.display = 'inline'
}

function getMenuHtml(){
    
    let menuHtml = ''
    menuArray.forEach(function(menu){
        menuHtml += `
<div class="menu-container">
        <p class="menu-emoji">${menu.emoji}</p>
    <div class="menu-details">
        <p class="menu-name">${menu.name}</p>
        <p class="menu-ingredients">${menu.ingredients}</p>
        <p class="menu-price">${menu.price}€</p>
    </div>
        <i class="fa-solid fa-plus"
        data-plus="${menu.id}"
        ></i>
</div>
        `
    })
    return menuHtml
}

function renderMenuHtml(){
    document.getElementById('menu').innerHTML = getMenuHtml()
}

renderMenuHtml()

function getOrderHtml(){
    
    //document.getElementById('your-order').style.display = 'block'
    
    let orderHtml = ''
    let totalPrice = 0
    let totalPriceHtml = ''
    
     orderHtml+= `
        <div class="your-order" id="your-order">
            <p>Your order</p>
        </div>
        `
    
  orderBasket.forEach(function(item){
        totalPrice+= (orderQuantity[item.name] * item.price)
        orderHtml+=`
        <div class="order">
            <p class="order-name">${item.name} x ${orderQuantity[item.name]}</p><p class="remove-btn item-btn" data-remove="${item.id}">remove</p><p class="item-price">€${orderQuantity[item.name] * item.price}</p>
        </div>
        `
    })
    orderHtml+=`
    <div class="total-price">
    <p class="total-price-text">Total price:</p><p class="total-price-number">€${totalPrice}</p>
    </div>
    <button class="complete-btn" data-complete="complete-btn">Complete order</button>
    `
    return orderHtml
    }
    
    function renderOrderHtml(){
        document.getElementById('order').innerHTML = getOrderHtml()
    }
    
    if(orderQuantity > 0){
        renderOrderHtml()
    }
    
    const paymentForm = document.getElementById('payment-form')
    
    paymentForm.addEventListener('submit', function(e){
    e.preventDefault()
    
    const paymentFormData = new FormData(paymentForm)
    const fullName = paymentFormData.get('fullName')
    
    document.getElementById('order').innerHTML = `
    <div class="thank-you">
    <p>Thanks, ${fullName}! Your order is on its way!
    </div>
    `
    paymentModal.style.display = 'none'
    })
    
    function handleCloseBtn(){
        paymentModal.style.display = 'none'
    }
    