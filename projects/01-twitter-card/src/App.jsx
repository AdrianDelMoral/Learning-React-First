/* import { useState } from 'react' */
import './App.css'
import { TwitterFollowCard } from './TwitterFollowCard.jsx'

export function App () {
  /* botonCambioNombre -> const [name, setName ] = useState('midudev') */
  const users = [
    {
      userName: 'midudev',
      name: 'Miguel Ángel Durán',
      isFollowing: false
    },
    {
      userName: 'shiroi_okami96',
      name: 'Gustavo',
      isFollowing: true
    },
    {
      userName: 'iFullStart',
      name: '4DR1',
      isFollowing: false
    },
    {
      userName: 'ArraysPoler',
      name: 'ArraysPoler',
      isFollowing: true
    }
  ]
  return (
  /* <article className='tw-followCard'>
          <header className='tw-followCard-header'>
              <img
                  className='tw-followCard-avatar'
                  alt="El avatar de adrián"
                  src="https://unavatar.io/iFullStart" />

              <div className='tw-followCard-info'>
                  <strong>Twitter Card</strong>
                  <span className='tw-followCard-infoUserName'>@iFullStart</span>
              </div>
          </header>

          <aside>
              <button className='tw-followCard-button'>Seguir</button>
          </aside>
      </article> */

    <section className='App'>
      {/* Pasarle todas las props juntas(Medio mala práctica, no es lo mejor):
          const midudev = { isFollowing: true, userName: 'midudev' }
          <TwitterFollowCard {...midudev}>
            Miguel Ángel Durán
          </TwitterFollowCard>
      */}

      {/*
        <TwitterFollowCard isFollowing={true} userName="midudev" name="Miguel Ángel Durán" />
        <TwitterFollowCard isFollowing={false} userName="iFullStart" name="4DR1" />
        <TwitterFollowCard isFollowing userName="shiroi_okami96" name="Gustavo" />
        <TwitterFollowCard isFollowing={false} userName="Arrayspoler" name="ArraysPoler" />
      */}

      {/* <TwitterFollowCard userName={name}> */}
      {/* <TwitterFollowCard userName="midudev" initialIsFollowing={true}>
        Miguel Ángel Durán
      </TwitterFollowCard>

      <TwitterFollowCard userName="iFullStart">
        4DR1
      </TwitterFollowCard> */}

      {/* botonCambioNombre:
        <button onClick={()=>setName('ArraysPoler')}>
          Cambio nombre
        </button> */}

      {
        /* users.map(user => {
          const { userName, name, isFollowing } = user
          return (
            <TwitterFollowCard key={userName} userName={userName} initialIsFollowing={isFollowing}>
              {name}
            </TwitterFollowCard>
          )
        }) */
        users.map(({ userName, name, isFollowing }/* , index */) => (
          <TwitterFollowCard
            key={userName} // Se necesita para que al renderizarse no haya problemas, se puede utilizar el index, si esque el elemento siempre va a tener ese indice
            userName={userName}
            initialIsFollowing={isFollowing}
          >
            {name}
          </TwitterFollowCard>
        ))
      }
    </section>
  )
}
