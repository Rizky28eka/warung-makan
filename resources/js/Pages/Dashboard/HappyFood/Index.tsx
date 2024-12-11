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

export default function HappyFoodDashboard({ happyFoods }: any) {

    function deleteData(id: any) {
        axios.delete(`/dashboard/happy-food/${id}`)
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
                    Happy Food
                </h2>
            }
        >
            <Head title="Happy Food" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className='flex justify-between items-center mb-6'>
                                <h1 className='text-2xl font-semibold'>
                                    Happy Food
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
                                        <TableHead>Email</TableHead>
                                        <TableHead>No. Whatsapp</TableHead>
                                        <TableHead>Alamat</TableHead>
                                        <TableHead>Catatan</TableHead>
                                        <TableHead className='text-center'>Aksi</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {happyFoods.map((data: any, index: number) => (
                                        <TableRow key={index}>
                                            <TableCell className="font-medium">{data.name}</TableCell>
                                            <TableCell>{data.email}</TableCell>
                                            <TableCell>{data.numberPhone}</TableCell>
                                            <TableCell>{data.alamat}</TableCell>
                                            <TableCell>{data.catatan || '-'}</TableCell>
                                            <TableCell className="flex items-center gap-4 justify-end">
                                                <Button size="icon" className="bg-yellow-500 hover:bg-yellow-400" asChild>
                                                    <Link href={`/dashboard/happy-food/${data.id}/edit`}>
                                                        <Edit />
                                                    </Link>
                                                </Button>
                                                <Button size="icon" className="bg-red-500 hover:bg-red-400" onClick={() => deleteData(data.id)}>
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
