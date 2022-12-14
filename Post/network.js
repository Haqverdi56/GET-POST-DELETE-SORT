

const BASE_URL = 'https://northwind.vercel.app/api';

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 1000
});

const network = {
    getAll: async (url) => {

        let responseData = [];
        await axiosInstance.get(`${url}`)
            .then(res => {
                responseData = res.data;
            })
            .catch(err => {
                console.log('Error', err);
                throw err
            })

        return responseData;
    },
    add: async (url, data) => {

        let response = {};

        await axiosInstance.post(`${url}`, data)
            .then(res => {
                response = res.data;
            });

        return response;

    },
    delete: async (url, id) => {

        let response = {};
        await axiosInstance.delete(`${url}/${id}`)
            .then(res => {
                response = res.data;
            })
        return response;
    }
}


