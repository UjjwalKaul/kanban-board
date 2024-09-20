import Image from 'next/image';
import image from './assets/image.png';

export default function Home() {
  return (
    <div className="w-screen h-screen">
      <div className="flex flex-col md:flex-row items-center justify-center h-full">
        <div className="hidden md:block w-full md:w-1/2">
          <Image
            src={image}
            alt="HomePage Image"
            className="h-screen object-cover"
            priority
          />
        </div>

        <div className="w-full md:w-1/2 flex justify-center items-center">
          <div className="text-center">SignUp or Login</div>
        </div>
      </div>
    </div>
  );
}
