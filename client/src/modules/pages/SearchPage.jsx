import { useState } from 'react';
import UserSearchComponent from '../components/UserSearchComponent'
import axios from 'axios';
import { loadingtoastOptions, successtoastOptions } from '../../utils/toastOptions';
import toast from 'react-hot-toast';
import Loading from '../components/Loading';


const SearchPage = () => {

    const [searchTerm, setSearchTerm] = useState('');
    const [users, setUsers] = useState(null)

    const [loading, setLoading] = useState(false)

    async function handleSearch() {
        try {
            setLoading(true)
            const loading = toast.loading('Please wait...', loadingtoastOptions);
            await axios.post(`${process.env.REACT_APP_BASE_URL}/api/users/getusers`, { pattern: searchTerm }).then((res) => {
                if (res?.data?.success === true) {
                    setUsers(res?.data?.users)
                    toast.success('Users fetched', successtoastOptions);
                    toast.dismiss(loading)
                    setLoading(false)
                } else {
                    toast.error('Searching failed', successtoastOptions);
                    toast.dismiss(loading)
                }
            }).catch((error) => {
                toast.error(' Searching failed', successtoastOptions);
                toast.dismiss(loading)
            })
        } catch (error) {
            toast.error(' Searching failed', successtoastOptions);
            toast.dismiss(loading)
        }
    }


    return (
        <>
            {
                loading === true ?
                    <Loading />
                    :
                    <div className='md:w-[50%] w-full m-auto'>

                        <div >
                            <label htmlFor="search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                    </svg>
                                </div>
                                <input type="search" id="search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50" placeholder="Search" required value={searchTerm} onChange={(e) => {
                                    setSearchTerm(e.target.value)
                                }} />
                                <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-4 py-2" onClick={() => {
                                    handleSearch()
                                }}>Search</button>
                            </div>
                        </div>
                        {
                            users?.map((ele, index) => {
                                return <UserSearchComponent key={index} name={ele?.name} email={ele?.email} imglink={ele?.compressed_full_pic} user_id={ele?.user_id} />
                            })
                        }

                    </div>
            }

        </>
    )
}

export default SearchPage
