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
                        <Text>Your cart is empty</Text>
                    ) : (
                        <Stack spacing="md">

                        </Stack>
                    )}
                </div>
            </Container>
        </ShopLayout>
    )
}


export default CartPage;