"use client"
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import UserList from '../components/UserList';

interface User {
  id: number;
  name: string;
  price: string;
  qty: string;
}

const page: React.FC = () => {
  
  return (
    <div>
      <UserList />
    </div>
  );
};

export default page;
