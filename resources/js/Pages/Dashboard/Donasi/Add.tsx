import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/Components/ui/button';
import { Delete, Edit, Trash2 } from 'lucide-react';
import React, { useState } from 'react';
import Autoplay from 'embla-carousel-autoplay';
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
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
import { Inertia } from '@inertiajs/inertia';  // Import Inertia


const formSchema = z.object({
    name: z.string()
        .min(2, { message: "Nama harus memiliki minimal 2 karakter." })
        .max(100, { message: "Nama tidak boleh lebih dari 50 karakter." }),
    email: z.string()
        .min(2, { message: "Email harus memiliki minimal 2 karakter." })
        .max(100, { message: "Email tidak boleh lebih dari 50 karakter." }),
    alamat: z.string()
        .min(2, { message: "Alamat harus memiliki minimal 2 karakter." })
        .max(100, { message: "Alamat tidak boleh lebih dari 50 karakter." }),
    numberPhone: z.string()
        .min(10, { message: "Nomor telepon harus valid." })
        .max(12, { message: "Nomor telepon terlalu panjang." }),
    komentar: z.string().optional(),
})

export default function DonasiCreate() {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            alamat: "",
            numberPhone: "",
            komentar: "",
        },
    })

    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const objectUrl = URL.createObjectURL(file);
            setImagePreview(objectUrl);
        }
    };

    const convertToFile = async (imageUrl: string, fileName: string) => {
        const res = await fetch(imageUrl);
        const blob = await res.blob();
        return new File([blob], fileName, { type: blob.type });
    };

    const onSubmit = async (values: any) => {
        values.preventDefault();
        const formData = new FormData();

        // Append all form data
        formData.append('name', values.name);
        formData.append('email', values.email);
        formData.append('alamat', values.alamat);
        formData.append('numberPhone', values.numberPhone);
        formData.append('komentar', values.komentar);

        // If there's an imagePreview, convert it to a file and append to FormData
        // if (imagePreview) {
        //     const file = await convertToFile(imagePreview, 'image.jpg'); // 'image.jpg' bisa diganti sesuai kebutuhan
        //     formData.append('photo', file);
        // }

        // Send data to backend with axios
        axios
            .post('/dashboard/donasi', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', // Make sure the correct content type is set
                },
            })
            .then((response) => {
                console.log(response.data);
                Inertia.visit('/dashboard/donasi');
            })
            .catch((error) => {
                console.error(error.response.data);
            });
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Tambah Data - Donasi
                </h2>
            }
        >
            <Head title="Donasi" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
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
                                                    <Input placeholder="Suyanti" type='email' {...field} />
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
                                                    <Input placeholder="Palsu" {...field} />
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
                                                        placeholder="Jangan baper ya dek ya"
                                                        className="resize-none"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    {/* <FormField
                                        control={form.control}
                                        name="photo"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Bukti Foto</FormLabel>
                                                <FormControl>
                                                    <Input type='file' {...field}
                                                        onChange={(e) => {
                                                            field.onChange(e);
                                                            handleImageChange(e); // Menangani perubahan gambar
                                                        }} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    /> */}

                                    {/* <img src={values} alt="Preview" className="max-w-full max-h-80 object-cover" /> */}


                                    <div className='flex gap-2'>
                                        <Button size='lg' className='rounded-full' asChild>
                                            <Link href='/dashboard/donasi'>
                                                Back
                                            </Link>
                                        </Button>
                                        <Button type="submit" size='lg' className='rounded-full bg-[#14a637] hover:bg-[#14a636d4] text-white'>Submit</Button>
                                    </div>
                                </form>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
