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
import React, { useState } from 'react';
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
import Checkbox from '@/Components/Checkbox';
import ArticleCard from '@/Components/ArticleCard';

const formSchema = z.object({
    alamat: z.string().min(2).max(50),
    email: z.string().min(2).max(50),
    numberPhone: z.string().min(2).max(50),
    tanggalMulai: z.date({
        required_error: "A date of birth is required.",
    }),
    catatan: z
        .string()
        .min(10, {
            message: "Bio must be at least 10 characters.",
        })
        .max(160, {
            message: "Bio must not be longer than 30 characters.",
        }),
})

export default function BudgetingSendiriPage({
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

    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            alamat: "",
        },
    })

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
    }

    const [quantity, setQuantity] = useState(0);

    const handleIncrement = () => setQuantity(quantity + 1);
    const handleDecrement = () => {
        if (quantity > 0) setQuantity(quantity - 1);
    };

    return (
        <GuestLayout>
            <Head title="Catering Harian" />
            <div className='w-full px-20'>
                <h1 className='text-5xl font-extrabold text-[#f46146] mb-4 text-start'>
                    CDK <span className='text-[#159b9e]'>News</span>
                </h1>
            </div>
            <div className='grid grid-cols-3 gap-8 w-full px-20'>
                <div className='col-span-2'>
                    <div className='flex flex-col gap-3 rounded-xl h-[600px]'>
                        {/* Article 1 */}
                        <ArticleCard
                            button="true"
                            image="/images/news-1.png" // Ganti dengan URL gambar Anda
                            title="Catering Harian: Menyajikan Kenyamanan dan Kualitas"
                            description="Industri catering saat ini semakin berkembang seiring dengan gaya hidup yang semakin sibuk. Catering harian menjadi pilihan yang semakin populer. Kami hadir untuk menyajikan solusi makan praktis dan lezat setiap hari!"
                        />
                    </div>
                </div>
                <div>
                    <div className='flex flex-col gap-3 bg-[#e4e3e4] rounded-xl p-4 h-[600px]'>
                        {/* Article 2 */}
                        <ArticleCard
                            size="sm"
                            image="/images/news-2.png" // Ganti dengan URL gambar Anda
                            title="Tren Catering Sehat dan Bergizi"
                            description="Catering sehat semakin banyak dicari karena lebih banyak orang yang sadar akan pentingnya  ..."
                        />
                        {/* Article 3 */}
                        <ArticleCard
                            size="sm"
                            image="/images/news-3.png" // Ganti dengan URL gambar Anda
                            title="Kemudahan Pemesanan Catering Online"
                            description="Dengan perkembangan teknologi, catering kini lebih mudah diakses secara online. Pilihan menu yang ..."
                        />
                        {/* Article 4 */}
                        <ArticleCard
                            size="sm"
                            image="/images/news-4.png" // Ganti dengan URL gambar Anda
                            title="Catering untuk Acara Spesial"
                            description="Tidak hanya untuk kebutuhan harian, catering juga hadir untuk menyukseskan acara spesial Anda..."
                        />
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
