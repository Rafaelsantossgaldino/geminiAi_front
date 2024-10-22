import img404Error from '../../assets/svg/img404Error.svg'
import imgDoNotCry from '../../assets/svg/imgDoNotCry.svg'
import styles from './styles.module.css'
import { useNavigate } from 'react-router-dom'
import { useRouteError } from 'react-router-dom'

const PageNotFound = () => {
  const navigate = useNavigate()
  let error = useRouteError()
  console.log('teste errors', error)

  const handleClick = () => {
    navigate(-1)
  }

  return (
    <main className={styles.containerGlobal}>
      <section className={styles.firstColumn}>
        <img src={imgDoNotCry} className={styles.imageNotFound} />
      </section>
      <section className={styles.secondColumn}>
        <h2 className={styles.title01}>Do not Cry!</h2>
        <button className={styles.title02} type="button" onClick={handleClick}>
          Voltar
        </button>
        <p className={styles.description}>
          Esta página não existe ou foi removida!
        </p>
        <img src={img404Error} className={styles.imageError404} />
      </section>
    </main>
  )
}

export default PageNotFound
