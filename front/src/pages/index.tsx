import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { SubscribeButton } from '../components/SubscribeButton';
import { stripe } from '../services/stripe';

import styles from './home.module.scss';

import { useRouter } from 'next/router'

interface HomeProps {
  product: {
    priceId: string;
    amount: number;
  }
}

export default function Home({ product }: HomeProps) {

  const router = useRouter();

  function redirectCriarPosto() {
    router.push("/cadastrar_posto");
  }

  return (
    <>
      <Head>
        <title>Início | we.blood</title>
      </Head>

      <main>
        <div className={styles.contentContainer}>
          <section className={styles.hero}>
            <span>👏 Olá, Bem vindos</span>
            <h1>Sua doação de <span>sangue</span> pode salvar vidas.</h1>
            <p>
              Você também pode ajudar com doações monetárias <br />
              por <span>{product.amount}</span> mensais!
            </p>
            <SubscribeButton priceId={product.priceId} />
            <h3>Você também pode cadastrar seu posto para receber doações <br />
              <span>basta clicar no botão abaixo</span>
            </h3>
            <button
              className={styles.scheduleButton}
              onClick={redirectCriarPosto}
            >
              Cadastrar posto
            </button>
          </section>
          <img src="/images/avatar.svg" alt="avatar" width="550px" height="550px" />
        </div>
      </main>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const price = await stripe.prices.retrieve('price_1L1LuoCvcPLxVdBAfiUrKSaT')

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price.unit_amount / 100),
  };

  return {
    props: {
      product,
    }
  }
}
