import { useEffect, useState } from "react";

const useToken = email => {
    const [token, setToken] = useState('');
    useEffect(() => {
        if (email) {
            fetch(`${process.env.REACT_APP_SERVER_URL}/jwt?email=${email}`, {
                method: 'POST'
            })
                .then(res => res.json())
                .then(data => {
                    if (data.token) {
                        localStorage.setItem('accessToken', data.token);
                        localStorage.setItem('role', data.role);
                        setToken(data.token);
                    }
                });
        }
    }, [email]);
    return [token];
}

export default useToken;