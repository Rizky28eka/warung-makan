"use client";

import { PageProps } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/Components/ui/button';
import GuestLayout from '@/Layouts/GuestLayout';
import { Card, CardContent } from "@/Components/ui/card";
import React, { useState, useEffect } from 'react';
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/Components/ui/form";
import { Input } from "@/Components/ui/input";
import { Textarea } from '@/Components/ui/textarea';
import Checkbox from '@/Components/Checkbox';
import { Popover, PopoverContent, PopoverTrigger } from '@/Components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { Calendar } from '@/Components/ui/calendar';
import { cn } from '@/lib/utils';
import axios from 'axios';

// Daftar menu dengan ID untuk setiap item
const menus = [
    { id: 1, name: "Ayam Goreng", harga: 10000, image: "/images/ayam-goreng.png" },
    { id: 2, name: "Ayam Geprek", harga: 12000, image: "/images/ayam-geprek.png" },
    { id: 3, name: "Tempe", harga: 2000, image: "/images/tempe.png" },
    { id: 4, name: "Tahu", harga: 2000, image: "/images/tahu.png" },
    { id: 5, name: "Lele Goreng", harga: 9000, image: "/images/lele-goreng.png" },
    { id: 6, name: "Nasi Putih", harga: 3000, image: "/images/nasi-putih.png" },
    { id: 7, name: "Telur Goreng", harga: 9000, image: "/images/telur-goreng.png" },
];

const formSchema = z.object({
    alamat: z.string().min(2).max(50),
    numberPhone: z.string().min(2).max(50),
    tanggalMulai: z.date({ required_error: "Tanggal mulai diperlukan." }),
    catatan: z.string().optional(),
});

export default function BudgetingSendiriPage({ auth, laravelVersion, phpVersion }: PageProps<{ laravelVersion: string; phpVersion: string }>) {
    const [data, setData] = useState<any>({
        alamat: '',
        numberPhone: '',
        tanggalMulai: new Date(),
        catatan: '',
        orders: [],
    });

    const [totalPrice, setTotalPrice] = useState<number>(0);

    useEffect(() => {
        const newTotalPrice = data.orders.reduce((total, menu) => total + (menu.harga * menu.quantity), 0);
        setTotalPrice(newTotalPrice);
    }, [data.orders]);

    const handleMenuChange = (menu: any, increment: boolean) => {
        setData((prevData) => {
            const updatedMenus = [...prevData.orders];
            const existingMenu = updatedMenus.find(item => item.id === menu.id);

            if (existingMenu) {
                if (increment) {
                    existingMenu.quantity += 1;
                } else {
                    if (existingMenu.quantity > 0) {
                        existingMenu.quantity -= 1;
                    }
                }
            } else if (increment) {
                updatedMenus.push({ ...menu, quantity: 1 });
            }

            return { ...prevData, orders: updatedMenus };
        });
    };

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: data,
    });

    const onSubmit = (values: any) => {

        const formattedDate = new Date(values.tanggalMulai).toISOString().split('T')[0];
        values.tanggalMulai = formattedDate;

        const payload = {
            ...values,
            orders: data.orders.map((menu: any) => ({
                food_id: menu.id,     // Mengganti id dengan food_id
                qty: menu.quantity    // Mengganti quantity dengan qty
            }))
        };
        axios
            .post('/dashboard/budgeting-sendiri', payload)
            .then((response) => {
                console.log('Data berhasil dikirim:', response.data);
                window.location.href = '/budgeting-sendiri';
            })
            .catch((error) => {
                console.error('Error saat mengirim data:', error);
            });
    }

    console.log(data);


    return (
        <GuestLayout>
            <Head title="Catering Harian" />
            <div className='grid grid-cols-2 gap-8 w-full px-20'>
                <div>
                    <h1 className='text-5xl font-extrabold'>
                        Mulai <span className='text-[#159b9e]'>Budgeting</span>
                    </h1>
                    <p className='text-lg mb-4'>
                        Sesuaikan dengan anggaran yang kamu suka
                    </p>
                    <div>
                        <h4 className='text-lg font-bold mb-2'>
                            Pilih menu yang kamu mau disini ya
                        </h4>
                        <div className='grid grid-cols-2 gap-4'>
                            {menus.map((menu) => (
                                <div key={menu.id} className='border rounded-xl border-[#159b9e] p-2'>
                                    <div className='flex items-center justify-between gap-4'>
                                        <div className='w-full'>
                                            <h6 className='text-[#f46146] font-bold'>{menu.name}</h6>
                                            <p className='text-[#159b9e] text-sm'>Rp. {menu.harga}</p>
                                            <div className="mt-4 flex items-center justify-between">
                                                <button
                                                    onClick={() => handleMenuChange(menu, false)}
                                                    className="h-8 w-8 flex items-center justify-center rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300"
                                                >
                                                    -
                                                </button>
                                                <span className="text-lg font-medium">
                                                    {data.orders.find(item => item.id === menu.id)?.quantity || 0}
                                                </span>
                                                <button
                                                    onClick={() => handleMenuChange(menu, true)}
                                                    className="h-8 w-8 flex items-center justify-center rounded-full bg-teal-500 text-white hover:bg-teal-600"
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>
                                        <img src={menu.image} alt={menu.name} className='object-cover object-center w-[100px] h-[100px] rounded-xl' />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div>
                    <div className='bg-[#d9d9d9] rounded-xl grid grid-cols-2 w-full h-full'>
                        <div className='p-4'>
                            <h4 className='font-bold mb-1'>
                                Isi Data Kamu disini
                            </h4>
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

                                    <FormField
                                        control={form.control}
                                        name="tanggalMulai"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-col">
                                                <FormLabel>Tanggal Mulai</FormLabel>
                                                <Popover>
                                                    <PopoverTrigger asChild>
                                                        <FormControl>
                                                            <Button
                                                                variant={"outline"}
                                                                className={cn(
                                                                    " pl-3 text-left font-normal",
                                                                    !field.value && "text-muted-foreground"
                                                                )}
                                                                onClick={() => {
                                                                    setData(prevData => ({
                                                                        ...prevData,
                                                                        tanggalMulai: field.value,
                                                                    }));
                                                                }}
                                                            >
                                                                {field.value ? (
                                                                    format(field.value, "PPP")
                                                                ) : (
                                                                    <span>3/12/2023</span>
                                                                )}
                                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                            </Button>
                                                        </FormControl>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-auto p-0" align="start">
                                                        <Calendar
                                                            mode="single"
                                                            selected={field.value}
                                                            onSelect={(date) => {
                                                                field.onChange(date);
                                                                setData(prevData => ({
                                                                    ...prevData,
                                                                    tanggalMulai: date,
                                                                }));
                                                            }}
                                                            initialFocus
                                                        />
                                                    </PopoverContent>
                                                </Popover>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField control={form.control} name="alamat" render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Alamat</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Suyanti"
                                                    {...field}
                                                    onChange={(e) => {
                                                        field.onChange(e);
                                                        setData((prevData) => ({
                                                            ...prevData,
                                                            alamat: e.target.value
                                                        }));
                                                    }}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />

                                    <FormField control={form.control} name="numberPhone" render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>No Whatsapp</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="0858 sisahnya kapan kapans"
                                                    {...field}
                                                    onChange={(e) => {
                                                        field.onChange(e);
                                                        setData((prevData) => ({
                                                            ...prevData,
                                                            numberPhone: e.target.value
                                                        }));
                                                    }}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />

                                    <FormField control={form.control} name="catatan" render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Catatan</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder="Jangan baper ya dek ya"
                                                    className="resize-none"
                                                    {...field}
                                                    onChange={(e) => {
                                                        field.onChange(e);
                                                        setData((prevData) => ({
                                                            ...prevData,
                                                            catatan: e.target.value
                                                        }));
                                                    }}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />
                                </form>
                            </Form>
                        </div>
                        <div className='bg-[#b3b3b3] rounded-xl p-4'>
                            <h4 className='mb-1'>Ringkasan Pesanan</h4>
                            <div className='overflow-y-auto h-[200px] bg-[#90908f] p-2 text-white mb-4'>
                                {data.orders.map((menu) => (
                                    menu.quantity > 0 && (
                                        <div key={menu.id}>
                                            <h5>{menu.name} x {menu.quantity}</h5>
                                        </div>
                                    )
                                ))}
                            </div>
                            <div className='flex justify-between items-center border-b-2 border-black mb-2'>
                                <h4 className='text-xl'>Total</h4>
                                <h4 className='text-xl font-bold'>Rp. {totalPrice}</h4>
                            </div>
                            <Button onClick={() => form.handleSubmit(onSubmit)()} size='lg' className='rounded-full bg-[#14a637] hover:bg-[#14a636d4] text-white'>
                                Kirim
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
