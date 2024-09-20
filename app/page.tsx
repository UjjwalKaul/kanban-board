import Image from 'next/image';
import image from './assets/image.png';
import Login from '@/myComponents/Login';

export default function Home() {
  return (
    <div className="w-screen h-screen">
      <div className="flex flex-col md:flex-row items-center justify-center h-full">
        <div className="hidden md:block w-full md:w-1/2 h-full">
          <Image
            src={image}
            alt="HomePage Image"
            className="object-cover h-full w-full"
            priority
          />
        </div>

        <div className="w-full md:w-1/2 flex flex-col items-center">
          <div className="w-full max-w-sm">
            <Login />
          </div>
        </div>
      </div>
    </div>
  );
}
