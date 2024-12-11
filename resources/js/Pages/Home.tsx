import { PageProps } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { NavigationMenuDemo } from '../Components/NavigationMenuDemo';
import { BoxIcon, CircleDollarSign, DollarSign, HandHeart, Utensils } from 'lucide-react';
import { Button } from '@/Components/ui/button';
import GuestLayout from '@/Layouts/GuestLayout';

const menus = [
    {
        name: "Home",
        link: "/"
    },
    {
        name: "Catering Harian",
        link: "/catering-harian"
    },
    {
        name: "Budgeting Sendiri",
        link: "/budgeting-sendiri"
    },
    {
        name: "Donate",
        link: "/donate"
    },
    {
        name: "Happy Food",
        link: "/happy-food"
    },
]

export default function Home({
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

    return (
        <GuestLayout>
            <Head title="Home" />
            <div className='relative w-full h-[500px] flex items-end overflow-hidden'>
                <img src="/images/home.png" alt="hero-image" className='absolute top-0 left-0 -z-10 object-cover object-center w-full h-full' />
                <div className='px-20 py-8 text-white flex flex-col gap-2'>
                    <h1 className=' font-bold text-6xl'>Catering Cedak Kene</h1>
                    <p className='text-2xl'>Gampang-Amanah-Seru.</p>
                </div>
            </div>
            <div className="flex gap-8 justify-center text-center mt-8">
                <a href='/' className='text-[#159b9e] w-[300px] '>
                    <div className='flex justify-center mb-3'>
                        <CircleDollarSign size={60} />
                    </div>
                    <h6 className='font-bold text-xl mb-2'>Budgeting Sendiri</h6>
                    <p>
                        Kamu bisa budgeting
                        kebutuhan makan kamu disini
                    </p>
                </a>
                <a href='/' className='text-[#159b9e] w-[300px]'>
                    <div className='flex justify-center mb-3'>
                        <HandHeart size={60} />
                    </div>
                    <h6 className='font-bold text-xl mb-2'>Donate</h6>
                    <p>
                        kami bisa berdonasi makanan kesesama
                    </p>
                </a>
                <a href='/' className='text-[#f46146] w-[300px]'>
                    <div className='flex justify-center mb-3'>
                        <Utensils size={60} />
                    </div>
                    <h6 className='font-bold text-xl mb-2'>Happy Food</h6>
                    <p>
                        Tetap happy walau tanggal tua
                    </p>
                </a>
            </div>
        </GuestLayout>
    );
}
