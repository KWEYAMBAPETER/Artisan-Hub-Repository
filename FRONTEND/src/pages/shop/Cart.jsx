import { useState, useEffect } from 'react';
import { Container, Title, Text, Image, Button, Group, Divider, Stack } from '@mantine/core';
import { Link } from 'react-router-dom';
import { IconTrash, IconArrowLeft } from '@tabler/icons-react';
import ShopLayout from '../../layouts/ShopLayout';


function CartPage () {
    const [cart, setCart] = useState([])

    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem("cart")) || [];
        setCart(stored)      
    }, [])

    const getTotal = () => {
        return 100000
    }

    console.log(cart)

    return (
        <ShopLayout>
            <Container size="lg" className="mt-28 pb-16">
                <div className="mb-6">
                    <Link
                        to="/shop"
                        className='inline-flex items-center text-amber-700 hover:text-amber-800 font-medium text-sm'>
                        <IconArrowLeft  size={16} className='mr-1' />
                        Back to Shop
                    </Link>

                    <Title order={2} className='text-amber-800 mb-6'>
                        Your Cart
                    </Title>

                    {cart.length === 0 ? (
                        <Text color="dimmed" className='mt-10'>Your cart is empty</Text>
                    ) : (
                        <Stack spacing="md" className='mt-10'>
                            {cart.map((item) => (
                                <Group key={item.id} align='flex-start' position='apart' wrap='nowrap'>
                                    <Group>
                                        <Image 
                                          src={item.thumbnail}
                                          w={80}
                                          h={80}
                                          radius="md"
                                          fit="contain" />
                                        <div>
                                            <Text fw={600}>{item.title}</Text>
                                            <Text size="sm" color='gray'>
                                                UGX {parseInt(item.price).toLocaleString()}
                                            </Text>
                                        </div>
                                    </Group>
                                    <Button
                                        variant='subtle'
                                        color='red'
                                        onClick={() => removeFromCart(item.id)}
                                        leftSection={<IconTrash size={16}/>}>
                                        Remove
                                    </Button>
                                </Group>
                            ))}

                            <Divider />

                            {/* Total */}
                            <Group position="apart" className='mt-4'>
                                <Text fw={500}>Subtotal:</Text>
                                <Text fw={700} className='text-amber-700'>
                                    UGX {getTotal().toLocaleString()}
                                </Text>
                            </Group>

                            {/* Checkout */}
                            <Button
                                fullWidth
                                size='md'
                                color='#D97706'
                                component={Link}
                                to="/checkout"
                                className='mt-6'>
                                Proceed to Checkout
                            </Button>
                        </Stack>
                    )}
                </div>
            </Container>
        </ShopLayout>
    )
}


export default CartPage;