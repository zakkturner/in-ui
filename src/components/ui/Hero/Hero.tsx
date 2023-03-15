import Image from "next/image";

const Hero = () => {
  return (
    <div className="w-full flex justify-center p-16">
      <Image
        className=""
        src="/assets/images/logoCover.png"
        alt="Interactive Nerd"
        width="450"
        height="50"
      />
    </div>
  );
};

export default Hero;
