import { useState, useCallback } from 'react';
import { get, post, put, del } from '../Services/api';

const useApi = (initialData = []) => {
    const [data, setData] = useState(initialData);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchData = useCallback(async (requestConfig) => {
        setLoading(true);
        setError(null);
        try {
            let response;
            const { method, url, data } = requestConfig;
            switch (method) {
                case 'GET':
                    response = await get(url);
                    break;
                case 'POST':
                    response = await post(url, data);
                    break;
                case 'PUT':
                    response = await put(url, data);
                    break;
                case 'DELETE':
                    response = await del(url);
                    break;
                default:
                    throw new Error('Invalid method');
            }
            setData(response.data);
            return response;
        } catch (err) {
            console.error('Fetch Data Error:', err);
            setError(err);
            return null;
        } finally {
            setLoading(false);
        }
    }, []);

    return { data, loading, error, fetchData };
};

export default useApi;
