'use strict'

const listing =
  (name, price) => ({
    name,
    price
  })

const cart =
  (customer, ...items) => ({
    customer,
    items
  })

const listedPrice =
  listing =>
    name =>
      name === listing.name
        ? listing.price
        : 0

/**
 *  long hand for above
*/
const listedPrice2 =
function (listing) {
  return function (name) {
    if (name === listing.name) {
      return listing.price
    } else {
      return 0
    }
  }
}

/**
 *  long hand for below
*/
const calculateTotals1 =
listings =>
carts => {
  const result = []

  for (let cart of carts) {
    const customerTotal = { customer: cart.customer }
    let total = 0

    for (let item of cart.items) {
      for (let listing of listings) {
        if (listing.name === item) {
          total += listing.price
        }
      }
    }

    customerTotal.total = total
    result.push(customerTotal)
  }
  return result
}

/**
 *  long hand for below using functions
*/
const calculatedTotals2 =
function (listings) {
  return function (carts) {
    const result = []

    for (let cart of carts) {
      const customerTotal = { customer: cart.customer }
      let total = 0

      for (let item of cart.items) {
        for (let listing of listings) {
          if (listing.name === item) {
            total += listing.price
          }
        }
      }

      customerTotal.total = total
      result.push(customerTotal)
    }
    return result
  }
}

/**
 * transform carts into an array of { customer, total }
 */
const calculateTotals =
  listings =>
    carts =>
    carts.map(cart => {
      return {customer: cart.customer, total: [
        cart.items.reduce((total, item) => total + listings
        .reduce((response, name) => response + listedPrice(name)(item), 0), 0)
      ]}
    }
  )

module.exports = {
  listing,
  cart,
  calculateTotals
}
