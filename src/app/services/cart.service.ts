import { Subject } from 'rxjs';
import { CartItem } from './../common/cart-item';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  CartItems: CartItem[] = [];
  totalPrice: Subject<number> = new Subject<number>();
  totalQuantity: Subject<number> = new Subject<number>();

  constructor() {}

  addToCart(thecartItem: CartItem) {
    let alreadyExist = false;
    let existingCartItem: CartItem | undefined = undefined; // Allow undefined type

    if (this.CartItems.length > 0) {
      existingCartItem = this.CartItems.find(
        (tempCartItem) => tempCartItem.id === thecartItem.id
      );
      alreadyExist = existingCartItem != undefined;
    }

    if (alreadyExist && existingCartItem) {
      // Increment quantity of the existing item
      existingCartItem.quantity++;
    } else {
      // Add the item to the cart
      this.CartItems.push(thecartItem);
    }

    this.computeCartTotals();
  }

  computeCartTotals() {
    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;

    for (let currentItem of this.CartItems) {
      totalPriceValue += currentItem.quantity * currentItem.unitPrice;
      totalQuantityValue += currentItem.quantity;
    }

    // Publish the totals
    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);

    // Log the cart data
    this.logCartData(totalPriceValue, totalQuantityValue);
  }

  logCartData(totalPriceValue: number, totalQuantityValue: number) {
    console.log('Content of the cart');
    for (let cartItem of this.CartItems) {
      const subTotalPrice = cartItem.quantity * cartItem.unitPrice;
      console.log(
        `name: ${cartItem.name}, quantity=${cartItem.quantity}, unitPrice=${cartItem.unitPrice}, subTotalPrice=${subTotalPrice}`
      );
    }
    console.log(
      `Total Price: ${totalPriceValue}, Total Quantity: ${totalQuantityValue}`
    );
  }
  decrementQuantity(theCartItem: CartItem) {
    theCartItem.quantity--;
    if (theCartItem.quantity === 0) {
      this.remove(theCartItem);
    } else {
      this.computeCartTotals();
    }
  }
  remove(theCartItem: CartItem) {
    const itemIndex = this.CartItems.findIndex(
      (tempCartItem) => tempCartItem.id === theCartItem.id
    );
    if (itemIndex > -1) {
      this.CartItems.splice(itemIndex, 1);
      this.computeCartTotals();
    }
  }
}
