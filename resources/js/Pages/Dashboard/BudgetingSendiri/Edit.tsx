import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/Components/ui/button';
import { Delete, Edit, Trash2 } from 'lucide-react';
import React from 'react';
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
    alamat: z.string()
        .min(2, { message: "Alamat harus memiliki minimal 2 karakter." })
        .max(100, { message: "Alamat tidak boleh lebih dari 50 karakter." }),
    numberPhone: z.string()
        .min(10, { message: "Nomor telepon harus valid." })
        .max(12, { message: "Nomor telepon terlalu panjang." }),
    tanggalMulai: z.date({
        required_error: "Tanggal Mulai harus diisi.",
    }),
    catatan: z.string().optional(), // Catatan bisa kosong
})

export default function CateringHarianEdit({ catering }: any) {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: catering.name,
            alamat: catering.alamat,
            numberPhone: catering.numberPhone,
            tanggalMulai: new Date(catering.tanggalMulai),
            catatan: catering.catatan || "",
        },
    })

    function onSubmit(values: any) {
        // Format tanggal tanpa zona waktu (ISO string format ke YYYY-MM-DD)
        const formattedDate = new Date(values.tanggalMulai).toISOString().split('T')[0];
        // Ubah nilai tanggalMulai menjadi format yang benar
        values.tanggalMulai = formattedDate;

        axios.put(`/dashboard/catering-harian/${catering.id}`, values)
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.error(error.response.data);
            });
        Inertia.visit('/dashboard/catering-harian');
    }
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Tambah Data - Catering Harian
                </h2>
            }
        >
            <Head title="Catering Harian" />

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
                                                            onSelect={field.onChange}
                                                            initialFocus
                                                        />
                                                    </PopoverContent>
                                                </Popover>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="alamat"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Alamat</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Palsu" {...field} />
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
                                                <FormLabel>No Whatsapp</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="0858 sisahnya kapan kapans" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="catatan"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Catatan</FormLabel>
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
                                    <div className='flex gap-2'>
                                        <Button size='lg' className='rounded-full' asChild>
                                            <Link href='/dashboard/catering-harian'>
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
