"use client"
import React, { useEffect, useState } from 'react';
import AlertDialogSlide from '../components/AlertDialogSlide';
 

interface User {
  id: number;
  title: string;
  description: string;
  video_path: string;
}

const page: React.FC = () => {
  const [data, setData] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/v1/videos');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setData(data.data); // Adjust this line if your API response structure is different
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
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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
               វីដេអូ
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map(datas => (
              <tr key={datas.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {datas.id}
                </th>
                <td className="px-6 py-4">
                  {datas.title}
                </td>
                <td className="px-6 py-4">
                  {datas.description}
                </td>
                <td className="px-6 py-4">
                <video src={`http://localhost:8000/${datas.video_path}`} width={100}></video>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>


    </div>
  );
};

export default page;
