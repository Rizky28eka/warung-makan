import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table"
import { Button } from '@/Components/ui/button';
import { Delete, Edit, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function CateringHarianDashboard({ caterings }: any) {

    function deleteCatering(id: any) {
        axios.delete(`/dashboard/catering-harian/${id}`)
            .then((response) => {
                console.log(response.data); // Optional: Show the response in console for debugging
                alert('Data deleted successfully!');
                window.location.reload();
            })
            .catch((error) => {
                console.error(error.response.data);
                alert('Failed to delete data.');
            });
    }
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Catering Harian
                </h2>
            }
        >
            <Head title="Catering Harian" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className='flex justify-between items-center mb-6'>
                                <h1 className='text-2xl font-semibold'>
                                    Catering Harian
                                </h1>
                                <div className='flex gap-4'>
                                    <Button className='bg-blue-500 hover:bg-blue-400' asChild>
                                        <Link href='/dashboard/catering-harian/create'>
                                            Tambah Data
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                            <Table>
                                {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Nama</TableHead>
                                        <TableHead>Tanggal Mulai</TableHead>
                                        <TableHead>Alamat</TableHead>
                                        <TableHead>No. Whatsapp</TableHead>
                                        <TableHead>Catatan</TableHead>
                                        <TableHead className='text-center'>Aksi</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {caterings.map((catering: any, index: number) => (
                                        <TableRow key={index}>
                                            <TableCell className="font-medium">{catering.name}</TableCell>
                                            <TableCell>{format(new Date(catering.tanggalMulai), 'dd MMM yyyy')}</TableCell>
                                            <TableCell>{catering.alamat}</TableCell>
                                            <TableCell>{catering.numberPhone}</TableCell>
                                            <TableCell>{catering.catatan || '-'}</TableCell>
                                            <TableCell className="flex items-center gap-4 justify-end">
                                                <Button size="icon" className="bg-yellow-500 hover:bg-yellow-400" asChild>
                                                    <Link href={`/dashboard/catering-harian/${catering.id}/edit`}>
                                                        <Edit />
                                                    </Link>
                                                </Button>
                                                <Button size="icon" className="bg-red-500 hover:bg-red-400" onClick={() => deleteCatering(catering.id)}>
                                                    <Trash2 />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
