import React from 'react';
import Image from 'next/image';

const Header = () => {
  return (
    <header className="flex flex-col justify-center items-center">
      <Image src="/walipay.svg" alt="Loading..." width={80} height={80} />
    </header>
  );
};

export default Header;