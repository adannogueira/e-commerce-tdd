import { VueWrapper, mount } from '@vue/test-utils'
import AppVue from '../src/App.vue'
import { CheckoutGatewayHttp } from '../src/infra/gateway/CheckoutGatewayHttp'
import { AxiosAdapter } from '../src/infra/http/AxiosAdapter';

function sleep (time: number) {
  return new Promise((resolve) => setTimeout(() => resolve(true), time))
}

let wrapper: VueWrapper;

describe('App', () => {
  beforeEach(() => {
    const httpClient = new AxiosAdapter();
    const baseUrl = 'http://localhost:3000';
    const checkoutGateway = new CheckoutGatewayHttp(httpClient, baseUrl)
    wrapper = mount(AppVue, {
      global: { provide: { checkoutGateway }}
    })
  })
  it('should show the title in frontend', () => {
    expect(wrapper.get('.title').text()).toBe('Checkout')
  })

  it('should list products', async () => {
    await sleep(100)
    expect(wrapper.findAll('.product-description').at(0)?.text()).toBe('A')
    expect(wrapper.findAll('.product-price').at(0)?.text()).toBe('R$ 1.000,00')
    expect(wrapper.findAll('.product-description').at(1)?.text()).toBe('B')
    expect(wrapper.findAll('.product-price').at(1)?.text()).toBe('R$ 5.000,00')
    expect(wrapper.findAll('.product-description').at(2)?.text()).toBe('C')
    expect(wrapper.findAll('.product-price').at(2)?.text()).toBe('R$ 30,00')
  })

  it('should update total value when a product is added to cart', async () => {
    await wrapper.findAll('.product-add-button').at(0)?.trigger('click')
    await wrapper.findAll('.product-add-button').at(1)?.trigger('click')
    await wrapper.findAll('.product-add-button').at(2)?.trigger('click')
    await wrapper.findAll('.product-add-button').at(2)?.trigger('click')
    await wrapper.findAll('.product-add-button').at(2)?.trigger('click')
    
    expect(wrapper.get('.total').text()).toBe('R$ 6.090,00')
  })
  
  it('should show description for products in cart', async () => {
    await wrapper.findAll('.product-add-button').at(0)?.trigger('click')
    await wrapper.findAll('.product-add-button').at(1)?.trigger('click')
    await wrapper.findAll('.product-add-button').at(2)?.trigger('click')

    expect(wrapper.findAll('.item-description').at(0)?.text()).toBe('A')
    expect(wrapper.findAll('.item-description').at(1)?.text()).toBe('B')
    expect(wrapper.findAll('.item-description').at(2)?.text()).toBe('C')
  })

  it('should show correct quantity for products in cart', async () => {
    await wrapper.findAll('.product-add-button').at(0)?.trigger('click')
    await wrapper.findAll('.product-add-button').at(1)?.trigger('click')
    await wrapper.findAll('.product-add-button').at(2)?.trigger('click')
    await wrapper.findAll('.product-add-button').at(2)?.trigger('click')
    await wrapper.findAll('.product-add-button').at(2)?.trigger('click')

    expect(wrapper.findAll('.item-quantity').at(0)?.text()).toBe('1')
    expect(wrapper.findAll('.item-quantity').at(1)?.text()).toBe('1')
    expect(wrapper.findAll('.item-quantity').at(2)?.text()).toBe('3')
  })

  it('should decrement a product quantity in the cart', async () => {
    await wrapper.findAll('.product-add-button').at(0)?.trigger('click')
    await wrapper.findAll('.product-add-button').at(1)?.trigger('click')
    await wrapper.findAll('.product-add-button').at(2)?.trigger('click')
    await wrapper.findAll('.product-add-button').at(2)?.trigger('click')
    await wrapper.findAll('.item-delete-button').at(2)?.trigger('click')

    expect(wrapper.findAll('.item-quantity').at(0)?.text()).toBe('1')
    expect(wrapper.findAll('.item-quantity').at(1)?.text()).toBe('1')
    expect(wrapper.findAll('.item-quantity').at(2)?.text()).toBe('1')
    expect(wrapper.get('.total').text()).toBe('R$ 6.030,00')
  })

  it('should increment a product quantity in the cart', async () => {
    await wrapper.findAll('.product-add-button').at(0)?.trigger('click')
    await wrapper.findAll('.item-add-button').at(0)?.trigger('click')
    await wrapper.findAll('.item-add-button').at(0)?.trigger('click')

    expect(wrapper.findAll('.item-quantity').at(0)?.text()).toBe('3')
    expect(wrapper.get('.total').text()).toBe('R$ 3.000,00')
  })

  it('should not decrement a product quantity to a negative number', async () => {
    await wrapper.findAll('.product-add-button').at(2)?.trigger('click')
    await wrapper.findAll('.item-delete-button').at(2)?.trigger('click')
    await wrapper.findAll('.item-delete-button').at(2)?.trigger('click')

    expect(wrapper.findAll('.item-quantity').at(2)).toBeFalsy()
  })

  it('should confirm an order with an item', async () => {
    await wrapper.findAll('.product-add-button').at(0)?.trigger('click')
    await wrapper.get('.confirm').trigger('click')
    await sleep(100)
    expect(wrapper.get('.message').text()).toBe('Success')
    expect(wrapper.get('.order-code').text()).toBe('202300000001')
    expect(wrapper.get('.order-total').text()).toBe('1010')
  })
})