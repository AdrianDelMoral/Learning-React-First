/**
 *  hook de react, para añadir cierta funcionalidad a los componentes de react. 
 * O poder ejecutar codigo arbitrario cuando ocurren ciertas cosas en vuestro componente. 
 * O tener algun tipo de funcionalidad de mejorar tanto el rendimiento de tus componentes. 
 * 
 * Son unas utilidades que te permite react para dotar de más funcionalidad a tus componentes
 */
import { useState } from "react" 

/* export function TwitterFollowCard({ userName, name, isFollowing}) { */
export function TwitterFollowCard({ children, userName, initialIsFollowing }) {
  
  /* const state = useState(false)
  const isFollowing = state[0]
  const setIsFollowing = state[1] */
  const [ isFollowing, setIsFollowing ] = useState(initialIsFollowing)
  
  /* 
  mala práctica, modificar la prop: 
  userName = `${userName}`  // ya que evitas que react tenga la seguridad de lo que está renderizando
  
  En todo caso deberias crear una constante con otro nombre
  const userNameProp = `${userName}`
  */
  
  const text = isFollowing ? 'Siguiendo' : 'Seguir'
  const buttonClassName = isFollowing 
    ? 'tw-followCard-button is-following' 
    : 'tw-followCard-button'

  const handleClick = () => {
    setIsFollowing(!isFollowing)
  }

  return(
    <article className='tw-followCard'>
      <header className='tw-followCard-header'>
        <img
          className='tw-followCard-avatar'
          alt={`El avatar de ${userName}`}
          src={`https://unavatar.io/${userName}`} />
        <div className='tw-followCard-info'>
          {/* <strong>{name}</strong> */}
          <strong>{children}</strong>
          <span className='tw-followCard-infoUserName'>@{userName}</span>
        </div>
      </header>

      <aside>
        {/* <button className='tw-followCard-button'> */}
        {/* <button className={buttonClassName}>
          { text }
        </button> */}
        <button className={buttonClassName} onClick={handleClick}>
        <span className='tw-followCard-text'>{ text }</span>
          <span className='tw-followCard-stopFollow'>Dejar de Seguir</span>
        </button>
      </aside>
    </article>
  )
}