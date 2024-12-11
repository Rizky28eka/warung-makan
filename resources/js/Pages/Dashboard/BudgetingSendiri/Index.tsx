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
} from "@/Components/ui/table";
import { Button } from '@/Components/ui/button';
import { Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import axios from 'axios';

const menus = [
    { id: 1, name: "Ayam Goreng", harga: 10000, image: "/images/ayam-goreng.png" },
    { id: 2, name: "Ayam Geprek", harga: 12000, image: "/images/ayam-geprek.png" },
    { id: 3, name: "Tempe", harga: 2000, image: "/images/tempe.png" },
    { id: 4, name: "Tahu", harga: 2000, image: "/images/tahu.png" },
    { id: 5, name: "Lele Goreng", harga: 9000, image: "/images/lele-goreng.png" },
    { id: 6, name: "Nasi Putih", harga: 3000, image: "/images/nasi-putih.png" },
    { id: 7, name: "Telur Goreng", harga: 9000, image: "/images/telur-goreng.png" },
];

export default function BudgetingDashboard({ budgetings }: any) {

    // Fungsi untuk menghitung total harga untuk setiap budgeting
    const calculateTotalPrice = (orders: any[]) => {
        return orders.reduce((total, order) => {
            // Temukan harga menu berdasarkan food_id
            const menu = menus.find(menu => menu.id === order.food_id);
            if (menu) {
                return total + (menu.harga * order.qty);  // Kalikan harga dengan qty
            }
            return total;
        }, 0);
    };

    function deleteCatering(id: any) {
        axios.delete(`/dashboard/budgeting-sendiri/${id}`)
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

    console.log(budgetings);

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Budgeting Sendiri
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
                                    Budgeting Sendiri
                                </h1>
                                <div className='flex gap-4'>
                                    {/* <Button className='bg-blue-500 hover:bg-blue-400' asChild>
                                        <Link href='/dashboard/budgeting/create'>
                                            Tambah Data
                                        </Link>
                                    </Button> */}
                                </div>
                            </div>
                            <Table>
                                {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Total</TableHead>
                                        <TableHead>Menu</TableHead>
                                        <TableHead>Tanggal Mulai</TableHead>
                                        <TableHead>Alamat</TableHead>
                                        <TableHead>No. Whatsapp</TableHead>
                                        <TableHead>Catatan</TableHead>
                                        <TableHead className='text-center'>Aksi</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {budgetings.map((data: any, index: number) => {
                                        // Hitung total harga untuk setiap budgetings
                                        const totalHarga = calculateTotalPrice(data.orders);
                                        return (
                                            <TableRow key={index}>
                                                <TableCell className="font-medium">
                                                    {data.orders
                                                        .filter((order: any) => menus.some((menu: any) => menu.id === order.food_id)) // Filter berdasarkan food_id yang ada di menus
                                                        .map((order: any) => {
                                                            const menu = menus.find((menu: any) => menu.id === order.food_id); // Temukan menu berdasarkan food_id
                                                            return menu ? <div key={menu.id}>{menu.name} x {order.qty}</div> : ''; // Kembalikan nama menu dalam elemen div
                                                        })}
                                                </TableCell>
                                                <TableCell className="font-medium">Rp. {totalHarga}</TableCell>
                                                <TableCell>{format(new Date(data.tanggalMulai), 'dd MMM yyyy')}</TableCell>
                                                <TableCell>{data.alamat}</TableCell>
                                                <TableCell>{data.numberPhone}</TableCell>
                                                <TableCell>{data.catatan || '-'}</TableCell>
                                                <TableCell className="flex items-center gap-4 justify-end">
                                                    <Button size="icon" className="bg-red-500 hover:bg-red-400" onClick={() => deleteCatering(data.id)}>
                                                        <Trash2 />
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
