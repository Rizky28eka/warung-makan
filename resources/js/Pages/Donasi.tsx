"use client"

import { PageProps } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/Components/ui/button';
import { Card, CardContent } from "@/Components/ui/card"
import GuestLayout from '@/Layouts/GuestLayout';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/Components/ui/carousel"
import React from 'react';
import Autoplay from 'embla-carousel-autoplay';
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/Components/ui/form"
import { Input } from "@/Components/ui/input"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/Components/ui/popover"
import { Calendar } from "@/Components/ui/calendar"
import { CalendarIcon } from "lucide-react"
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { Textarea } from '@/Components/ui/textarea';
import axios from 'axios';
import { Inertia } from '@inertiajs/inertia';


const formSchema = z.object({
    name: z.string()
        .min(2, { message: "Nama harus memiliki minimal 2 karakter." })
        .max(100, { message: "Nama tidak boleh lebih dari 50 karakter." }),
    email: z.string()
        .min(2, { message: "Email harus memiliki minimal 2 karakter." })
        .max(100, { message: "Email tidak boleh lebih dari 50 karakter." }),
    numberPhone: z.string()
        .min(10, { message: "Nomor telepon harus valid." })
        .max(12, { message: "Nomor telepon terlalu panjang." }),
    komentar: z.string().optional(),
})

const menus = [
    {
        name: "Ayam Goreng",
        harga: 10000,
        image: "/images/ayam-goreng.png"
    },
    {
        name: "Ayam Geprek",
        harga: 12000,
        image: "/images/ayam-geprek.png"
    },
    {
        name: "Tempe",
        harga: 2000,
        image: "/images/tempe.png"
    },
    {
        name: "Tahu",
        harga: 2000,
        image: "/images/tahu.png"
    },
    {
        name: "Lele Goreng",
        harga: 9000,
        image: "/images/lele-goreng.png"
    },
    {
        name: "Nasi Putih",
        harga: 3000,
        image: "/images/nasi-putih.png"
    },
    {
        name: "Telur Goreng",
        harga: 9000,
        image: "/images/telur-goreng.png"
    },
];

export default function DonasiPage({
    auth,
    laravelVersion,
    phpVersion,
}: PageProps<{ laravelVersion: string; phpVersion: string }>) {
    const handleImageError = () => {
        document
            .getElementById('screenshot-container')
            ?.classList.add('!hidden');
        document.getElementById('docs-card')?.classList.add('!row-span-1');
        document
            .getElementById('docs-card-content')
            ?.classList.add('!flex-row');
        document.getElementById('background')?.classList.add('!hidden');
    };


    const plugin = React.useRef(
        Autoplay({ delay: 2000, stopOnInteraction: false })
    )
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            numberPhone: "",
            komentar: "",
        },
    })

    const convertToFile = async (imageUrl: string, fileName: string) => {
        const res = await fetch(imageUrl);
        const blob = await res.blob();
        return new File([blob], fileName, { type: blob.type });
    };

    const onSubmit = async (values: any) => {
        axios
            .post('/dashboard/donasi', values)
            .then((response) => {
                console.log(response.data);
                Inertia.visit('/donasi');
            })
            .catch((error) => {
                console.error(error.response.data);
            });
    };

    return (
        <GuestLayout>
            <Head title="Catering Harian" />
            <div className='grid grid-cols-2 rounded-3xl w-full gap-9 px-20'>
                <div>
                    <h1 className='text-5xl font-extrabold'>
                        Mulai <span className='text-[#159b9e]'>Donasi</span>
                    </h1>
                    <p className='text-lg mb-4'>
                        Bantu mereka yang kesulitan adalah kebahagian yang kamu cari.
                    </p>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Nama</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Suyanti" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input placeholder="example@gmail.com" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="numberPhone"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>No. Whatsapp</FormLabel>
                                        <FormControl>
                                            <Input placeholder="0858 sisahnya kapan kapans" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="komentar"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Komentar</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Aku donasi untuk messi"
                                                className="resize-none"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Button type="submit" size='lg' className='rounded-full bg-[#14a637] hover:bg-[#14a636d4] text-white'>Submit</Button>
                        </form>
                    </Form>
                </div>
                <div className='flex justify-center items-center text-center'>
                    <div>
                        <Carousel
                            plugins={[plugin.current]}
                            onMouseEnter={plugin.current.stop}
                            onMouseLeave={plugin.current.reset}
                        >
                            <CarouselContent>
                                {menus.map((menu: any, index) => (
                                    <CarouselItem key={index}>
                                        <div className="p-1 w-full h-full overflow-hidden">
                                            <img src={menu.image} alt={menu.name}
                                                className="w-full h-full object-cover object-center"
                                            />
                                        </div>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                            <CarouselPrevious />
                            <CarouselNext />
                        </Carousel>
                        <div className='bg-[#d9d9d9] rounded-b-lg'>
                            <div className='p-4'>
                                <h4 className='text-xl font-bold mb-1 text-[#159b9e]'>
                                    Terimakasih atas bantuan anda
                                </h4>
                                <p className=''>
                                    Sekarang harapan mereka semakin dekat.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
