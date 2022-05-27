import React, { FormEvent, useState } from 'react';
import apiMongo from "../../services/api-backend";
import Input from '../Input';
import styles from './styles.module.scss';

import { useRouter } from 'next/router'

export interface Postos {
    _id: number;
    cnpj: string;
    avatar: string;
    biografia: string;
    tipo: number;
    name: string;
    orientacao: string;
    whatsapp: string;
    tipo_logradouro: string;
    logradouro: string;
    numero: string;
    complemento: string;
    bairro: string;
    cidade: string;
    dia: string;
};

interface PostosItemProps {
    posto: Postos;
}

const PostoItem: React.FC<PostosItemProps> = ({ posto }) => {

    const [modalIsOpen, setIsOpen] = useState(false);
    const [name, setFullName] = useState('');
    const [id_hospital] = useState(posto._id);
    const [hospital] = useState(posto.name);
    const [rg, setRg] = useState('');
    const [cpf, setCPF] = useState('');

    const router = useRouter();

    function handleSubmitScheduled(e: FormEvent) {
        e.preventDefault();

        apiMongo.post('schedules', {
            hospital,
            id_hospital,
            name,
            rg,
            cpf

        }).then(() => {
            alert('Cadastro realizado com sucesso!');
            router.push("/")
        }).catch(() => {
            alert('Erro no cadastro!');
        })
    }
    return (
        <>
            <details className={styles.collapse}>
                <summary className={styles.title}>{posto.name}</summary>
                <div className={styles.description}>
                    <img className={styles.avatar} src={posto.avatar} alt="" />
                    <p><b>CNPJ:</b> {posto.cnpj}</p>
                    <p><b>Biografia:</b> {posto.biografia}</p>
                    <p><b>Tipo:</b> {posto.tipo}</p>
                    <p><b>Oriantação:</b> {posto.orientacao}</p>
                    <p><b>Endereço:</b> {posto.tipo_logradouro} {posto.logradouro}, {posto.numero}</p>
                    <p><b>Complemento:</b> {posto.complemento}</p>
                    <p><b>Bairro:</b> {posto.bairro}</p>
                    <p><b>Cidade:</b> {posto.cidade}</p>
                    <p><b>WhatsApp:</b> {posto.whatsapp}</p>
                    <hr className={styles.hr} />
                    <div>
                        <h2 className={styles.titleSchedule}>Realize um agendamento</h2>

                        <Input
                            name="hospital"
                            label="Hospital"
                            readOnly
                            value={hospital}
                        />

                        <Input
                            name="name"
                            label="Nome completo"
                            value={name}
                            onChange={(e) => { setFullName(e.target.value) }}
                        />

                        <Input
                            name="rg"
                            label="RG"
                            value={rg}
                            onChange={(e) => { setRg(e.target.value) }}
                        />

                        <Input
                            name="cpf"
                            label="CPF"
                            value={cpf}
                            onChange={(e) => { setCPF(e.target.value) }}
                        />

                    </div>
                    <button
                        className={styles.scheduleButton}
                        onClick={handleSubmitScheduled}
                    >
                        Agendar doação
                    </button>
                </div>
            </details>
        </>
    )
}


export default PostoItem;