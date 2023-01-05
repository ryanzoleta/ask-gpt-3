import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { register } from '../common/auth';
import Button from '../components/button';
import Heading from '../components/heading';
import TextInput from '../components/text-input';

type Props = {};

const RegisterPage = (props: Props) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  // const handleRegisterInfoChange = (event: React.FormEvent<HTMLInputElement>) => {
  //   const id = event.currentTarget?.id;
  //   const value = event.currentTarget?.value;

  //   if (id === 'inputName') {
  //     setName(value);
  //   } else if (id === 'inputEmail') {
  //     setEmail(value);
  //   } else if (id === 'inputPassword') {
  //     setPassword(value);
  //   }
  // };

  const handleNameChange = (event: React.FormEvent<HTMLInputElement>) => {
    setName(event.currentTarget?.value);
  };

  const handleEmailChange = (event: React.FormEvent<HTMLInputElement>) => {
    setEmail(event.currentTarget?.value);
  };

  const handlePasswordChange = (event: React.FormEvent<HTMLInputElement>) => {
    setPassword(event.currentTarget?.value);
  };

  const handleRegisterClick = async () => {
    setIsLoading(true);
    register(
      email,
      password,
      name,
      () => {
        router.push('/login');
        setIsLoading(false);
      },
      (error: any) => {
        console.log(error.code);
        console.log(error.message);

        if (error.code === 'auth/email-already-in-use') {
          setError('Email already in use. Try logging in?');
        }
      }
    );
  };

  return (
    <>
      <Head>
        <title>Ask GPT-3 - Register</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="h-screen bg-slate-300">
        <div className="grid md:grid-cols-[1fr_2fr_1fr] lg:grid-cols-3">
          <div></div>
          <div>
            <div className="mt-20 rounded-xl bg-white px-16 py-16 drop-shadow-md">
              <Heading text="Register" />

              <div className="mb-3">
                <TextInput placeholder="Name" value={name} changeHandler={handleNameChange} />
              </div>
              <div className="mb-5">
                <TextInput placeholder="Email" value={email} changeHandler={handleEmailChange} />
              </div>
              <TextInput
                placeholder="Password"
                value={password}
                changeHandler={handlePasswordChange}
                password={true}
              />

              {error ? <p>{error}</p> : null}
              <div className="mt-5 mb-2">
                <Button text="Register" clickHandler={handleRegisterClick} disabled={isLoading} />
              </div>
              <div>
                <Button isLink={true} href="/login" text="Login" />
              </div>
            </div>
          </div>
          <div></div>
        </div>
      </main>
    </>
  );
};

export default RegisterPage;
