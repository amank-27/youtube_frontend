import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function Register() {
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function handleRegister(e) {
        e.preventDefault();

        // Validate inputs
        if (!email.includes("@") || !email.includes(".com")) {
            alert("Enter a valid email address.");
            return;
        }

        if (!username || !email || !password) {
            alert("All fields are required.");
            return;
        }

        console.log("Data to be sent:", { username, email, password });

        try {
            const response = await fetch('https://youtube-backend-iukm.onrender.com/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    email,
                    password,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.log("Error Response:", errorData);
                alert(`Registration failed: ${errorData.message || 'Unknown error'}`);
                return;
            }

            const data = await response.json();
            console.log("Server Response:", data);

            if (data.User) {
                localStorage.setItem('userName', data.User.username);
                localStorage.setItem('email', data.User.email); // Save email
                localStorage.setItem('token', data.token);
                alert(data.message);
                if(data.message=="User registered successfully")
                    {
                        setTimeout(()=>{
                        navigate("/login");
                    },1000);
                }
                
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error("Error during registration:", error);
            alert("There was an issue registering. Please try again.");
        }
    }

    return (
        <div className="w-[100%] h-[100vh] flex justify-center items-center">
            <form
                className="border border-white rounded-lg w-[50%] p-[5%] flex flex-col gap-10 justify-center items-center"
                onSubmit={handleRegister}
            >
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                    className="w-[70%] text-xl p-[5px] rounded-lg text-black"
                />
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className="w-[70%] text-xl p-[5px] rounded-lg text-black"
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="w-[70%] text-xl p-[5px] rounded-lg text-black"
                />
                <button
                    type="submit"
                    className="border border-red-600 bg-red-600 font-bold w-[70%] text-xl p-[5px] rounded-lg"
                >
                    Register
                </button>
                <div>
                    Already have an account?{' '}
                    <span
                        className="text-red-600 font-bold cursor-pointer"
                        onClick={() => navigate('/login')}
                    >
                        Login here
                    </span>
                </div>
            </form>
        </div>
    );
}
