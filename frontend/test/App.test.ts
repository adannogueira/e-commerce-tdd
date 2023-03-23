import { mount } from '@vue/test-utils'
import AppVue from '../src/App.vue'

describe('App', () => {
  it('should show the title in frontend', () => {
    const wrapper = mount(AppVue, {})

    expect(wrapper.get('.title').text()).toBe('Checkout')
  })

  it('should list products', () => {
    const wrapper = mount(AppVue, {})

    expect(wrapper.findAll('.product-description').at(0)?.text()).toBe('A')
    expect(wrapper.findAll('.product-price').at(0)?.text()).toBe('R$ 1.000,00')
    expect(wrapper.findAll('.product-description').at(1)?.text()).toBe('B')
    expect(wrapper.findAll('.product-price').at(1)?.text()).toBe('R$ 5.000,00')
    expect(wrapper.findAll('.product-description').at(2)?.text()).toBe('C')
    expect(wrapper.findAll('.product-price').at(2)?.text()).toBe('R$ 30,00')
  })

  it('should update total value when a product is added to cart', async () => {
    const wrapper = mount(AppVue, {})
    await wrapper.findAll('.product-add-button').at(0)?.trigger('click')
    await wrapper.findAll('.product-add-button').at(1)?.trigger('click')
    await wrapper.findAll('.product-add-button').at(2)?.trigger('click')
    await wrapper.findAll('.product-add-button').at(2)?.trigger('click')
    await wrapper.findAll('.product-add-button').at(2)?.trigger('click')
    
    expect(wrapper.get('.total').text()).toBe('R$ 6.090,00')
  })
  
  it('should show description for products in cart', async () => {
    const wrapper = mount(AppVue, {})
    await wrapper.findAll('.product-add-button').at(0)?.trigger('click')
    await wrapper.findAll('.product-add-button').at(1)?.trigger('click')
    await wrapper.findAll('.product-add-button').at(2)?.trigger('click')

    expect(wrapper.findAll('.item-description').at(0)?.text()).toBe('A')
    expect(wrapper.findAll('.item-description').at(1)?.text()).toBe('B')
    expect(wrapper.findAll('.item-description').at(2)?.text()).toBe('C')
  })

  it('should show correct quantity for products in cart', async () => {
    const wrapper = mount(AppVue, {})
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
    const wrapper = mount(AppVue, {})
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
    const wrapper = mount(AppVue, {})
    await wrapper.findAll('.product-add-button').at(0)?.trigger('click')
    await wrapper.findAll('.item-add-button').at(0)?.trigger('click')
    await wrapper.findAll('.item-add-button').at(0)?.trigger('click')

    expect(wrapper.findAll('.item-quantity').at(0)?.text()).toBe('3')
    expect(wrapper.get('.total').text()).toBe('R$ 3.000,00')
  })

  it('should not decrement a product quantity to a negative number', async () => {
    const wrapper = mount(AppVue, {})
    await wrapper.findAll('.product-add-button').at(2)?.trigger('click')
    await wrapper.findAll('.item-delete-button').at(2)?.trigger('click')
    await wrapper.findAll('.item-delete-button').at(2)?.trigger('click')

    expect(wrapper.findAll('.item-quantity').at(2)).toBeFalsy()
  })
})