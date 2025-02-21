import React from 'react';
import Button from "../Components/Button.tsx"


const Login: React.FC = () => {
    return (
        <>
            <div> <p>Kullanıcı adınız.</p>
                <input type="text"></input></div>
            <div> <p>Şifreniz</p>
                <input type="text"></input></div>

            <Button type="submit" onClick={() => { }} >
                Log In
            </Button>
        </>


    );
};

export default Login;
