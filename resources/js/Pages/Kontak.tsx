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
            <div className='flex flex-col justify-center items-center gap-8 w-full px-20 h-[80vh]'>
                <img src="/images/logo.png" alt="Logo" />
                <Button size='lg' className='rounded-full bg-[#14a637] hover:bg-[#14a636d4] text-white' asChild><Link href="/catering-harian/form">Continue to chat</Link></Button>
            </div>
        </GuestLayout>
    );
}
