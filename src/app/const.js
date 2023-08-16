export const ITEMS_PER_PAGE = 10;
export const discountedPrice = (item)=>{
    return Math.round(item.price * (1 - item.discountPercentage / 100));
}
export const STATUS = [
{value:'pending',label:'Pending'},
{value:'dispatched',label:'Dispatched'},
{value:'delivered',label:'Delivered'},
{value:'cancelled',label:'Cancelled'}
]