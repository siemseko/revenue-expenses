"use client"
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import AlertDialogSlide from '../components/AlertDialogSlide';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { FaRegEdit } from 'react-icons/fa';

interface User {
  id: number;
  name: string;
  price: string;
  image: string;
}

const UserList: React.FC = () => {
  const [data, setData] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/products`);

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setData(data); // Adjust this line if your API response structure is different
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <div className='flex justify-end m-5 pt-5'>
        <AlertDialogSlide />
      </div>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase  dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                លេខរាង
              </th>
              <th scope="col" className="px-6 py-3">
                ឈ្មោះទំនិញ
              </th>
              <th scope="col" className="px-6 py-3">
                តម្លៃ
              </th>
              <th scope="col" className="px-6 py-3">
                រូបភាព
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map(datas => (
              <tr key={datas.id} className=" border-b hover:bg-[#00000038] cursor-pointer">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                  {datas.id}
                </th>
                <td className="px-6 py-4">
                  {datas.name}
                </td>
                <td className="px-6 py-4">
                  {datas.price}
                </td>
                <td className="px-6 py-4">
                  <img src={`${process.env.NEXT_PUBLIC_BASE_API}/uploads/products/${datas.image}`} width={"100px"} alt="zx" />
                </td>
                <td className="px-6 py-4">
                  <div className='flex gap-5'>
                    <RiDeleteBin6Line color='red' size={15}/>
                    <FaRegEdit />
                  </div>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>


    </div>
  );
};

export default UserList;
