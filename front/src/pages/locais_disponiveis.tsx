import { useSession, signIn } from 'next-auth/client';
import { useEffect, useState } from 'react';
import { SignInButton } from '../components/SignInButton';

import PostoItem, { Postos } from '../components/LocalItem';

import apiMongo from '../services/api-backend';

import styles from './locais.module.scss';

export default function Locais() {

    const [session] = useSession();
    const [postos, setPostos] = useState([]);

    async function ListLocal() {

        await apiMongo.get('ong/filter/all')
            .then(response => {
                setPostos(response.data)
            })
    }

    useEffect(() => {
        ListLocal();
    }, [])

    return session ? (
        <main>
            {postos.map((posto: Postos) => (
                <PostoItem key={posto._id} posto={posto} />
            ))}
        </main>
    ) : (
        <>
            <div className={styles.containerContent}>
                <section>
                    <h2>Opa! Parece que você não realizou login 😓</h2>
                    <span>Não se preocupe, realize seu login pelo botão abaixo
                        e localize o posto mais perto de você. 😄
                    </span>
                    <div className={styles.buttonLogin}>
                        <SignInButton />
                    </div>
                </section>
            </div>
        </>

    )
}