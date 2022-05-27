import { SignInButton } from '../SignInButton';
import styles from './styles.module.scss';

export function Header() {
    return(
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <img src="/images/doandoVidas.png" alt="Logotipo" />
                <nav>
                    <a href="/" className={styles.active}>Home</a>
                    <a href="/locais_disponiveis">Postos para doação</a>
                </nav>
                <SignInButton />
            </div>
        </header>
    );
}